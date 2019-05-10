const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.authenticate = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Get user by Email
            const user = await User.findOne({ email });

            //Decript User
            // bcrypt.compare(password, user.password, (err, isMatch) => {
            //     //if (err) throw err;
            //     if(isMatch){
            //         resolve(user);
            //     }else{
            //         resolve('Autenthication Failed ');
            //     }
            // });

            bcrypt.compare(password, user.password, (err, res) => {
                if(res) {
                        resolve(user);
                } else {
                    resolve('Error');
                } 
              });
            
        } catch (err) {
            //Email no found
            reject('Autenthication Failed');
        }
    });
}