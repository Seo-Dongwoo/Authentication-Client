import React, { useState, useEffect } from "react";
import "../css/UpdatePost.css";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";

const UpdatePost = () => {
  const { id } = useParams();
  const history = useHistory();

  const [post, setPost] = useState({
    name: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
    console.log(post);
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    const res = await axios.put(`http://localhost:3000/api/posts/${id}`, post);
    history.push("/");
    console.log(res);
  };

  const loadUser = async () => {
    const res = await axios.get(`http://localhost:3000/api/posts/${id}`);
    setPost(res);
  };

  return (
    <div className="form-container">
      <form className="form">
        <h1>게시글 변경</h1>
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
            onClick={(id) => updateHandler(id)}
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

export default UpdatePost;
