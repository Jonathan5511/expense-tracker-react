import { Button,Container,Navbar, NavbarBrand} from "react-bootstrap";
// import AuthContext from "../../store/auth-context";
import { Fragment, /*useContext*/ } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const MainNavigation=()=>{
    const dispatch = useDispatch();
    const isAuth = useSelector(state=> state.auth.isAuthenticated)
    // const authCtx=useContext(AuthContext);
    const onLogoutHandler=()=>{
        dispatch(authActions.logout(null))
    }

    return (
        <Fragment>
     
            <Navbar className="d-flex justify-content-end navbar-dark align-items-center bg-dark " > 
            <Container>
                <NavbarBrand style={{fontSize:'35px',fontWeight:'bold'}}>Expense Tracker</NavbarBrand>
                
                {isAuth && <Button variant="light" onClick={onLogoutHandler}>Logout</Button>}
            </Container>
                
            </Navbar>

        </Fragment> 
    )

}

export default MainNavigation;