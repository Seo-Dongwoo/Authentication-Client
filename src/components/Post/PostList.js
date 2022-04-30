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
    <div className="ListContainer">
      <div className="ListHeader">
        <h1 className="PostTitle">게시판</h1>
        <button className="Add-btn">
          <Link to="/addpost">추가</Link>
        </button>
      </div>
      <ListGroup className="mt-4">
        {postList &&
          postList.map((data) => {
            return (
              <ListGroupItem
                className="d-flex"
                style={{ justifyContent: "space-between" }}
                key={data._id}
              >
                <strong style={{ paddingTop: "6px" }}>{data.name}</strong>
                <strong style={{ paddingTop: "6px" }}>{data.title}</strong>
                <strong style={{ paddingTop: "6px" }}>
                  {data.description}
                </strong>
                <div className="ml-auto">
                  <Link
                    className="btn btn-warning "
                    style={{ marginRight: "5px" }}
                    to="/updatepost"
                  >
                    변경
                  </Link>
                  <Button onClick={() => deletePosts(data._id)} color="danger">
                    삭제
                  </Button>
                </div>
              </ListGroupItem>
            );
          })}
      </ListGroup>
    </div>
  );
};

export default PostList;
