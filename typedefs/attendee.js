const getAttendees = async (_, args, { Attendee }) => {
    const attendees = await Attendee.find({}).sort({
        joinDate: "desc"
    });

    return attendees;
};

const addAttendee = async (_, { firstName, lastName }, { Attendee }) => {
    const attendee = await Attendee.findOne({ firstName, lastName });

    if (attendee) {
        throw new Error("Attendee already exists");
    }

    const newAttendee = await new Attendee({
        firstName,
        lastName
    }).save();

    return newAttendee;
};

const editAttendee = async (
    _,
    { attendeeId, firstName, lastName, joinDate },
    { Attendee }
) => {
    const attendee = await Attendee.findByIdAndUpdate(
        { _id: attendeeId },
        {
            firstName,
            lastName,
            joinDate
        },
        { new: true }
    );

    return attendee;
};

const deleteAttendee = async (_, { attendeeId }, { Attendee }) => {
    const attendee = await Attendee.findOneAndDelete({ _id: attendeeId });
    return attendee;
};

module.exports = {
    mutation: {
        addAttendee,
        editAttendee,
        deleteAttendee
    },
    query: {
        getAttendees
    }
};
