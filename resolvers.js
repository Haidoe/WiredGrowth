const attendeeTypeDefs = require("./typedefs/attendee");
const campusTypeDefs = require("./typedefs/campus");
const teamTypeDefs = require("./typedefs/team");
const taskTypeDefs = require("./typedefs/task");
const attendanceStatusTypeDefs = require("./typedefs/attendanceStatus");
const userTypeDefs = require("./typedefs/user");

module.exports = {
    Query: {
        ...campusTypeDefs.query,
        ...attendeeTypeDefs.query,
        ...teamTypeDefs.query,
        ...taskTypeDefs.query,
        ...attendanceStatusTypeDefs.query,
        ...userTypeDefs.query
    },
    Mutation: {
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
        ...taskTypeDefs.mutation,
        ...attendanceStatusTypeDefs.mutation,
        ...userTypeDefs.mutation
    }
};
