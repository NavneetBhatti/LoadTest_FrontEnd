import React from 'react';

function Video(props){
    return(
        <div>
            <h1>test</h1>
            {/* <a href={props.item.url}>{props.item.title}</a> - Author: {props.item.author.name} */}
            {/* <a href={props.item.startTime}>{props.item.endTime}</a> -  */}
            Author: {props.item.urlInfoList.start}
           
        </div>
        
    );
}

export default Video;

// {
//     allRecordings{
//       id
//       startTime
//       endTime
//       urlInfoList{
//         start
//         end
//         url
//       }
//     }
//   }



const columnsUrl = [
    {
      key: "6",
      title: "url",
      dataIndex: "URL",
  
    },
    {
      key: "7",
      title: "Start Time",
      dataIndex: "UrlStartTime",
  
    },
    {
      key: "8",
      title: "End Time",
      dataIndex: "UrlEndTime",
    },
]

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
        <li>{t.id}</li> 
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
   