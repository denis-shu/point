const {
    ApolloServer
} = require('apollo-server');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const {
    findOrCreateUser
} = require('./controllers/userController');
const mongoose = require('mongoose');

require('dotenv').config();



console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
}).then(() =>
    console.log('goose is here')
).catch(error => console.error(error));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({
        req
    }) => {
        console.log('en server');
        let authToken = null;
        let currentUser = null;
        try {
            authToken = req.headers.authorization;
            console.log('authtoken', authToken);
            if (authToken) {

                currentUser = await findOrCreateUser(authToken);
                console.log('authtossken', currentUser );

            }
        } catch (err) {
            console.error(`Unable to auth user with tkn${authToken}`)
        }
        console.log('authtossWWssken', currentUser );
        return {
            
            currentUser
        }
    }
});

server.listen().then(({
    url
}) => {
    console.log(`server on ${url}`);
});