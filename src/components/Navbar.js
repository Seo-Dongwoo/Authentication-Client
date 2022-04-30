import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Navbar() {
  const user = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              ChainLink
            </Link>
          </Typography>
          {user ? (
            <>
              <Button color="inherit" onClick={handleLogout}>
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                  로그아웃
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit">
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  로그인
                </Link>
              </Button>
              <Button color="inherit">
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  회원가입
                </Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
