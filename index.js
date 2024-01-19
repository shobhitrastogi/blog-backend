const express = require('express');
const app = express()
const dotenv = require('dotenv');
const connectToMongo = require("./db/db");
connectToMongo();
const cors = require('cors');
const path = require('path'); 
const authRoute = require('./routes/auth') 
const userRoute = require('./routes/users') 
const postRoute = require('./routes/posts') 
const categoryRoute = require('./routes/category') 
const upload = require('./multer/upload');
dotenv.config()
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(cors()) 
const port = 5000;

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
}); 

app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)
app.use('/api/posts',postRoute)
app.use('/api/categories',categoryRoute)

app.listen(port,()=>{
  try {
      console.log(`app are listen on http://localhost:${port}`)
  } catch (error) {
      console.log(`app not listen on port no ${port} `)
  }
})