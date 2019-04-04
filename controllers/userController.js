const User = require('../models/user');
const {
    OAuth2Client
} = require('google-auth-library');

const client = new OAuth2Client(process.env.OAUTH);

exports.findOrCreateUser = async token => {
    var gUser = await verifyAuthToken(token);
    const user = await checkIfUserExist(gUser.email);

    return user ? user : createnewUser(gUser);
}

const verifyAuthToken = async token => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.OAUTH
        })
        return ticket.getPayload();
    } catch (err) {
        console.error('Error verify', err);
    }
}


const checkIfUserExist = async email => await User.findOne({
    email
}).exec();

const createnewUser = async gUser => {
    const {
        name,
        email,
        picture
    } = gUser;
    const user = {
        name,
        email,
        picture
    };

    return new User(user).save();
}