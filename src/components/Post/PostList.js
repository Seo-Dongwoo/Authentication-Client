import React, { useEffect, useState } from "react";
import "../css/PostList.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ListGroup, ListGroupItem, Button } from "reactstrap";

const PostList = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const response = await axios.get("http://localhost:3000/api/posts");
    if (response.status === 200) {
      setPostList(response.data);
    }
  };

  const deletePosts = async (_id) => {
    if (window.confirm("게시물을 지우겠습니까?")) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/posts/${_id}`
        );
        console.log(response);
        if (response.status === 200) {
          toast.success(response.data);
          getPosts();
        }
      } catch (error) {
        if (error.response.status === 400) {
          toast.error(error.response.data);
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="post-header">
        <h1 className="post-title">게시판</h1>
      </div>
      <div className="items-category">
        <p className="category-name">이름</p>
        <p className="category-name">제목</p>
        <p className="category-name">내용</p>
        <p className="category-name">변경 및 삭제</p>
      </div>
      <ListGroup className="post-container ">
        {postList &&
          postList.map((data) => {
            return (
              <ListGroupItem className="items" key={data._id}>
                <strong className="item">{data.name}</strong>
                <strong className="item">{data.title}</strong>
                <strong className="item">{data.description}</strong>
                <div className="btn-container">
                  <Link className="update-link" to={`/updatepost/${data._id}`}>
                    변경
                  </Link>
                  <Button
                    className="delete-button"
                    onClick={() => deletePosts(data._id)}
                  >
                    삭제
                  </Button>
                </div>
              </ListGroupItem>
            );
          })}
      </ListGroup>
      <div className="post-footer">
        <button className="add-button">
          <Link to="/addpost" className="add-link">
            등록
          </Link>
        </button>
      </div>
    </div>
  );
};

export default PostList;
