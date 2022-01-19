import React, { useState, useContext } from "react"
import uniqueSlug from 'unique-slug'
import { FirebaseContext } from "../../firebase"
import check_img from "../../assets/images/check-circle-regular.svg"
import './Shortener.css'
import progress_img from "../../assets/images/progress.gif"


const Shortener = (props) => {
    const fb = useContext(FirebaseContext)
    const [originalUrl, setOriginalUrl] = useState("")
    const [vaildUrlChecked, setValidUrlChecked] = useState(false)
    const [shortenButtonText, setShortenButtonText] = useState("Shorten");
    const handleShortening = (e) => {
        e.preventDefault()
        setShortenButtonText("Shortened!")
        setTimeout(function () {
            setShortenButtonText("Shorten");
        }, 1000);
        const newSlug = uniqueSlug()
        const urlSingleItem = {
            originalUrl,
            slug: newSlug
        }

        fb.db.collection("UrlItems")
            .add(urlSingleItem)
            .then(ref => {
                if (props.onShorten)
                    props.onShorten(urlSingleItem)
            })

        setOriginalUrl("")
        setValidUrlChecked(false)
    }

    const handleUrlChange = (e) => {
        setOriginalUrl(e.target.value)
        setValidUrlChecked(isValidUrl(e.target.value))
    }

    const isValidUrl = (url) => {
        let valid = false
        if (url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/))
            valid = true
        return valid
    }

    return (
        <div className="shortnercontainer">
            {props.slug ? <div className="progress-parent">
                <img className="progress" src={progress_img} alt="progress"></img>
            </div> : <>
                <input className="inputbox " data-testid="inputOriginalUrl" onChange={handleUrlChange} type="text" placeholder="Enter your url to shorten" value={originalUrl}></input>{vaildUrlChecked ? <img className="check-icon" src={check_img} alt="check" /> : ''}
                <button className={shortenButtonText === "Shorten" ? 'primary-dark shortenbtn' : 'secondary shortenbtn'} disabled={!vaildUrlChecked} data-testid="btnShorten" onClick={handleShortening} >{shortenButtonText}</button>
            </>}
        </div>
    )
}

export default Shortener