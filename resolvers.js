module.exports = {
    Mutation : {
        signupUser: async (_, {username, email, password}, { User }) => {
            const user = await User.findOne({ username });
            
            if(user) {
                throw new Error("User already exists");
            }

            const newUser = await new User({
                username,
                email,
                password,
                isActivated: true
            }).save();

            return newUser;
        },
        addCampus: async (_, { campus }, { Campus }) => {
            const oldCampus = await Campus.findOne({ campus });

            if(oldCampus) {
                throw new Error("Campus already exists");
            }

            const newCampus = await new Campus({
                campus
            }).save();

            return newCampus
        },
        addAttendanceStatus: async (_, { status, description }, { AttendanceStatus } ) => {
            const oldStatus = await AttendanceStatus.findOne({ status });

            if(oldStatus) {
                throw new Error("Attendance Status already exists");
            }

            const newStatus = await new AttendanceStatus({
                status,
                description
            }).save();

            return newStatus;
        },
        addTeam: async (_, { team, description }, { Team }) => {
            const oldTeam = await Team.findOne({ team });

            if(oldTeam){
                throw new Error("Team already exists");
            }

            const newTeam = await new Team({
                team,
                description
            }).save();

            return newTeam;
        },
        addTask: async (_, { task, description }, { Task }) => {
            const oldTask = await Task.findOne({ task });

            if(oldTask){
                throw new Error("Task already exists");
            }

            const newTask = await new Task({
                task,
                description
            }).save();

            return newTask;
        },
        addAttendance: async (_, { user, team, task, campus, attendanceStatus, createdBy, date }, { Attendance }) => {
            const oldAttendance = await Attendance.findOne({ user, date});

            if(oldAttendance){
                throw new Error("User has already a record of attendance this week");
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
        }
    }
}