import { useState } from "react";
import '../css/center.css';
function UserForm() {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    // 제출 버튼 눌렀을 때 이벤트
    const handleSubmit = e => {
        alert('제출되었습니다.');
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="input_mail">
                <input placeholder="e-Mail" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input_subject">
                <input placeholder="Subject" onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div className="input_message">
                <input placeholder="Message" onChange={(e) => setMessage(e.target.value)} />
            </div>
            <button type="submit">Submit</button>
        </form>);
}

export default UserForm;
