const {gql} = require('apollo-server');

module.exports = gql`
 type User {
     _id: ID,
     name: String,
     email: String,
     picture: String
 }

 type Point {
     _id: ID,
     createdAt: String,
     title: String,
     content: String,
     image: String,
     latitude: Float,
     longitude: Float,
     author: User,
     comments: [Comment]
 }

 type Comment {
     text: String,
     createdAt: String,
     Author: User
 }
 
 type Query {
     me: User
 }
 `