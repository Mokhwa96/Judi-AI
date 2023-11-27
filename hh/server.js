const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;
const { spawn } = require("child_process");
const bodyParser = require("body-parser");
const iconv = require("iconv-lite");
const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const util = require("util");
const client = new textToSpeech.TextToSpeechClient();
// 데이터베이스 연결
const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'judiai',
    password : 'mococo00.',
    database : 'mococodb'
});
connection.connect();


app.use(bodyParser.json());

app.use(express.static('build'));
app.get('/', (req, res) => {
    res.sendFile(path.join('build', 'index.html'));
});
app.post('/chat', (req, res) => {
    // 클라이언트 요청
    const clientRequest = req.body;
    console.log('요청은');
    console.log(clientRequest);
    console.log('제이슨으로 변환하면');
    console.log(JSON.stringify(clientRequest));

    // 데이터베이스 질문 삽입
    const sql = "INSERT INTO question(text) VALUES (?)";
    connection.query(sql,clientRequest['chat'], function (error, results, fields) {
        if (error) throw error;
        console.log('qustion inserted: ', results.affectedRows);
    });

    // 파이썬 프로그램 실행
    const pythonProcess = spawn('C:/Users/gh576/anaconda3/python', ['Main_Model.py']);

    const buffers = [];

    var dictionaries = [];  // 딕셔너리들을 저장할 배열

    // 데이터베이스에서 데이터 불러오기
    const sqlQuery = "SELECT id, text, 'user' AS role FROM question UNION ALL SELECT id, text, 'assistant' AS role FROM answer ORDER BY id";
    connection.query(sqlQuery, function (error, results, fields) {
        if (error) {
            console.error('Error retrieving data:', error);
            connection.end();
            return;
        }
    
        dictionaries.push({"role": "system", "content": "너는 법률 상담을 해주는 변호사야. 지금 나는 너에게 내 법률 문제에 대해 상담을 받으러 왔고, 내가 처한 상황을 설명할거야. 문의가 오면 먼저 현재 상황을 설명해 달라고 안내 해줘. 너에게 법률 관련 자문을 하면 [강제추행], [공무집행방해], [교통사고처리특례법위반(치상)], [도로교통법위반(음주운전)], [사기], [상해], [폭행], [구상금], [대여금], [부당이득금], [손해배상(기)] 관련 상담만 해줘. 나와의 대화에서 처음에는 [공감]을 하고, 더 필요한 정보에 대해서는 추가적인 [질문]을 해줘. 마지막으로 상황 파악에 대한 충분한 정보가 모였다면, 상황에 대한 요약을 해 줘.단, 요약은 2000자 이내로 해줘. 그리고 모든 답변은 가독성이 좋게 보여줘."});
        results.forEach(row => {
            const id = row.id;
            const role = row.role;
            const text = row.text;

            if (role == 'user' || role == 'assistant') {
                dictionaries.push({
                    role: role,
                    content: text
                });
            } 
        });
        
        console.log('딕셔너리 확인')
        console.log(dictionaries);

        // 클라이언트 요청 전송
        pythonProcess.stdin.write(JSON.stringify(dictionaries));
        pythonProcess.stdin.end();
    });

  // 파이썬 프로세스의 표준 출력에서 데이터를 읽어옴
  pythonProcess.stdout.on("data", async (data) => {
    console.log("반환된 데이터는");
    buffers.push(data);
    try {
      // Buffer.concat()을 사용하여 모든 버퍼를 하나로 합침
      const concatenatedBuffer = Buffer.concat(buffers);

            // iconv-lite를 사용하여 UTF-8로 디코딩
            const decodedResult = iconv.decode(concatenatedBuffer, 'utf-8');

            // JSON 문자열을 파싱하여 JavaScript 객체로 변환
            const resultData = JSON.parse(decodedResult);
            console.log('resultData :');
            console.log(resultData);

            // 응답을 TTS를 이용하여 변환 (현호계정으로만 가능)
            const request_speech = {
                input: { text: resultData['results']},
                voice: { languageCode: 'ko-KR', name: 'ko-KR-Wavenet-B', ssmlGender: 'FEMALE'},
                audioConfig: { audioEncoding: 'MP3', pitch: 0.4, speakingRate: 1.1}, 
            };

            const [response_speech] = await client.synthesizeSpeech(request_speech);

            const writeFile = util.promisify(fs.writeFile);
            await writeFile('build/answer.mp3', response_speech.audioContent, 'binary')

            res.json(resultData);
            // 데이터베이스 답변 삽입
            var sql = "INSERT INTO answer(text) VALUES (?)";
            connection.query(sql,resultData['results'], function (error, results, fields) {
                if (error) throw error;
                console.log('answer inserted: ', results.affectedRows);
            });

        } catch (error) {
            // JSON 파싱에 실패한 경우
            console.error('파이썬 스크립트에서 반환된 데이터가 유효한 JSON이 아닙니다');
            console.log(data);
            res.status(500).json({ error: '내부 서버 오류' });  // 오류 응답 반환
        }
    });

  pythonProcess.stderr.on("data", (errorData) => {
    console.error("파이썬 프로세스 표준 에러 출력 :", errorData.toString());
  });
});

app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});
