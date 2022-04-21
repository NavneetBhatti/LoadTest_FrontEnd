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
import Footer from "./Components/Footer";
import Recordings from "./pages/Recordings";
import Home from "./pages/Home";
import Details from "./pages/Details";





const App = () => {
  
 
  return (
    <Router>
        <Navbar />
       <Switch>
            <Route exact path="/tests" component={AllLoadTest} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/load" component={CreateTest} />
            {/* <Route exact path="/load" component={CreateTest} /> */}
            <Route exact path="/" component={Home} />

            <Route exact path="/recording" component={Recordings} />
            <Route exact path="/details" component={Details} />

        </Switch>
         <Footer/>
    </Router>

    
  );
}

export default App;