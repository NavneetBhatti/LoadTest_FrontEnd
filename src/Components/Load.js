import "../App.css";
import { Form, Button, Checkbox, DatePicker, Input, Select, Space ,TimePicker} from "antd";
import { useHistory } from "react-router-dom";
import React from 'react';
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ADD_COMMENT =gql`
mutation($name: String, $startTime: Float, $endTime: Float, $start:Float, $end:Float, $url: String){
    addRecording(input: {
      name: $name
      startTime: $startTime
      endTime: $endTime
      urlInfoList: {
        start: $start
        end: $end
        url: $url
      }
      
    })
  }
`;

const Load=()=>
 {

  const[addComment, { data }] = useMutation(ADD_COMMENT);

  // const history = useHistory();
  // const navigateTo = () => history.push('/');//eg.history.push('/login');




    const onSubmit =(values) => {
        console.log("----------hello ----------")
        console.log(values)
        // e.preventDefault();
        addComment({
          variables : {name: values.name, startTime:values.startTime, endTime:values.endTime, start:values.start, end:values.end, url:values.url }

        })
                console.log("test3-----");
                alert("data added successfully")

    }
    
    
  return (
    <div className="App">
      <header className="App-header">
        <h2>Add new test</h2>
        <Form
          autoComplete="off"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          onFinish={onSubmit}
         >
          <Form.Item
            name="name"
            label="Test Name"
            rules={[
              {
                required: true,
                message: "Please enter test name",
              },
              { whitespace: true },
              { min: 3 },
            ]}
            hasFeedback
          >
            <Input placeholder="Type test name" />
          </Form.Item>

          <Form.Item
            name="startTime"
            label="Start Time"
            rules={[
              {
                required: true,
                message: "Please enter date",
              },
            ]}
            hasFeedback
          >
              <Input placeholder="Type start time" />

          </Form.Item>
           {/* <Form.Item
            name="startTime"
            label="Start Time"
            rules={[
              {
                required: true,
                message: "Please enter date",
              },
            ]}
            hasFeedback
          >
            <TimePicker
              style={{ width: "100%" }}
              picker="date"
              placeholder="Chose time "
            /> */}
            
          {/* </Form.Item> */}

          <Form.Item
            name="endTime"
            label="End Time"
            rules={[
              {
                required: true,
                message: "Please enter date",
              },
            ]}
            hasFeedback
          >
             <Input placeholder="Type end time" />

          </Form.Item>

          {/* <Form.Item>
            <TimePicker
              style={{ width: "100%" }}
              picker="date"
              placeholder="Chose time "
            />
            
          </Form.Item> */}
         

          <Form.Item
            name="start"
            label="Users"
            rules={[
              {
                required: true,
                message: "Please enter no. of runs",
              },
              { whitespace: true },
              { min: 1 },            ]}
            hasFeedback
          >
            <Input placeholder="Type Runs" />
          </Form.Item>

          <Form.Item
            name="end"
            label="Total minutes"
            rules={[
              {
                required: true,
                message: "Please enter total minutes",
              },
              { whitespace: true },
              { min: 1 },            ]}
            hasFeedback
          >
            <Input placeholder="Type total minutes" />
          </Form.Item>

          
          {/* <Form.Item
            name="date"
            label="Date"
            rules={[
              {
                required: true,
                message: "Please enter date",
              },
            ]}
            hasFeedback
          >
            <DatePicker
              style={{ width: "100%" }}
              picker="date"
              placeholder="Chose date "
            /> */}
            
            

          <Form.Item
            name="url"
            label="url"
            rules={[
              {
                required: true,
                message: "Please enter test name",
              },
              { whitespace: true },
              { min: 3 },
            ]}
            hasFeedback
          >
            <Input placeholder="Type url" />
          </Form.Item>
          

          

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button block type="primary" htmlType="submit" >
              Add Test
            </Button>

          </Form.Item>
        </Form>
      </header>
    </div>
  );
}

export default Load;