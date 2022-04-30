import React from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

const PrevLoginHome = () => {
  return (
    <>
      <Navbar />
      <div className="MainContent">
        <h2>로그인 후 이용 가능합니다.</h2>
        <p>
          <Link to="/signup" style={{ textDecoration: "none", color: "black" }}>
            ID가 없으신가요 ?
          </Link>
        </p>
      </div>
    </>
  );
};

export default PrevLoginHome;
