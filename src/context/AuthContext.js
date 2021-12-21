import { createContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import axiosInstance from '../axios';


const AuthContext = createContext()
export default AuthContext;

export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null)
    let [user, setUser] = useState(()=> localStorage.getItem('access_token') ? jwt_decode(localStorage.getItem('access_token')) : null)
    let [err , setErr] = useState(null)
    

    const history = useHistory();

    const login = (formData) =>{
        axiosInstance
			.post(`token/`, {
				email: formData.email,
				password: formData.password,
			})
            .then((res) => {
				localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
                axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
                setAuthTokens(res.data)
                setUser(jwt_decode(res.data.access))
                setErr(null)
                history.push('/')
            })
            .catch((err)=>{
                console.log(err)
                setErr(err)
            })
                
                
    }

    const logout = () =>{
        console.log('auth logout clicked')
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        axiosInstance.defaults.headers['Authorization'] = null
        history.push('/login')
    }

    //no need for this function now as we used axios interceptors
    // let updateToken = async ()=> {
    //     let response = await axiosInstance.post(`/token/refresh/`, {
	// 			'refresh':authTokens?.refresh
	// 		})
    //     let data = response.data    
    //     if (response.status === 200){
    //         setAuthTokens(data)
    //         setUser(jwt_decode(data.access))
    //         localStorage.setItem('access_token', response.data.access);
	// 		localStorage.setItem('refresh_token', response.data.refresh);
    //     }else{
    //         logout()
    //     }
    // }

    let contextData = {
        user:user,
        authTokens:authTokens,
        login:login,
        logout:logout,
        err:err
    }

    return(
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )

}
