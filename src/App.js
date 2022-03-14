import "antd/dist/antd.css";
import "./App.css";
import { Button, Table, Modal, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Test from './Components/Test';
import Home from './Components/Home';
import Load from './Components/Load';
import Navbar from "./Components/Navbar/Navbar";
import Recording from "./Components/Recording";
import Result from "./Components/Result";
import CharactersList from "./pages/CharactersList";
import Temp from "./Components/Temp";


const App = () => {
  
 
  return (
    <Router>
        <Navbar />
       <Switch>
       <Route exact path="/test" component={Test} />
       <Route exact path="/" component={Home} />
       <Route exact path="/load" component={Load} />
       <Route exact path="/recording" component={Temp} />
       <Route exact path="/result" component={Result} />

       </Switch>
    </Router>

    
  );
}

export default App;