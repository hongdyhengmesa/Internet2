<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

import { useTodoStore } from '@/stores/todo.store'

const todoStore = useTodoStore()

const title = ref('')

let stopRealtime: null | (() => void) = null

onMounted(async () => {
  await todoStore.fetchTodos()

  stopRealtime = todoStore.startRealtime()
})

onBeforeUnmount(() => {
  stopRealtime?.()
})

async function onAdd() {
  await todoStore.addTodo(title.value)

  title.value = ''
}
</script>

<template>
  <div class="container">
    <h1>Vue GraphQL Todo App</h1>

    <div class="add-box">
      <input
        v-model="title"
        type="text"
        placeholder="Enter todo..."
        @keyup.enter="onAdd"
      />

      <button @click="onAdd">
        Add
      </button>
    </div>

    <p v-if="todoStore.loading">
      Loading...
    </p>

    <p v-if="todoStore.error">
      {{ todoStore.error }}
    </p>

    <ul>
      <li
        v-for="todo in todoStore.todos"
        :key="todo.id"
      >
        <div class="todo-item">
          <label>
            <input
              type="checkbox"
              :checked="todo.is_done"
              @change="todoStore.toggleTodo(todo)"
            />

            <span :class="{ done: todo.is_done }">
              {{ todo.title }}
            </span>
          </label>

          <button
            class="delete-btn"
            @click="todoStore.deleteTodo(todo.id)"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 40px auto;
  font-family: Arial;
}

.add-box {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input[type='text'] {
  flex: 1;
  padding: 10px;
}

button {
  padding: 10px 15px;
  cursor: pointer;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.done {
  text-decoration: line-through;
  color: gray;
}

.delete-btn {
  background: red;
  color: white;
  border: none;
}
</style>