import {
  Link,
  useNavigate,
} from "react-router-dom";
import React, { useState } from "react";
function Navigation({ project_ref, contact_ref }) {
  const navigate = useNavigate();
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
  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });

  // 스크롤 기능
  const handleClick = (menu) => {
    menu.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`navigation_bar ${showDropdown ? "dropdown" : ""}`}>
      <ul className={isDropdownVisible ? "show" : ""}>
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/try-judiai")}>Try JudiAI</li>
        <li onClick={() => handleClick(project_ref)}>Our Project</li>
        <li onClick={() => handleClick(contact_ref)}>Contact us</li>
      </ul>
      {/* 화면이 좁하질 때 토글 메뉴 생김 */}
      <div className="menu-toggle-background">
        <button className="menu-toggle" onClick={toggleDropdown}>
          <i className="fa fa-bars"></i>
        </button>
        {isDropdownVisible && (
          <ul className="menu-toggle-active">
            <a>
              <Link to="/">HOME</Link>
            </a>
            <a>
              <Link to="/try-judiai">Try JudiAI</Link>
            </a>
            <a href="#a">Our Project</a>
            <a href="#b">Contact us</a>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Navigation;
