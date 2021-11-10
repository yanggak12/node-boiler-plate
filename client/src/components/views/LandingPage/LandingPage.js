import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function LandingPage() {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/api/hello")
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }, []);
  const onClickHandler = () => {
    axios.get("/api/user/logout").then((response) => {
      if (response.data.success) {
        navigate(-1);
      } else {
        alert("Fail to log out.");
      }
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      시작 페이지
      <button onClick={onClickHandler}>Log Out</button>
    </div>
  );
}

export default LandingPage;
