<template>
  <q-layout view="hHh lpR fFf">
    <app-header></app-header>

    <q-drawer
      show-if-above
      side="left"
      width=600
      bordered
    >
      <tests-list></tests-list>
    </q-drawer>

    <q-page-container>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("app/getInitialData");
  }
}
</script>