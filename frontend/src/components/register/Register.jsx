import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    aadhar: "",
  });
  let name, value;

  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, mobile, password, aadhar } = user;
    if (
      name === "" ||
      email === "" ||
      mobile === "" ||
      password === "" ||
      aadhar === ""
    ) {
      alert("Fill in all the fields");
      history.push("/signup");
    } else {
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          mobile,
          password,
          aadhar,
        }),
      });

      const data = await res.json();
      if (res.status === 422 || !data) {
        window.alert("User already exists.Try logging in");
        history.push("/signin");
      } else {
        window.alert("Registration Successfull");
        history.push("/signin");
      }
    }
  };

  return (
    <>
      <Container>
        <Form>
          <form method="POST">
            <div className="head">Register</div>

            <div className="name">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your Name"
                value={user.name}
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div className="mobile">
              <label htmlFor="mobile">Mobile Number</label>
              <input
                type="number"
                name="mobile"
                id="mobile"
                placeholder="Enter your Mobile Number"
                value={user.mobile}
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="name"
                placeholder="Enter your email address"
                value={user.email}
                onChange={(e) => handleInput(e)}
              />
            </div>

            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your Password"
                value={user.password}
                onChange={(e) => handleInput(e)}
              />
            </div>

            <div className="aadhar">
              <label htmlFor="aadhar">Aadhar Number</label>
              <input
                type="text"
                name="aadhar"
                id="aadhar"
                placeholder="Enter your aadhar number"
                value={user.aadhar}
                onChange={(e) => handleInput(e)}
              />
            </div>

            <button type="submit" onClick={PostData}>
              Register
            </button>
          </form>
        </Form>
      </Container>
    </>
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
    .email,
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
