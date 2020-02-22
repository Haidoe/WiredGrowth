const getTasks = async (_, args, { Task }) => {
    const tasks = await Task.find({});
    return tasks;
};

const addTask = async (_, { task, description }, { Task }) => {
    const isTaskExists = await Task.findOne({ task });

    if (isTaskExists) throw new Error("Task already exists");

    const newTask = await new Task({
        task,
        description
    }).save();

    return newTask;
};

const editTask = async (_, { taskId, task, description }, { Task }) => {
    const editedTask = await Task.findByIdAndUpdate(
        { _id: taskId },
        { task, description },
        { new: true }
    );
    return editedTask;
};

const deleteTask = async (_, { taskId }, { Task }) => {
    const deletedTask = await Task.findOneAndDelete({ _id: taskId });
    return deletedTask;
};

module.exports = {
    query: {
        getTasks
    },
    mutation: {
        addTask,
        editTask,
        deleteTask
    }
};
