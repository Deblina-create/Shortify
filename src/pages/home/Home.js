import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router"
import AuthContext from "../../auth/AuthContext"
import ShorteningHistory from "../../components/history/ShorteningHistory"
import Shortened from "../../components/shortened/Shortened"
import Shortener from "../../components/shortener/Shortener"
import { FirebaseContext } from "../../firebase"
import './Home.scss'

const Home = () => {
    const { slug } = useParams()
    const fb = useContext(FirebaseContext)
    const { authState, authDispatch } = useContext(AuthContext);
    const [urlItem, setUrlItem] = useState(null)


    useEffect(() => {
        const getUrl = () => {
            fb.db.collection("UrlItems")
                .where("slug", "==", slug)
                .get()
                .then(snapshot => {
                    const items = snapshot.docs.map(doc => {
                        return doc.data().originalUrl;
                    })
                    const originalLink = items[0];
                    console.log("AA", originalLink);
                    window.location.href = originalLink;
                })
        }
        if (slug)
            getUrl()
    }, [fb, slug])

    useEffect(() => {

        if (authState.email !== "") {
            getUrlHistory()
                .then(urlHistory => {
                    authDispatch({
                        type: "FETCH_HISTORY",
                        payload: { urlHistory }
                    })
                })
        }
    }, [authState.email])

    const getUrlHistory = async () => {
        const snapshot = await fb.db.collection("UrlItems")
            .where("email", "==", authState.email)
            .get()
        const items = snapshot.docs.map(doc => {
            return doc.data();
        })
        return items
    }

    const postShorteningAction = async (item) => {
        console.log("aaaa")
        setUrlItem(item);
        const urlHistory = await getUrlHistory()
        console.log("Post shortentening", urlHistory)
        authDispatch({
            type: "FETCH_HISTORY",
            payload: { urlHistory }
        })
    }



    return (
        <>
            <div className="container">
                <Shortener onShorten={postShorteningAction} slug={slug} />
                {urlItem ? <Shortened urlItem={urlItem} /> : ''}

            </div>
            <ShorteningHistory className="ShorteningcontainerHistory"/>
        </>
    )
}

export default Home