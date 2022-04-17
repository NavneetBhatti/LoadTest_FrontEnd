import "antd/dist/antd.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AllLoadTest from './pages/AllLoadTest';
import CreateTest from './pages/CreateTest';
import Navbar from "./Components/Navbar/Navbar";
import Recordings from "./pages/Recordings";



const App = () => {
  
 
  return (
    <Router>
        <Navbar />
       <Switch>
            <Route exact path="/" component={AllLoadTest} />
            <Route exact path="/load/:id/:name" component={CreateTest} />
            <Route exact path="/recording" component={Recordings} />
        </Switch>
    </Router>

    
  );
}

export default App;