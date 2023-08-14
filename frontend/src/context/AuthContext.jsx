import { useState, createContext, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
const authContext = createContext();

const AuthContextProvider = ({ children }) => {
    const navigate=useNavigate()
  const [loading, setLoading] = useState(false);

  //check auth
  const checkAuth=async()=>{

    try {
        const test = await jwtDecode(sessionStorage.getItem("token"))
    } catch (error) {
        navigate("/")
    }
    // console.log(test)
  }

  //Login Handler
  const handleLogin = async (values) => {
    alert("Since It is deployed in a free server Initially It will take 3-4 mins to start the server")
    const cred = {
      email: values.email,
      password: values.password,
    };
    setLoading(true);
    const loginRes = await axios.post(
      "http://localhost:4000/api/v1/login",
      cred
    );
    if (loginRes.data.status == 404) {
      setLoading(false);
      return alert("No user Found");
    }
    if (loginRes.data.status == 401) {
      setLoading(false);
      return alert("Wrong Credentials");
    }
    window.sessionStorage.setItem("token", loginRes.data.data.token);
    setLoading(false);
    navigate("/dashboard")
  };

  //SignupHandler
  const handleSignup=async(values)=>{
    alert("Since It is deployed in a free server Initially It will take 3-4 mins to start the server")
    let signupDetails={
        email:values.email,
        password:values.password,
        name:values.name
    }

    if(values.secret){
        signupDetails.secretKey=values.secret
    }
    const signupResult = await axios.post("http://localhost:4000/api/v1/signup",signupDetails)
    navigate("/")
  }


  return (
    <authContext.Provider value={{ handleLogin, loading, setLoading,handleSignup,checkAuth }}>
      {children}
    </authContext.Provider>
  );
};

export { authContext, AuthContextProvider };
