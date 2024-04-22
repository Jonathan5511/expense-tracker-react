import { Switch,Route } from "react-router-dom";
import Signup from "./pages/Signup";
function App() {
  return (
    <Switch>
      <Route path='/'>
        <Signup/>
      </Route>
    </Switch>
  );
}

export default App;
