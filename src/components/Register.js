import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import styled from "styled-components";

const Login = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [mobileNo, setMobileNo] = useState(0);
  const [aadharNo, setAadharNo] = useState(0);
  const user = [name, pass, mobileNo, aadharNo];

  const PostData = async (e) => {
    e.preventDefault();

    const data = {
      name: user[0],
      password: user[1],
      mobileNo: user[2],
      aadharNo: user[3],
      party: null,
      voteStatus: false,
    };

    if (user[0] === "" || user[1] === "" || user[2] === "" || user[3] === "") {
      message.error("Fill in all the fields");
    } else {
      Axios.post(`${process.env.REACT_APP_API_URL}/register`, data)
        .then((res) => {
          if (res.status === 200) {
            message.success(
              "Registered successfully!",
              1.5,
              history.push("/signin")
            );
          } else {
            message.error("Failed to create an account. Please try again");
            Promise.reject();
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const reload = () => {
    history.push("/");
    window.location.reload();
  };

  return (
    <Container>
      <Form>
        <form method="POST">
          <div className="head">Register</div>
          <div className="name">
            <label htmlFor="name">Name</label>
            <input
              className="inputBox"
              type="text"
              name="name"
              id="name"
              placeholder="Enter your Name"
              value={user.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mobile">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              className="inputBox"
              type="number"
              name="mobile"
              id="mobile"
              placeholder="Enter your Mobile Number"
              value={user.mobile}
              onChange={(e) => setMobileNo(e.target.value)}
            />
          </div>

          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              className="inputBox"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your Password"
              value={user.password}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          <div className="aadhar">
            <label htmlFor="aadhar">Aadhar Number</label>
            <input
              className="inputBox"
              type="text"
              name="aadhar"
              id="aadhar"
              placeholder="Enter your aadhar number"
              value={user.aadhar}
              onChange={(e) => setAadharNo(e.target.value)}
            />
          </div>

          <button type="submit" onClick={PostData}>
            Register
          </button>
        </form>
      </Form>
    </Container>
  );
};

export default Login;
const Container = styled.div`
  height: 79vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.div`
  height: 80%;
  width: 30%;
  border-radius: 4px;
  box-shadow: 1px 1px 5px black;
  border: 2px solid black;
  padding: 2rem;

  @media all and (max-width: 1236px) {
    width: 40%;
  }

  @media all and (max-width: 1000px) {
    width: 50%;
  }

  @media all and (max-width: 900px) {
    width: 60%;
  }

  @media all and (max-width: 800px) {
    width: 70%;
  }
  @media all and (max-width: 700px) {
    width: 80%;
  }
  @media all and (max-width: 400px) {
    width: 90%;
    padding: 0;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    height: 100%;

    .password,
    .aadhar,
    .name,
    .mobile {
      display: flex;
      flex-direction: column;
      padding: 0px 2rem;
      input {
        height: 1.4rem;
      }
    }
    .head {
      height: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.8rem;
    }
  }

  button {
    margin: 0px 2rem;

    height: 2rem;
    background: rgba(0, 0, 0, 0.2);
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 4px;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
