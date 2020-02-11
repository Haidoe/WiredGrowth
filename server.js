const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'typeDefs.gql')
const typeDefs = fs.readFileSync(filePath, 'utf-8') 

const dotenv = require('dotenv')
dotenv.config({ path: 'variables.env' })

const User = require('./models/User')
const Campus = require('./models/Campus')
const AttendanceStatus = require('./models/AttendanceStatus')
const Attendance = require('./models/Attendance')

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('Database Connected!!');
    })
    .catch(err => {
        console.error(err);
    })

const server = new ApolloServer({
    typeDefs,
    context: {
        User,
        Campus,
        Attendance,
        AttendanceStatus
    }
})

server.listen().then(({url})=> {
    console.log(`Server Listening on ${url}`)
})