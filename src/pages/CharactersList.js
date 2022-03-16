import React from 'react';
import { useQuery,gql } from "@apollo/client"

// const GET_CHARACTERS =  gql`
// query{
//   characters{
    
//     results{
//       id
//       name
//       image
//     }
//   }
// }
// `;

// query{
//   characters{
//     results{
//       id
//       name
//       image
//     }
//   }
// }

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


export default function CharactersList(){
    const {error, data , loading} = useQuery(GET_CHARACTERS)
    console.log(error, loading, data);
    if (loading) return <div>Spinner---</div>;
    if (error) return <div>wrong------</div>;

    

    
    return(
      <div>
        <h1>Recordings</h1>
        <table border="2"> 
            <tr>
                <th>Recording Name</th>
                <th>Start time</th>
                <th>End time</th>
                <th>URL</th>
                <th>URL Start time</th>
                <th>URL End time</th>
            </tr>
   
            {data.allRecordings.map((character) => {
                              const update = new Date(character.endTime * 1000).toLocaleDateString('en-US');

            return(
            <>
            <tr>              
                <td>   <h2>{character.name}</h2>  </td>
                <td>    <h2>{character.startTime }</h2> </td>
                {/* <td>  <h2>{character.endTime}</h2> </td> */}
                      <td>  <h2>{update}</h2> </td>
                <td>
                {character.urlInfoList.map((t) => {
                return(
                  <div>
                    <td><h2>{t.url}</h2> </td>
                  </div>
                 );

                })
                }
                </td>

                <td>
                   {character.urlInfoList.map((t) => {
                      return(
                      <div>
                          <td><h2>{t.start}</h2> </td>
                      </div>
                      );
                   })
                   }
               </td>

               <td>
                   {character.urlInfoList.map((t) => {
                      return(
                      <div>
                           <td><h2>{t.end}</h2>  </td> 
                      </div>
                      );
                   })
                   }
             </td>

           </tr>

            </> 

            );
           })
          }
      </table>           
      </div>
  )
}
