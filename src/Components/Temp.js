import "antd/dist/antd.css";
import "../App.css";
import { Button, Table, Modal, Input, Row } from "antd";
import { useState,useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import CharactersList from "../pages/CharactersList";
import Search from "./Search";
import { useQuery,gql } from "@apollo/client"
import axios from 'axios';
import { AudioOutlined } from '@ant-design/icons';


const GET_CHARACTERS =  gql`
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


// export default function home() {

 function Temp() {
  const {error, data , loading} = useQuery(GET_CHARACTERS)
  const history = useHistory();
  const navigateTo = () => history.push('/load');//eg.history.push('/login'); 
  const [q, setQ] = useState("");
  // const [dataSource, setDataSource] = useState([
  //   {
  //     id: 1,
  //     name: "Recording1",
  //     StartTime: "8:00 AM",
  //     EndTime: "20",
  //     URL : "https://www.youtube.com/watch?v=NbKJFRgsw-A&ab_channel=PragmaticReviews",
  //   },
    
  // ]);  

  


  const [dataSource, setDataSource] = useState(  
    
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

  


  const columns = [
    // {
    //   key: "1",
    //   title: "ID",
    //   dataIndex: "id",

    // },
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
    // {
    //   key: "4",
    //   title: "URL",
    //   dataIndex: "URL",

    // },
    // {
    //   key: "5",
    //   title: "URL Start Time",
    //   dataIndex: "UrlStartTime",

    // },
    // {
    //   key: "6",
    //   title: "URL End Time",
    //   dataIndex: "UrlEndTime",

    // },
    {
      key: "4",
      title: "Actions",

      render: (record) => {
        return (
        
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
        );
      },
    },
    
  ];

  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this  record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };


function search(rows){
  return rows.filter((row)=>row.name.toLowerCase().indexOf(q) > -1);
}

return (
   
      <div className="App">
          <Search search={search}/>

          {/* <input type="text" value={q} onChange={(e)=>setQ(e.target.value)}/> */}
       <header className="App-header">
        
        {/* <Table columns={columns} dataSource={dataSource} className="tableR"></Table> */}

        <Table columns={columns} dataSource={search(dataSource)} className="tableR" 
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
}}></Table>

       
      </header>

     
    </div>
  );
}

export default Temp;  

