import React from 'react'
import{ Row ,Col} from "antd";
import {  Button} from "antd";
import { Card } from 'antd';
import Footer from "../Components/Footer";



const Home = () => {
  return (
      <>    
      <div class="home">
        <h1 style={{fontSize:"45px"}}>Is your website capable of handling the traffic?</h1>
        <h2 style={{fontSize:"30px"}}>Test your website performance now</h2>
        </div>
        <div class="home2">
            <h2>Test Creation | Create scripts with LoadTest extension and Run your scripts to test Load .</h2>
        </div>
        <div>
        <Row  >
           <Col  span={12}>
             <div style={{ paddingLeft:"35%",paddingRight:"10%",paddingTop:"10%"}}>
             <h1>LoadTest  Chrome Extension</h1>
              <h3>Create Test Scripts in Minutes</h3>
              <h3>With the LoadTest Recorder, you can quickly create test scripts in minutes. 
              If you know how to use your web app, you can load test using this website regardless of your skill level or expertise.
              </h3>
             </div>
           </Col>
           <Col span={11} >
           <div>
           <img src= {require('../Components/images/recording.gif')}   className='recordingGif2'/>

           </div>

           </Col>
         </Row>
          <Row>
          <Button block type="primary" className="downloadBtn" >
              Download  LoadTest  Chrome Extension
            </Button>

          </Row>
        </div>

        <div className='div2'>
         <Row  >
           <Col  span={12}>
             <div style={{ paddingLeft:"35%",paddingRight:"10%",paddingTop:"10%"}}>
             <h1>Test Creation</h1>
              <h3>Create Test in Minutes</h3>
              <h3>Creating Load Test in Loadtest is simple and easy to use. To create Load test,create Load test button in Recording page and select the concurrent users and duration of test.It will create the test nad run it from Load test page. 
             
              </h3>
             </div>
           </Col>
           <Col span={11} >
           <div>
           <img src= {require('../Components/images/frontend.gif')}   className='recordingGif2'/>

           </div>

           </Col>
         </Row>
        
        </div>

        {/* <Footer/> */}
       </> 
  )
}

export default Home;