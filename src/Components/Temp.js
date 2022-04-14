import "antd/dist/antd.css";
import "../App.css";
import { Button, Table, Modal, Input, Row ,Col} from "antd";
import { useState,useEffect } from "react";
import { EditOutlined, DeleteOutlined ,PlusOutlined} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import Search from "./Search";
import { useQuery,gql } from "@apollo/client"
import {Link } from "react-router-dom";
import { AlignType } from 'rc-table/lib/interface'



 
 
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
 
 
 
function Temp() {
 const [isModalVisible, setIsModalVisible] = useState(false);
 const [data2, setdata] = useState([]);
 const [modaldata, setmodaldata] = useState([]);
 const showModal = (record) => {
   console.log("-----record")
   console.log(record);
   setmodaldata(record);
   setIsModalVisible(true);
 };
 
 const handleOk = () => {
   setIsModalVisible(false);
 };
 
 const handleCancel = () => {
   setIsModalVisible(false);
 };
 
 
 
 const {error, data , loading} = useQuery(GET_Recording)
 
 const history = useHistory();
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
 
           data.allRecordings.map(row => ({
 
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
 
   },
   {
     key: "2",
     title: "Start Time",
     dataIndex: "StartTime",
 
   },
   {
     key: "3",
     title: "End Time",
     dataIndex: "EndTime",
   },
   {
 
     key: 'key',
     title: "Actions",
     dataIndex: 'key',
  
    render: (index,record) => {
      return (
        <>
          <Button type="primary" onClick={() => showModal(record)}>
             Details
          </Button>

          <Link to={`/load/${record.key}/${record.name}`}>
              <Button type="primary"   onClick={() => {onAddRecord(record); }} style={{marginLeft:"5px"}}>
                Add Test
              </Button>
          </Link>
          <Link to={`/recordingDetails/${record.key}/${record.name}`}>
              <Button type="primary"    style={{marginLeft:"5px"}}>
                det
              </Button>
          </Link>


          {/* <DeleteOutlined
            
            style={{ color: "red", marginLeft: 12 }}
          /> */}
        </>
      );
    },
   },
  
  //  {
  //    key: "5",
  //    title: "Actions",
  //    align: "center",
 
  //    render: (record) => {
  //      return (
      
  //          <DeleteOutlined
  //            onClick={() => {
  //              onDeleteRecord(record);
  //            }}
  //            style={{ color: "red", marginLeft: 12 }}
  //          />
  //      );
  //    },
  //  },
  
 ];


 //add recording
const onAddRecord = (record) => {
  setstate((pre) => {
    return pre.filter((recording) => recording.id !== record.id);
  });
};

 
 
 
 //delete recording
 const onDeleteRecord = (record) => {
   Modal.confirm({
     title: "Are you sure, you want to delete this  record?",
     okText: "Yes",
     okType: "danger",
     onOk: () => {
       setstate((pre) => {
         return pre.filter((recording) => recording.id !== record.id);
       });
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
          <Col span={8}><h1><b>Recordings</b></h1></Col>
      </Row>
     


       <Search search={search}/>
         {/* <input type="text" value={q} onChange={(e)=>setQ(e.target.value)}/> */}
       <header className="App-header">
      
       <Table columns={columns} dataSource={state} className="tableR" >
 
       </Table>
    
       </header>
 
 
       <Modal
       title={modaldata.name}
       visible={isModalVisible}
       onOk={handleOk}
       onCancel={handleCancel}
       width={1000}
       >
         <table border="1">
         <tr>
             <th>URL</th>
             <th>Start Time</th>
             <th>Url EndTime</th>
 
           </tr>
           <tr>
             <td>{modaldata.URL}</td>
             <td>{modaldata.UrlStartTime}</td>
             <td>{modaldata.UrlEndTime}</td>
 
           </tr>
         </table>
     
         {/* <Table columns={columns} dataSource={modaldata.URL} className="tableR" > */}
 
{/* </Table> */}
 
      
     </Modal>
 
    
 
   
   </div>
 );
}
 
export default Temp; 
 
