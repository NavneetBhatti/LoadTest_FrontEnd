import "antd/dist/antd.css";
import "../App.css";
import { Button, Table, Modal, Input, Row } from "antd";
import { useState,useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import Search from "./Search";
import { useQuery,gql } from "@apollo/client"


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
      key: "4",
      title: "Actions",

      render: (record) => {
        return (
        
            <DeleteOutlined
              onClick={() => {
                onDeleteRecord(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
        );
      },
    },
    
  ];


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
        <Search search={search}/>
          {/* <input type="text" value={q} onChange={(e)=>setQ(e.target.value)}/> */}
        <header className="App-header">
        
        <Table columns={columns} dataSource={state} className="tableR" rowSelection={true}
        expandable={{
        expandedRowRender: (record) => {
    
        return(
            <table class="nestedTable"> 
              <tr>   
                <th class="one">URL</th>
                <th class="two">Url Start Time</th>
               <th class="three">URL End Time</th>
             </tr>
             <tr class= "trv">   
               <td class="one">{record.URL}</td>
               <td class="two">{record.UrlStartTime}</td>
              <td class="three">{record.UrlEndTime}</td>
            </tr>
          </table>
        );
        }
        }}>

        </Table>
      
        </header>

     
    </div>
  );
}

export default Temp;  

