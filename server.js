const { ApolloServer, AuthenticationError } = require("apollo-server");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");
const resolvers = require("./resolvers");

const dotenv = require("dotenv");
dotenv.config({ path: "variables.env" });

const User = require("./models/User");
const Campus = require("./models/Campus");
const Task = require("./models/Task");
const Team = require("./models/Team");
const AttendanceStatus = require("./models/AttendanceStatus");
const Attendance = require("./models/Attendance");

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log("Database Connected!!");
    })
    .catch(err => {
        throw new AuthenticationError(
            "Your session has ended, please sign in again."
        );
    });

//verifying json web token
const getUser = async token => {
    if (token) {
        try {
            let user = await jwt.verify(token, process.env.SECRET_JWT);
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers["authorization"];

        return {
            User,
            Campus,
            Team,
            Task,
            Attendance,
            AttendanceStatus,
            currentUser: getUser(token)
        };
    }
});

server.listen().then(({ url }) => {
    console.log(`Server Listening on ${url}`);
});
