const getStatuses = async (_, args, { AttendanceStatus }) => {
    const statuses = await AttendanceStatus.find({});
    return statuses;
};

const addStatus = async (_, { status, description }, { AttendanceStatus }) => {
    const isStatusExists = await AttendanceStatus.findOne({ status });

    if (isStatusExists) throw new Error("Attendance Status already exists");

    const newStatus = await new AttendanceStatus({
        status,
        description
    }).save();

    return newStatus;
};

const editStatus = async (
    _,
    { statusId, status, description },
    { AttendanceStatus }
) => {
    const editedStatus = await AttendanceStatus.findByIdAndUpdate(
        { _id: statusId },
        { status, description },
        { new: true }
    );

    return editedStatus;
};

const deleteSTatus = async (_, { statusId }, { AttendanceStatus }) => {
    const deletedStatus = await AttendanceStatus.findOneAndDelete({
        _id: statusId
    });
    return deletedStatus;
};

module.exports = {
    mutation: {
        addAttendanceStatus: addStatus,
        editAttendanceStatus: editStatus,
        deleteAttendanceStatus: deleteSTatus
    },
    query: {
        getAttendanceStatuses: getStatuses
    }
};
