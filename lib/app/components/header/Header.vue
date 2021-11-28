<template>
  <q-header elevated class="bg-primary text-white component-header-base" height-hint="98">
    <q-toolbar>
      <q-toolbar-title>Mocha UI Runner</q-toolbar-title>
      <div class="status-panel">
        <div class="single-info">
          <p class="title">Status:</p><p class="value">{{ status }}</p>
        </div>
        <div class="single-info">
          <p class="title">Tests glob:</p><p class="value">{{ testsPath }}</p>
        </div>
        <div class="single-info">
          <p class="title">Total suites:</p><p class="value">{{ totalSuites }}</p>
        </div>
        <div class="single-info">
          <p class="title">Total tests:</p><p class="value">{{ totalTests }}</p>
        </div>
      </div>
      <!-- <q-toggle @update:model-value="toggleDarkMode"
                  v-model="useDarkMode"
                  checked-icon="dark_mode"
                  color="green"
                  size="lg"
                  unchecked-icon="light_mode"
                  left-label
                  label="Dark mode" />
      !-->
    </q-toolbar>
    <q-toolbar>
      <div class="status-panel">
        <div class="single-info">
          <p class="title">Time:</p><p>-</p>
        </div>
        <div class="single-info">
          <p class="title">Success tests:</p><p class="value success-tests-color">{{ successTests }}</p>
        </div>
        <div class="single-info">
          <p class="title">Pending tests:</p><p class="value pending-tests-color">{{ pendingTests }}</p>
        </div>
        <div class="single-info">
          <p class="title">Failing tests:</p><p class="value failed-tests-color">{{ failedTests }}</p>
        </div>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { ref } from "vue";
import { mapGetters } from 'vuex'
import { useQuasar } from "quasar";
import "./header.scss";
export default {
  computed: {
    ...mapGetters("app", {
      status: "status",
      testsPath: "testsPath",
      totalTests: "totalTests",
      totalSuites: "totalSuites",
      successTests: "successTests",
      failedTests: "failedTests",
      pendingTests: "pendingTests"
    })
  },
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
