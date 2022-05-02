import React, { useState } from "react";
import "../css/AddPost.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const AddPost = () => {
  const [data, setData] = useState({
    name: "",
    title: "",
    description: "",
  });

  const [isSubmit, setIsSubmit] = useState(false);

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmit(true);
    const { name, title, description } = data;
    if (name && title && description) {
      await axios.post("http://localhost:3000/api/posts", data).then((res) => {
        history.push("/");
        console.log(res);
      });
    } else {
      alert("에러");
    }
  };

  return (
    <div className="form-container">
      <form className="form">
        <h1>게시글 추가</h1>
        <div className="form-inputs">
          <label htmlFor="name" className="form-label">
            닉네임
          </label>
          <input
            name="name"
            onChange={handleChange}
            required
            placeholder="닉네임을 입력하세요."
            type="text"
            className="form-input"
          />
        </div>
        <div className="form-inputs">
          <label htmlFor="title" className="form-label">
            제목
          </label>
          <input
            name="title"
            onChange={handleChange}
            required
            placeholder="제목을 입력하세요."
            type="text"
            className="form-input"
          />
        </div>
        <div className="form-inputs">
          <label htmlFor="내용" className="form-label">
            내용
          </label>
          <input
            name="description"
            onChange={handleChange}
            required
            placeholder="내용를 입력하세요."
            type="text"
            className="form-input-description"
          />
        </div>
        <div className="form-btn">
          <button
            type="submit"
            className="form-input-btn"
            onClick={handleSubmit}
          >
            등록
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

export default AddPost;
