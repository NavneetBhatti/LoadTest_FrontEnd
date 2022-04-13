import "antd/dist/antd.css";
import "../App.css";
import { Button, Table, Modal, Input, Row } from "antd";
import { useState,useEffect } from "react";
import { EditOutlined, DeleteOutlined,PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import Search from "./Search";
import { useQuery,gql } from "@apollo/client"
 
export const GET_Recording =  gql`
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


 
 
 
function Home() {
  const {error, data , loading} = useQuery(GET_Recording)
  const [q, setQ] = useState("");
  const [state, setstate] = useState([]);
  const [loading2, setloading] = useState(true);
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
    key: "6",
    title: "Actions",
    render: (record) => {
      return (
        <>
          <EditOutlined
            
          />
          <DeleteOutlined
            
            style={{ color: "red", marginLeft: 12 }}
          />
        </>
      );
    },
  },
  {
 
    key: 'key',
    title: "Run Test",
    dataIndex: 'key',
 
   render: (index,record) => {
     return (
       <>
         <Button type="primary" onClick={() => runTest(record)}>
            Run Test
         </Button>
       </>
     );
   },
  },
  
 ];
 

 //search test
function search(rows){
  return rows.filter((row)=>row.name.toLowerCase().indexOf(q) > -1);
}

//run test
const runTest = (record) => {
  console.log(record);
  // setmodaldata(record);
  // setIsModalVisible(true);
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
 
 

