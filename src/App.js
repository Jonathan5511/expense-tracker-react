import { Switch,Route,Redirect } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AuthContext from './store/auth-context'
import {useContext} from 'react'
import Welcome from "./pages/Welcome";
import UpdateProfile from "./pages/UpdateProfile";
import Layout from "./components/Layout/Layout";
import ForgotPass from "./pages/ForgotPass";

function App() {
  const authCtx = useContext(AuthContext)
  return (
    <div >
    <Layout>
    <Switch>
      <Route path='/' exact>
        <Signup/>
      </Route>
      <Route path='/login'>
        <Login/>
      </Route>
      <Route path='/welcome'>
        {authCtx.isLoggedIn && <Welcome/>}
        {!authCtx.isLoggedIn && <Redirect to='/'/>}
      </Route>
      <Route path='/profile'>
        {authCtx.isLoggedIn && <UpdateProfile/>}
        {!authCtx.isLoggedIn && <Redirect to='/'/>}
      </Route>
      <Route path='/forgot'>
        <ForgotPass/>
      </Route>
    </Switch>
    </Layout>
    </div>
  );
}

export default App;
