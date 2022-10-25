<template>
  <div class="s-container">
    <div class="s-input-wrapper">
      <input type="text" v-model="query" placeholder="search" />
    </div>
    <div class="s-results">
      <div class="s-result-placeholder" v-if="loading">
        <div class="placeholder-item" v-for="item in 3" :key="item">
          <div></div>
        </div>
      </div>
      <div
        class="s-result-items"
        v-if="!loading && results.length"
        v-for="(item, key) of results"
        :key="key"
      >
        <div id="searchResult" @click.prevent="openProduct(item.id)">
          <div>
            <a>
              {{ item.id }}
            </a>
          </div>
          <div class="category">{{ ` ${item.category}` }}</div>
          <div class="name">{{ ` ${item.name}` }}</div>
        </div>
      </div>
      <div class="s-status-message" v-if="!loading && message">
        <p>[[ message ]]</p>
      </div>
    </div>
  </div>
</template>

<style scopped>
.s-container,
.s-results {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content;
}
.s-container {
  margin: 10px 40px;
  grid-gap: 5px;
}
.s-input-wrapper > input {
  height: 50px;
  width: 100%;
  background-color: #efefef;
  font-size: 1.5rem;
  padding: 2px 5px;
}

.s-result-items > div,
.placeholder-item,
.s-status-message {
  font-size: 1rem;
  background-color: rgb(255, 255, 255, 0.9);
  backdrop-filter: blur(10%);
  padding: 4px 5px;
  min-height: 30px;
  display: flex;
  justify-content: space-between;
}
.s-result-items > div:nth-child(n + 2) {
  border-top: 2px solid #d8d8d8;
}
.category {
  font-style: italic;
  color: rgb(158, 158, 158);
  font-size: medium;
  font-weight: 600;
}

.placeholder-item > div {
  position: relative;
  width: 100%;
  height: 22px;
  padding: 5px;
  border-radius: 4px;
  background: rgb(225, 225, 225);
  background: linear-gradient(
    90deg,
    rgba(227, 227, 227, 1) 0%,
    rgba(207, 207, 207, 1) 7%,
    rgba(207, 207, 207, 1) 13%,
    rgba(227, 227, 227, 1) 25%
  );
  background-size: 900%;
  background-position: 100% 0%;
  animation: placeholder-animation 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.s-status-message > p {
  width: 100%;
  text-align: center;
}

#searchResult:hover {
  color: blue;
  cursor: pointer;
}

@keyframes placeholder-animation {
  0% {
    background-position: 100% 0%;
  }
  50% {
    background-position: 50% 0%;
  }
  100% {
    background-position: 0% 0%;
  }
}
</style>

<script>
import axios from "axios";
export default {
  name: "Search",
  data() {
    return {
      query: "",
      results: [],
      loading: false,
      message: "",
    };
  },
  delimiters: ["[[", "]]"],
  watch: {
    query() {
      if (this.query.length >= 3) {
        this.searchItems();
      }
      if (this.query.length < 3) {
        this.results = [];
      }
    },
  },
  methods: {
    openProduct(product) {
      console.log(product);
      this.$router.push("/products/" + product);
    },
    searchItems() {
      this.loading = true;
      this.message = "";
      axios
        .get("https://my-store2.p.rapidapi.com/catalog/products", {
          params: { skip: this.query, limit: "20" },
          headers: {
            "X-RapidAPI-Key":
              "0ee78aac30mshfa933e509f75de9p102ecfjsn94dec59f7f3e",
            "X-RapidAPI-Host": "my-store2.p.rapidapi.com",
          },
        })
        .then((response) => {
          this.loading = false;
          console.log(response.data);
          this.results = response.data.products;
          this.message = response.someStatusMessage;
        })
        .catch((error) => {
          this.loading = false;
          this.message = error.someStatusMessage;
          console.log(error);
        });
    },
  },
};
</script>
