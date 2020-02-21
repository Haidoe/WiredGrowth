const getCampuses = async (_, args, { Campus }) => {
    const campuses = await Campus.find({});
    return campuses;
};

const addCampus = async (_, { campus }, { Campus }) => {
    const isCampusExists = await Campus.findOne({ campus });

    if (isCampusExists) throw new Error("Campus already exists");

    const newCampus = await new Campus({
        campus
    }).save();

    return newCampus;
};

const editCampus = async (_, { campusId, campus }, { Campus }) => {
    const newCampus = await Campus.findByIdAndUpdate(
        { _id: campusId },
        { campus },
        { new: true }
    );

    return newCampus;
};

const deleteCampus = async (_, { campusId }, { Campus }) => {
    const campus = await Campus.findOneAndDelete({ _id: campusId });
    return campus;
};

module.exports = {
    mutation: {
        addCampus,
        editCampus,
        deleteCampus
    },
    query: {
        getCampuses
    }
};
