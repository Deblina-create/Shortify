import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from "../../firebase"
import { useHistory } from "react-router-dom";
import AuthContext from '../../auth/AuthContext';
import './SignUp.scss'

const SignUp = () => {
    const history = useHistory();
    const fb = useContext(FirebaseContext)
    const { authDispatch } = useContext(AuthContext);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorPassword, setErrorPassword] = useState(false)
    const [passwordErrorText, setPasswordErrorText] = useState("")
    const [errorSaveInDB, setErrorSaveInDB] = useState(false)

    const validate = () => {
        if (password === "") {
            setErrorPassword(true)
            setPasswordErrorText("Password cannot be empty!")
            return false
        }
        if (password === confirmPassword)
            return true
        setErrorPassword(true)
        setPasswordErrorText("Passwords do not mathch!")
        return false
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            fb.db.collection("Users")
                .add({
                    email,
                    password
                })
                .then(async (ref) => {
                    if (!ref.id) {
                        setErrorSaveInDB(true)
                        return
                    }
                    authDispatch({
                        type: "SIGN_ACTION",
                        payload: { email }
                    })
                    history.push("/")
                })
        }
    }

    return (
        <div className="signIn">
        <form onSubmit={handleSubmit} className="signInForm">
            <label className="signInLabel">Sign Up</label>
            <input className="signInLabel" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input className="signInLabel" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <input className="signInLabel" type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
            {errorPassword && <label>{passwordErrorText}</label>}
            <Link className="signInColor" to="/">Cancel</Link>
            <button className="signInLabel" type="submit">Sign Up</button>
            <span className="signInLabel">Already have an account? <Link className="signInColor" to="/signin">Sign In</Link></span>
            {errorSaveInDB && <label>An error as occurred. Please try again.</label>}
        </form>
        </div>
    )
}

export default SignUp