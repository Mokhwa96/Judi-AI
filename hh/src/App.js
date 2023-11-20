import React, { useState, useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'; //음성 입력용
import { BrowserRouter as Router, Route, Routes, Link, useNavigate} from 'react-router-dom';
import './css/reset.css';
import './css/bottom.css';
import './css/top.css';
import './css/center.css';
// import './css/styles.css';
import './css/judi_chat.css';
import UserForm from "./components/UserForm";
import Navigation from './components/Navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
import { Howl } from 'howler';
import Graph1 from './graph1'
// import { ResponsiveBar } from '@nivo/bar'

function Home() {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다
  // 스크롤 기능
  const project_ref = useRef(null)  // Our Project로 스크롤
  const contact_ref = useRef(null)  // Contact us로 스크롤
  const handleClick = () => {
    project_ref.current?.scrollIntoView({behavior: 'smooth'})
  };

  return (
  <div className='home'>
      {/* Top */}
    <div className="top">

      <div className="logo" onClick={() => navigate('/')}>
        <p>JudiAI</p>
      </div>
      {/* 상단 메뉴 */}
      <Navigation project_ref={project_ref} contact_ref={contact_ref} />
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
        <FontAwesomeIcon className='faArrowCircleDown' onClick={handleClick} icon={faArrowCircleDown} style={{color:"#ffffff", }} size='3x' />
      </div>

      {/* Our Project Start -- */}
      <div className='our_project' ref={project_ref}>
        <div className="dashed-line"></div>
        <h1>Our Project</h1>
        {/* 채팅 */}
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
        {/* 설명 */}
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
      <div className='contact_us' ref={contact_ref}>
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
  const [answerState, setAnswerState] = useState(false);
  const navigate = useNavigate();
  // 그래프 시작
  const [graphdata, setGraphdata] = useState({
    '징역': {},
    '금고': {},
    '벌금': {'100만원':10, '10만원':7},
    '집행유예': {},
    '사회봉사': {},
    '성폭력_치료프로그램': {},
    '피고인_정보공개': {},
    '아동_청소년_장애인복지시설_취업제한': {},
    '준법운전강의': {},
    results: '안녕하세요, 변호사입니다. 당신의 말씀을 모두 이해하기 어려워 몇 가지 추가적인 정보를 듣고 싶습니다.\n' +
      '\n' +
      '첫 번째로, 상대방 A와 B가 귀하에게 감금, 폭행, 협박이라는 범죄를 저질렀다고 말씀하셨는데, 범행 장소를 언급하신 건가요? 이것이 확실한 정보인가요?\n' +
      '\n' +
      '두 번째로, 이 사건에 연루된 C와 D는 누구인가요? 이들이 B와 어떤 관계가 있는지, 또 그들의 역할은 무엇인가요?\n' +
      '\n' +
      '세 번째로, 검찰에 상고하셨다고 말씀하신 부분에 대하여 좀 더 설명해주실 수 있나요? 검찰에 제출하신 증거나 관련 문서 등을 가지고 계신가요?\n' +
      '\n' +
      "마지막으로, '변호인을 구할 필요가 있다'는 부분이 조금 불분명합니다. 이미 변호인이 선임되어 있는 상황인가요? 아니면 변호인을 찾으셔야 하는 상황인가요?\n" +
      '\n' +
      '이러한 정보를 좀 더 명확히 설명해주시면, 사건에 대한 더 정확한 이해와 적절한 조언을 드릴 수 있을 것 같습니다.'
  });

  //그래프 끝

  const messagesEndRef = useRef(null); // 새로운 ref. 채팅창 스크롤 자동 최신화 위함.

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
      setMessages(prevMessages => [...prevMessages, { text: data['results'], sender:'lawyer' }]);
      console.log(messages);
      console.log('응답은');
      console.log(data);
      console.log('입력문은');
      console.log(userinput);
      setAnswerState(!answerState);

      // 그래프 시작
      setGraphdata(data['벌금']) // 서버에서 받아온 데이터 중 'graph' 키의 값을 그래프 데이터로 설정
      // 그래프 끝

      // const speech = new SpeechSynthesisUtterance(data);
      // window.speechSynthesis.speak(speech);
    } catch (error) {
      console.error(error);
    }
  };

  // messages에 새로운 답변이 추가될 때마다 음성 파일 재생
  useEffect(() => {
    const sound = new Howl({
      src: ['/answer.mp3'],
      autoplay: true,
      loop: false,
    });

    sound.play();
    return () => {
      sound.unload();
    };
  }, [answerState]);

  // 솔빈: 변호사 이미지 위에 말풍선 추가하는 구역입니다.
  // 변호사 메시지 표시 여부를 위한 새로운 state - setTimeout 관련
  // const [showLawyerMessage, setShowLawyerMessage] = useState(true);
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


  // 메시지 배열이 변경될 때마다 스크롤을 맨 아래로 이동시키는 useEffect
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // messages 배열이 변경될 때마다 실행


  // 변호사 메시지만 렌더링하는 함수
  const renderLawyerMessages = () => {
    return messages
      .filter(message => message.sender === 'lawyer')
      .map((message, index) => (
        <div key={index} className="bubble lawyer">
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


  // 채팅 박스 활성화/비활성화 부분
  const toggleChatbox = () => {
    setIsChatboxActive(!isChatboxActive);
  };

  // 채팅의 응답을 제출하는 부분. 이곳을 변경해서 변호사의 응답 부분을 화면에 표시되게 했습니다. 
  const submitResponse = () => {
    if (userInput.trim() !== "") {
      
      setMessages(prevMessages => [...prevMessages, { text: userInput, sender:'user' }]);
      chatbotChat(userInput)
      setUserInput(""); // 사용자 입력을 초기화
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
        {/* <audio controls autoplay>
          <source src='/answer.mp3' type='audio/mp3' />
        </audio> */}
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

      </div>

      {/* Chat Simulator */}
      <div className={`chat-container ${isChatboxActive ? 'expanded' : ''}`}>
        {/* 주디 이미지 */}  
        <img
          className="lawyer-image"
          src="/images/Judi_desk.png"
          alt="변호사"
          onClick={toggleChatbox} // 이벤트 핸들러
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
            <div ref={messagesEndRef} /> {/* 스크롤 조정을 위한 빈 div 추가 */}
          </div>

          {/* 입력창 및 버튼 관련 구역 */}
          <div className="chat-input-area">
            <input 
              type="text" 
              value={userInput}
              onChange={handleInputChange}
              placeholder="여기에 상담 내용을 입력해주세요."
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
            src="/images/chat_icon3.png"
            alt="Chat Icon"
            style={{ cursor: 'pointer', width: '60px', height: 'auto'  }}
          />
        </div>
      </div>

      {/* 음성 인식 텍스트 표시 */}
      {listening && <div className="transcript">상담 내용 확인: {transcript}</div>}

      {/* 그래프 */}
      <div style={{height:'500px', width:'600px', marginLeft:'50px'}}>
        <Graph1 graphdata={graphdata} />
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


