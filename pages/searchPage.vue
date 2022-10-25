<template>
  <div id="app">
    <div class="page-layout">
      <search></search>
    </div>
  </div>
</template>

<script>
import Search from "../components/Search.vue";
export default {
  name: "layout",
  components: {
    Search,
  },
};
</script>

<style scopped>
.page-layout {
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
}
.search-page > div:first-child {
  height: 50px;
}
.extra-content {
  background: #ededed;
  flex: 1;
  display: grid;
  display: grid;
  grid-gap: 10px;
  padding: 10px;
  grid-template-columns: 1fr;
  grid-template-rows: 100px;
}
.extra-content > div {
  background-color: #00d1b2;
  border-radius: 5px;
}
</style>
