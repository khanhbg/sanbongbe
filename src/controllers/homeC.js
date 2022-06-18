let getHome = (req,res)=>{
    //return res.send("HELLO");
    return res.render("home.ejs");
}

export {getHome};