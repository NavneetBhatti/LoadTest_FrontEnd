import "antd/dist/antd.css";
import "../App.css";
import { Button, Table, Modal, Input, Row } from "antd";
import { useState,useEffect } from "react";
import { EditOutlined, DeleteOutlined,PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import Search from "./Search";
import { useQuery,gql } from "@apollo/client"
 
export const GET_LoadTests =  gql`
query{
  allLoadTest{
    id
    name
    recordId
    noOfUsers
    totalMints
    status
  }
}
`


export const Run_loadTest =  gql`
query($id : String)
{
  runLoadTest(id: $id)
}
`




 
 
 
function Home() {
  const {error, data , loading} = useQuery(GET_LoadTests)
  
  const [q, setQ] = useState("");
  const [state, setstate] = useState([]);
  const [loading2, setloading] = useState(true);
  const [test, setTest] = useState([]);
  const[loadTest, setLoadTest] = useState([]);
  const { loading3, data3 } = useQuery(Run_loadTest, {
    variables: { id: test},
  });

 useEffect(() => {
   getData();
 }, [loading, data]);
 
 
 //fetch data
 const getData = async () => {
   setloading(false);
       setstate(
 
    data.allLoadTest.map(row => ({
 
   key: row.id.toString(),
   name: row.name,
   recordId: row.recordId,
   noOfUsers: row.noOfUsers,
   totalMints:  row.totalMints,
   status:  row.status
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
    key: 'key',
    title: "Actions",
    dataIndex: 'key',

    render: (index,record) => {
      return (
        <>
          <EditOutlined
            
          />
          <DeleteOutlined
            
            style={{ color: "red", marginLeft: 12 }}
          />

        <Button type="primary" onClick={() => runTest(record)}  style={{marginLeft:"50px"}}>
            Run Test
         </Button>
          
        </>
      );
    },
  },
  // {
 
  //   key: 'key',
  //   title: "Run Test",
  //   dataIndex: 'key',
 
  //  render: (index,record) => {
  //    return (
  //      <>
  //        <Button type="primary" onClick={() => runTest(record)}>
  //           Run Test
  //        </Button>
  //      </>
  //    );
  //  },
  // },
  
 ];
 

 //search test
function search(rows){
  return rows.filter((row)=>row.name.toLowerCase().indexOf(q) > -1);
}

//run test
const runTest = (record) => {
  console.log("---run test **")
  console.log(record.key);
  setTest(record.key);
  // addComment({
  //   variables : {name: values.name, recordId:id, noOfUsers:values.noOfUsers, totalMints:values.totalMints }

  // })
};

useEffect(() => {
  runLoadTest();
}, [loading, data3]);

//run  load test
const runLoadTest = async () => {
  setloading(false);
      setLoadTest(
     data3.Run_loadTest.map(row => ({

      runLoadTest:row.runLoadTest,
        

  //  data.allLoadTest.map(row => ({

  // key: row.id.toString(),
  // name: row.name,
  // recordId: row.recordId,
  // noOfUsers: row.noOfUsers,
  // totalMints:  row.totalMints,
  // status:  row.status
   }))         
);
};
 
 
 
 
return (
 
     <div className="App">
       <Search search={search}/>
       <header className="App-header">
      
       <Table columns={columns} dataSource={state} className="tableR" > </Table>
    
       </header>
 
   
   </div>
 );
}
 
export default Home; 
 
 

