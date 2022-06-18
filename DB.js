import mysql2 from "mysql2";
const con = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'doan'
})
const connect = function(){
    con.connect(function(err){
        if(!err){
            console.log("Database is connected")
        }
        else{
            console.log("Database connect error")
        }
    })
}

export default connect;
