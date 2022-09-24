import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import Addnote from './Addnote'
import Noteitem from './Noteitem'
import { useNavigate } from 'react-router-dom'

const Notes = () => {
  let navigate = useNavigate();

  const context = useContext(NoteContext)
  const { notes, fetchnote, editnote } = context;

  useEffect(() => {
    if(localStorage.getItem('token')){
      fetchnote();
      // eslint-disable-next-line
    }
    else{
      navigate("/login");
    }
  }, [])
  // ref hook sused for providing a ref or reference to a particular element
  const ref = useRef(null)
  const refclose = useRef(null)
  const [note, setnote] = useState({ id: " ", etitle: "", edescription: "", etag: "" })

  const updatenote = (currentnote) => {
    ref.current.click();
    setnote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag })
  }

  const handleclick = (e) => {
    // console.log("update")
    e.preventDefault();
    editnote(note.id, note.etitle, note.edescription, note.etag)
    ref.current.click();
  }
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <Addnote />
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <lord-icon
                data-bs-dismiss="modal"
                aria-label="Close"
                src="https://cdn.lordicon.com/vfzqittk.json"
                trigger="hover"
                colors="primary:#121331"
                style={{ width: '40px', cursor: "pointer" }}>
              </lord-icon>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onchange} />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleclick} ref={refclose} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>

        <h1 className='text-center'>Your notes <span>  <lord-icon
          src="https://cdn.lordicon.com/etllbcfy.json"
          trigger="hover"
          colors="primary:#121331"
          style={{ width: '45px', cursor: "pointer" }}>
        </lord-icon></span></h1>
        <div className="container" style={{marginTop:"10px"}}>
          {notes.length===0 && 
          <>
           <lord-icon
    src="https://cdn.lordicon.com/hrqwmuhr.json"
    trigger="hover"
    colors="primary:#121331,secondary:#08a88a"
    stroke="65"
    style={{ width: '40px' }}>
</lord-icon>

<h3 className='py-3'> "Sorry nothing to display"</h3>
</>

}
        </div>

        {notes.map((note) => {
          return <Noteitem key={note._id} updatenote={updatenote} note={note} />
        })}

      </div>
    </>
  )
}

export default Notes