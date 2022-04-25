import axios from "axios";
import { useRef } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router";
import "./register.css"

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const history = useHistory()


    const handleClick = async (e) => {
        e.preventDefault();
        if (confirmPassword.current.value !== password.current.value) {
            password.current.setCustomValidity("Les mots de passes ne correspondent pas")
        }
        else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                await axios.post("/auth/register", user);
                history.push("/login");
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">Sica</h3>
                    <span className="registerDesc">Connect with the musical world on Sica</span>
                </div>
                <div className="registerRight">
                    <form className="registerBox" onSubmit={handleClick}>
                        <input placeholder="Username" required ref={username} className="registerInput" />
                        <input placeholder="Email" required ref={email} className="registerInput" type="email" />
                        <input placeholder="Password" required ref={password} className="registerInput" type="password" minLength="4" />
                        <input placeholder="Confirm password" required ref={confirmPassword} className="registerInput" type="password" />
                        <button className="registerButton" type="submit"> Sign up </button>
                        <Link to="/login" style={{textDecoration:"none"}}>
                            <button className="registerRegisterButton">Log into account</button>
                        </Link>

                    </form>
                </div>
            </div>
        </div>
    )
}
