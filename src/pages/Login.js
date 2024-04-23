import classes from './Login.module.css'
import { NavLink,useHistory } from 'react-router-dom';
import {useContext, useRef } from 'react';
import AuthContext from '../store/auth-context';

const Login =()=>{
    const history = useHistory();
    const authCtx=useContext(AuthContext)
    const emailInputRef=useRef();
    const passwordInputRef=useRef();

    const onSubmitHandler=(event)=>{
        event.preventDefault();
        const enteredEmail=emailInputRef.current.value
        const enteredPassword=passwordInputRef.current.value
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA3Xrnzk0TTuA1haVoAVWYDaK2TtED9yTk',{
            method:'POST',
            body:JSON.stringify({
                email:enteredEmail,
                password:enteredPassword,
                returnSecureToken:true
            }),
            headers:{'Content-Type':'application/json'}
            }).then((res)=>{
            if(res.ok){
                return res.json()
            }else{
                return res.json().then((data)=>{
                    let errorMessage= 'Authentication failed!'
                    if(data && data.error && data.error.message){
                        errorMessage = data.error.message;
                    }
                    throw new Error(errorMessage)
                })
            }
        }).then((data)=>{
            authCtx.login(data.idToken)
            history.replace('/welcome')
        }).catch((err)=>{
            alert(err.message)
        })
        
    }

    return(
        <div className={classes.control}>
            <form onSubmit={onSubmitHandler}>
                <label htmlFor="email">Email:</label>
                <input id="email" type="email" ref={emailInputRef}></input>
                <label htmlFor="pass">Enter Password:</label>
                <input id="pass" type="password" ref={passwordInputRef}></input>
                <button type='submit'>Login</button>
            </form>
            <div style={{marginTop:'1rem'}}>
                <p>Don't have an account?<NavLink to='/'>Signup</NavLink></p>
            </div>
        </div>
    )
}

export default Login;