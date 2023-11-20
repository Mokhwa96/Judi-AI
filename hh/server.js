const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;
const {spawn} = require('child_process');
const bodyParser = require('body-parser');
const iconv = require('iconv-lite');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const client = new textToSpeech.TextToSpeechClient();

app.use(bodyParser.json());

app.use(express.static(path.join('C:/Users/gh576/JudiAI/hh/', 'build')));
app.get('/', (req, res) => {
    res.sendFile(path.join('C:/Users/gh576/JudiAI/hh/', 'build', 'index.html'));
});

app.post('/chat', (req, res) => {
    // 클라이언트 요청
    const clientRequest = req.body;
    console.log('요청은');
    console.log(clientRequest);
    console.log('제이슨으로 변환하면');
    console.log(JSON.stringify(clientRequest));

    // 파이썬 프로그램 실행
    const pythonProcess = spawn('C:/Users/gh576/anaconda3/python', ['Main_Model.py']);

    const buffers = [];

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
            const request_speech = {
                input: { text: resultData['results']},
                voice: { languageCode: 'ko-KR', name: 'ko-KR-Wavenet-B', ssmlGender: 'FEMALE'},
                audioConfig: { audioEncoding: 'MP3', pitch: 0.4, speakingRate: 1.1}, 
            };

            const [response_speech] = await client.synthesizeSpeech(request_speech);

            const writeFile = util.promisify(fs.writeFile);
            await writeFile('public/answer.mp3', response_speech.audioContent, 'binary')

            console.log('res :');
            console.log(resultData);
            res.json(resultData);
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
});

app.listen(port, () => {
    console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});
