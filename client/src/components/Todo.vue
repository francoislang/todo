<script setup>
import { useTodoStore } from '~/stores/todo.store'
import { onMounted, ref, computed } from 'vue'
import router from '~/router'

const title = ref('')

const todoStore = useTodoStore()

const addTodo = async () => {
  await todoStore.createTodo({
    title: title.value,
  })

  title.value = ''
  await todoStore.getTodos()
}

const todoCompleted = async (todo) => {
  todo.completed = !todo.completed
  await todoStore.updateTodo(todo)

  await todoStore.getTodos()
}

const deleteTodo = async (todo) => {
  await todoStore.deleteTodo(todo)

  await todoStore.getTodos()
}

const routes = (id) => {
  router.push(`/task/${id}`)
}

const todoList = computed(() => todoStore.todoList)

onMounted(() => {
  todoStore.getTodos()
})
</script>

<template>
  <div class="flex flex-col items-center justify-between text-center">
    <div class="m-4 rounded-lg p-4 shadow-md">
      <h1
        class="mb-10 rounded-lg px-8 py-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl"
      >
        Todo List
      </h1>
      <div class="align-center item-center flex flex-row justify-start">
        <input
          v-model="title"
          type="text"
          name=""
          class="m-4 rounded-lg border border-gray-300 p-2 shadow-md transition duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your Todo"
        />
        <button
          class="m-4 rounded bg-blue-500 p-4 font-bold text-white hover:bg-blue-700"
          @click="addTodo"
        >
          Add
        </button>
      </div>
      <div
        v-for="(todo, index) in todoList"
        :key="index"
        class="flex flex-col items-center rounded text-center dark:border-gray-600"
      >
        <div class="flex h-auto flex-row gap-4">
          <div
            v-if="todo.completed"
            class="my-2 flex w-64 cursor-pointer justify-between rounded-lg border border-gray-400 bg-white p-6 text-lg font-medium text-gray-700 opacity-40 hover:shadow-lg"
          >
            <div class="break-keep text-left">
              {{ todo.title }}
            </div>
            <button
              class="self-center rounded border border-gray-600 bg-white p-1 text-lg font-semibold text-gray-600 hover:border-transparent hover:bg-gray-600 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-6 w-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M14.485 3.757a1 1 0 00-1.414 0l-9.192 9.192a.999.999 0 00-.267.464L2 17l3-1.828a1.001 1.001 0 00.464-.267l9.192-9.192a1 1 0 000-1.414zM5.732 14.732L4.121 16.34l-1.414-1.414L4.318 13h1.414v1.414zm2.828-2.828l-1.414-1.414 7.071-7.07 1.414 1.414-7.071 7.07z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            v-else
            class="my-2 flex w-64 cursor-pointer justify-between rounded-lg border border-gray-400 bg-white p-6 text-lg font-medium text-gray-700 hover:shadow-lg"
          >
            <div class="break-keep text-left">
              {{ todo.title }}
            </div>

            <button
              class="self-center rounded border border-gray-600 bg-white p-1 text-lg font-semibold text-gray-600 hover:border-transparent hover:bg-gray-600 hover:text-white"
              @click="routes(todo._id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-6 w-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M14.485 3.757a1 1 0 00-1.414 0l-9.192 9.192a.999.999 0 00-.267.464L2 17l3-1.828a1.001 1.001 0 00.464-.267l9.192-9.192a1 1 0 000-1.414zM5.732 14.732L4.121 16.34l-1.414-1.414L4.318 13h1.414v1.414zm2.828-2.828l-1.414-1.414 7.071-7.07 1.414 1.414-7.071 7.07z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div class="flex flex-col gap-2 self-center">
            <button
              class="self-center rounded border border-green-500 bg-white p-1 text-lg font-semibold text-green-500 hover:border-transparent hover:bg-green-500 hover:text-white"
              @click="todoCompleted(todo)"
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
              class="self-center rounded border border-red-500 bg-white p-1 text-lg font-semibold text-red-500 hover:border-transparent hover:bg-red-500 hover:text-white"
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
