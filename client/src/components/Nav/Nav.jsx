import { useSelector } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import { useRef } from 'react';
import noImage from '../../assets/Images/no-image.png';
import { useNavigate } from 'react-router-dom';
import "./Nav.scss"
export default function Nav() {
    const { loggedUser, avatar } = useSelector(state => state.user)
    const dropdown = useRef()
    const navigate = useNavigate()


    const handleProfile = () => {
        dropdown.current.classList.toggle('active')
        if (localStorage.getItem('userInfo')) {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'))
            if (userInfo.role == "client") {
                navigate(`/dashboard/client/${userInfo._id}`)
            } else {
                navigate(`/dashboard/freelancer/${userInfo._id}`)
            }
        }
    }
    const handleLogOut = () => {
        dropdown.current.classList.toggle('active')
        if (localStorage.getItem('token') && localStorage.getItem('userInfo')) {
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')
            window.location.href = '/login'
        }
    }
    const toogle = () => {
        const links = document.querySelectorAll('nav a')
        const menu = document.querySelector('nav')
        const hamburger = document.querySelector('.hamburger')
        hamburger.classList.toggle('active')
        menu.classList.toggle('active')
        links.forEach(link => {
            link.onclick = function () {
                if (hamburger.className.indexOf('active') != -1) {
                    hamburger.classList.toggle('active')
                    menu.classList.toggle('active')
                }
            }
        })
    }
    return (
        <div className='Nav'>
            <div className="container">
                
                    <div className="logo">
                        <HashLink to="/#">GIGO</HashLink>
                    </div>
                    <div className="collect"> 
                        
                        <HashLink to="/#">Home</HashLink>
                        <HashLink to="/#services" smooth>Services</HashLink>
                       
                        <HashLink to="/#FAQ" smooth>FAQ</HashLink>
                        
                   </div>
                   <div className="something"> 
                         {
                            loggedUser == null ?
                                <button><HashLink to="/login">Sign in</HashLink></button>
                                :
                                <div className="menu">
                                    <img src={avatar === 'no-image.png' ? noImage : `http://localhost:3001/ProfilePic/${avatar}`} onClick={e => dropdown.current.classList.toggle('active')} alt="Profile Picture" width={50} height={50} />
                                    <div ref={dropdown} className="dropdown">
                                        <div className="link" onClick={e => handleProfile()}>Dashboard</div>
                                        <div className="link" onClick={e => handleLogOut()}>Log Out</div>
                                    </div>
                                </div>
                        }
                    </div>
                 
                
            </div>

        </div>
    )
}
