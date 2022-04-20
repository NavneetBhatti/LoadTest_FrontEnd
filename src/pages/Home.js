import React from 'react'
import{ Row ,Col} from "antd";
import {  Button} from "antd";



const Home = () => {
  return (
      <>    
      <div class="home">
        <h1>Your site has a breaking point !!</h1>
        <h2>Let's find it before your users do</h2>
        </div>
        <div class="home2">
            <h2>Test Creation | Create scripts with LoadTest extension and Run your scripts to Load test .</h2>
        </div>
        <div>
          <Row>
            <Col className='c1'span={12}>
            <h2>LoadTest Recording Chrome Extension</h2>
            </Col>

            <Col className='c2' span={12}>
            {/* <img src= {require('../Components/images/test.png')} /> */}
            <Button block type="primary" className="downloadBtn" >
              Download  LoadTest  Recorder Extension
            </Button>

            </Col>
          </Row>
        </div>
       </> 
  )
}

export default Home;