const express = require("express");
const path = require("path")
const {v4:uuidv4} = require("uuid")
const methodOverride = require("method-override")
const app = express()

const port = 8080

app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))


app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

let posts = [
    {
        id:uuidv4(),
        username:"Saurav Satpute",
        content:"Good Morning! What are you learning today ?"
    },
    {
        id:uuidv4(),
        username:"Aniket Patil",
        content:"Good Afternoon! I'm working on Java Project. need help ?"
    },
    {
        id:uuidv4(),
        username:"Prasad Rahane",
        content:"Got a new job as frontend engineer, Happy coding!"
    }
]

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`)
})

app.get("/",(req,res)=> {
    res.send("App Home Page")
})

app.get("/posts",(req,res)=> {
    res.render("index.ejs",{posts})
})

app.get("/posts/new",(req,res)=> {
    res.render("new.ejs")
})

app.post("/posts",(req,res)=>{
    const {username, content} = req.body;
    let id = uuidv4()
    posts.push({id,username,content})
    res.redirect("/posts")
})

app.get("/posts/:id",(req,res)=> {
    let { id } = req.params;
    let post = posts.find((item)=>item.id === id)
    res.render("show.ejs",{post})
})

app.get("/posts/:id/edit",(req,res)=> {
    let { id } = req.params;
    let post = posts.find((item)=>item.id === id)
    res.render('edit.ejs',{post})
})

app.patch('/posts/:id',(req,res)=> {
    let { id } = req.params;
    let content = req.body.content;
    let post = posts.find((item)=>item.id === id)
    post.content = content;
    console.log(post)
    // res.send("patch req working")
    res.redirect("/posts")

})

app.delete('/posts/:id',(req,res)=> {
    let { id } = req.params;
    posts = posts.filter((item)=>item.id !== id)

    res.redirect("/posts")
    // res.send("post deleted")

})