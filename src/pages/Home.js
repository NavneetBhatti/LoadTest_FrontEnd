import React from 'react'
import{ Row ,Col} from "antd";
import {  Button} from "antd";
import { Card } from 'antd';



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
          <Row  className='row1'>

            <Col className='c1'span={9} offset={2}>
            {/* <h2 className="h2">LoadTest Recording Chrome Extension</h2> */}
            <div className="site-card-border-less-wrapper">
            <Card style={{ width: "140%" ,height:"130%" }}>
              <h1>LoadTest  Chrome Extension</h1>
              <h3>Create Test Scripts in Minutes</h3>
              <h3>With the LoadTest Recorder, you can quickly create test scripts in minutes. 
              If you know how to use your web app, you can load test using this website regardless of your skill level or expertise.
              </h3>
            </Card>
            </div>
            </Col>

            <Col className='c2' span={10} offset={1}>
            <img src= {require('../Components/images/recording.gif')}   className='recordingGif'/>
            </Col>
          </Row>
          <Row>
          <Button block type="primary" className="downloadBtn" >
              Download  LoadTest  Chrome Extension
            </Button>

          </Row>
        </div>

        <div>
          <Row  className='row1'>

            <Col className='c1'span={9} offset={2}>
            {/* <h2 className="h2">LoadTest Recording Chrome Extension</h2> */}
            <div className="site-card-border-less-wrapper">
            <Card style={{ width: "140%" ,height:"130%" }}>
              <h1>Create and Run Load Tests</h1>
              <h3>Create Test Scripts in Minutes</h3>
              <h3>With the LoadTest Recorder, you can quickly create test scripts in minutes. 
              If you know how to use your web app, you can load test using this website regardless of your skill level or expertise.
              </h3>
            </Card>
            </div>
            </Col>

            <Col className='c2' span={10} offset={1}>
            <img src= {require('../Components/images/recording.gif')}   className='recordingGif'/>
            </Col>
          </Row>
          
        </div>
       </> 
  )
}

export default Home;