<template>
  <section>
    <h1>{{ pageTitle }}</h1>
    <div>
      <button
        v-if="isView"
        class="btn btn-secondary"
        @click.prevent="changeView()"
      >
        Linear view
      </button>
      <button v-else class="btn btn-primary" @click.prevent="changeView()">
        Classic view
      </button>
    </div>

    <div class="mt-3" v-bind:class="{ row: isView }">
      <div
        v-for="product of productsRen"
        :key="product.id"
        class="card"
        v-bind:class="{ 'col-md-3': isView, 'mr-0': isView }"
      >
        <div class="card-body">
          <h5 class="card-title">Product {{ product.id }}</h5>
          <p class="card-text">Category: {{ product.name }}</p>
          <div>
            <button
              href="#"
              @click.prevent="openProduct(product)"
              class="btn btn-primary"
            >
              About
            </button>
            <button
              @click.prevent="deleteProduct(product.id)"
              class="btn btn-danger"
            >
              Del
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex pt-4">
      <div v-for="pageNumber of pagesCounter" :key="pageNumber">
        <button
          v-bind:class="[
            pageNumber === currentPage ? 'btn btn-primary' : 'btn btn-light',
          ]"
          @click.prevent="setPage(pageNumber)"
        >
          {{ pageNumber }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { conditionalExpression } from "@babel/types";

export default {
  async fetch({ store }) {
    if (store.getters["products/products"].length === 0) {
      await store.dispatch("products/fetch");
    }
  },
  data: () => ({
    pageTitle: "Products page",
    pageSize: 20,
    currentPage: 1,
    currPageItems: [],
    categories: [],
    isView: true,
    idInProccess: [],
    currItemsForPage: [],
  }),
  computed: {
    startItemPosition() {
      if (this.currentPage !== 1) {
        return this.currentPage * this.pageSize - this.pageSize + 1;
      } else {
        return 1;
      }
    },
    endItemPosition() {
      return this.products.length > this.currentPage * this.pageSize + 1
        ? this.currentPage * this.pageSize + 1
        : this.products.length + 1;
    },
    products() {
      return this.$store.getters["products/products"];
    },
    productsRen() {
      this.currItemsForPageChange();
      return this.currPageItems;
    },
    pagesCounter() {
      return Math.round(this.products.length / this.pageSize);
    },
  },
  methods: {
    setPage(page) {
      this.currentPage = page;
    },
    currItemsForPageChange() {
      this.currPageItems = [];
      for (
        let i = this.startItemPosition - 1;
        i < this.endItemPosition - 1;
        i++
      ) {
        this.currPageItems.push(this.products[i]);
      }
    },
    changeView() {
      this.isView = !this.isView;
      this.currItemsForPageChange();
    },
    openProduct(product) {
      this.$router.push("/products/" + product.id);
    },

    inProccess(id) {
      return this.idInProccess.some((el) => el == id);
    },

    async deleteProduct(id) {
      if (!this.inProccess(id)) {
        this.idInProccess.push(id);
        let res = await this.deleteProductAxios(id);
        this.products.filter((el) => el != id);
        this.idInProccess = this.idInProccess.filter((el) => el != id);
        this.$store.commit("products/deleteProductFromStore", id);
      }
    },

    deleteProductAxios(id) {
      const options = {
        method: "DELETE",
        url: "https://my-store2.p.rapidapi.com/catalog/product/" + id,
        headers: {
          "X-RapidAPI-Key":
            "0ee78aac30mshfa933e509f75de9p102ecfjsn94dec59f7f3e",
          "X-RapidAPI-Host": "my-store2.p.rapidapi.com",
        },
      };

      this.$axios
        .request(options)
        .then(function (response) {
          return response.data.id;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
};
</script>
