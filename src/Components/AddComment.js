import React from 'react';
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
// import {GET_Recording} from './App'

// const ADD_COMMENT =gql`
//     mutation addComment($author: String, $text:String){
//         addComment(author:$author, text:$text){
//             author
//             text
//         }
//     }
// `;

const ADD_COMMENT =gql`
mutation($name: String, $startTime: Float, $endTime: Float, $start:Float, $end:Float, $url: String){
    addRecording(input: {
      name: $name
      startTime: $startTime
      endTime: $endTime
      urlInfoList: {
        start: $start
        end: $end
        url: $url
      }
      
    })
  }
`;




// const ADD_COMMENT2 =gql`
//   mutation createVideo($title: String!, $url: String!, $userId: String!){
//       createVideo(input: { title: $title, url: $url, userId: $userId}) {
//           id
//           title
//           url
//           author{
//               id
//               name
//           }
//       }
//   }
  
// `;

// export const AddComment = () =>{
//     const[addComment, { data }] = useMutation(ADD_COMMENT);

//     const onSubmit =(e) => {
//         e.preventDefault();

//         const {author, text} = e.target.elements;

//         if(!author.value || !text.value){
//             return
//         }

//         addComment({
//             variables : {author: author.value, text:text.value}
//         })
//     }

export const AddComment = () =>{
   

    const[addComment, { data }] = useMutation(ADD_COMMENT);

    const onSubmit =(e) => {
        console.log("----------hello ----------")
        console.log(e)
        e.preventDefault();

        const {name, startTime, endTime, start, end, url} = e.target.elements;
        console.log(e.target.elements)

        if(!name.value || !startTime.value || !endTime.value || !start.value || !end.value || !url.value){
            return
        }

        addComment({
            variables : {name: name.value, startTime:startTime.value, endTime:endTime.value, start:start.value, end:end.value, url:url.value }
        })
    }

    return(
        

         <form onSubmit={onSubmit}>
       

           <div>
               <label>Name</label>
               <input type="text" name="name"/>
           </div>
           <div>
               <label>start time</label>
               <input type="text" name="startTime"/>
           </div>
           <div>
               <label>end time</label>
               <input type="text" name="endTime"/>
           </div>
           <div>
               <label>start</label>
               <input type="text" name="start"/>
           </div>
           <div>
               <label>end </label>
               <input type="text" name="end"/>
           </div>
           <div>
               <label>url </label>
               <input type="text" name="url"/>
           </div>
           <input type="submit" value="Submit" />

         </form>

    )
}