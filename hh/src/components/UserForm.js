import { useState } from "react";
import "../css/center.css";
import "../css/contactus.css";
function UserForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // 제출 버튼 눌렀을 때 이벤트
  const handleSubmit = (e) => {
    alert("제출되었습니다.");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="contact-left">
        {/* 이메일 */}
        <div className="input_container">
          <p>Email</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </div>
        {/* 이름 */}
        <div className="input_container">
          <p>Name</p>
          <input type="text" onChange={(e) => setName(e.target.value)}></input>
        </div>
        {/* 전화번호 */}
        <div className="input_container">
          <p>Phone</p>
          <input type="tel" onChange={(e) => setPhone(e.target.value)}></input>
        </div>
      </div>
      <div className="contact-right">
        {/* 제목 */}
        <div className="input_container">
          <p>Subject</p>
          <input
            type="text"
            onChange={(e) => setSubject(e.target.value)}
            required
          ></input>
        </div>
        {/* 내용 */}
        <div className="input_container">
          <p>Message</p>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
      </div>

      <div className="button_container">
        <div className="contact_dashed_line"></div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default UserForm;
