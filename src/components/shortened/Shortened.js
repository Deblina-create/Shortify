import React, { useState } from "react";
import { getFirstNCharacters } from "../../Utilities";
import "./Shortened.scss"


const Shortened = (props) => {
    const [copyText, setCopyText] = useState("Copy");

    const handleCopy = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(`${window.location.href}${props.urlItem.slug}`);
        setCopyText("Copied!")
        setTimeout(function () {
            setCopyText("Copy");
        }, 1000);
    }

    return (
        <div className="secondcontainer">
            <div className="originalurlplace" data-testid="divOriginalUrl" title={props.urlItem.originalUrl}>
               {getFirstNCharacters(props.urlItem.originalUrl, 50)  }...
            </div>
            <div className="shortenedurlplace">
                <a data-testid="anchorShortenedUrl" href={`${window.location.href}${props.urlItem.slug}`}  target="blank">{`${window.location.href}${props.urlItem.slug}`}</a>
            </div>
            <div>
                <button className={copyText === "Copied!" ? 'copybtn primary-dark' : 'copybtn secondary'} onClick={handleCopy}>{copyText}</button>
            </div>
        </div>
    )
}

export default Shortened