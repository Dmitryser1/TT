<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="title">Название</label>
        <input type="text" id="title" v-model="task.title" required />
      </div>
      <div>
        <label for="description">Описание</label>
        <textarea id="description" v-model="task.description" required></textarea>
      </div>
      <div>
        <label for="dueDate">Дата выполнения</label>
        <input type="datetime-local" id="dueDate" v-model="task.dueDate" />
      </div>
      <div>
        <label for="labels">Метки (через запятую)</label>
        <input type="text" id="labels" v-model="task.labels" />
      </div>
      <button type="submit">{{ task._id ? 'Обновить' : 'Создать' }} задачу</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { createTask, updateTask } from '../services/taskService';

export default defineComponent({
  props: {
    taskToEdit: {
      type: Object,
      default: () => ({ title: '', description: '', dueDate: '', labels: '' })
    }
  },
  setup(props, { emit }) {
    const task = ref<any>(props.taskToEdit);

    watch(() => props.taskToEdit, (newTask) => {
      task.value = { ...newTask, labels: newTask.labels.join(', ') };
    });

    const handleSubmit = async () => {
      task.value.labels = task.value.labels.split(',').map((label: string) => label.trim());
      if (task.value._id) {
        await updateTask(task.value._id, task.value);
      } else {
        await createTask(task.value);
      }
      task.value = { title: '', description: '', dueDate: '', labels: '' };
      emit('save');
    };

    return { task, handleSubmit };
  }
});
</script>