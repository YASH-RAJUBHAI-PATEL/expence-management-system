const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
//const  path=require("path");
const connectDb = require("./config/connectDb");
// config dot env file
dotenv.config();
const {getAllTransection} = require('./controllers/transectionCtrl')

//databse call
connectDb();

//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

const transectionRoutes = require("./routes/transectionRoutes")
//routes
app.use("/api/v1/users", require("./routes/userRoute"));
app.use("/api/v1/transection", transectionRoutes);
app.use("/transection", transectionRoutes);

app.use("/transections/add-transection", getAllTransection);

//port

//static files
// app.use(express.static(path.join(__dirname,'./client/build')))
// app.get('*',function(req,res){
  
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));

// });

app.get('/', (req, res) => {
  console.log('Server is running');
  return res.status(200).json({
    succuess: true
  })
})

const PORT = 8080 || process.env.PORT;

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
