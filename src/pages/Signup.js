import { useRef } from 'react';
import classes from './Signup.module.css'

const Signup=(props)=>{
    const emailInputRef=useRef();
    const passwordInputRef=useRef();
    const cPasswordInputRef=useRef();

    const onSubmitHandler=(event)=>{
        event.preventDefault();
        const enteredEmail=emailInputRef.current.value
        const enteredPassword=passwordInputRef.current.value
        const cEnteredPassword=cPasswordInputRef.current.value
        if(enteredPassword===cEnteredPassword){
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA3Xrnzk0TTuA1haVoAVWYDaK2TtED9yTk',{
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
            console.log(data)
            console.log('User has signed up successfully!!')
        }).catch((err)=>{
            alert(err.message)
        })
        }else{
            alert(`Passwords don't match,please enter the correct matching password!`)
        }
        
    }

    return (
    <div className={classes.control}>
        <form onSubmit={onSubmitHandler}>
            <label htmlFor="email">Email:</label>
            <input id="email" type="email" ref={emailInputRef}></input>
            <label htmlFor="pass">Enter Password:</label>
            <input id="pass" type="password" ref={passwordInputRef}></input>
            <label htmlFor="cpass">Confirm Password:</label>
            <input id="cpass" type="password" ref={cPasswordInputRef}></input>
            <button type='submit'>SignUp</button>
        </form>
    </div>
    )
}

export default Signup;