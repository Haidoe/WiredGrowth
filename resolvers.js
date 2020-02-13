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
        }
    }
}