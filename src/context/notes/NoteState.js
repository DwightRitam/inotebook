import React,{useState} from "react";

import NoteContext from "./NoteContext";



const NoteState=(props)=>{

  const host= "http://localhost:5000"
    const noteinitial=[]
      const [notes, setnotes] = useState(noteinitial)

// add a note
const addnote= async (title,description,tag)=>{
  const response = await fetch(`${host}/api/notes/addallnote`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      "auth-token":localStorage.getItem('token')
    },
    body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
  });
  const note = await response.json();
  setnotes(notes.concat(note))
}

// fetchall notes
const fetchnote= async ()=>{
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      "auth-token":localStorage.getItem('token')
    },
  });
  // 
  // Here we are fetching a JSON file across the backend and printing it to the console. The simplest use of fetch() takes one argument — the path to the resource you want to fetch — and does not directly return the JSON response body but instead returns a promise that resolves with a Response object.

  // The Response object, in turn, does not directly contain the actual JSON response body but is instead a representation of the entire HTTP response. So, to extract the JSON body content from the Response object, we use the json() method, 
  //  
  const jsondata= await response.json() 
  // console.log(jsondata)
  setnotes(jsondata)
 
}
// delete a note
const deletenote=async (id)=>{
  // api calls
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      "auth-token":localStorage.getItem('token')
    },

  });
  const jsondata= await response.json() 
  // console.log(jsondata)

  console.log("deleting a note" + id);
  let dltnote=notes.filter((note)=>{ return note._id!==id})
  setnotes(dltnote)
}

// edit a note
const editnote= async (id,title,description,tag)=>{
  // api call
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      "auth-token":localStorage.getItem('token')
    },
    body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header

  });

  const json = await response.json(); 
  // logic to edit in client
  let newnote=JSON.parse(JSON.stringify(notes))

  for (let index = 0; index < newnote.length; index++) {
    const element = newnote[index];
    if(element._id===id){
      newnote[index].title=title;
      newnote[index].description=description;
      newnote[index].tag=tag;
      break;
    }
  }
  setnotes(newnote)
  
}
    return (
        <NoteContext.Provider value={{notes,addnote,deletenote,editnote,fetchnote}}>
            {props.children}
        </NoteContext.Provider>
    )

    

}


export default NoteState