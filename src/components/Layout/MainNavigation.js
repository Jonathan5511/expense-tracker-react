import { Button,Navbar } from "react-bootstrap";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";

const MainNavigation=()=>{
    const authCtx=useContext(AuthContext);
    const onLogoutHandler=()=>{
        authCtx.logout()
    }

    return (
        <Navbar className="d-flex justify-content-end align-items-center bg-dark" > 
            <Button variant="light" onClick={onLogoutHandler}>Logout</Button>
        </Navbar>
    )

}

export default MainNavigation;