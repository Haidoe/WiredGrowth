const { ApolloServer, gql } = require('apollo-server')

const mongoose = require('mongoose')

const dotenv = require('dotenv')

dotenv.config({ path: 'variables.env' })

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database Connected!!');
    })
    .catch(err => {
        console.error(err);
    })


const typeDefs = gql`
    type Todo {
        task: String
        completed: Boolean
    }

    type Query {
        getTodos: [Todo]
    }

    type Mutation {
        addTodos(task: String, completed: Boolean) : Todo
    }
`



const server = new ApolloServer({
    typeDefs
})

server.listen().then(({url})=> {
    console.log(`Server Listening on ${url}`)
})