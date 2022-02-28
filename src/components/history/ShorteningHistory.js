import React, { useContext } from 'react'
import AuthContext from '../../auth/AuthContext';
import './ShorteningHistory.scss'

const ShorteningHistory = () => {
    const authContext = useContext(AuthContext);

    return (
        <div className='containerHistory'>
            {authContext && authContext.authState && authContext.authState.email !== "" && <table className='container'>
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
                {authContext && authContext.authState && authContext.authState.urlHistory && authContext.authState.urlHistory.map((historyItem, index) => <tr key={index}>
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