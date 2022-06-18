// import express from "express";
// import closeDB from "./DB.js";
// console.log('Example app listening on port 3000!')
// let app = express()
// //const app = express();
// app.get('/tintu', (req, res) => {
//   closeDB();
//   res.send(closeDB());
// })
// app.listen(3000, () =>
//   console.log('Example app listening on port 3000!'),
// );
// //let port = process.env.PORT || 3000
// class nguoi{
//   constructor(name){
//     this.name=name;
//   }
//   get names(){
//     return this.name;
//   }
// }
// export default nguoi;
var bcrypt = require('bcryptjs');
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash("B4c0/\/", salt, function(err, hash) {
        // Store hash in your password DB.
    });
});
console.log(bcrypt);