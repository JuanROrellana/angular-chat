const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const user = mongoose.model('user');

exports.authenticate = (memail, password) => {
    return new Promise((resolve, reject) => {
        try{
            //Get user by Email
            const user = await User.findOne({email});
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                    resolve(user);
                }else{
                    //Pass did not match
                    reject('Autenthication Failed');
                }
            });

        }catch(err){
            //Email no found
            reject('Autenthication Failed');
        }
    });    
}