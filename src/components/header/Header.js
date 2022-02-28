import React, { useContext } from 'react'
import AuthContext from '../../auth/AuthContext';
import { useHistory } from "react-router-dom";
import './Header.scss'
import { Link } from 'react-router-dom';

const Header = () => {
    const { authState, authDispatch } = useContext(AuthContext);
    const history = useHistory()
    console.log("Route location", history.location)
    console.log("Route action", history.action)

    const PartialHeaderContent = () => {
        return (
            <>
                <div className="loginContainer">
                    {authState.email !== "" ? <><span className="loginContainerChild">{authState.email}</span>
                        <button className="loginContainerChild" onClick={(e) => {
                            e.preventDefault()
                            authDispatch({
                                type: "SIGN_ACTION",
                                payload: {
                                    email: "",
                                    urlHistory: []
                                }
                            })
                        }}>Log out</button>
                    </> :
                        <button className="loginContainerChild" onClick={(e) => {
                            e.preventDefault()
                            history.push("/signin")
                        }}>Log In</button>
                    }
                </div>
            </>
        )
    }
    return (
        <>

            {window.location && window.location.pathname === "/" && <PartialHeaderContent />}
            <header><Link to="/">Shortify</Link></header>
        </>
    )
}

export default Header