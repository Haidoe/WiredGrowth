const { ApolloServer, gql } = require('apollo-server')

const Todos = [
    { task: "Wash Car", completed: false },
    { task: "Fix Bulbs", completed: false }
]

const typeDefs = gql`
    type Todo {
        tasks: String
        completed: Boolean
    }

    type Query {
        getTodos: [Todo]
    }
`

const resolvers = {
    Query: {
        getTodos: function () {
            return todos
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url})=> {
    console.log(`Server Listening on ${url}`)
})