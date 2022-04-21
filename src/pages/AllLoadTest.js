import "antd/dist/antd.css";
import "../App.css";
import { Button, Table, Modal, Row, Col ,Input} from "antd";
import { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Search from "./Search";
import { useQuery, gql } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";


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

export const Edit_LoadTest = gql`
mutation($id:String!,$name:String,$noOfUsers:Int,$totalMints:Int){
  editLoadTest(input: {
    id: $id
    name:$name
    noOfUsers:$noOfUsers
    totalMints:$totalMints
  }
  )
}
`;

function AllLoadTest() {
  const { error, data, loading, refetch } = useQuery(GET_LoadTests,{
      refetchQueries: [{ query: GET_LoadTests }],

    // pollInterval:100,
    onCompleted: () => console.log('----called---'),

  });

 //edit ------------------------------------------
 const [isEditing, setIsEditing] = useState(false);
 const [editingTest, setEditingTest] = useState(null);
 const[editLoadTest, { data5 }] = useMutation(Edit_LoadTest,{
  refetchQueries :[
    {
      query: GET_LoadTests
    }
  ]
 });
 const onSubmit =(values) => {
  console.log("----------hello ----------")
  console.log(values)
  // e.preventDefault();
  editLoadTest({
    variables : {id:editingTest.key, name: editingTest.name, noOfUsers:editingTest.noOfUsers, totalMints:editingTest.totalMints }

  })
  setIsEditing(false);

}

// edit end----------------------------------------------



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

console.log("---test--")
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



  useEffect(() => {
      const comInterval = setInterval(getData, 30000); //This will refresh the data at regularIntervals of refreshTime.
      refetch();
  
      return () => clearInterval(comInterval); //Clear interval on component unmount to avoid memory leak
  
  }, []);  

  //fetch data
  const getData = async () => {
    console.log("---getdata---");
    //setloading(true);
    let copydata= [...data.allLoadTest];
    console.log("------array2 ----")
    console.log(copydata.reverse())
    setstate(
      copydata.map((row) => ({
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
      title: <b>Load Test Name</b>,
      dataIndex: "name",

    },
    // {
    //   key: "2",
    //   title: "Recording",
    //   dataIndex: "recordId",
    // },
    {
      key: "3",
      title: <b>Concurrennt Users</b>,
      dataIndex: "noOfUsers",
    },
    {
      key: "4",
      title: <b>Duration</b>,
      dataIndex: "totalMints",
    },
    {
      key: "5",
      title: <b>Status</b>,
      dataIndex: "status",
    },

    {
      key: "key",
      title: <b>Actions</b>,
      dataIndex: "key",

      render: (index, record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                editTest(record);
              }}
            />            <DeleteOutlined
              onClick={() => deleteLoadTest(record)}
              style={{ color: "red", marginLeft: 12 }}
            />
          

            <Button
              type="primary"
              id={record.key}
              disabled={record.status == "RUNNING"}
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
      title: "Are you sure, you want to delete this LoadTest?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDeleteTest(record.key);
        // window.location.reload(false);
        refetch();
      },
    });
  };

  //edit test
  const editTest = (record) => {
    setIsEditing(true);
    setEditingTest({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingTest(null);
  };
  

  

  return (
    <div className="App">
  

      <Row className="recordingHeading">
        <Col span={9} className="col4">
          <h1>
            <b>All Load Tests</b>
          </h1>
        </Col>
      </Row>

      {/* <Search search={search} /> */}

      <header className="App-header">
        <Table columns={columns} dataSource={state} className="tableR">
          {" "}
        </Table>

        <Modal
          title="Edit Load Test "
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
        onOk ={onSubmit}
        >
          <Input
            value={editingTest?.key}
            onChange={(e) => {
              setEditingTest((pre) => {
                return { ...pre, key: e.target.value };
              });
            }}
            type="hidden"
          />
          <h4>Load Test Name</h4>
          <Input
            value={editingTest?.name}
            onChange={(e) => {
              setEditingTest((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
          /><br/><br/>

          <h4>Concurrent Users</h4>
          <Input
            value={editingTest?.noOfUsers}
            onChange={(e) => {
              setEditingTest((pre) => {
                return { ...pre, noOfUsers: e.target.value };
              });
            }}
          /><br/><br/>

          <h4>Duration</h4>
          <Input
            value={editingTest?.totalMints}
            onChange={(e) => {
              setEditingTest((pre) => {
                return { ...pre, totalMints: e.target.value };
              });
            }}
          />
        </Modal>
      </header>
    </div>
  );
}

export default AllLoadTest;
