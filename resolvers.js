const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const attendeeTypeDefs = require("./typedefs/attendee");
const campusTypeDefs = require("./typedefs/campus");
const teamTypeDefs = require("./typedefs/team");
const taskTypeDefs = require("./typedefs/task");

const createToken = (user, secret, expiresIn) => {
    const { username, email } = user;
    return jwt.sign({ username, email }, secret, { expiresIn });
};

module.exports = {
    Query: {
        getCurrentUser: async (_, args, { User, currentUser }) => {
            if (!currentUser) {
                return null;
            }

            const user = await User.findOne({
                username: currentUser.username,
                email: currentUser.email
            });

            return user;
        },
        getUsers: async (_, args, { User }) => {
            const users = await User.find({}).sort({ joinDate: "desc" });

            return users;
        },
        ...campusTypeDefs.query,
        ...attendeeTypeDefs.query,
        ...teamTypeDefs.query,
        ...taskTypeDefs.query
    },
    Mutation: {
        signupUser: async (_, { username, email, password }, { User }) => {
            const user = await User.findOne({ username });

            if (user) {
                throw new Error("User already exists");
            }

            const newUser = await new User({
                username,
                email,
                password,
                isActivated: true
            }).save();

            return {
                token: createToken(newUser, process.env.SECRET_JWT, "1hr")
            };
        },
        signinUser: async (_, { username, password }, { User }) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw new Error("User not found");
            }

            const isValidPassword = await bcrypt.compare(
                password,
                user.password
            );

            if (!isValidPassword) {
                throw new Error("Invalid password");
            }

            return { token: createToken(user, process.env.SECRET_JWT, "1hr") };
        },
        addAttendanceStatus: async (
            _,
            { status, description },
            { AttendanceStatus }
        ) => {
            const oldStatus = await AttendanceStatus.findOne({ status });

            if (oldStatus) {
                throw new Error("Attendance Status already exists");
            }

            const newStatus = await new AttendanceStatus({
                status,
                description
            }).save();

            return newStatus;
        },
        addTask: async (_, { task, description }, { Task }) => {
            const oldTask = await Task.findOne({ task });

            if (oldTask) {
                throw new Error("Task already exists");
            }

            const newTask = await new Task({
                task,
                description
            }).save();

            return newTask;
        },
        addAttendance: async (
            _,
            { user, team, task, campus, attendanceStatus, createdBy, date },
            { Attendance }
        ) => {
            const oldAttendance = await Attendance.findOne({ user, date });

            if (oldAttendance) {
                throw new Error(
                    "User has already a record of attendance this week"
                );
            }

            const newAttendance = await new Attendance({
                user,
                team,
                task,
                campus,
                attendanceStatus,
                createdBy,
                date
            }).save();

            return newAttendance;
        },
        ...attendeeTypeDefs.mutation,
        ...campusTypeDefs.mutation,
        ...teamTypeDefs.mutation,
        ...taskTypeDefs.mutation
    }
};
