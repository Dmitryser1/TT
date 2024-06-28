<template>
  <div>
    <TaskForm @save="fetchTasks" />
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Название</th>
          <th>Описание</th>
          <th>Дата создания</th>
          <th>Дата выполнения</th>
          <th>Метки</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="task._id">
          <td>{{ index + 1 }}</td>
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ new Date(task.createdAt).toLocaleString() }}</td>
          <td>{{ task.dueDate ? new Date(task.dueDate).toLocaleString() : 'N/A' }}</td>
          <td>{{ task.labels.join(', ') }}</td>
          <td>
            <button @click="editTask(task)">Редактировать</button>
            <button @click="deleteTask(task._id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getTasks, deleteTask } from '../services/taskService';
import TaskForm from './TaskForm.vue';

export default defineComponent({
  components: { TaskForm },
  data() {
    return {
      tasks: [] as any[]
    };
  },
  methods: {
    async fetchTasks() {
      const response = await getTasks();
      this.tasks = response.data;
    },
    async deleteTask(id: string) {
      await deleteTask(id);
      this.fetchTasks();
    },
    editTask(task: any) {
      this.$emit('edit-task', task);
    }
  },
  mounted() {
    this.fetchTasks();
  }
});
</script>