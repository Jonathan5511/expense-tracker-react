import { Button,Container,Navbar, NavbarBrand } from "react-bootstrap";
import AuthContext from "../../store/auth-context";
import { Fragment, useContext } from "react";

const MainNavigation=()=>{
    const authCtx=useContext(AuthContext);
    const onLogoutHandler=()=>{
        authCtx.logout()
    }

    return (
        <Fragment>
     
            <Navbar className="d-flex justify-content-end navbar-dark align-items-center bg-dark " > 
            <Container>
                <NavbarBrand style={{fontSize:'35px',fontWeight:'bold'}}>Expense Tracker</NavbarBrand>
                {authCtx.isLoggedIn && <Button variant="light" onClick={onLogoutHandler}>Logout</Button>}
            </Container>
                
            </Navbar>

        </Fragment> 
    )

}

export default MainNavigation;