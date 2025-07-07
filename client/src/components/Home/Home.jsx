import hero from "../../assets/svgs/Hero.svg";
import blob from "../../assets/svgs/blob.svg";
import webDeveloperService from "../../assets/svgs/web developer.svg";
import webDesignService from "../../assets/svgs/web design.svg";
import mobileService from "../../assets/svgs/mobile developer.svg";
import aboutUs from "../../assets/svgs/about us.svg";
import contactUs from "../../assets/svgs/contact us.svg";
import { HashLink } from "react-router-hash-link";
import { tokenExists } from "../../Redux/UserSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRef } from "react";
import { toast } from "react-toastify";

import "./Home.scss";
import Bento from "../Bento/Bento";
import Tab from "../Tab/Tab";
import Footer from "../footer/Footer";
import ClientSay from "../Clientsay/Clientsay";
import FAQ from "../FAQ/FAQ";

export default function Home() {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fullName = useRef();
  const email = useRef();
  const message = useRef();

  useEffect(() => {
    tokenExists(token, navigate, dispatch);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    let err = [];
    const myForm = {
      fullName: fullName.current.value.trim(),
      email: email.current.value.trim(),
      message: message.current.value.trim(),
    };
    if (!/^[a-zA-Z\s]+$/.test(myForm.fullName)) {
      err.push("Full Name invalid. It must only contain letters and space");
    }
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(myForm.email)
    ) {
      err.push("Email invalid. It must be in the format example@example.com");
    }
    if (myForm.message.length < 10) {
      err.push("Message Should Contain More Than 10 Caracters");
    }
    if (
      (myForm.fullName == "" &&
        myForm.email == "" &&
        myForm.message.value == "") ||
      err.length != 0
    ) {
      if (
        myForm.fullName == "" &&
        myForm.email == "" &&
        message.current.value == ""
      ) {
        toast.error("Please Fill The Inputs");
      } else
        toast.error(
          <div>
            {err.map((e, i) => (
              <p key={i}>{e}</p>
            ))}
          </div>,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
    } else {
      fullName.current.value = "";
      email.current.value = "";
      message.current.value = "";
      toast.success(
        <p>
          Thank You For Contacting Us.
          <br />
          <br /> We Will Look At Your Message As Soon As Possible
        </p>
      );
    }
  };
  return (
    <div className="Home">
      
      <div className="blob-outer-container">
        <div className="blob-inner-container">
          <div className="blob"></div>
        </div>
      </div>
      <div className="home-page">
        <div className="content">
          <h1>Where talent meets opportunity</h1>
        </div>
      </div>


     <div id="services"><Bento/></div>
    <ClientSay/>
     <div id="FAQ"><FAQ/></div>

     <Footer/>
    </div>
  );
}
