const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;
const {spawn} = require('child_process');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static(path.join('C:/Users/gh576/OneDrive/바탕 화면/JudiAI/hh/', 'build')));
app.get('/', (req, res) => {
    res.sendFile(path.join('C:/Users/gh576/OneDrive/바탕 화면/JudiAI/hh/', 'build', 'index.html'));
});
// app.get('/', (req, res) => {
//     res.sendFile('C:/Users/gh576/OneDrive/바탕 화면/JudiAI/hh/build/index.html')
// });

app.get('/api/search', (req, res) => {
    const query = req.query.query;

    // 파이썬 프로그램 실행
    const pythonProcess = spawn('python', ['test.py', query]);

    let searchResult = '';

    pythonProcess.stdout.on('data', (data) => {
        searchResult += data.toString();
    });

    pythonProcess.on('close', (code) => {
        try {
            const resultData = JSON.parse(searchResult);
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
