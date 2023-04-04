import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useTodoStore = defineStore('todo', () => {
  // store --------------------------------------------------------------------
  const todoList = ref([])
  const todo = ref({
    _id: '',
    title: '',
    completed: false,
    deadline: null,
    subTasks: [
      {
        id: '',
        title: '',
        completed: false,
      },
    ],
  })

  // computed -----------------------------------------------------------------

  // function ------------------------------------------------------------------

  const getTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/todos')
      todoList.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  const getTodo = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/todos/${id}`)
      todo.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  const createTodo = async (todo) => {
    try {
      const response = await axios.post('http://localhost:3000/api/todos', todo)
      todoList.value.push(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const updateTodo = async (todo) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/todos/${todo._id}`, todo)
      const index = todoList.value.findIndex((t) => t._id === todo._id)
      todoList.value[index] = response.data
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTodo = async (todo) => {
    try {
      await axios.delete(`http://localhost:3000/api/todos/${todo._id}`)
      const index = todoList.value.findIndex((t) => t._id === todo._id)
      todoList.value.splice(index, 1)
    } catch (error) {
      console.log(error)
    }
  }

  return { todoList, todo, createTodo, getTodos, getTodo, updateTodo, deleteTodo }
})
