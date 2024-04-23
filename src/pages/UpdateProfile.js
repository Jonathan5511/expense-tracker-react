import { useRef,useContext, useEffect } from 'react';
import classes from './UpdateProfile.module.css'
import AuthContext from '../store/auth-context';

const UpdateProfile=(props)=>{
    const authCtx = useContext(AuthContext)
    const nameInputRef=useRef()
    const imageInputRef=useRef()

    useEffect(()=>{
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyA3Xrnzk0TTuA1haVoAVWYDaK2TtED9yTk',{
            method:'POST',
            body:JSON.stringify({
                idToken:authCtx.token
            }),
            headers:{'Content-Type':'application/json'}
        }).then(res=>{
            if(res.ok){
                return res.json()
            }else{
                return res.json().then((data)=>{
                    let errorMessage= 'Getting data failed!'
                    if(data && data.error && data.error.message){
                        errorMessage = data.error.message;
                    }
                    throw new Error(errorMessage)
                })
            }
        }).then(data=>{
            nameInputRef.current.value=data.users[0].displayName
            imageInputRef.current.value=data.users[0].photoUrl
        }).catch(err=>{
            alert(err.message)
        })
    },[authCtx.token])

    const onSubmitHandler=(event)=>{
        event.preventDefault();
        const enteredName=nameInputRef.current.value
        const enteredImage=imageInputRef.current.value
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA3Xrnzk0TTuA1haVoAVWYDaK2TtED9yTk',{
            method:'POST',
            body:JSON.stringify({
                idToken:authCtx.token,
                displayName:enteredName,
                photoUrl:enteredImage,
                returnSecureToken:true
            }),
            headers:{'Content-Type':'application/json'}
        }).then(res=>{
            if(res.ok){
                return res.json()
            }else{
                return res.json(data=>{
                    let errorMessage="Update failed!"
                    if(data && data.error && data.error.message){
                        errorMessage=data.error.message
                    }
                    throw new Error (errorMessage);
                })
            }
        }).then(data=>{
            console.log(data)
        }).catch(err=>{
            alert(err.messsage)
        })
    }
    return(
        <div className={classes.control}>
            <form onSubmit={onSubmitHandler}>
                <label htmlFor="name">Display name:</label>
                <input id="name" type="text" ref={nameInputRef}></input>
                <label htmlFor="img">Profile Photo URL:</label>
                <input id="img" type="url" ref={imageInputRef}></input>
                <button type='submit'>Update</button>
            </form>
        </div>
  
    )
}

export default UpdateProfile;