const Todo = require("../models/todo.model");

exports.getTodos = async (req, res) => {
  try {
    const todo = await Todo.find();
    if (!todo) {
      return res.status(404).send({ message: "tâche non trouvée" });
    }
    return res.status(200).send(todo);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Erreur serveur" });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).send({ message: "tâche non trouvée" });
    }
    return res.status(200).send(todo);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Erreur serveur" });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);

    return res.status(201).json({
      todo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).send({ message: "tâche non trouvée" });
    }
    todo.title = req.body.title;
    todo.completed = req.body.completed;
    todo.deadline = req.body.deadline;
    todo.subTasks = req.body.subTasks;
    await todo.save();
    return res.status(200).send(todo);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Erreur serveur" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndRemove(req.params.id);
    if (!todo) {
      return res.status(404).send({ message: "tâche non trouvée" });
    }
    return res.status(200).send({ message: "tâche supprimée" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Erreur serveur" });
  }
};
