import { useRef, useState } from 'react'
import classes from './ForgotPass.module.css'
import { NavLink } from 'react-router-dom'

const ForgotPass =()=>{
    const [isLoading,setIsLoading] = useState(false)
    const emailInputRef=useRef()
    const onSubmitHandler=(event)=>{
        event.preventDefault()
        const enteredEmail=emailInputRef.current.value
        setIsLoading(true)
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA3Xrnzk0TTuA1haVoAVWYDaK2TtED9yTk',{
            method:'POST',
            body:JSON.stringify({
                requestType:"PASSWORD_RESET",
                email:enteredEmail
            }),
            headers:{'Content-Type':'application/json'}
        }).then((res)=>{
            setIsLoading(false)
            if(res.ok){
                return res.json()
            }else{
                return res.json().then((data)=>{
                    let errorMessage= 'Email invalid!'
                    if(data && data.error && data.error.message){
                        errorMessage = data.error.message;
                    }
                    throw new Error(errorMessage)
                })
            }
        }).then((data)=>{
            console.log(data)
        }).catch((err)=>{
            alert(err.message)
        })
        emailInputRef.current.value=''
    }
    return(
        <div className={classes.control}>
            <form onSubmit={onSubmitHandler}>
                <label htmlFor="email">Email:</label>
                <input id="email" type="email" ref={emailInputRef}></input>
                <button type='submit'>Submit</button>
                {isLoading && <p>Sending Request...</p>}
                <div style={{marginTop:'1rem'}}><NavLink to='/login'>back</NavLink></div>
            </form>
        </div>
    )
}

export default ForgotPass;