const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.authenticate = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Get user by Email
            const user = await User.findOne({
                email
            });

            //Decript User
            bcrypt.compare(password, user.password, (err, res) => {
                if(res) {
                    if (res) {
                        console.log('Exito Es bueno el pass');
                        resolve(user);
                    }
                } else {
                    resolve('Error');
                } 
              });

            // bcrypt.compare(password, user.password, (err, isMatch) => {
            //     try{
            //         if (isMatch) {
            //             console.log('Exito Es bueno el pass');
            //             resolve(user);

            //         }
            //     } catch (err){
            //         reject('Autenthication Failed');
            //     }
               
            // });
        } catch (err) {
            //Email no found
            reject('Autenthication Failed');
        }
    });
}