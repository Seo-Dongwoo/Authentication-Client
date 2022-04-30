import React from "react";
import Navbar from "../Navbar";
import PostList from "../Post/PostList";
import AddPost from "../Post/AddPost";
import UpdatePost from "../Post/UpdatePost";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const NextLoginHome = () => {
  return (
    <>
      <Navbar />
      <Router>
        <Switch>
          <Route path="/" exact component={PostList} />
          <Route path="/addpost" exact component={AddPost} />
          <Route path="/updatepost" exact component={UpdatePost} />
        </Switch>
      </Router>
    </>
  );
};

export default NextLoginHome;
