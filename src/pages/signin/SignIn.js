import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from "../../firebase"
import { useHistory } from "react-router-dom";
import AuthContext from '../../auth/AuthContext';
import './SignIn.scss'

const SignIn = () => {
    const history = useHistory();

    const fb = useContext(FirebaseContext)
    const { authDispatch } = useContext(AuthContext);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        fb.db.collection("Users")
            .where("email", "==", email)
            .where("password", "==", password)
            .get()
            .then(async (snapshot) => {
                const items = snapshot.docs.map(doc => {
                    return doc.data().email;
                })
                const email = items[0];
                if (!email) {
                    setError(true)
                    return
                }
                console.log("Signing In user", email)
                authDispatch({
                    type: "SIGN_ACTION",
                    payload: { email }
                })
                history.push("/")
            })
    }

    return (
        <>
            <div className="signIn">
                <form onSubmit={handleSubmit} className="signInForm" >
                    <label className="signInLabel">Sign In</label>
                    <input className="signInLabel" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input className="signInLabel" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <Link className="signInColor" to="/">Cancel</Link>
                    <button className="signInLabel" type="submit">Sign In</button>
                    <span className="signInLabel">Don't have an account? <Link className="signInColor" to="/signup">Sign Up</Link></span>
                    {error && <label>Either email or password or both are not correct!!</label>}
                </form>
            </div>
        </>
    )
}

export default SignIn