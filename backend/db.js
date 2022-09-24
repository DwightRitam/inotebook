const mongoose=require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const connecttomongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongodb");
    })
}

module.exports= connecttomongo;