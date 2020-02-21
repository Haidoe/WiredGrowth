const getTeams = async (_, args, { Team }) => {
    const teams = await Team.find({});
    return teams;
};

const addTeam = async (_, { team, description }, { Team }) => {
    const isTeamExists = await Team.findOne({ team });

    if (isTeamExists) throw new Error("Team already exists");

    const newTeam = await new Team({
        team,
        description
    }).save();

    return newTeam;
};

const editTeam = async (_, { teamId, team, description }, { Team }) => {
    const newTeam = await Team.findByIdAndUpdate(
        { _id: teamId },
        { team, description },
        { new: true }
    );

    return newTeam;
};

const deleteTeam = async (_, { teamId }, { Team }) => {
    const team = await Team.findOneAndDelete({ _id: teamId });
    return team;
};

module.exports = {
    mutation: {
        addTeam,
        editTeam,
        deleteTeam
    },
    query: {
        getTeams
    }
};
