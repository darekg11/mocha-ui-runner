<template>
  <q-layout view="hHh lpR fFf">
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

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      width=500
      bordered
    >
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
    </q-page-container>
  </q-layout>
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
