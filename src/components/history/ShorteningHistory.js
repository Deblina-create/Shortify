import React, { useContext } from 'react'
import AuthContext from '../../auth/AuthContext';
import { FirebaseContext } from '../../firebase';
import './ShorteningHistory.scss'

const ShorteningHistory = () => {
    const fb = useContext(FirebaseContext)
    const { authState } = useContext(AuthContext);

    return (
        <div className='containerHistory'>
            {authState.email !== "" && <table className='container'>
            <thead>
                <tr>
                    <th className='originalurlplace'>
                        Original Url
                    </th>
                    <th className='shortenedurlplace'>
                        Shortened Url
                    </th>
                </tr>
                </thead>
                <tbody className='originalurlplace'>
                {authState.urlHistory && authState.urlHistory.map((historyItem, index) => <tr key={index}>
                    <td>
                        {historyItem.originalUrl}
                    </td>
                    <td>
                        {<a href={`${window.location.href}${historyItem.slug}`} target="blank">{`${window.location.href}${historyItem.slug}`}</a>}
                    </td>
                </tr>)}
                </tbody>
            </table>}
        </div>
    )
}

export default ShorteningHistory