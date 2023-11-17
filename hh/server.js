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

app.post('/chat', (req, res) => {
    // 클라이언트 요청
    const clientRequest = req.body;
    console.log('요청은');
    console.log(clientRequest);
    console.log('제이슨으로 변환하면');
    console.log(JSON.stringify(clientRequest));

    // 파이썬 프로그램 실행
    const pythonProcess = spawn('C:/Users/gjaischool/anaconda3/python', ['Main_Model.py']);

    const buffers = [];

    // 클라이언트 요청 전송
    pythonProcess.stdin.write(JSON.stringify(clientRequest));
    pythonProcess.stdin.end();

    // 파이썬 프로세스의 표준 출력에서 데이터를 읽어옴
    pythonProcess.stdout.on('data', (data) => {
        console.log('반환된 데이터는');
        console.log(data);
        buffers.push(data);
        try {
            // Buffer.concat()을 사용하여 모든 버퍼를 하나로 합침
            const concatenatedBuffer = Buffer.concat(buffers);

            // iconv-lite를 사용하여 UTF-8로 디코딩
            const decodedResult = iconv.decode(concatenatedBuffer, 'euc-kr');

            // JSON 문자열을 파싱하여 JavaScript 객체로 변환
            const resultData = JSON.parse(decodedResult);

            console.log('res :');
            console.log(resultData);
            // 원본
            res.json(resultData);

            // 그래프를 위한 수정 부분
            // res.json({ chatResponse: resultData, graphData: graph_data });
            
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
