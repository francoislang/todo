const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
    required: false,
  },
  deadline: {
    type: Date,
    required: false,
  },
  subTasks: {
    type: Array,
    default: [
      {
        id: "",
        title: "",
        completed: false,
      },
    ],
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
