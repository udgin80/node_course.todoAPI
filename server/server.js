var env = process.env.NODE_ENV || 'development';
console.log('env ******', env);

if(env === 'development'){
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if(env === 'test'){
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';

}


var {mongoose} = require('./db/mongoose');
var express = require('express');
var bodyParser = require('body-parser');
const _ = require('lodash');

var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const{ObjectID} = require('mongodb');

var {authenticate} = require('./middleware/authenticate')


var app = express();

app.use(bodyParser.json());


app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
    
});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save()
    .then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    })
    .catch((e) => {
        res.status(400).send(e);
    });
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
       return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    })
    .catch((e) => {
        res.status(400).send();
    });

});


app.get('/users/me', authenticate, (req, res) => {
   res.send(req.user);
});

app.get('/todos', (req, res) => {
    Todo.find()
        .then((todos) => {
            res.send({todos});
        }, (err) => {
            res.status(400).send(err);
        })
       
});


app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    //valid id using isValid
    // var existingId = '5c1836db306e8910d0a88d7d';
    if(!ObjectID.isValid(id)){
     return   res.status(404).send({h: 'not valid'});
    }
    Todo.findById(id)
        .then((todo) => {

            if (!todo) {
                return res.status(404).send({h: 'h'});
            }
            res.send({todo});
        }, (err) => {
            res.status(400).send({err});
        })

});


app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    console.log(id);
    if(!ObjectID.isValid(id)){
        return   res.status(404).send({error: 'not valid'});
       }
       
       Todo.findByIdAndRemove(id)
     .then((todo) => {
        if(!todo){
            return res.status(404).send();
        }

        res.send(todo);
    })
    .catch((err) => {
        res.status(400).send(err);
    })

});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)){
        return   res.status(404).send({error: 'not valid'});
       }

       if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
       } else {
        body.completed = false;
        body.completedAt = null;
       }

       Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
        .then((todo) => {   
            if(!todo){
                return res.status(200).send();
            }
            res.send({todo});
        }).catch((err) => {
            res.status(400).send();
        });




})

app.listen(3000, () => {
    console.log('Started on port 3000');
});


module.exports = {app};