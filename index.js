const express = require('express')
const mongoose = require('mongoose')
var bodyparser = require('body-parser')
const ejs = require('ejs')


const app = express()
mongoose.connect('mongodb+srv://chethan:chethancm@server.faq9i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(()=>{
    console.log('mongodb is connected')
}).catch(()=>{
    console.log('fail to connect')
})
// schema of the project 
let projectSchema = new mongoose.Schema({
    listname:String
    
})
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

//creating model 
let todolists = mongoose.model('todolist',projectSchema)



//setting templateing engine
app.set('view engine', 'ejs')

app.get('/',(req,res)=>{
   async  function fe(){
  let listarray = await todolists.find()
  console.log(listarray )
  res.render('page',{list:listarray})
    }
    fe()
})
app.get('/:id',(req,res)=>{
    id=req.params.id;
    async function deletetodo(){
   let resu = await todolists.deleteOne({_id:id})
   
       res.redirect('/')
    }
    deletetodo()
})
app.post('/',(req,res)=>{
    async function handelpost(){
    let name3 =  req.body.add;
    todolist = new todolists({listname:name3})
    let result = await todolist.save()
    if(result){
        console.log('new element added')
    }
    else{
        console.log('not added')
    }


    res.redirect('/')
    }
    
    handelpost()


})
app.listen(3000,()=>{
    console.log('server is runing')
})