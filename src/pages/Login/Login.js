import React, {useState, useContext} from 'react'
import { useHistory } from 'react-router-dom';
import axiosInstance from '../../axios';
import AuthContext from '../../context/AuthContext'
import './login.scss'

export default function Login() {
    // For toggle between login and sign up page
    const [toggle, setToggle] = useState(false)
    const toggleLogin = () =>{
        toggle ? setToggle(false):setToggle(true)
    }
    /////////////////////////////////////////////
    let {login , err , setErr} = useContext(AuthContext)
    const history = useHistory();
    // For controlling the login form and object.freeze is like a security measure
    const initialFormData = Object.freeze({
		email: '',
		password: '',
	});
    const initialSignUpData = Object.freeze({
		email: '',
		user_name: '',
		password: '',
        password2: '',
        
	});
    const [formData, updateFormData] = useState(initialFormData);
    const [signUpData, updateSignUpData] = useState(initialSignUpData);
    const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};
    const handleSignUpChange = (e) => {
		updateSignUpData({
			...signUpData,
			[e.target.name]: e.target.value.trim(),
		});
	};
    //for handling the submit button
    const handleSubmit = (e) => {
		e.preventDefault();
        login(formData)
	};

    const handleSignUp = (e) =>{
        e.preventDefault();
        
        axiosInstance
        .post(`user/create/`,{
            email: signUpData.email,
            user_name: signUpData.user_name,
            password : signUpData.password
        })
        .then((res) => {
            toggleLogin()
            alert(
				'You have successfully created an account please login to continue'
			);
        })
        .catch(err=> {
            setErr(err)

        })
    }
    return (
        <div className="login-page">
            <div className="form">
            {toggle?
                <form className="register-form">
                    <input type="text" placeholder="Email address" name='email' onChange={handleSignUpChange} value={signUpData.email}/>
                    <input type="text" placeholder="Username" name='user_name' onChange={handleSignUpChange} value={signUpData.user_name}/>
                    <input type="password" placeholder="Password" name='password' onChange={handleSignUpChange} value={signUpData.password}/>
                    <input type="password" placeholder="Confirm password"  name='password2' onChange={handleSignUpChange} value={signUpData.password2}/>
                    {err?
                    // <p style={{color:'red'}}>Wrong email, username or password. Try again or click Recover password??? to reset it.</p>:null}
                    <p style={{color:'red'}}>{err.response.data.detail}</p>:null}
                    <button onClick={handleSignUp}>create</button>
                    <p className="message">Already registered? <a onClick={toggleLogin}>Sign In</a></p>
                </form>
                :
                <form className="login-form" >
                    <input type="text" placeholder="Email or Username" name="email" onChange={handleChange} value={formData.email}/>
                    <input type="password" placeholder="Password" name="password" onChange={handleChange} value={formData.password}/>
                    <button onClick={handleSubmit}>login</button>
                    {err?
                    // <p style={{color:'red'}}>Wrong email, username or password. Try again or click Recover password??? to reset it.</p>:null}
                    <p style={{color:'red'}}>{err.response.data.detail}</p>:null}
                    <p className="message">Not registered? <a  onClick={toggleLogin}>Create an account</a></p>
                    <p className="message">Forgot password? <a >Recover password</a></p>
                </form>
            }
            </div>
        </div>
    )
}
