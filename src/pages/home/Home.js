import React from "react"
import Shortened from "../../components/shortened/Shortened"
import Shortener from "../../components/shortener/Shortener"
import './Home.css'

const Home = () =>{
    return (
        <div className="container">
            <Shortener />
            <Shortened  />
        </div>

    )
}

export default Home