import { Row } from "antd";
import React from "react";
import "../App.css";

function Details() {
  return (
    <div className="detailPage">
      <Row style={{ marginTop: "50px" }}>
        <h1>Getting Started</h1>
      </Row>

      <div>
        <div>
          <h2>Download LoadTest Chrome extention</h2>
          <br />
        </div>
        <div>
          <img
            src={require("../Components/images/downloadExt.gif")}
            className="details"
          />
        </div>
      </div>
      <br />
      <br />
      <div>
        <h2>Create scripts with LoadTest extension </h2>
        <br />
        <h3>
          Chrome extension can record real time activities of a user over a
          browser such as how long is user spending time on a single URL and
          save it to the recordings
          <br />
          Click on start button to record the scripts and after completion of
          recording click on stop button ,it will svae the recording.
        </h3>
        <br />

        <img
          src={require("../Components/images/rec.jpeg")}
          className="details"
        />
      </div>
      <br />
      <br />
      <div>
        <h2>Create LoadTest</h2>
        <br />
        <h3>
          RECORDING PAGE
          <br />
          - You can see the list of recording which is recorded by extension{" "}
          <br />
          - There is the option of a Details button which will display the list
          of URLs in each recording and what time is spent on each URL
          <br />
          - If you wants to load that recording in load runner it has the option
          of creating a load test
          <br />
          - Once clicked on a button it will redirect to a new page where the
          user needs to input concurrent user and time duration
          <br />
          eg: concurrent users are 5 and the time duration is 5 minutes that is
          5 different users will perform the same task for 5 minutes
          <br />
        </h3>
        <img
          src={require("../Components/images/recordings.png")}
          className="details"
        />
        <br />
        <br />

        <img
          src={require("../Components/images/loadTest.png")}
          className="details"
        />
        <br />
        <br />
        <h3>
          LOAD TEST PAGE
          <br />
          - It will display the name of the load test such as date and time as
          the default name <br />
          - It will display the number of concurrent users and Duration of test{" "}
          <br />
          - It will display the status of the load test and refresh
          automatically when test finished <br />
          - Run button will disabled when load test is running <br />
          - User has the option of delete the test
          <br />
        </h3>
        <img
          src={require("../Components/images/runTest.png")}
          className="details"
        />
        <br />
      </div>
    </div>
  );
}

export default Details;
