// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectId} = require('mongodb');





MongoClient.connect('mongodb://localhost:27017/TodoApp',{useNewUrlParser: true} ,(err, client) => {
    if(err){
      return  console.log('Unable to connect to MongoDB server');
    } 
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    db.collection('Todos').findOneAndUpdate({
      _id: new ObjectId('5c12bc89bdb74130882f0e00')
    }, {
      $set: {
        completed: false,
        name: 'Suka',

      },
      $inc: {
        age: -355
      }
    }, {
      returnOriginal: false
    })
    .then(result => console.log(result));
 

    client.close();
});