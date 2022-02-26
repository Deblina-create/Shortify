import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router"
import Shortened from "../../components/shortened/Shortened"
import Shortener from "../../components/shortener/Shortener"
import { FirebaseContext } from "../../firebase"
import './Home.scss'

const Home = () =>{
    const { slug } = useParams()
    const fb = useContext(FirebaseContext)
    const [urlItem, setUrlItem] = useState(null)

    
    useEffect(() => {
        const getUrl = () =>{
            fb.db.collection("UrlItems")
            .where("slug", "==", slug)
            .get()
            .then(snapshot =>{
                const items = snapshot.docs.map(doc =>{
                    return doc.data().originalUrl;
                })
                const originalLink = items[0];
                console.log("AA", originalLink);
               window.location.href = originalLink;
            })
        }
        if(slug)
            getUrl()
    }, [fb, slug])

    

    const postShorteningAction = (item)=> {
        console.log("aaaa")
        setUrlItem(item);
    }



    return (
        <div className="container">
            <Shortener onShorten={postShorteningAction} slug={slug} />
            {urlItem ? <Shortened urlItem={urlItem} /> : ''}
        </div>

    )
}

export default Home