import { Button} from "react-bootstrap";
import { NavLink } from "react-router-dom";
// import AuthContext from "../store/auth-context";
// import { useContext } from "react";
import classes from './Welcome.module.css'
import { useSelector } from "react-redux";

const Welcome=(props)=>{
    const token = useSelector(state=> state.auth.token)
    // const authCtx=useContext(AuthContext)

    const onVerifyHandler=()=>{
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA3Xrnzk0TTuA1haVoAVWYDaK2TtED9yTk',{
            method:'POST',
            body:JSON.stringify({
                requestType:'VERIFY_EMAIL',
                idToken:token
            })
        }).then(res=>{
            if(res.ok){
                return res.json()
            }else{
                return res.json().then(data=>{
                    let errorMessage='Verification failed!'
                    if(data && data.error && data.error.message){
                        errorMessage = data.error.message;
                    }
                    throw new Error(errorMessage)
                })
            }
        }).then(data=>{
            console.log(data)
        }).catch(err=>{
            alert(err.message)
        })
    }
    return(
        <div className={classes.control}>
            <h1>Welcome to expense tracker!</h1>
            <div>
                <p>Update Profile <NavLink to='/profile'>Complete Now</NavLink></p>
            </div>
            <div><Button variant="light" onClick={onVerifyHandler}>Verify Email</Button></div>
            <br/>
            <div><Button size="lg" variant="success" href="/expense" >Create Expense</Button></div>
            
        </div>
    )
}

export default Welcome;