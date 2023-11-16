const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;
const {spawn} = require('child_process');
const bodyParser = require('body-parser');
const iconv = require('iconv-lite');

app.use(bodyParser.json());

app.use(express.static(path.join('C:/Users/gjaischool/Desktop/2차_프로젝트/reactest/hh/', 'build')));
app.get('/', (req, res) => {
    res.sendFile(path.join('C:/Users/gjaischool/Desktop/2차_프로젝트/reactest/hh/', 'build', 'index.html'));
});

app.get('/api/search', (req, res) => {
    // 파이썬 프로그램 실행
    const pythonProcess = spawn('C:/Users/gh576/anaconda3/python', ['Main_Model.py']);

    const buffers = [];

    // 파이썬 프로세스의 표준 출력에서 데이터를 읽어옴
    pythonProcess.stdout.on('data', (data) => {
        buffers.push(data);
    });

    pythonProcess.stderr.on('data', (errorData) => {
        console.error('파이썬 프로세스 표준 에러 출력 :', errorData.toString());
    });

    // 파이썬 프로세스가 종료될 때 발생
    pythonProcess.on('close', (code) => {
        try {
            // Buffer.concat()을 사용하여 모든 버퍼를 하나로 합침
            const concatenatedBuffer = Buffer.concat(buffers);

            // iconv-lite를 사용하여 UTF-8로 디코딩
            const decodedResult = iconv.decode(concatenatedBuffer, 'euc-kr');

            // JSON 문자열을 파싱하여 JavaScript 객체로 변환
            const resultData = JSON.parse(decodedResult);

            res.json(resultData);
        } catch (error) {
            // JSON 파싱에 실패한 경우
            console.error('파이썬 스크립트에서 반환된 데이터가 유효한 JSON이 아닙니다');
            res.status(500).json({ error: '내부 서버 오류' }); // 오류 응답 반환
        }
    });
});

app.listen(port, () => {
    console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});
