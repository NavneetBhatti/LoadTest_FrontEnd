import "../App.css";
import { Form, Button, Checkbox, DatePicker, Input, Select, Space ,TimePicker} from "antd";
import { useHistory } from "react-router-dom";
import React from 'react';
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import{ Row ,Col} from "antd";
import {Link } from "react-router-dom";







const ADD_COMMENT =gql`
mutation($name: String!, $recordId: String!, $noOfUsers: Int!, $totalMints:Int!){
  addLoadTest(input: {
    name: $name
		recordId:$recordId
    noOfUsers: $noOfUsers
    totalMints: $totalMints
  }){
    id
    name
    status
    totalMints
    noOfUsers
  }
}
`;

const CreateTest=({state})=>
 {
  const{ id ,name} = useParams();
    console.log(id)
  const[addComment, { data }] = useMutation(ADD_COMMENT);
  

  const[test, setTest] =useState({})
  



    const onSubmit =(values) => {
        console.log("----------hello ----------")
        console.log(values)
        // e.preventDefault();
        addComment({
          variables : {name: values.name, recordId:id, noOfUsers:values.noOfUsers, totalMints:values.totalMints }

        })
                console.log("test3-----");
                alert("Test added successfully")

    }


    
    
  return (
    <div className="App">

        <Row className="recordingHeading">
            <Col span={6} offset={5} className="Col1" ><h1><b>Add New Test</b></h1></Col>
            <Col span={6} offset={5} className="Col4" ><h2 className="h4"><b>{name}</b></h2></Col>

        </Row>

        <Row className="row2">
            <Col span={4} offset={5}  className="Col2"><h2><b>Test Settings</b></h2>
            <Link to={'/recording'}>
                  <Button className="back" >Back</Button>
            </Link>

            </Col>
       
      
<Col span={15} className="Col3">
      <header >
        {/* <h2>{ name }</h2> */}
      
        <Form
          autoComplete="off"
          layout="vertical"
          // labelCol={{ span: 5}}
          // wrapperCol={{ span: 5 }}
          onFinish={onSubmit}
         >

           <div className="formItems">
          
            {/* <h2 className="rec">{name}</h2> */}
           

            <Form.Item
            name="name"
            label="Laod Test Name"
            rules={[
              {
                required: true,
                message: "Please enter name of Load Test Name",
              },
              { whitespace: true },
              { min: 4 },
            ]}
            hasFeedback
          >
            {/* <Input placeholder="Type test name"  defaultValue={id}/> */}
            <Input placeholder="e.g. LoadTest 1" />

          </Form.Item>

          <Form.Item
            name="noOfUsers"
            label="Concurrent Users"
            rules={[
              {
                required: true,
                message: "Please enter number of concurrent users",
              },
            ]}
            hasFeedback
          >
              <Input placeholder="e.g. 20" />

          </Form.Item>
          

          <Form.Item
            name="totalMints"
            label="Duration(min)"
            rules={[
              {
                required: true,
                message: "Please enter Duration",
              },
            ]}
            hasFeedback
          >
             <Input placeholder="e.g. 5" />

          </Form.Item>

          </div>


         
          <Form.Item wrapperCol={{ span: 3 }} className="formBtn">
            <Button block type="primary" htmlType="submit" className="formBtn2">
              Add Test
            </Button>

          </Form.Item>
          
        </Form>
      </header>

        </Col>
      </Row>

    </div>
  );
}

export default CreateTest;