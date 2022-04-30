import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrevLoginHome from "./components/Home/PrevLoginHome";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import NextLoginHome from "./components/Home/NextLoginHome";
import "./App.css";

function App() {
  const user = localStorage.getItem("token");

  return (
    <>
      <Router>
        <Switch>
          {user ? (
            <Route path="/" exact component={NextLoginHome} />
          ) : (
            <Route path="/" exact component={PrevLoginHome} />
          )}
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
