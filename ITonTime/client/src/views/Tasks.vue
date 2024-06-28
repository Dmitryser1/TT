<template>
  <div>
    <TaskForm :taskToEdit="taskToEdit" @save="fetchTasks" />
    <TaskList @edit-task="editTask" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TaskForm from "../components/TaskForm.vue";
import TaskList from "../components/TaskList.vue";

export default defineComponent({
  components: { TaskForm, TaskList },
  setup() {
    const taskToEdit = ref(null);

    const fetchTasks = () => {
      taskToEdit.value = null;
    };

    const editTask = (task: any) => {
      taskToEdit.value = task;
    };

    return { taskToEdit, fetchTasks, editTask };
  },
});
</script>
