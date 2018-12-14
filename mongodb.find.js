// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectId} = require('mongodb');





MongoClient.connect('mongodb://localhost:27017/TodoApp',{useNewUrlParser: true} ,(err, client) => {
    if(err){
      return  console.log('Unable to connect to MongoDB server');
    } 
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    //  db.collection('Todos').find({
    //      _id: new ObjectId("5c141467d6de5826dc147f2c")
    //      }).toArray().then((docs) => {
    //     console.log(JSON.stringify(docs, undefined, 2));
    //  }, (err) => {
    //     console.log('Unable to fetch', err);
    //  });
  
    db.collection('Todos').find({
        }).count().then((count) => {
       console.log(JSON.stringify(count, undefined, 2));
    }, (err) => {
       console.log('Unable to fetch', err);
    });
 

    client.close();
});