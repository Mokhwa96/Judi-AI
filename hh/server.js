const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;
const {spawn} = require('child_process');
const bodyParser = require('body-parser');
const iconv = require('iconv-lite');
// 구글 TTS 이용하기 위한 자리
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const client = new textToSpeech.TextToSpeechClient();
// 데이터베이스 연결
var mysql      = require('mysql');
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'judiai',
password : 'mococo00.',
database : 'mococodb'
});
connection.connect();


app.use(bodyParser.json());

app.use(express.static(path.join('C:/Users/gjaischool1/.vscode/react-app/hh/Judi-AI-1/hh/', 'build')));
app.get('/', (req, res) => {
    res.sendFile(path.join('C:/Users/gjaischool1/.vscode/react-app/hh/Judi-AI-1/hh/', 'build', 'index.html'));
});
app.post('/chat', (req, res) => {
    // 클라이언트 요청
    const clientRequest = req.body;
    console.log('요청은');
    console.log(clientRequest);
    console.log('제이슨으로 변환하면');
    console.log(JSON.stringify(clientRequest));
    console.log(clientRequest['chat']);
    // 데이터베이스 질문 삽입
    var sql = "INSERT INTO question(text) VALUES (?)";
    connection.query(sql,clientRequest['chat'], function (error, results, fields) {
        if (error) throw error;
        console.log('qustion inserted: ', results.affectedRows);
    });
    // connection.end();

    // 파이썬 프로그램 실행
    const pythonProcess = spawn('C:/Users/gjaischool1/anaconda3/python', ['Main_Model.py']);

    const buffers = [];

    // 데이터베이스에서 데이터 불러오기
    const sqlQuery = "SELECT id, text, 'user' AS role FROM question UNION ALL SELECT id, text, 'assistant' AS role FROM answer ORDER BY id";
    connection.query(sqlQuery, function (error, results, fields) {
        if (error) {
        console.error('Error retrieving data:', error);
        connection.end();
        return;
    }
    const dictionaries = [];  // 딕셔너리들을 저장할 배열

    let currentUser = null;
    let currentAssistant = null;

    results.forEach(row => {
        const role = row.role;
        const text = row.text;

        if (role === 'user') {
            currentUser = { role: 'user', content: text };
            if (currentAssistant !== null) {
                dictionaries.push(currentAssistant);
                currentAssistant = null;
            }
        } else if (role === 'assistant') {
            currentAssistant = { role: 'assistant', content: text };
            if (currentUser !== null) {
                dictionaries.push(currentUser);
                currentUser = null;
            }
        }
    });

    // 마지막 문장 추가
    if (currentUser !== null) {
        dictionaries.push(currentUser);
    }
    if (currentAssistant !== null) {
        dictionaries.push(currentAssistant);
    }

        
    console.log('딕셔너리 확인')
    console.log(dictionaries);
    console.log(JSON.stringify(dictionaries));
    //connection.end(); //여기서 끊으면 이후 코드에서 데이터베이스에 연결이 안됨.
});

    // 클라이언트 요청 전송
    pythonProcess.stdin.write(JSON.stringify(clientRequest));
    pythonProcess.stdin.end();

    // 파이썬 프로세스의 표준 출력에서 데이터를 읽어옴
    pythonProcess.stdout.on('data', async (data) => {
        console.log('반환된 데이터는');
        console.log(data);
        buffers.push(data);
        try {
            // Buffer.concat()을 사용하여 모든 버퍼를 하나로 합침
            const concatenatedBuffer = Buffer.concat(buffers);

            // iconv-lite를 사용하여 UTF-8로 디코딩
            const decodedResult = iconv.decode(concatenatedBuffer, 'euc-kr');
            console.log(decodedResult);

            // JSON 문자열을 파싱하여 JavaScript 객체로 변환
            const resultData = JSON.parse(decodedResult);

            // 응답을 TTS를 이용하여 변환
            // const request_speech = {
            //     input: { text: resultData['results']},
            //     voice: { languageCode: 'ko-KR', name: 'ko-KR-Wavenet-B', ssmlGender: 'FEMALE'},
            //     audioConfig: { audioEncoding: 'MP3', pitch: 0.4, speakingRate: 1.1}, 
            // };

            // const [response_speech] = await client.synthesizeSpeech(request_speech);

            // const writeFile = util.promisify(fs.writeFile);
            // await writeFile('public/answer.mp3', response_speech.audioContent, 'binary')

            console.log('res :');
            console.log(resultData);
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

    pythonProcess.stderr.on('data', (errorData) => {
        console.error('파이썬 프로세스 표준 에러 출력 :', errorData.toString());
    });

    // 파이썬 프로세스가 종료될 때 발생
    // pythonProcess.on('close', (code) => {
    //     try {
    //         // Buffer.concat()을 사용하여 모든 버퍼를 하나로 합침
    //         const concatenatedBuffer = Buffer.concat(buffers);

    //         // iconv-lite를 사용하여 UTF-8로 디코딩
    //         const decodedResult = iconv.decode(concatenatedBuffer, 'euc-kr');

    //         // JSON 문자열을 파싱하여 JavaScript 객체로 변환
    //         const resultData = JSON.parse(decodedResult);

    //         res.json(resultData);
    //     } catch (error) {
    //         // JSON 파싱에 실패한 경우
    //         console.error('파이썬 스크립트에서 반환된 데이터가 유효한 JSON이 아닙니다');
    //         res.status(500).json({ error: '내부 서버 오류' }); // 오류 응답 반환
    //     }
    // });
});

app.listen(port, () => {
    console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});
