<template>
  <div id="app">
    <Tasks />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Tasks from './views/Tasks.vue';

export default defineComponent({
  components: { Tasks }
});
</script>