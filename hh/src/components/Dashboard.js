import React, { useState, useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"; //음성 입력용
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import "../css/reset.css";
import "../css/bottom.css";
import "../css/top.css";
import "../css/center.css";
import "../css/judi_chat.css";
import "../css/dashboard.css";
import LookAhead from "../gifs/judi_animation_eye_blink.gif"; // 애니매이션 gif(정면보기)
import Talking from "../gifs/judi_talking.gif"; // 애니매이션 gif(말하기)
import Loading from "../gifs/loading.gif"; // 애니매이션 gif(채팅 로딩)
import { Howl } from "howler";
import Graph1 from "../graph1";
import Graph2 from "../graph2";
import Clock from "./Clock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
// 솔빈 작업 구역
// 대화 저장을 위한 구역
function downloadToFile(content, filename, contentType) {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });

  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();

  URL.revokeObjectURL(a.href);
}

// 주디의 대화를 위한 구역
function Dashboard() {
  const [messages, setMessages] = useState([
    { text: "안녕하세요, 어떤 도움이 필요하신가요?", sender: "lawyer" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [answerState, setAnswerState] = useState(false);
  const navigate = useNavigate();
  const [graphdata, setGraphdata] = useState({
    징역: {
      "2년": 10,
      "5년": 20,
      "3년": 10,
      "4년": 20,
      "6년": 22,
    },
    금고: { "2년": 10, "5년": 20 },
    벌금: { "2년": 10, "5년": 20 },
    집행유예: { "2년": 10, "5년": 20 },
    사회봉사: { "2년": 10, "5년": 20 },
    성폭력_치료프로그램: { "2년": 10, "5년": 20 },
    피고인_정보공개: { "2년": 10, "5년": 20 },
    아동_청소년_장애인복지시설_취업제한: { "2년": 10, "5년": 20 },
    준법운전강의: { "2년": 10, "5년": 20 },
    results: "",
  });

  // 그래프 활성화/비활성화 부분
  const [isGraphActive, setIsGraphActive] = useState(false);
  const clickGraph = () => {
    setIsGraphActive(!isGraphActive);
  };
  // 상세 그래프 활성화/비활성화 부분
  const [isDetailGraph, setIsDetailGraph] = useState(false);
  const clickDetailGraph = () => {
    setIsDetailGraph(!isDetailGraph);
  };
  // 현재 시간 표시
  const today = new Date();

  const messagesEndRef = useRef(null); // 새로운 ref. 채팅창 스크롤 자동 최신화 위함.
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const [isFianl, setIsFianl] = useState(false); // 마지막 대답 여부

  // 현호 작업구역
  // 검색 test

  // 서버로 데이터를 전송하고 받는 함수
  const chatbotChat = async (userinput) => {
    setIsLoading(true); // (주의) 로딩 표시 관련 기능 시작
    const chatdata = { chat: userinput };

    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatdata),
      });
      const data = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data["results"], sender: "lawyer" },
      ]);
      if (!data["final_text"]) {
        setIsFianl(false);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data["final_text"], sender: "lawyer" },
        ]);
        setIsFianl(true);
      }
      console.log("입력문은");
      console.log(userinput);
      console.log("응답은");
      console.log(data);
      setAnswerState(!answerState);

      // 그래프 시작
      setGraphdata(data); // 서버에서 받아온 데이터 중 'graph' 키의 값을 그래프 데이터로 설정
      // 그래프 끝

      setIsLoading(false); // (주의) 로딩 표시 관련 기능, 로딩 종료
    } catch (error) {
      console.error(error);
      setIsLoading(false); // (주의) 로딩 표시 관련 기능, 에러 시 로딩 종료
    }
  };

  // messages에 새로운 답변이 추가될 때마다 음성 파일 재생
  useEffect(() => {
    const sound = new Howl({
      src: ["/answer.mp3"],
      autoplay: true,
      loop: false,
    });

    sound.play();
    return () => {
      sound.unload();
    };
  }, [answerState]);

  // 메시지 배열이 변경될 때마다 스크롤을 맨 아래로 이동시키는 useEffect
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages]); // messages 배열이 변경될 때마다 실행

  // 채팅의 응답을 제출하는 부분. 이곳을 변경해서 변호사의 응답 부분을 화면에 표시되게 했습니다.
  const submitResponse = () => {
    if (userInput.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: userInput, sender: "user" },
      ]);
      chatbotChat(userInput);
      setUserInput("".replace("\n", "")); // 사용자 입력을 초기화
    }
  };

  // input 값 변경 처리
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // 메시지 배열을 기반으로 UI 렌더링
  const renderMessages = messages.map((message, index) => (
    <div
      key={index}
      className={`message-container ${message.sender}-container`}
    >
      <div className={`bubble ${message.sender}`}>
        {message.text.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
    </div>
  ));

  //저장 버튼을 누르면 저장되는 부분을 위한 수정.
  const saveChatHistory = () => {
    const messagesAsString = messages
      .map((m) => `${m.sender}: ${m.text}`)
      .join("\n");
    downloadToFile(messagesAsString, "chat_history.txt", "text/plain");
  };

  // 음성 인식을 위한 state와 함수들
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  // 음성 인식을 시작하는 함수
  const startListening = () => {
    resetTranscript(); // 음성 인식 텍스트 초기화
    setUserInput(""); // 입력 필드 초기화
    SpeechRecognition.startListening({ continuous: true });
  };
  // 음성 인식을 중지하는 함수
  const stopListening = () => {
    SpeechRecognition.stopListening();
    setUserInput(transcript); // 음성 인식 결과를 userInput에 설정
  };

  const resetMessages = () => {
    setMessages([
      { text: "안녕하세요, 어떤 도움이 필요하신가요?", sender: "lawyer" },
    ]);
  };

  //리턴 영역 시작
  return (
    <div>
      {/* Top */}
      <div className="top">
        <div className="logo" onClick={() => navigate("/")}>
          <p>JudiAI</p>
        </div>
        <div className="app-header-right">
          <button className="mode-switch" title="Switch Theme">
            <svg
              className="moon"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <defs></defs>
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
            </svg>
          </button>
          <button className="add-btn" title="Add New Project">
            <svg
              className="btn-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <button className="notification-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-bell"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          <button className="profile-btn">
            <img
              className="profile-image"
              src={process.env.PUBLIC_URL + "images/현우프로필.jpg"}
              alt="프로필이미지"
            />
            {/* 이 버튼은 오른쪽 상단의 로그인한 사람 이미지 버튼입니다. */}
            <span>김현우</span>
          </button>
        </div>
      </div>

      {/* 대쉬보드 전체를 담고 있는 컨테이너 입니다. */}
      <div className="app-container">
        {/* 대쉬보드 밖 상단의 내용입니다. */}
        <div className="app-header">
          <div className="app-header-left">
            <span className="app-icon"></span>
            {/* <p className="app-name">Portfolio</p> */}
          </div>
        </div>

        {/* app-content와 메세지 섹션 구역 */}
        <div className="main-container">
          {/* //대쉬보드 판 영역입니다. */}
          <div className="app-content">
            {/* 대쉬보드 왼쪽 옆의 사이드 바 부분입니다. */}
            <div className="app-sidebar">
              <a href="" className="app-sidebar-link active">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-home"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </a>
              <a href="" className="app-sidebar-link">
                <svg
                  className="link-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <defs />
                  <path d="M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z" />
                </svg>
              </a>
              <a href="" className="app-sidebar-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-calendar"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </a>
              <a href="" className="app-sidebar-link">
                <svg
                  className="link-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <defs />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
              </a>
            </div>
            {/* 대쉬보드 안의 내용을 담는 영역입니다. */}
            <div
              className={`projects-section ${
                isDetailGraph ? "detail_page" : "default_page"
              }`}
            >
              {isDetailGraph ? (
                <div className="detail_graph">
                  {/* 상세페이지 영역 */}
                  {/* 징역 */}
                  {graphdata["징역"] &&
                    Object.keys(graphdata["징역"]).length > 0 && (
                      <div className="graph">
                        <div className="graph_title">
                          <span>징역</span>
                        </div>
                        <div className="realgraph_container">
                          <div className="bar_style">
                            <Graph1 graphdata={graphdata["징역"]} />
                          </div>
                          <div className="pie_style">
                            <Graph2 graphdata={graphdata["징역"]} />
                          </div>
                        </div>
                      </div>
                    )}
                  <div className="dashed-line"></div>
                  {/* 금고 */}
                  {graphdata["금고"] &&
                    Object.keys(graphdata["금고"]).length > 0 && (
                      <div className="graph">
                        <div className="graph_title">
                          <span>금고</span>
                        </div>
                        <div className="realgraph_container">
                          <div className="bar_style">
                            <Graph1 graphdata={graphdata["금고"]} />
                          </div>
                          <div className="pie_style">
                            <Graph2 graphdata={graphdata["금고"]} />
                          </div>
                        </div>
                      </div>
                    )}
                  <div className="dashed-line"></div>
                  {/* 벌금 */}
                  {graphdata["벌금"] &&
                    Object.keys(graphdata["벌금"]).length > 0 && (
                      <div className="graph">
                        <div className="graph_title">
                          <span>벌금</span>
                        </div>
                        <div className="realgraph_container">
                          <div className="bar_style">
                            <Graph1 graphdata={graphdata["벌금"]} />
                          </div>
                          <div className="pie_style">
                            <Graph2 graphdata={graphdata["벌금"]} />
                          </div>
                        </div>
                      </div>
                    )}
                  <div className="dashed-line"></div>
                  {/* 집행유예 */}
                  {graphdata["집행유예"] &&
                    Object.keys(graphdata["집행유예"]).length > 0 && (
                      <div className="graph">
                        <div className="graph_title">
                          <span>집행유예</span>
                        </div>
                        <div className="realgraph_container">
                          <div className="bar_style">
                            <Graph1 graphdata={graphdata["집행유예"]} />
                          </div>
                          <div className="pie_style">
                            <Graph2 graphdata={graphdata["집행유예"]} />
                          </div>
                        </div>
                      </div>
                    )}
                  <div className="dashed-line"></div>
                  {/* 사회봉사 */}
                  {graphdata["사회봉사"] &&
                    Object.keys(graphdata["사회봉사"]).length > 0 && (
                      <div className="graph">
                        <div className="graph_title">
                          <span>사회봉사</span>
                        </div>
                        <div className="realgraph_container">
                          <div className="bar_style">
                            <Graph1 graphdata={graphdata["사회봉사"]} />
                          </div>
                          <div className="pie_style">
                            <Graph2 graphdata={graphdata["사회봉사"]} />
                          </div>
                        </div>
                      </div>
                    )}
                  <div className="dashed-line"></div>
                  {/* 성폭력_치료프로그램 */}
                  {graphdata["성폭력_치료프로그램"] &&
                    Object.keys(graphdata["성폭력_치료프로그램"]).length >
                      0 && (
                      <div className="graph">
                        <div className="graph_title">
                          <span>성폭력 치료프로그램</span>
                        </div>
                        <div className="realgraph_container">
                          <div className="bar_style">
                            <Graph1
                              graphdata={graphdata["성폭력_치료프로그램"]}
                            />
                          </div>
                          <div className="pie_style">
                            <Graph2
                              graphdata={graphdata["성폭력_치료프로그램"]}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  <div className="dashed-line"></div>
                  {/* 피고인_정보공개 */}
                  {graphdata["피고인_정보공개"] &&
                    Object.keys(graphdata["피고인_정보공개"]).length > 0 && (
                      <div className="graph">
                        <div className="graph_title">
                          <span>피고인 정보공개</span>
                        </div>
                        <div className="realgraph_container">
                          <div className="bar_style">
                            <Graph1 graphdata={graphdata["피고인_정보공개"]} />
                          </div>
                          <div className="pie_style">
                            <Graph2 graphdata={graphdata["피고인_정보공개"]} />
                          </div>
                        </div>
                      </div>
                    )}
                  <div className="dashed-line"></div>
                  {/* 아동_청소년_장애인복지시설_취업제한 */}
                  {graphdata["아동_청소년_장애인복지시설_취업제한"] &&
                    Object.keys(
                      graphdata["아동_청소년_장애인복지시설_취업제한"]
                    ).length > 0 && (
                      <div className="graph">
                        <div className="graph_title">
                          <span>아동 청소년 장애인복지시설 취업제한</span>
                        </div>
                        <div className="realgraph_container">
                          <div className="bar_style">
                            <Graph1
                              graphdata={
                                graphdata["아동_청소년_장애인복지시설_취업제한"]
                              }
                            />
                          </div>
                          <div className="pie_style">
                            <Graph2
                              graphdata={
                                graphdata["아동_청소년_장애인복지시설_취업제한"]
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  <div className="dashed-line"></div>
                  {/* 준법운전강의 */}
                  {graphdata["준법운전강의"] &&
                    Object.keys(graphdata["준법운전강의"]).length > 0 && (
                      <div className="graph">
                        <div className="graph_title">
                          <span>준법운전강의</span>
                        </div>
                        <div className="realgraph_container">
                          <div className="bar_style">
                            <Graph1 graphdata={graphdata["준법운전강의"]} />
                          </div>
                          <div className="pie_style">
                            <Graph2 graphdata={graphdata["준법운전강의"]} />
                          </div>
                        </div>
                      </div>
                    )}
                  <div className="dashed-line"></div>
                </div>
              ) : (
                <div>
                  {/* 대쉬보드 안쪽 상단 영역입니다. */}
                  <div className="projects-section-left-header">
                    <span className="title">It's our tasks for you</span>
                    {/* 현재 날짜 표시 */}
                    <span className="time">
                      <Clock today={today} />
                    </span>
                  </div>
                  {/* Chat Simulator */}
                  <div className={"chat-container expanded"}>
                    {/* 주디 이미지 */}
                    <img
                      className={"lawyer-image"}
                      src={LookAhead}
                      alt="변호사"
                    />

                    {/* 음성 인식 & 전송 저장 버튼 */}
                    {listening ? (
                      <img
                        className="voice-button"
                        src="/images/stop_icon.png"
                        alt="녹음 중지"
                        onClick={stopListening}
                        style={{ width: "30px", height: "30px" }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faMicrophone}
                        className="voice-button"
                        alt="녹음 시작"
                        onClick={startListening}
                        style={{
                          width: "30px",
                          height: "30px",
                          color: "#ffffff",
                        }}
                      />
                    )}

                    {/* // 챗 박스 관련 구역 */}
                    <div id="chatbox">
                      {/* 채팅 메시지를 표시하는 부분 */}
                      <div className="chat-messages">
                        {renderMessages}
                        {isLoading ? (
                          <div className={"bubble lawyer"}>
                            <img
                              className="loading-chat-image"
                              src={Loading}
                              alt="로딩이미지"
                            />
                          </div>
                        ) : (
                          <></>
                        )}
                        {isFianl ? (
                          <div className={"bubble lawyer"}>
                            <button onClick={clickGraph}> 클릭 </button>
                          </div>
                        ) : (
                          <></>
                        )}
                        <div ref={messagesEndRef}></div>
                        {/* 스크롤 조정을 위한 빈 div 추가 */}
                      </div>

                      {/* 입력창 및 버튼 관련 구역 */}
                      <div className="chat-input-area">
                        <textarea
                          id="input-area"
                          type="text"
                          value={userInput}
                          onChange={handleInputChange}
                          placeholder="여기에 상담 내용을 입력해주세요."
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              submitResponse();
                            }
                          }}
                        ></textarea>

                        <div className="voice-control-buttons">
                          <img
                            src="/images/reset_icon.png"
                            alt="리셋"
                            onClick={resetMessages}
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
                  </div>

                  {/* 음성 인식 텍스트 표시 */}
                  {listening && (
                    <div className="transcript">
                      상담 내용 확인: {transcript}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* //대쉬보드 판 옆의 다른 박스 부분입니다. */}

          <div
            className={`messages-section ${
              isGraphActive ? "graph_page" : "lawyer_page"
            }`}
          >
            {/* 변호사, 그래프 페이지 전환 */}
            {isGraphActive ? (
              <div>
                {/* 그래프 페이지*/}
                <div className="projects-section-header">
                  <div className="left">
                    <p>통계</p>
                    <p className="message-line">
                      당신의 사례와 유사한 통계 결과를 보여드립니다.
                    </p>
                  </div>
                  <div className="detail_graph_button_container">
                    <button
                      className="detail_graph_button"
                      onClick={clickDetailGraph}
                    >
                      자세히 보기
                    </button>
                  </div>
                </div>

                <div className="graph_content_container">
                  {graphdata["징역"] &&
                    Object.keys(graphdata["징역"]).length > 0 && (
                      <div className="graph">
                        <div className="dashtest">
                          <div className="graph-dashed-line"></div>
                          <span className="graph_title">징역</span>
                        </div>
                        <div className="bar_style">
                          <Graph1
                            graphdata={graphdata["징역"]}
                            graphType="징역"
                          />
                        </div>
                        <div className="pie_style">
                          <Graph2
                            graphdata={graphdata["징역"]}
                            graphType="징역"
                          />
                        </div>
                      </div>
                    )}
                  {graphdata["금고"] &&
                    Object.keys(graphdata["금고"]).length > 0 && (
                      <div className="graph">
                        <div className="dashtest">
                          <div className="graph-dashed-line"></div>
                          <span className="graph_title">금고</span>
                        </div>
                        <div className="bar_style">
                          <Graph1 graphdata={graphdata["금고"]} />
                        </div>
                        <div className="pie_style">
                          <Graph2 graphdata={graphdata["금고"]} />
                        </div>
                      </div>
                    )}
                  {graphdata["벌금"] &&
                    Object.keys(graphdata["벌금"]).length > 0 && (
                      <div className="graph">
                        <div className="dashtest">
                          <div className="graph-dashed-line"></div>
                          <span className="graph_title">벌금</span>
                        </div>
                        <div className="bar_style">
                          <Graph1 graphdata={graphdata["벌금"]} />
                        </div>
                        <div className="pie_style">
                          <Graph2 graphdata={graphdata["벌금"]} />
                        </div>
                      </div>
                    )}
                  {graphdata["집행유예"] &&
                    Object.keys(graphdata["집행유예"]).length > 0 && (
                      <div className="graph">
                        <div className="dashtest">
                          <div className="graph-dashed-line"></div>
                          <span className="graph_title">집행유예</span>
                        </div>
                        <div className="bar_style">
                          <Graph1 graphdata={graphdata["집행유예"]} />
                        </div>
                        <div className="pie_style">
                          <Graph2 graphdata={graphdata["집행유예"]} />
                        </div>
                      </div>
                    )}
                  {graphdata["사회봉사"] &&
                    Object.keys(graphdata["사회봉사"]).length > 0 && (
                      <div className="graph">
                        <div className="dashtest">
                          <div className="graph-dashed-line"></div>
                          <span className="graph_title">사회봉사</span>
                        </div>
                        <div className="bar_style">
                          <Graph1 graphdata={graphdata["사회봉사"]} />
                        </div>
                        <div className="pie_style">
                          <Graph2 graphdata={graphdata["사회봉사"]} />
                        </div>
                      </div>
                    )}
                  {graphdata["성폭력_치료프로그램"] &&
                    Object.keys(graphdata["성폭력_치료프로그램"]).length >
                      0 && (
                      <div className="graph">
                        <div className="dashtest">
                          <div className="graph-dashed-line"></div>
                          <span className="graph_title">
                            성폭력 치료프로그램
                          </span>
                        </div>
                        <div className="bar_style">
                          <Graph1
                            graphdata={graphdata["성폭력_치료프로그램"]}
                          />
                        </div>
                        <div className="pie_style">
                          <Graph2
                            graphdata={graphdata["성폭력_치료프로그램"]}
                          />
                        </div>
                      </div>
                    )}
                  {graphdata["피고인_정보공개"] &&
                    Object.keys(graphdata["피고인_정보공개"]).length > 0 && (
                      <div className="graph">
                        <div className="dashtest">
                          <div className="graph-dashed-line"></div>
                          <span className="graph_title">피고인 정보공개</span>
                        </div>
                        <div className="bar_style">
                          <Graph1 graphdata={graphdata["피고인_정보공개"]} />
                        </div>
                        <div className="pie_style">
                          <Graph2 graphdata={graphdata["피고인_정보공개"]} />
                        </div>
                      </div>
                    )}
                  {graphdata["아동_청소년_장애인복지시설_취업제한"] &&
                    Object.keys(
                      graphdata["아동_청소년_장애인복지시설_취업제한"]
                    ).length > 0 && (
                      <div className="graph">
                        <div className="dashtest">
                          <div className="graph-dashed-line"></div>
                          <span className="graph_title">
                            아동 청소년 장애인복지시설_취업제한
                          </span>
                        </div>
                        <div className="bar_style">
                          <Graph1
                            graphdata={
                              graphdata["아동_청소년_장애인복지시설_취업제한"]
                            }
                          />
                        </div>
                        <div className="pie_style">
                          <Graph2
                            graphdata={
                              graphdata["아동_청소년_장애인복지시설_취업제한"]
                            }
                          />
                        </div>
                      </div>
                    )}
                  {graphdata["준법운전강의"] &&
                    Object.keys(graphdata["준법운전강의"]).length > 0 && (
                      <div className="graph">
                        <div className="dashtest">
                          <div className="graph-dashed-line"></div>
                          <span className="graph_title">준법운전강의</span>
                        </div>
                        <div className="bar_style">
                          <Graph1 graphdata={graphdata["준법운전강의"]} />
                        </div>
                        <div className="pie_style">
                          <Graph2 graphdata={graphdata["준법운전강의"]} />
                        </div>
                      </div>
                    )}
                </div>
              </div>
            ) : (
              <div>
                {/* 변호사 소개 페이지 */}

                <div className="projects-section-header">
                  <p>Lawyer</p>
                </div>

                <div className="messages">
                  <div className="message-box">
                    <img
                      src={process.env.PUBLIC_URL + "/images/lawyer1.png"}
                      alt="profile image"
                    />
                    <div className="message-content">
                      <div className="message-header">
                        <div className="name">이현호 변호사</div>
                        <div className="star-checkbox">
                          <input type="checkbox" id="star-1" />
                          <label for="star-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="feather feather-star"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          </label>
                        </div>
                      </div>
                      <p className="message-line">
                        법률의 미묘한 공간에서 창의적인 아이디어로 고객의 문제를
                        해결하는 변호사입니다.
                      </p>
                    </div>
                  </div>
                  <div className="message-box">
                    <img
                      src={process.env.PUBLIC_URL + "/images/lawyer2.png"}
                      alt="profile image"
                    />
                    <div className="message-content">
                      <div className="message-header">
                        <div className="name">강솔빈 변호사</div>
                        <div className="star-checkbox">
                          <input type="checkbox" id="star-2" />
                          <label for="star-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="feather feather-star"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          </label>
                        </div>
                      </div>
                      <p className="message-line">
                        법정에서의 경험으로 뒷받침된, 탁월한 수사&재판 전문
                        변호사입니다.
                      </p>
                    </div>
                  </div>
                  <div className="message-box">
                    <img
                      src={process.env.PUBLIC_URL + "/images/lawyer3.png"}
                      alt="profile image"
                    />
                    <div className="message-content">
                      <div className="message-header">
                        <div className="name">김설 변호사</div>
                        <div className="star-checkbox">
                          <input type="checkbox" id="star-3" />
                          <label for="star-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="feather feather-star"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          </label>
                        </div>
                      </div>
                      <p className="message-line">
                        당신의 이익을 최우선으로 고려하는 변호사. 언제나 당신의
                        편에서 싸웁니다.
                      </p>
                    </div>
                  </div>
                  <div className="message-box">
                    <img
                      src={process.env.PUBLIC_URL + "/images/lawyer4.png"}
                      alt="profile image"
                    />
                    <div className="message-content">
                      <div className="message-header">
                        <div className="name">최연주 변호사</div>
                        <div className="star-checkbox">
                          <input type="checkbox" id="star-4" />
                          <label for="star-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="feather feather-star"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          </label>
                        </div>
                      </div>
                      <p className="message-line">
                        당신의 선택에 후회가 없도록 형사와 이혼 분야에서 강력한
                        전문 지식을 가진 변호사.
                      </p>
                    </div>
                  </div>
                  <div className="message-box">
                    <img
                      src={process.env.PUBLIC_URL + "/images/lawyer5.png"}
                      alt="profile image"
                    />
                    <div className="message-content">
                      <div className="message-header">
                        <div className="name">박성연 변호사</div>
                        <div className="star-checkbox">
                          <input type="checkbox" id="star-5" />
                          <label for="star-5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="feather feather-star"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          </label>
                        </div>
                      </div>
                      <p className="message-line">
                        사람 중심의 변호사로, 투명하고 신뢰성 있는 법률 서비스를
                        제공합니다.
                      </p>
                    </div>
                  </div>
                  <div className="message-box">
                    <img
                      src={process.env.PUBLIC_URL + "/images/lawyer6.png"}
                      alt="profile image"
                    />
                    <div className="message-content">
                      <div className="message-header">
                        <div className="name">노건국 변호사</div>
                        <div className="star-checkbox">
                          <input type="checkbox" id="star-6" />
                          <label for="star-6">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="feather feather-star"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          </label>
                        </div>
                      </div>
                      <p className="message-line">
                        법과 인간의 이해관계를 높이 살펴보는 변호사로, 따뜻한
                        소통으로 신뢰를 쌓습니다.
                      </p>
                    </div>
                  </div>
                  <div className="message-box">
                    <img
                      src={process.env.PUBLIC_URL + "/images/lawyer7.png"}
                      alt="profile image"
                    />
                    <div className="message-content">
                      <div className="message-header">
                        <div className="name">강철리 변호사</div>
                        <div className="star-checkbox">
                          <input type="checkbox" id="star-7" />
                          <label for="star-7">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="feather feather-star"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          </label>
                        </div>
                      </div>
                      <p className="message-line">
                        [경력 10년차/이혼, 상속, 성범죄 전문] 고객의 어려움을
                        이해하며 최상의 해결책을 제시합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
