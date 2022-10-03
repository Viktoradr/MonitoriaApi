let express = require('express')
let app = express()
let routes = require('./routes/routes')
let bodyParser = require('body-parser')
let cors = require('cors')

let conn = require('./connections/mongo.connection')

conn.once('open', function() {
  console.log('open connection in mongoDB'); 
});
conn.on('connected', function () {  
  console.log('creating connection with mongoDB');
}); 
conn.on('error',function (err) {  
  console.log('connection error: ' + err);
}); 
conn.on('disconnected', function () {  
  console.log('connection disconnected 0f mongoDB'); 
});

app.use(bodyParser.json())

app.use((req, res, next) => {
  // console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
  console.log(`${new Date().toString()} => ${req.originalUrl}`)
  next()
})

// app.use(express.static('public'))

app.use(cors())

app.use("/api", routes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server has started on ${PORT}`))