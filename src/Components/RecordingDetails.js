import "antd/dist/antd.css";
import "../App.css";
import { Button, Table, Modal, Input, Row } from "antd";
import { useState,useEffect } from "react";
import { EditOutlined, DeleteOutlined,PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { useQuery,gql } from "@apollo/client"
import {Link } from "react-router-dom";
import { useParams } from "react-router-dom";


export const GET_Recording =  gql`
query($id : ID! ){
    getRecording(id:$id){
      urlInfoList{
        id
        url
        start
        end
      }
    }
  }
`

// export const GET_Recording =  gql`
// {
//     getRecording(id:"a0bdc1bd-0004-4efe-9a10-0defe3a112cd"){
//       urlInfoList{
//         id
//         url
//         start
//         end
//       }
//     }
//   }
// `


 function RecordingDetails() {
    const{ id ,name} = useParams();

    // const id='dfdeee79-20a2-4187-b468-558d93bcf125';

    // const { loading, data } = useQuery(GET_Recording, {
    //     variables: { id: "dfdeee79-20a2-4187-b468-558d93bcf125"},
    //   });
    const { loading, data } = useQuery(GET_Recording, {
        variables: { id: id},
      });
    
    useEffect(() => {
        if (data && data?.post) {
           console.log("data: ", data?.post);
        }
    }, [data]);
    

    //const {error, data , loading} = useQuery(GET_Recording)

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

    data.getRecording.urlInfoList.map(row => ({

    key: row.id.toString(),
    url: row.url,
    start: new Date(row.start).toLocaleTimeString("en-US"),
    end: new Date(row.end).toLocaleTimeString("en-US"),
    
     }))  
             
  );
  console.log("---test---")
  console.log(state)
};

  


const columns = [
    {
      key: "1",
      title: "URL",
      dataIndex: "url",

    },
    {
      key: "2",
      title: "Start Time",
      dataIndex: "start",

    },
    {
      key: "3",
      title: "End Time",
      dataIndex: "end",
    },
    
    
  ];











return (
   
      <div className="App">

        <header className="App-header">
        <h3>Recording Details of {name}</h3>

        <Table columns={columns} dataSource={state} className="tableR" rowSelection={true}>

        </Table>
      
        </header>

     
    </div>
  );
}

export default RecordingDetails;  

