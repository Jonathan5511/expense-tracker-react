import { NavLink } from "react-router-dom";

const Welcome=(props)=>{
    return(
        <div>
            <h1>Welcome to expense tracker!</h1>
            <div>
                <p>Your profile is incomplete<NavLink to='/profile'>Complete Now</NavLink></p>
            </div>
        </div>
    )
}

export default Welcome;