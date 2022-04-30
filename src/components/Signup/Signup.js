import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "../css/Signup.css";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors(validate(data));
    setIsSubmit(true);
    const { name, email, password, confirmPassword } = data;
    if (name && email && password && password === confirmPassword) {
      await axios
        .post("http://localhost:3000/api/user/register", data)
        .then((res) => {
          history.push("/login");
        });
    } else {
      alert("에러");
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "이름을 입력하세요.";
    }
    if (!values.email) {
      errors.email = "이메일을 입력하세요.";
    } else if (!regex.test(values.email)) {
      errors.email = "이메일 형식이 아닙니다.";
    }
    if (!values.password) {
      errors.password = "비밀번호를 입력하세요.";
    } else if (values.password.length < 6) {
      errors.password = "비밀번호는 최소 6자리 이상 필수";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "비밀번호를 입력하세요.";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "비밀번호가 다릅니다.";
    }
    return errors;
  };

  return (
    <div className="form-content">
      <form className="form">
        <h1>회원가입</h1>
        <div className="form-inputs">
          <label htmlFor="name" className="form-label">
            이름
          </label>
          <input
            name="name"
            value={data.name}
            required
            onChange={handleChange}
            placeholder="이름을 입력하세요."
            type="text"
            className="form-input"
          />
          <p>{formErrors.name}</p>
        </div>
        <div className="form-inputs">
          <label htmlFor="email" className="form-label">
            이메일
          </label>
          <input
            name="email"
            value={data.email}
            required
            onChange={handleChange}
            placeholder="이메일을 입력하세요."
            type="text"
            className="form-input"
          />
          <p>{formErrors.email}</p>
        </div>
        <div className="form-inputs">
          <label htmlFor="password" className="form-label">
            비밀번호
          </label>
          <input
            name="password"
            value={data.password}
            required
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요."
            type="password"
            className="form-input"
          />
          <p>{formErrors.password}</p>
        </div>
        <div className="form-inputs">
          <label htmlFor="confirmPassword" className="form-label">
            비밀번호 재확인
          </label>
          <input
            name="confirmPassword"
            value={data.confirmPassword}
            required
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요."
            type="password"
            className="form-input"
          />
          <p>{formErrors.confirmPassword}</p>
        </div>
        <div className="form-btn">
          <button
            type="submit"
            className="form-input-btn"
            onClick={handleSubmit}
          >
            회원가입
          </button>
          <button className="form-input-btn">
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              취소
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
