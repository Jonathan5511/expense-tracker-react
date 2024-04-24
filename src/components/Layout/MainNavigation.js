import { Button,Container,Navbar } from "react-bootstrap";
import AuthContext from "../../store/auth-context";
import { Fragment, useContext } from "react";

const MainNavigation=()=>{
    const authCtx=useContext(AuthContext);
    const onLogoutHandler=()=>{
        authCtx.logout()
    }

    return (
        <Fragment>
     
            <Navbar className="d-flex justify-content-end align-items-center bg-dark" > 
                {authCtx.isLoggedIn && <Button variant="light" onClick={onLogoutHandler}>Logout</Button>}
            </Navbar>

        </Fragment> 
    )

}

export default MainNavigation;