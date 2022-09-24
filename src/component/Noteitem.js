import React, { useContext } from 'react'
// import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import NoteContext from '../context/notes/NoteContext'
// import trash from './trash.gif'
// import edit from './edit.gif'

const Noteitem = (props) => {
    // imporing the usecontext hook to use 
    const context = useContext(NoteContext)
    const { deletenote } = context
    // destructuring note from props where note is coming from notes.js file as a prop
    const { note, updatenote } = props;

    return (
        <>
            <div className="col-md-3">
                <div className="card my-3 shadow" >
                    <div className="card-body">
                        <h5 className="card-title"> <span className='fa'>title:</span> {note.title}</h5>
                        <hr style={{ width: "75%" }} />
                        <p className="card-text"><span className='fa'>Description:</span> {note.description}</p>
                        <hr style={{ width: "50%" }} />
                        <p className="card-text">
                        <span className='fa'>tag: </span> {note.tag}</p>
                        <hr style={{ width: "25%" }} />

                        <lord-icon
                            src="https://cdn.lordicon.com/dovoajyj.json"
                            trigger="morph"
                            colors="primary:#121331"
                            state="morph-fill"
                            style={{ width: '40px', cursor: "pointer" }}
                            onClick={() => { deletenote(note._id) }}>

                        </lord-icon>
                        <lord-icon
                            src="https://cdn.lordicon.com/wloilxuq.json"
                            trigger="hover"
                            colors="primary:#121331,secondary:#545454"
                            stroke="85"
                            style={{  cursor: "pointer" , width :"40px",height:"50px"}}
                            onClick={() => { updatenote(note) }}>
                        </lord-icon>

                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem