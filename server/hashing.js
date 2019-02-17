const {SHA256} = require('crypto-js');
var crypto_js = require('crypto-js');


const bcrypt = require('bcryptjs');


var password = '123abc';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });


var hashedPassword = '$2a$10$uzDy3pdJaPL2uKu9Vwv9wfOuyXosmBBANltTuCBKDCwR/NySt1TCKa'; 
bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});


// const jwt = require('jsonwebtoken');

// var data = {
//     id: 10
// };

// var token  = jwt.sign(data, '123abc');
// console.log(token);

// decoded = jwt.verify(token, '123abc');
// console.log(decoded);

// const cameras = {
//     price: 500,
//     weight: 2000,
//     description: () => `this canon camera is of ${this.price} and `;
    
// }

// console.log(cameras.description());


// // var message = 'I am user number 3';

// // var hash = SHA256(message).toString();
// // console.log(hash);



// // var token = {
// //     data,
// //     hash: SHA256(JSON.stringify(data) + 'salt').toString()
// // }


// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// // var resultHash = SHA256(JSON.stringify(token.data) + 'salt').toString();

// // if(resultHash === token.hash){
// //     console.log('data was not changed');
// // } else {
// //     console.log('data was changed');
// // }




