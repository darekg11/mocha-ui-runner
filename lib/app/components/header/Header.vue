<template>
  <q-header elevated class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-toolbar-title>Mocha UI Runner</q-toolbar-title>
      <q-toggle @update:model-value="toggleDarkMode"
                  v-model="useDarkMode"
                  checked-icon="dark_mode"
                  color="green"
                  size="lg"
                  unchecked-icon="light_mode"
                  left-label
                  label="Dark mode" />
    </q-toolbar>
  </q-header>
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
export default {
  setup() {
    const $q = useQuasar();
    const useDarkMode = ref(false);
    return {
      useDarkMode,
      toggleDarkMode(value) {
        $q.dark.set(value);
      }
    };
  }
}
</script>
