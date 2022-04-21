import "antd/dist/antd.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AllLoadTest from './pages/AllLoadTest';
import CreateTest from './pages/CreateTest';
import Navbar from "./Components/Navbar/Navbar";
import Recordings from "./pages/Recordings";
import Home from "./pages/Home";




const App = () => {
  
 
  return (
    <Router>
        <Navbar />
       <Switch>
            <Route exact path="/tests" component={AllLoadTest} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/load" component={CreateTest} />
            {/* <Route exact path="/load" component={CreateTest} /> */}

            <Route exact path="/recording" component={Recordings} />
        </Switch>
    </Router>

    
  );
}

export default App;