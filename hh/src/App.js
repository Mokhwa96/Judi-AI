import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate} from 'react-router-dom';
import './css/reset.css';
import './css/bottom.css';
import './css/top.css';
import './css/center.css';
import UserForm from "./components/UserForm";
import Navigation from "./components/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import Dashboard from './components/Dashboard'; //대시보드 추가 내용입니다.

function Home() {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다
  // 스크롤 기능
  const project_ref = useRef(null); // Our Project로 스크롤
  const contact_ref = useRef(null); // Contact us로 스크롤
  const handleClick = () => {
    project_ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home">
      {/* Top */}
      <div className="top">
        <div className="logo" onClick={() => navigate("/")}>
          <p>JudiAI</p>
        </div>
        {/* 상단 메뉴 */}
        <Navigation project_ref={project_ref} contact_ref={contact_ref} />
      </div>

      {/* Center */}
      <div className="center">
        {/* 배경 이미지  */}
        <div className="center-background">
          <img
            src={process.env.PUBLIC_URL + "./images/background.jpg"}
            alt="AI 판사 배경 이미지"
            width={1200}
          />
          <span className="content-left">
            <p>당신의 법률 문제</p>
            <p>JudiAI와 함께</p>
            <p>해결하세요</p>
            <button
              className="Try_JudiAI"
              onClick={() => navigate("/try-judiai")}
            >
              Try JudiAI
            </button>
          </span>
          {/* 아래 화살표 아이콘 */}
          <FontAwesomeIcon
            className="faArrowCircleDown"
            onClick={handleClick}
            icon={faArrowCircleDown}
            style={{ color: "#ffffff" }}
            size="3x"
          />
        </div>

        {/* Our Project Start -- */}
        <div className="our_project" ref={project_ref}>
          <div className="dashed-line"></div>
          <h1>Our Project</h1>
          {/* 채팅 */}
          <div className="judiexplain">
            <div className="judi_white">
              <img
                src={process.env.PUBLIC_URL + "./images/Judi_desk.png"}
                alt="주디 이미지"
              />
            </div>
            <div className="chat_info">
              <span className="chatbubble">
                안녕하세요, 어떤 도움이 필요하신가요?
              </span>
            </div>
            <div className="chat_info2">
              <span className="chatbubble2">어쩌구 저쩌구한 내용</span>
            </div>
            <div className="chat_info3">
              <span className="chatbubble3">
                해당 사례에서는 1년 징역이 예상되지만, 2년 집행 유예 및 40시간의
                준법 교육 판결이 예측됩니다. 다만, 이는 예상 결과이며 실제
                판결과는 다를 수 있습니다.
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
            <p>
              우리의 인공지능 상담 서비스는 여러분의 상황과 유사한 법률 판례를
              분석하고, 대략적인 결과와 안내를 제공합니다.
            </p>
            <br></br>
            <p>
              변호사와의 상담을 고려하기 전에 JudiAI를 활용하여 법률 문제에 대한
              초기 답변을 얻어보세요.
            </p>
            <br></br>
            <p>
              당신의 법률 문제를 더 나은 방향으로 안내하는데 도움을 드릴
              것입니다.{" "}
            </p>
          </div>
        </div>
        {/* Our Project End -- */}

        {/* Contact us Start -- */}
        <div className="contact_us" ref={contact_ref}>
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
        <div
          className="container-fluid bg-primary text-white-50 py-5 px-sm-3 px-md-5"
          style={{ marginTop: "90px" }}
        >
          <div className="row pt-5">
            <div className="col-lg-3 col-md-6 mb-5">
              <a href="#" className="navbar-brand">
                <h1 className="m-0 mt-n2 text-white display-4">JudiAI</h1>
              </a>
              <p>
                JudiAI는 인공지능 법률 상담 서비스입니다.<br></br>여러분의
                상황과 유사한 법률 판례를 분석하고, 대략적인 결과를 제공합니다.
              </p>
            </div>
            <div className="col-lg-3 col-md-6 mb-5">
              <h4 className="text-uppercase text-white mb-4">Get In Touch</h4>
              <p>
                <i className="fa fa-map-marker-alt text-white mr-2"></i>
                광주광역시 동구 제봉로 92 (대성학원 1-3층)
              </p>
              <p>
                <i className="fa fa-phone-alt text-white mr-2"></i>+82 123 4567
              </p>
              <p>
                <i className="fa fa-envelope text-white mr-2"></i>
                mococo@gjaischool.com
              </p>
            </div>
            <div className="col-lg-3 col-md-6 mb-5">
              <h4 className="text-uppercase text-white mb-4">Quick Links</h4>
              <div className="d-flex flex-column justify-content-start">
                <a className="text-white-50 mb-2" href="#">
                  <i className="fa fa-angle-right text-white mr-2"></i>Home
                </a>
                <a
                  className="text-white-50 mb-2"
                  onClick={() => navigate("/try-judiai")}
                >
                  <i className="fa fa-angle-right text-white mr-2"></i>Try
                  JudiAI
                </a>
                <a className="text-white-50 mb-2" href="#">
                  <i className="fa fa-angle-right text-white mr-2"></i>Our
                  Services
                </a>
                <a className="text-white-50 mb-2" href="#">
                  <i className="fa fa-angle-right text-white mr-2"></i>Contact
                  us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 솔빈 작업 구역
// 주디에 대한 내용을 Dashboard 컴퍼넌트로 이동했습니다.
function TryJudiAI() {
  
  // 리턴 영역
  return (
    <div>
    {/* 대시보드 추가 */}
      <Dashboard />
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
