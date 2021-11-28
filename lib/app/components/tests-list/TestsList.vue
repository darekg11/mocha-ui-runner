<template>
    <q-banner class="bg-grey-3 full-width">
      <div class="row component-tests-list-base q-mb-sm">
        <div class="flex label">
          <span class="text-subtitle1">Tests</span>
        </div>
        <div>
          <q-btn round class="q-mx-sm" color="primary" icon="play_arrow" size="sm">
            <q-tooltip>Run all tests</q-tooltip>
          </q-btn>
          <q-btn round class="q-mx-sm" color="secondary" icon="refresh" size="sm">
            <q-tooltip>Refresh tests</q-tooltip>
          </q-btn>
        </div>
      </div>
      <q-input ref="filterRef" filled v-model="filter" label="Filter">
        <template v-slot:append>
          <q-icon v-if="filter !== ''" name="clear" class="cursor-pointer" @click="resetFilter" />
        </template>
      </q-input>
    </q-banner>
    <q-tree
      :nodes="tests"
      node-key="id"
      label-key="label"
      children-key="tests"
      :filter="filter"
    >
      <template v-slot:default-header="prop">
        <div class="row items-center">
          <div class="text-weight-bold text-primary">{{ prop.node.label }}</div>
        </div>
      </template>
    </q-tree>
</template>

<script>
import { ref } from "vue";
import { mapGetters } from 'vuex'
import "./TestsList.scss";

export default {
  computed: {
    ...mapGetters("app", {
      tests: "testsGroupedByTestSpec"
    })
  },
  setup() {
    const filter = ref("");
    const filterRef = ref(null);

    return {
      filter,
      filterRef,
      resetFilter () {
        filter.value = "";
        filterRef.value.focus();
     }
    }
  }
}
</script>