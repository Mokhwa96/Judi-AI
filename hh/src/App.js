import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'; //음성 입력용
import { BrowserRouter as Router, Route, Routes, Link, useNavigate} from 'react-router-dom';
import './css/reset.css';
import './css/bottom.css';
import './css/top.css';
import './css/center.css';
// import './css/styles.css';
import './css/judi_chat.css';
import UserForm from "./components/UserForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다
  // 토글 메뉴
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
    console.log("isDropdownVisible 상태값:", isDropdownVisible);
  };

  // 화면 너비 상태
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 화면 크기가 작을 때 드롭다운 메뉴를 표시
  const showDropdown = windowWidth <= 768;

  // 브라우저 창 크기가 변경될 때 화면 너비 상태 업데이트
  window.addEventListener('resize', () => {
    setWindowWidth(window.innerWidth);
  });


  return (
  <div className='home'>
      {/* Top */}
    <div className="top">

      <div className="logo" onClick={() => navigate('/')}>
        <p>JudiAI</p>
      </div>
      <div className={`navigation_bar ${showDropdown ? 'dropdown' : ''}`}>

        <ul className={isDropdownVisible ? 'show' : ''}>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/try-judiai">Try JudiAI</Link></li>
          <li><a href="#a">Our Project</a></li>
          <li><a href="#b">Contact us</a></li>
        </ul>
        {/* 화면이 좁하질 때 토글 메뉴 생김 */}
        <div className="menu-toggle-background">
          <button className="menu-toggle" onClick={toggleDropdown}><i className="fa fa-bars"></i></button>
          {isDropdownVisible && (
            <ul className="menu-toggle-active">
              <a><Link to="/">HOME</Link></a>
              <a><Link to="/try-judiai">Try JudiAI</Link></a>
              <a href="#a">Our Project</a>
              <a href="#b">Contact us</a>
            </ul>
          )}
        </div>
      </div>
    </div>

    {/* Center */}
    <div className="center">

      {/* 배경 이미지  */}
      <div className="center-background"><img src={process.env.PUBLIC_URL + "./images/background.jpg"} alt="AI 판사 배경 이미지" width={1200}/>
        <span className="content-left">
          <p>당신의 법률 문제</p>
          <p>JudiAI와 함께</p>
          <p>해결하세요</p>
          
          <button className="Try_JudiAI" onClick={() => navigate('/try-judiai')}>
            Try JudiAI
          </button>
        </span>
        {/* 아래 화살표 아이콘 */}
        <FontAwesomeIcon className='faArrowCircleDown' icon={faArrowCircleDown} style={{color:"#ffffff", }} size='3x' />
      </div>

      {/* Our Project Start -- */}
      <div className='our_project'>
        <div className="dashed-line"></div>
        <h1>Our Project</h1>
        {/* Our Project 채팅 */}
        <div className="judiexplain">
          <div className="judi_white">
            <img src={process.env.PUBLIC_URL +"./images/Judi_desk.png"} alt="주디 이미지" />
          </div >
          <div className="chat_info">
            <span className='chatbubble'>
              안녕하세요, 어떤 도움이 필요하신가요?
            </span>
          </div>
          <div className="chat_info2">
            <span className='chatbubble2'>
              어쩌구 저쩌구한 내용
            </span>
          </div>
          <div className="chat_info3">
            <span className='chatbubble3'>
              해당 사례에서는 1년 징역이 예상되지만, 2년 집행 유예 및 40시간의 준법 교육 판결이 예측됩니다. 다만, 이는 예상 결과이며 실제 판결과는 다를 수 있습니다.
            </span>
          </div>
          <div className="chat_send">
            <span className="send_button">전송</span>
          </div>
        </div>
        {/* Our Project 설명 */}
        <div className="introducing-back">
          <p>JudiAI와 함께 여러분의 다양한 법률 문제를 탐색하세요.</p>
          <br></br>
          <p>우리의 인공지능 상담 서비스는 여러분의 상황과 유사한 법률 판례를 분석하고, 
            대략적인 결과와 안내를 제공합니다.</p>
          <br></br>
          <p>변호사와의 상담을 고려하기 전에 JudiAI를 활용하여 법률 문제에 대한 초기 답변을 얻어보세요.</p>
          <br></br>
          <p>당신의 법률 문제를 더 나은 방향으로 안내하는데 도움을 드릴 것입니다. </p>
        </div>
      </div>
      {/* Our Project End -- */}


      {/* Contact us Start -- */}
      <div className='contact_us'>
        <div className="dashed-line"></div>
        <h1>Contact us</h1>
        {/* 이메일, 제목, 메세지 입력창 */}
        <div className="contact_us_back">
          <UserForm />
        </div>
      </div>
      {/* Contact us End -- */}
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
  const [messages, setMessages] = useState([{ text: "안녕하세요, 어떤 도움이 필요하신가요?", sender: 'lawyer' }]);
  const [userInput, setUserInput] = useState('');
  const navigate = useNavigate();

  // 현호 작업구역
  // 검색 test

  // 서버로 데이터를 전송하고 받는 함수
  const chatbotChat = async (userinput) => {
    const chatdata = {'chat': userinput};
    try {
      const response = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatdata),
      });
      const data = await response.json();

      console.log(messages);
      console.log('진짜진짜 최종');
      setMessages(prevMessages => [...prevMessages, { text: data, sender:'lawyer' }]);
      console.log(messages);
      console.log('응답은');
      console.log(data);
      console.log('입력문은');
      console.log(userinput);
    } catch (error) {
      console.error(error);
    }
  };

  // 변호사 메시지 표시 여부를 위한 새로운 state - setTimeout 관련
  const [showLawyerMessage, setShowLawyerMessage] = useState(true);

  // useEffect(() => {
  //   // 초기 변호사 메시지 설정
  //   setMessages([
  //     { text: "안녕하세요, 어떤 도움이 필요하신가요?", sender: 'lawyer' }
  //   ]);
    
  //   // 3초 후에 변호사 메시지를 숨기는 로직  - setTimeout 관련 (사라지는 시간 조절)
  //   // const timer = setTimeout(() => {
  //   //   setShowLawyerMessage(false);
  //   // }, 2000);
  //   // // 컴포넌트가 언마운트될 때 타이머 클리어  - setTimeout 관련
  //   // return () => clearTimeout(timer);

  // }, []);

  // 변호사 메시지만 렌더링하는 함수
  const renderLawyerMessages = () => {
    return messages
      .filter(message => message.sender === 'lawyer' && showLawyerMessage)
      .map((message, index) => (
        <div key={index} className="bubble lawyer-bubble">
          {message.text}
        </div>
      ));
  };

  // 사용자 메시지만 렌더링하는 함수
  const renderUserMessages = () => {
    return messages
      .filter(message => message.sender === 'user')
      .map((message, index) => (
        <div key={index} className="bubble user">
          {message.text}
        </div>
      ));
  };


  // 채팅 박스 생성 부분
  const toggleChatbox = () => {
    setIsChatboxActive(!isChatboxActive);
  };

  // 채팅의 응답을 제출하는 부분
  const submitResponse = () => {
    if (userInput.trim() !== "") {
      // 메시지 상태에 새로운 사용자 메시지 추가
      // 서버로 값 전송 내용 추가 요망 + 받은 답변도 띄워준다,
      setMessages(prevMessages => [...prevMessages, { text: userInput, sender:'user' }]);
      chatbotChat(userInput)
      // const return_data = chatbotChat(userInput)
      // setMessages([...messages, { text: return_data, sender:'lawyer' }]);
      // setUserInput("");
      // TODO: Add logic for lawyer's response 변호사의 답변 로직을 추가하는 부분
    }
  };

  // input 값 변경 처리
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // 메시지 배열을 기반으로 UI 렌더링
  const renderMessages = messages.map((message, index) =>
    <div key={index} className={`message-container ${message.sender}-container`}>
      <div className={`bubble ${message.sender}`}>
        {message.text}
      </div>
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
  const startListening = () => {
    resetTranscript(); // 음성 인식 텍스트 초기화
    setUserInput(''); // 입력 필드 초기화
    SpeechRecognition.startListening({ continuous: true });
  };
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
            <li><a href="#a">Our Project</a></li>
            <li><a href="#b">Contact us</a></li>
          </ul>
        </div>
      </div>

      {/* Chat Simulator */}
      <div className={`chat-container ${isChatboxActive ? 'expanded' : ''}`}>
        {/* 주디 이미지 */}  
        <img
          className="lawyer-image"
          src="/images/Judi_desk.png"
          alt="변호사"
        />
        {/* // 변호사의 말 띄울 구역 */}
        {/* {renderLawyerMessages()} */}
        {/* <div className="bubble lawyer-bubble hidden">
            여기에 변호사가 말하게 하려는 내용을 추가
            안녕하세요 이건 샘플 문장 입니다.
        </div> */}

        {/* // 챗 박스 관련 구역 */}
        <div id="chatbox" className={`chatbox ${isChatboxActive ? 'active' : 'hidden'}`}>
          {/* 채팅 메시지를 표시하는 부분 */}
          <div className="chat-messages">
            {renderMessages}
          </div>

          {/* 입력창 및 버튼 관련 구역 */}
          <div className="chat-input-area">
            <input 
              type="text" 
              value={userInput}
              onChange={handleInputChange}
              placeholder="여기에 답변을 입력하세요..."
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  submitResponse();
                }
              }} 
            />

            {/* 음성 인식 & 전송 저장 버튼 */}
            <div className="voice-control-buttons">
              {listening ? (
                <img
                src="/images/stop_icon.png"
                alt="녹음 중지"
                onClick={stopListening}
                style={{ width: '30px', height: '30px' }}
                />
                ) : (
                <img
                  src="/images/record_icon.png"
                  alt="녹음 시작"
                  onClick={startListening}
                  style={{ width: '30px', height: '30px' }}
                />
              )}
              <img
                src="/images/reset_icon.png"
                alt="리셋"
                onClick={resetTranscript}
                className="voice-control-button"
              />
              <img
                src="/images/save_icon.png"
                alt="저장"
                onClick={saveChatHistory}
                className="voice-control-button"
              />
              <img
                src="/images/send_icon.png"
                alt="전송"
                onClick={submitResponse}
                className="voice-control-button"
              />
              </div>        
          </div>
        </div>
                
        {/* chat 아이콘을 눌렀을 때  chatbox가 열리는 영역 */}
        <div id="open-chatbox-button" onClick={toggleChatbox}>
          <img
            src="/images/chat_icon.png"
            alt="Chat Icon"
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* 음성 인식 텍스트 표시 */}
      {listening && <div className="transcript">상담 내용 확인: {transcript}</div>}

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


