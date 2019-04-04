const {AuthenticationError} = require('apollo-server');

const user = {
    _id: '1',
    name: 'Den',
    email: 'den@gmail.com',
    picture: 'https://exxxxxxx'
};


const auth = next => (root, args, ctx, info) => {
    if(!ctx.currentUser){
        throw new AuthenticationError('go to login!')
    }
    return next(root, args, ctx, info);
}


module.exports  = {
    Query: {
        me: auth((root, args, ctx)  => ctx.currentUser)
    }
}