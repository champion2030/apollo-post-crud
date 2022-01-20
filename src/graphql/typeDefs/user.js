import {gql} from "apollo-server-express";

export default gql`
    type Query {
        getAllUsers: [User!]!
        getUserById(id: ID!): User!
    },
    
    type Mutation {
        registerUser(newUser: UserInput!): AuthResp!
    },
    
    input UserInput {
        username: String!
        email: String!
        firstName: String!
        lastName: String!
        password: String!
    }, 
    
    type User {
        id: ID!
        username: String!
        email: String!
        firstName: String!
        lastName: String!
    },
    
    type AuthResp {
        user: User!
        token: String!
    }
`
