import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'; //음성 입력용
import { BrowserRouter as Router, Route, Routes, Link, useNavigate} from 'react-router-dom';
import './css/reset.css';
import './css/bottom.css';
import './css/top.css';
import './css/center copy.css';
import './css/styles.css';
import './css/judi_chat.css';
import MyComponent from './script';



function Home() {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // 화면 너비 상태

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
    console.log("isDropdownVisible 상태값:", isDropdownVisible);
  };
  


  // 화면 크기가 작을 때 드롭다운 메뉴를 표시
  const showDropdown = windowWidth <= 768;

  // 브라우저 창 크기가 변경될 때 화면 너비 상태 업데이트
  window.addEventListener('resize', () => {
    setWindowWidth(window.innerWidth);
  });
  return (
    <div>
      {/* Top */}
      <div className="top">

        <div className="logo" onClick={() => navigate('/')}>
          <p>JudiAI</p>
        </div>
        <div className={`navigation_bar ${showDropdown ? 'dropdown' : ''}`}>

          <ul className={isDropdownVisible ? 'show' : ''}>
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/try-judiai">Try JudiAI</Link></li>
            <li><a href="#a">Our Clients</a></li>
            <li><a href="#b">Contact us</a></li>
          </ul>
          
        </div>
        <div className="menu-toggle-background">
          <button className="menu-toggle" onClick={toggleDropdown}><i className="fa fa-bars"></i></button>
          {isDropdownVisible && (
            <ul className="menu-toggle-active">
              <a><Link to="/">HOME</Link></a>
              <a><Link to="/try-judiai">Try JudiAI</Link></a>
              <a href="#a">Our Clients</a>
              <a href="#b">Contact us</a>
            </ul>
          )}
        </div>

      </div>

      {/* Center */}
      <div className="center">

        
        <div className="content">
          <div className="center-background"><img src={process.env.PUBLIC_URL + "./images/down5.png"} alt="Legal" width={2000}/></div> {/* 이미지를 배경으로 사용할 요소 */}
          <div className="content-left">
            <p>당신의 법률 문제</p>
            <p>JudiAI와 함께</p>
            <p>해결하세요</p>
            <button className="Try_JudiAI" onClick={() => navigate('/try-judiai')}>
              Try JudiAI
            </button>
          </div>

          <div className="introducing">
            <p>JudiAI와 함께 여러분의 다양한 법률 문제를 탐색하세요.</p>
            <p>우리의 인공지능 상담 서비스는 여러분의 상황과 유사한 법률 판례를 분석하고,</p>
            <p>대략적인 결과와 안내를 제공합니다.</p>
            <p>변호사와의 상담을 고려하기 전에 JudiAI를 활용하여 법률 문제에 대한 초기 답변을 얻어보세요.</p>
            <p>당신의 법률 문제를 더 나은 방향으로 안내하는데 도움을 드릴 것입니다. </p>
          </div>          


        </div>
      </div>
 

      {/* Bottom */}
      <div className="bottom">      
  
        <div className="container-fluid bg-primary text-white-50 py-5 px-sm-3 px-md-5" style={{ marginTop: '90px' }}>
          <div className="row pt-5">
            <div className="col-lg-3 col-md-6 mb-5">
              <a href="#" className="navbar-brand">
                <h1 className="m-0 mt-n2 text-white display-4">JudiAI</h1>
              </a>
              <p>JudiAI는 인공지능 법률 상담 서비스입니다.<br></br>여러분의 상황과 유사한 법률 판례를 분석하고, 대략적인 결과를 제공합니다.</p>
              {/*              
              <h6 className="text-uppercase text-white py-2">Follow Us</h6>
              <div className="d-flex justify-content-start">
                <a className="btn btn-lg btn-primary btn-lg-square mr-2" href="#"><i className="fab fa-twitter"></i></a>
                <a className="btn btn-lg btn-primary btn-lg-square mr-2" href="#"><i className="fab fa-facebook-f"></i></a>
                <a className="btn btn-lg btn-primary btn-lg-square mr-2" href="#"><i className="fab fa-linkedin-in"></i></a>
                <a className="btn btn-lg btn-primary btn-lg-square" href="#"><i className="fab fa-instagram"></i></a>
              </div>
              */}
            </div>
            <div className="col-lg-3 col-md-6 mb-5">
              <h4 className="text-uppercase text-white mb-4">Get In Touch</h4>
              <p><i className="fa fa-map-marker-alt text-white mr-2"></i>광주광역시 동구 제봉로 92 (대성학원 1-3층)</p>
              <p><i className="fa fa-phone-alt text-white mr-2"></i>+82 123 4567</p>
              <p><i className="fa fa-envelope text-white mr-2"></i>mococo@gjaischool.com</p>
            </div>
            <div className="col-lg-3 col-md-6 mb-5">
              <h4 className="text-uppercase text-white mb-4">Quick Links</h4>
              <div className="d-flex flex-column justify-content-start">
                <a className="text-white-50 mb-2" href="#"><i className="fa fa-angle-right text-white mr-2"></i>Home</a>
                <a className="text-white-50 mb-2" onClick={() => navigate('/try-judiai')}><i className="fa fa-angle-right text-white mr-2"></i>Try JudiAI</a>
                <a className="text-white-50 mb-2" href="#"><i className="fa fa-angle-right text-white mr-2"></i>Our Services</a>
                <a className="text-white-50 mb-2" href="#"><i className="fa fa-angle-right text-white mr-2"></i>Contact us</a>
                
              </div>
            </div>

          </div>
        </div>
  
      </div>

    </div>
  );
}

