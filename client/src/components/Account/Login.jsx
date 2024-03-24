import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import {ToastContainer,toast} from 'react-toastify';

const loginInitialValues = {
  username: "",
  password: "",
};

const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};

const Login = ({ isUserAuthenticated }) => {
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, showError] = useState("");
  const [account, toggleAccount] = useState("login");

  const navigate = useNavigate();
  const { setAccount } = useContext(DataContext);

  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  useEffect(() => {
    showError(false);
  }, [login]);

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    let response = await API.userLogin(login);
    if (response.isSuccess) {
      showError("");

      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      setAccount({
        name: response.data.name,
        username: response.data.username,
      });
      toast.success("Login Successfull");
      isUserAuthenticated(true);
      setLogin(loginInitialValues);
      navigate("/");
    } else {
      toast.error("Something went wrong! please try again later");
      showError("Something went wrong! please try again later");
    }
  };

  const signupUser = async () => {
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      showError("");
      setSignup(signupInitialValues);
      toast.success("Signup Successfull");
      toggleAccount("login");
    } else {
      showError("Something went wrong! please try again later");
      toast.error("Something went wrong! please try again later");
    }
  };

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  return (
    <div className="bg-slate-800 w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl text-center w-full mb-4 mt-4 font-bold text-white px-3 py-3 font-shantell">
       Welcome to Blogify
        </h1>
      <div className="flex flex-col bg-gray-700 rounded-md shadow-md ">
        <div className="flex items-center justify-center p-8">
          {account === "login" ? (
            <div className="p-25">
              <input
                type="text"
                value={login.username}
                onChange={(e) => onValueChange(e)}
                name="username"
                placeholder="Enter Username"
                className="block w-full rounded-md p-2 mb-3 border bg-slate-700"
              />
              <input
                type="password"
                value={login.password}
                onChange={(e) => onValueChange(e)}
                name="password"
                placeholder="Enter Password"
                className="block w-full rounded-md p-2 mb-3 border bg-slate-700"
              />

              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

              <button
                className="block w-full rounded-md p-2 text-white bg-pink-500 hover:bg-pink-600"
                onClick={() => loginUser()}
              >
                Login
              </button>
              <p className="text-xs text-center">OR</p>

              <button
                className="w-full p-2 rounded-md text-white
              bg-purple-600 hover:bg-purple-700"
                onClick={() => toggleSignup()}
              >
                Create an account
              </button>
            </div>
          ) : (
            <div className="p-25">
              <input
                type="text"
                onChange={(e) => onInputChange(e)}
                name="name"
                placeholder="Enter Name"
                className="block w-full rounded-md p-2 mb-3 border bg-slate-700"
              />
              <input
                type="text"
                onChange={(e) => onInputChange(e)}
                name="username"
                placeholder="Enter Username"
                className="block w-full rounded-md p-2 mb-3 border bg-slate-700"
              />
              <input
                type="password"
                onChange={(e) => onInputChange(e)}
                name="password"
                placeholder="Enter Password"
                className="block w-full rounded-md p-2 mb-3 border bg-slate-700"
              />

              <button
                className="block w-full rounded-md p-2 text-white bg-pink-500 hover:bg-pink-600"
                onClick={() => signupUser()}
              >
                Signup
              </button>
              <p className="text-xs text-center">OR</p>

              <button
                className="w-full p-2 rounded-md text-white
         bg-purple-600 hover:bg-purple-700 "
                onClick={() => toggleSignup()}
              >
                Already have an account
              </button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer 
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
      />
    </div>
  );
};

export default Login;
