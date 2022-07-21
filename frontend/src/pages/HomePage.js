import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'

const HomePage = ( ) => {
    let [shares, setShares] = useState([])
    let {authTokens} = useContext(AuthContext)

    useEffect( () => {
        console.log('t')
        getShares()
    }, [])

    let getShares = async () => {
        let response = await fetch('http://127.0.0.1:8000/shares/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        setShares(data)
    }
    return (
        <div>
            <p>Testing123</p>
            <ul>
                {shares.map(share => (
                    <li key = {share.id}> {share.ticker} {share.count} </li>
                ))}
            </ul>
        </div>
    )
}

export default HomePage