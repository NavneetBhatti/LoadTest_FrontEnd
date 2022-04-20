import "antd/dist/antd.css";
import "../App.css";
import { Button, Table, Modal, Input, Row ,Col} from "antd";
import { useState,useEffect } from "react";
import {  DeleteOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import Search from "./Search";
import { useQuery,gql } from "@apollo/client"
import {Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";



 
 
export const GET_Recording =  gql`
query{
 allRecordings{
   id
   name
   startTime
   endTime
   urlInfoList{
     start
     end
     url
   }
 }
}
`

export const delete_recording = gql`
mutation($id:String){
  deleteRecording(id:$id){
    id
    name
    startTime
    endTime
    urlInfoList{
      id
      url
      start
      end
    }
  }
}
`;



function Recordings() {
 const [isModalVisible, setIsModalVisible] = useState(false);
 const [data2, setdata] = useState([]);
 const [modaldata, setmodaldata] = useState([]);
 const showModal = (record) => {
   console.log("-----record..")
   console.log(record);
   setmodaldata(record);
   setIsModalVisible(true);
 };
 const[deleteRec, { data3 }] = useMutation(delete_recording,{
   refetchQueries :[
     {
       query: GET_Recording
     }
   ]
 });

 
 const handleOk = () => {
   setIsModalVisible(false);
 };
 
 const handleCancel = () => {
   setIsModalVisible(false);
 };
 
 
 
 const {error, data , loading} = useQuery(GET_Recording)
 
 const [q, setQ] = useState("");
 
 const [state, setstate] = useState([]);
 
 const [loading2, setloading] = useState(true);
 useEffect(() => {
   getData();
 }, [loading, data]);
 useEffect(() => {
  getData();
}, [data3]);
 
 
 //fetch data
 const getData = async () => {
   setloading(false);
   let copydata= [...data.allRecordings];
   console.log("------array2 ----")
   console.log(copydata.reverse())
    
   setstate(
   copydata.map(row => ({
 
   key: row.id.toString(),
   name: row.name,
   StartTime: new Date(row.startTime).toLocaleTimeString("en-US"),
   EndTime: new Date(row.endTime).toLocaleTimeString("en-US"),
   urlID:  row.urlInfoList.map((t)=>
       <li>{t.url}</li> 
         )  ,  
   URL:  row.urlInfoList.map((t)=>
         <li>{t.url}</li> 
            )  ,  
   UrlStartTime:  row.urlInfoList.map((t)=>
            <li>{new Date(t.start).toLocaleTimeString("en-US")}</li> 
                     )  , 
   UrlEndTime:  row.urlInfoList.map((t)=>
             <li>{new Date(t.end).toLocaleTimeString("en-US")}</li> 
                       ) 
    }))         
 );
 };
 
 
 
const columns = [
   {
     key: "1",
     title: "Recording Name",
     dataIndex: "name",
     align: 'center'

   },
   {
     key: "2",
     title: "Start Time",
     dataIndex: "StartTime",
     align: 'center'
 
   },
   {
     key: "3",
     title: "End Time",
     dataIndex: "EndTime",
     align: 'center'

   },
   {
 
     key: 'key',
     title: "Actions",
     align: 'center',

     dataIndex: 'key',

    render: (index,record) => {
      return (
        <>
          <Button type="primary" onClick={() => showModal(record)}  style={{marginRight:"0px"}}>
             Details
          </Button>

          <Link to={`/load/${record.key}/${record.name}`}>
              <Button type="primary"   onClick={() => {onAddRecord(record); }} style={{marginLeft:"15px"}}>
                Create Load Test
              </Button>
          </Link>


          
          <DeleteOutlined
              onClick={() => deleteRecording(record)}
              style={{ color: "red", paddingLeft: "90px" }}
            />
        </>
      );
    },
   },
  
  
 ];


 //add recording
const onAddRecord = (record) => {
  setstate((pre) => {
    return pre.filter((recording) => recording.id !== record.id);
  });
};

 
 
 
 //delete  test
 const deleteRecording = (record) => {
  console.log("---delete rec **");
  console.log(record.key);
  //setDeleteTest(record.key);
  // window.location.reload(false);
  Modal.confirm({
    title: "Are you sure, you want to delete this LoadTest?",
    okText: "Yes",
    okType: "danger",
    onOk: () => {
      deleteRec({
        variables : {id: record.key}
      })
      // setDeleteTest(record.key);
      // // window.location.reload(false);
      // refetch();
    },
  });
  
};
 
 
//search recording
function search(rows){
 return rows.filter((row)=>row.name.toLowerCase().indexOf(q) > -1);
}
 
 
return (
 
     <div className="App">
      <Row className="recordingHeading">
          <Col span={4} offset={2} style={{paddingRight: "30px"}}><h1><b>Recordings</b></h1></Col>
      </Row>
     


       <Search search={search}/>
       <header className="App-header">
      
       <Table columns={columns} dataSource={state} className="tableR"  align='center' >
 
       </Table>
    
       </header>
 
 
       <Modal
       title={modaldata.name}
       visible={isModalVisible}
       onOk={handleOk}
       onCancel={handleCancel}
       width={1000}
       >
         <table border="0">
         <tr>
             <th>URL</th>
             <th>Start Time</th>
             <th>End Time</th>
 
           </tr>
           <tr>
             <td>{modaldata.URL}</td>
             <td>{modaldata.UrlStartTime}</td>
             <td>{modaldata.UrlEndTime}</td>
 
           </tr>
         </table>
     
 
      
     </Modal>
 
    
 
   
   </div>
 );
}
 
export default Recordings; 
 
