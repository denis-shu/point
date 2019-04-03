const {
    ApolloServer
} = require('apollo-server');

const t = require('./typeDefs');
const r = require('./resolvers');

const mongoose = require('mongoose');

require('dotenv').config();
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
}).then(() =>
    console.log('goose is here')
).catch(error => console.error(error));

const server = new ApolloServer({
    typeDefs: t,
    resolvers: r
});

server.listen().then(({
    url
}) => {
    console.log(`server on ${url}`);
});