const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../db/connection');

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('user', userSchema);

exports.createNewUser = async (username, email, password) => {

    await mongoose.connect(db);

    const user = await User.findOne({ email: email }); 

    if (user) {

        await mongoose.disconnect(); 
        throw new Error("Este e-mail já está em uso");

    } else {

        const newUser = new User({
            username,
            email,
            password: await bcrypt.hash(password, 10) 
        });

        return await newUser.save(); 
    };
};

exports.login = async (email, password) => {

    await mongoose.connect(db);

    const user = await User.findOne({ email: email });

    if (!user) {

        await mongoose.disconnect();
        throw new Error('Nenhum usuário encontrado.');
    }
    else {

        const same = await bcrypt.compare(password, user.password);

        if (!same) {
            await mongoose.disconnect();
            throw new Error('Nenhum usuário encontrado.');
        } else {
            return ({
                id: user.email,
                isAdmin: user.isAdmin
            });
        };
    };
};