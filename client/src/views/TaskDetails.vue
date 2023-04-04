<script setup>
import { useTodoStore } from '~/stores/todo.store'
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'

const title = ref('')

const todoStore = useTodoStore()

const addTask = async (todo) => {
  todo.subTasks.push({
    id: uuidv4(),
    title: title.value,
    completed: false,
  })
  await todoStore.updateTodo(todo)
  title.value = ''
}

const taskCompleted = async (todo, index) => {
  todo.subTasks[index].completed = !todo.subTasks[index].completed

  await todoStore.updateTodo(todo)
}

const deleteTask = async (todo, index) => {
  todo.subTasks.splice(index, 1)
  await todoStore.updateTodo(todo)
}

const deleteTodo = async (todo) => {
  await todoStore.deleteTodo(todo)
}
const todo = computed(() => todoStore.todo)

onMounted(() => {
  const route = useRoute()
  todoStore.getTodo(route.params.id)
})
</script>

<template>
  <div class="flex flex-col items-center justify-between text-center">
    <div class="m-4 rounded-lg bg-white p-4 shadow-md">
      <div class="flex justify-between">
        <router-link to="/">
          <button
            class="text-grey-700 flex items-center rounded border border-gray-700 bg-white p-2 font-bold hover:bg-gray-800 hover:text-white"
          >
            <svg
              class="mr-2 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9 13h8V7h-8V2l-7 8 7 8v-5z" />
            </svg>
            <span>Retour</span>
            <span class="ml-2"></span>
          </button>
        </router-link>
        <router-link to="/">
          <button
            class="rounded bg-red-500 p-2 font-bold text-white hover:bg-red-600"
            @click="deleteTodo(todo)"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </router-link>
      </div>
      <h2 class="my-10 text-4xl font-bold dark:text-white">{{ todo.title }}</h2>

      <div class="align-center item-center flex flex-row justify-center">
        <input
          v-model="title"
          type="text"
          name=""
          class="m-4 rounded-lg border border-gray-300 p-2 shadow-md transition duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your Todo"
        />
        <button
          class="m-4 rounded bg-blue-500 p-4 font-bold text-white hover:bg-blue-700"
          @click="addTask(todo)"
        >
          Add
        </button>
      </div>

      <div v-for="(task, index) in todo.subTasks" :key="index">
        <div v-if="task.title != ''" class="flex flex-row justify-center gap-4">
          <div
            v-if="task.completed"
            class="my-2 flex w-64 cursor-pointer justify-start rounded-lg border border-gray-400 bg-green-500 p-6 text-lg font-medium text-white hover:shadow-lg"
          >
            {{ task.title }}
          </div>
          <div
            v-else
            class="my-2 flex w-64 cursor-pointer justify-start rounded-lg border border-gray-400 bg-white p-6 text-lg font-medium text-gray-700 hover:shadow-lg"
          >
            {{ task.title }}
          </div>
          <div class="flex flex-col gap-2 self-center">
            <button
              class="self-center rounded border border-green-500 bg-transparent p-1 text-lg font-semibold text-green-500 hover:border-transparent hover:bg-green-500 hover:text-white"
              @click="taskCompleted(todo, index)"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </button>
            <button
              class="self-center rounded border border-red-500 bg-transparent p-1 text-lg font-semibold text-red-500 hover:border-transparent hover:bg-red-500 hover:text-white"
              @click="deleteTask(todo, index)"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
