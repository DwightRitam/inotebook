import React, { useContext } from 'react'
import { useState } from 'react'
import NoteContext from '../context/notes/NoteContext'

const Addnote = () => {
  const context = useContext(NoteContext)
  const { addnote } = context

  const [note, setnote] = useState({ title: "", description: "", tag: "" })
  const handleclick = (e) => {
    e.preventDefault();
    addnote(note.title, note.description, note.tag)
    setnote({ title: "", description: "", tag: "" })
  }
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <h1 className='text-center'>HEy USer WElcome!!! <span>
        <lord-icon
          src="https://cdn.lordicon.com/pithnlch.json"
          trigger="hover"
          colors="primary:#121331,secondary:#08a88a"
          stroke="100"
          style={{ width: "50px", height: "50px" }}>
        </lord-icon></span></h1>
      <div className='shadow p-3 mb-3 bg-body rounded'>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" placeholder='should be atleast 3 charcters' value={note.title} name='title' aria-describedby="emailHelp" onChange={onchange} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" value={note.description} placeholder='should be atleast 5 charcters' name="description" onChange={onchange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onchange} />
          </div>
          <div className="mb-3">

            <lord-icon
              src="https://cdn.lordicon.com/diyeocup.json"
              trigger="morph"
              colors="primary:#121331"
              style={{ width: '40px', cursor: "pointer", marginTop: "10px" }}
              onClick={handleclick}
            >
            </lord-icon>
            <p style={{ cursor: "pointer", marginTop: "10px", paddingInline: '5px' }}
             onClick={handleclick}
            >Add a note</p>
          </div>

        </form>


      </div>
    </>
  )
}

export default Addnote