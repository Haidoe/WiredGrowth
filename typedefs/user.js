const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (user, secret, expiresIn) => {
    const { username, email } = user;
    return jwt.sign({ username, email }, secret, { expiresIn });
};

const signupUser = async (_, { username, email, password }, { User }) => {
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
};

const signinUser = async (_, { username, password }, { User }) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error("User not found");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error("Invalid password");
    }

    return { token: createToken(user, process.env.SECRET_JWT, "1hr") };
};

const getCurrentUser = async (_, args, { User, currentUser }) => {
    if (!currentUser) {
        return null;
    }

    const user = await User.findOne({
        username: currentUser.username,
        email: currentUser.email
    });

    return user;
};

const getUsers = async (_, args, { User }) => {
    const users = await User.find({}).sort({ joinDate: "desc" });

    return users;
};

module.exports = {
    mutation: {
        signinUser,
        signupUser
    },
    query: {
        getCurrentUser,
        getUsers
    }
};
