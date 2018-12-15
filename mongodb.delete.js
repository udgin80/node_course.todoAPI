// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectId} = require('mongodb');





MongoClient.connect('mongodb://localhost:27017/TodoApp',{useNewUrlParser: true} ,(err, client) => {
    if(err){
      return  console.log('Unable to connect to MongoDB server');
    } 
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

  db.collection('Todos').findOneAndDelete({completed: true})
    .then(result => console.log(result));
  
   
 

    client.close();
});