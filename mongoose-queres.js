const {mongoose} = require('./server/db/mongoose');
const {Todo} = require('./server/models/todo');
const{ObjectID} = require('mongodb');
const {User} = require('./server/models/user');

var id = '15c1836db306e8910d0a88d7d';

if(!ObjectID.isValid(id)){
    console.log('Not valid ID')
}


Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
});

Todo.findOne({
    _id: id
})
.then((todos) => {
    console.log('Todos', todos);    
});

Todo.findById(id)
    .then((todos) =>  {
        if(todos){
              console.log('Todos',todos)
        } else {
            console.log('Not found');
        }
        
    })
    .catch((err) => {
        console.log(err);
    })


