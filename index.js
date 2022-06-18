import express from "express"

const app = express();
//import database from './DB'
//const app = express()
const port = 3000
app.get('/tintu', (req, res) => {
  //database.getAllUser(function(resultQuery){
    //res.json(resultQuery);
    console.log("trang chu");
  //})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
