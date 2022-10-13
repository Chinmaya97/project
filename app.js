let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 7230;
let morgan = require('morgan');
let fs = require('fs');
app.use(morgan('short',{stream:fs.createWriteStream('./app.logs')}))

let menu = [
    {link:'/',name:'home'},
    {link:'/category',name:'Categoty'},
    {link:'/products',name:'Products'},
    {link:'/about',name:'About'},
    {link:'/contact',name:'Contact'}
]
let categoryRouter = require('./src/router/categoryRouter')(menu);
let productRouter = require('./src/router/productRouter')(menu);


//static filepath
app.use(express.static(__dirname+'/public'))
//html path
app.set('views','./src/views')
//view engine name
app.set('view engine','ejs')



app.get('/',(req,res) => {
    //res.send('hii from expresss')
    res.render('index',{title:"Home Page",menu:menu})
})

app.use('/products',productRouter)
app.use('/category',categoryRouter)

app.listen(port,(err) => {
    if (err) throw err;
    console.log(`sever is running on ${port}`)
})
