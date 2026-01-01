import "../Css/Home.css";
import ReactLogo from "../assets/images/React.png";
import ExpressLogo from "../assets/images/Express.png";
import NodejsLogo from "../assets/images/Node.js.png";
import MongoDBLogo from "../assets/images/MongoDB.png";
import logo from "../assets/images/logo.png";
import Login from "./Login";
import { useNavigate } from 'react-router-dom'; 

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-color">
        <div className="banner">
          <div className="slider" style={{ "--quantity": 4 }}>
            <div className="item" style={{ "--position": 1 }}><img src={ReactLogo} alt="React" style={{ width: "120px", height: "auto" }} /></div>
            <div className="item" style={{ "--position": 2 }}><img src={ExpressLogo} alt="Express" /></div>
            <div className="item" style={{ "--position": 3 }}><img src={NodejsLogo} alt="Nodejs" /></div>
            <div className="item" style={{ "--position": 4 }}><img src={MongoDBLogo} alt="MongoDB" /></div>
          </div>
          <div className="logo">
            <h1> ConnextX</h1></div>
        </div>
        <p className="text">
          Chat live.
          <span className="Close-friends">Stay Connected. </span>
        </p>

        <div className=" v-divider"></div>

        <div className="login">
          <button className="login-button" type="button" onClick={() => navigate("/login")}> Login</button>
        </div>
        <div className="Signup">
          <button className="Signup-button" type="button" onClick={()=> navigate("/signup")}> Signup</button>
        </div>
        {/* <div className="start">
          <button className="Start-Chat" type="button" onClick={()=> navigate()}> Start</button>
        </div> */}

        <img src={logo} className="logo-img" />
      </div>
    </>
  );
};

