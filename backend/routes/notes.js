const express=require('express');
const router=express.Router();

const fetchuser=require("../middleware/fetchuser")
const Note=require("../models/Note")
const { body, validationResult } = require('express-validator');
// route 1:to get all thenotes for  user 
router.get('/fetchallnotes', fetchuser, async (req, res) => {

   try {
      
      const notes=await Note.find({user:req.user.id})
   res.json(notes)
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
   }

})

// route 2:to add all thenotes for  user ,login required
router.post('/addallnote', fetchuser,[
   
   body('title', 'Enter a valid name').isLength({ min: 3 }),
   body('description', 'description must be atleast 5 characters').isLength({ min: 5 }),
 ], async (req, res) => {
try {
   const {title,description,tag}=req.body;
   // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const note= new Note({
   title,description,tag,user:req.user.id
  })
  const savednote= await note.save()
  res.json(savednote)
} catch (error) {
   console.error(error.message);
   res.status(500).send("Internal Server Error");
}
})
   
// route 3:to add all thenotes for  user ,login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
   const {title,description,tag}=req.body;
   // create a new note object
   const newnote={}
   if(title){newnote.title=title}
   if(description){newnote.description=description}
   if(tag){newnote.tag=tag}

   // find the note to be upadated and update it 
   let note=await Note.findById(req.params.id)
   if(!note){ return res.status(404).send({error:"not found"})}

      if(note.user.toString() !== req.user.id) { return res.status(401).send({error:"not allowed"})}
      note = await Note.findByIdAndUpdate(req.params.id, {$set: newnote}, {new:true})
      res.json(note)
 })

// route 4:to add all the notes for  user ,login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
   const {title,description,tag}=req.body;
  
   // find the note to be delted and delete it 
   let note=await Note.findById(req.params.id)
   if(!note){ return res.status(404).send({error:"not found"})}

   // allow deletion only if user accesss to this notes
      if(note.user.toString() !== req.user.id) { return res.status(401).send({error:"not allowed"})}

      note = await Note.findByIdAndDelete(req.params.id)
      res.json({"success":"your note has been succesfuuly deleted" ,note:note})
 })

module.exports=router