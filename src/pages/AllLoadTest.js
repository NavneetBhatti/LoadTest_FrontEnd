import "antd/dist/antd.css";
import "../App.css";
import { Button, Table, Modal, Row, Col } from "antd";
import { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Search from "./Search";
import { useQuery, gql } from "@apollo/client";

export const GET_LoadTests = gql`
  query {
    allLoadTest {
      id
      name
      recordId
      noOfUsers
      totalMints
      status
    }
  }
`;

export const Run_loadTest = gql`
  query ($id: String) {
    runLoadTest(id: $id)
  }
`;

export const delete_loadTest = gql`
  query ($id: String) {
    deleteLoadTest(id: $id)
  }
`;

function AllLoadTest() {
  const { error, data, loading, refetch } = useQuery(GET_LoadTests,{
      refetchQueries: [{ query: GET_LoadTests }],

    pollInterval:70000,
    onCompleted: () => console.log('----called---'),

  });

  const [q, setQ] = useState("");
  const [state, setstate] = useState([]);
  //const [loading2, setloading] = useState(true);
  const [test, setTest] = useState('');
  const [deleteTest, setDeleteTest] = useState([]);

  const [loadTest, setLoadTest] = useState([]);
  const { loading3, data3 } = useQuery(Run_loadTest, {
    variables: { id: test },
  });

  const { loading4, data4 } = useQuery(delete_loadTest, {
    variables: { id: deleteTest },
    fetchPolicy:"cache-and-network",
    refetchQueries: [{ query: GET_LoadTests }],
  });


  useEffect(() => {
    getData();
    refetch();
  }, [data4]); 

  // useEffect(() => {
  //   getData();
  //   refetch();
  // }, [data,loading,data3,data4,test,deleteTest]);
  useEffect(() => {
      refetch();
      getData();
      console.log("---useEffect running--")
    }, [data,deleteTest,test]);

  //fetch data
  const getData = async () => {
    console.log("---getdata--test-");
    //setloading(true);
    setstate(
      data.allLoadTest.map((row) => ({
        key: row.id.toString(),
        name: row.name,
        recordId: row.recordId,
        noOfUsers: row.noOfUsers,
        totalMints: row.totalMints,
        status: row.status,
      }))
    );
  };

  const columns = [
    {
      key: "1",
      title: "Load Test Name",
      dataIndex: "name",
    },
    {
      key: "2",
      title: "Recording",
      dataIndex: "recordId",
    },
    {
      key: "3",
      title: "No. of Users",
      dataIndex: "noOfUsers",
    },
    {
      key: "4",
      title: "Total Minutes",
      dataIndex: "totalMints",
    },
    {
      key: "5",
      title: "Status",
      dataIndex: "status",
    },

    {
      key: "key",
      title: "Actions",
      dataIndex: "key",

      render: (index, record) => {
        return (
          <>
            {/* <EditOutlined /> */}
            <DeleteOutlined
              onClick={() => deleteLoadTest(record)}
              style={{ color: "red", marginLeft: 12 }}
            />
          

            <Button
              type="primary"
              id={record.key}
              disabled={record.status == "PROCESSING"}
              onClick={() => runTest(record)}
              style={{ marginLeft: "50px" }}
            >
              Run Test
            </Button>
          </>
        );
      },
    },
  ];

  //search test
  function search(rows) {
    return rows.filter((row) => row.name.toLowerCase().indexOf(q) > -1);
  }

  //run test
  const runTest = (record) => {
    console.log("---run test **");
    console.log(record.key);
    setTest(record.key);
  };

  //delete  test
  const deleteLoadTest = (record) => {
    console.log("---delete test **");
    console.log(record.key);
    //setDeleteTest(record.key);
    // window.location.reload(false);
    Modal.confirm({
      title: "Are you sure, you want to delete this Recording?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDeleteTest(record.key);
        // window.location.reload(false);
        refetch();
      },
    });
  };
  

//   useEffect(() => {
//     const comInterval = setInterval(getData, 30000); //This will refresh the data at regularIntervals of refreshTime
//     return () => clearInterval(comInterval); //Clear interval on component unmount to avoid memory leak
//   }, [loading, data]);

  return (
    <div className="App">
    <h1>  {deleteTest}</h1>
    <h1>  {data4}</h1>

      <Row className="recordingHeading">
        <Col span={9} className="col4">
          <h1>
            <b>All Load Tests</b>
          </h1>
        </Col>
      </Row>

      <Search search={search} />

      <header className="App-header">
        <Table columns={columns} dataSource={state} className="tableR">
          {" "}
        </Table>
      </header>
    </div>
  );
}

export default AllLoadTest;
