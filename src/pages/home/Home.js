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
    const authContext = useContext(AuthContext);
    const [urlItem, setUrlItem] = useState(null)
    const emailAuth = authContext && authContext.authState && authContext.authState.email ? authContext.authState.email : ""


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
                    window.location.href = originalLink;
                })
        }
        if (slug)
            getUrl()
    }, [fb, slug])

    const getUrlHistory = async () => {
        const snapshot = await fb.db.collection("UrlItems")
            .where("email", "==", authContext.authState.email)
            .get()
        const items = snapshot.docs.map(doc => {
            return doc.data();
        })
        return items
    }

    useEffect(() => {

        if (emailAuth !== "") {
            getUrlHistory()
                .then(urlHistory => {
                    authContext.authDispatch({
                        type: "FETCH_HISTORY",
                        payload: { urlHistory }
                    })
                })
        }
    }, [emailAuth])



    const postShorteningAction = async (item) => {
        setUrlItem(item);
        const urlHistory = await getUrlHistory()
        authContext.authDispatch({
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
            <h3>{authContext && authContext.authState && authContext.authState.email && authContext.authState.email !== "" ? 'Shortening History' : 'Login to record history'}
            {authContext && authContext.authState && authContext.authState.email && authContext.authState.email !== "" ? <svg xmlns="http://www.w3.org/2000/svg" class="downIcon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
            </svg> : ''}</h3>
        
            <ShorteningHistory className="ShorteningcontainerHistory" />
        </>
    )
}

export default Home