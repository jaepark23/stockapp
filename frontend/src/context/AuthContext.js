import { createContext, useState, useEffect }  from 'react'
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext; 

export const AuthProvider = ( {children} ) => {
    

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(false)
    const history = useNavigate()

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch(`http://127.0.0.1:8000/token/`, {
            method: "post",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({'username' : e.target.username.value, 'password' : e.target.password.value})
        }) 
        let data = await response.json()

        if(response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            history('/')
        } else {
            alert("Something went wrong")
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history('/login')
    }

    let updateToken = async () => {
        console.log("update token called")
        let response = await fetch(`http://127.0.0.1:8000/api/token/refresh/`, {
            method: "post",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({'refresh' : authTokens.refresh})
        }) 
        let data = await response.json()

        if(response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser
    }

    useEffect(() => {
        let minutes = 1000 * 60 * 4
        let interval = setInterval(() => {
            if(authTokens) {
                updateToken()
            }
        }, minutes)
        return () => clearInterval(interval)
    }, [authTokens, loading])

    return(
        <AuthContext.Provider value = {contextData}>
            {children}
        </AuthContext.Provider>
    )
}