// 솔빈 작업 구역
// 대화 저장을 위한 구역
function downloadToFile(content, filename, contentType) {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  
  a.href= URL.createObjectURL(file);
  a.download = filename;
  a.click();

  URL.revokeObjectURL(a.href);
};

// 주디의 대화를 위한 구역
function TryJudiAI() {
  const [isChatboxActive, setIsChatboxActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // 초기 변호사 메시지 설정
    setMessages([
      { text: "안녕하세요, 어떤 도움이 필요하신가요?", sender: 'lawyer' }
    ]);
  }, []);
  // 채팅 박스 생성 부분
  const toggleChatbox = () => {
    setIsChatboxActive(!isChatboxActive);
  };

  // 채팅의 응답을 제출하는 부분
  const submitResponse = () => {
    if (userInput.trim() !== "") {
      // 메시지 상태에 새로운 사용자 메시지 추가
      setMessages([...messages, { text: userInput, sender: 'user' }]);
      setUserInput("");     
      // TODO: Add logic for lawyer's response 변호사의 답변 로직을 추가하는 부분
    }
  };

  // input 값 변경 처리
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // 메시지 배열을 기반으로 UI 렌더링
  const renderMessages = messages.map((message, index) =>
    <div key={index} className={`bubble ${message.sender}`}>
      {message.text}
    </div>
  );

  //저장 버튼을 누르면 저장되는 부분을 위한 수정.
  const saveChatHistory = () => {
    const messagesAsString = messages.map(m => `${m.sender}: ${m.text}`).join('\n');
    downloadToFile(messagesAsString, 'chat_history.txt', 'text/plain');
  };

  // 음성 인식을 위한 state와 함수들
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  // 음성 인식을 시작하는 함수
  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  // 음성 인식을 중지하는 함수
  const stopListening = () => {
    SpeechRecognition.stopListening();
    setUserInput(transcript); // 음성 인식 결과를 userInput에 설정
  };


  // 리턴 영역
  return (
    <div>
      {/* Top */}
      <div className="top">
        <div className="logo" onClick={() => navigate('/')}>
          <p>JudiAI</p>
        </div>

        <div className="navigation_bar">
          <ul>
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/try-judiai">Try JudiAI</Link></li>
            <li><a href="#a">Our Clients</a></li>
            <li><a href="#b">Contact us</a></li>
          </ul>
        </div>
      </div>

      {/* Chat Simulator */}
      <div className="chat-container">
        // 주디 이미지
        <div className="lawyer-image-container">
          <img
            className="lawyer-image"
            src="/images/Judi_desk.png"
            alt="변호사"
          />
          <div className="bubble lawyer-bubble hidden">
            안녕하세요, 어떤 도움이 필요하신가요?
          </div>
        </div>
        
        // 챗 박스 관련 구역
        <div id="chatbox" className={`chatbox ${isChatboxActive ? 'active' : 'hidden'}`}>
          {renderMessages}
          <input 
            type="text" 
            value={userInput}
            onChange={handleInputChange}
            placeholder="여기에 답변을 입력하세요..." 
          />
          <button onClick={submitResponse}>전송</button>
          <button onClick={saveChatHistory}>저장</button>
        </div>

        {/* 음성 인식 컨트롤 버튼을 chatbox 위로 위치시킴 */}
        <div className="dictaphone-controls">
          <button onClick={startListening} disabled={listening}>녹음 시작</button>
          <button onClick={stopListening} disabled={!listening}>녹음 중지</button>
          <button onClick={resetTranscript}>리셋</button>
        </div>

        {/* 이 부분을 chatbox 바로 아래에 위치시킬 수 있음 */}
        {listening && <div className="transcript">Transcript: {transcript}</div>}

        
        {/* chat 아이콘을 눌렀을 때  chatbox가 열리는 영역 */}
        <div id="open-chatbox-button" onClick={toggleChatbox}>
          <img
            src="/images/chat_icon.png"
            alt="Chat Icon"
            style={{ cursor: 'pointer' }} // Makes it clear that the image is clickable
          />
        </div>

      </div>

      // 챗 박스 밖으로 이미지 추가해보기
      <div className = "question-container">
        <div className="question-form-container">
            <img
              src="/images/question_form.png"
              alt="질문 양식"
            />
        </div>

      </div>

      
    </div>
  );
}



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/try-judiai" element={<TryJudiAI />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;


