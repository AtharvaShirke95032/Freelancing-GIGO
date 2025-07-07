import './Login.scss';
import { useRef, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { login, setAvatar, setToken, setUserId, tokenExists, setUserRole } from "../../Redux/UserSlice";
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import Footer from "../footer/Footer";

export default function Login() {
  const username = useRef();
  const password = useRef();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    tokenExists(token, navigate, dispatch).then(() => {
      if (localStorage.getItem('userInfo')) {
        const connectedUser = JSON.parse(localStorage.getItem('userInfo'));
        if (connectedUser.role === "client") {
          navigate(`/dashboard/client/${connectedUser._id}`);
        } else {
          navigate(`/dashboard/freelancer/${connectedUser._id}`);
        }
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = [];

    if (!/^[a-zA-Z0-9_]+$/.test(username.current.value)) {
      err.push('Username invalid. It must only contain letters, numbers, and underscores');
    }
    if (password.current.value.length < 8) {
      err.push('Password invalid. It must be more than 8 characters');
    }

    if (err.length !== 0) {
      toast.error(
        <div>
          {err.map((e, i) => <p key={i}>{e}</p>)}
        </div>,
        { position: "top-right", autoClose: 5000 }
      );
    } else {
      setLoading(true);
      const body = {
        username: username.current.value,
        password: password.current.value
      };

      dispatch(login(body)).unwrap().then(data => {
        setTimeout(() => {
          setLoading(false);
          if (data.status === 200) {
            toast.success(data.msg);
            localStorage.setItem('token', data.token);
            localStorage.setItem('userInfo', JSON.stringify(data.userInfo));

            dispatch(setUserId(data.userInfo._id));
            dispatch(setToken(data.token));
            dispatch(setAvatar(data.userInfo.image));
            dispatch(setUserRole(data.userInfo.role));

            if (data.userInfo.role === "client") {
              navigate(`/dashboard/client/${data.userInfo._id}`);
            } else {
              navigate(`/dashboard/freelancer/${data.userInfo._id}`);
            }
          } else {
            toast.error(data.msg);
          }
        }, 1000);
      }).catch((err) => {
        setTimeout(() => {
          setLoading(false);
          toast.error(err);
        }, 1000);
      });
    }
  };

  return (
    <>
     
      <div className="Login">
        <div className="login-box">
          <h2>Welcome Back</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input ref={username} type="text" id="username" placeholder="Enter your username" />

            <label htmlFor="password">Password</label>
            <input ref={password} type="password" id="password" placeholder="Enter your password" />

            <button className="login-btn" type="submit">Sign In</button>
          </form>
          <div className="redirect-signup">
            <span>Not a member?</span>
            <a href="/signup">Sign Up</a>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
