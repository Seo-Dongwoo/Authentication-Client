# authentication Client
## 프로젝트 목적 및 설명
* ### 목적
  * Server와 DataBase를 연결하여 로그인 로그아웃 app 구현
  * 로그인한 유저의 게시물 CRUD 기능 구현
* ### 설명
  * #### 로그인 페이지
    * 
  * #### 회원가입 페이지
  
개발 기간 및 사용 기술
---
- 개발 기간 : 20222.04.20 ~ 2022.05.04 (약 2주)
- 사용 기술 : Javascript, React, Material-UI, Axios

집중적으로 공부 한 것
---
- Axios를 이용하여 서버와의 통신
- useState와 useEffect를 사용한 상태관리
- Router를 이용한 페이지 이동
- 로그인하면 token을 갖고 로그아웃하면 token을 삭제
- 게시물 CRUD

경험했던 문제점
---
- 서버 API 통신의 문제점..😥 하지만 데이터의 id 값을 정확하게 받아와서 문제점 극복
```
 const updateHandler = async (e) => {
    e.preventDefault();
    const res = await axios.put(`http://localhost:3000/api/posts/${id}`, post);
    history.push("/");
    console.log(res);
  };
```

- token을 갖고 있는 경우와 갖고 있지 않는 경우를 나누는 부분에서 어려움을 겪었지만 로그인 했을 경우는 localStorage에 token을 저장하고 로그아웃하면 token을 localStorage에서 지웠다.
```
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
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              ChainLink
            </Link>
          </Typography>
          {user ? (
            <>
              <Button color="inherit" onClick={handleLogout}>
                <Link style={{ textDecoration: "none", color: "white" }}>
                  로그아웃
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit">
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  로그인
                </Link>
              </Button>
              <Button color="inherit">
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "white" }}
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
```

- 회원가입과 로그인 할 경우 유효성 검사하는 부분에서 어떻게 더 처리해야 사용자 입장에서 보기 편하고 이용하기 편할지 많이 고려했다.
```
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
```

배포
---
https://fabulous-caramel-1386d3.netlify.app
