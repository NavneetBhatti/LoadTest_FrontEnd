import "../App.css";
import {
  Form,
  Button,
  Checkbox,
  DatePicker,
  Input,
  Select,
  Space,
  TimePicker,
} from "antd";
import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useLocation, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

const ADD_Test = gql`
  mutation (
    $name: String!
    $recordId: String!
    $noOfUsers: Int!
    $totalMints: Int!
  ) {
    addLoadTest(
      input: {
        name: $name
        recordId: $recordId
        noOfUsers: $noOfUsers
        totalMints: $totalMints
      }
    ) {
      id
      name
      status
      totalMints
      noOfUsers
    }
  }
`;

const CreateTest = ({ state }) => {
  // const{ id ,name} = useParams();
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
  const name = new URLSearchParams(search).get("name");
  const [addComment, { data }] = useMutation(ADD_Test);
  const [loadtestName, setLoadtesName] = useState(new Date().toLocaleString());
  const history = useHistory();

  const onSubmit = (values) => {
    console.log("----------hello ----------");
    console.log(values);

    // e.preventDefault();
    addComment({
      variables: {
        name: values.name,
        recordId: id,
        noOfUsers: values.noOfUsers,
        totalMints: values.totalMints,
      },
    });

    history.push("/tests");
  };

  return (
    <div className="App">
      <Row className="recordingHeading">
        <Col span={20} offset={1} className="Col1">
          <h1>
            <b>Create Load Test for {name}</b>
          </h1>
        </Col>
      </Row>

      <Row className="row2">
        <Col span={4} offset={4} className="Col2">
          <Link to={"/recording"}>
            <Button className="back" style={{ minWidth: "100px" }}>
              Back
            </Button>
          </Link>
        </Col>

        <Col span={15} className="Col3">
          <header>
            <Form
              autoComplete="off"
              layout="vertical"
              // labelCol={{ span: 5}}
              // wrapperCol={{ span: 5 }}
              onFinish={onSubmit}
            >
              <div className="formItems">
                <Form.Item
                  name="name"
                  label="Laod Test Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Load Test Name",
                    },
                    { whitespace: true },
                    { min: 4 },
                  ]}
                  hasFeedback
                >
                  <Input
                    defaultValue={`${new Date().toLocaleString()}`}
                    autoFocus
                    value={loadtestName}
                    onChange={(e) => setLoadtesName(e.target.value)}
                  />
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
                  <Input />
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
                  <Input />
                </Form.Item>
              </div>

              <Form.Item wrapperCol={{ span: 4 }} className="formBtn">
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  className="formBtn2"
                  style={{ minWidth: "150px" }}
                >
                  Create Load Test
                </Button>
              </Form.Item>
            </Form>
          </header>
        </Col>
      </Row>
    </div>
  );
};

export default CreateTest;
