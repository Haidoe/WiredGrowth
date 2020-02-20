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
const Attendee = require("./models/Attendee");
const AttendanceStatus = require("./models/AttendanceStatus");
const Attendance = require("./models/Attendance");

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("Database Connected!!");
    })
    .catch(err => console.log(err));

//verifying json web token
const getUser = async token => {
    if (token) {
        try {
            return await jwt.verify(token, process.env.SECRET_JWT);
        } catch (error) {
            throw new AuthenticationError(
                "Your session has been expired, please sign in again."
            );
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const token = req.headers["authorization"];
        return {
            User,
            Campus,
            Team,
            Task,
            Attendee,
            Attendance,
            AttendanceStatus,
            currentUser: await getUser(token)
        };
    }
});

server.listen().then(({ url }) => {
    console.log(`Server Listening on ${url}`);
});
