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
        <button class="btn btn-light" @click.prevent="setPage(pageNumber)">
          {{ pageNumber }}
        </button>
      </div>
    </div>

    <div class="row mt-3 card">
      <div class="text-center">
        <h3 class="m-2">Create a new product card</h3>
      </div>
      <form class="p-4">
        <div class="mb-3 row">
          <div class="col-md-4">
            <label class="form-label m-2">Name</label>
            <input
              type="email"
              class="form-control"
              v-model="addName"
              id="addName"
            />
          </div>
          <div class="col-md-4">
            <label class="form-label m-2">Price</label>
            <input
              type="email"
              class="form-control"
              v-model="addPrice"
              id="addPrice"
            />
          </div>
          <div class="col-md-4">
            <label class="form-label m-2">Manufacturer</label>
            <input
              type="email"
              class="form-control"
              v-model="addManufacturer"
              id="addManufacturer"
            />
          </div>
          <div class="col-md-4">
            <label class="form-label m-2">Category</label>
            <input
              type="email"
              class="form-control"
              v-model="addCategory"
              id="addCategory"
            />
          </div>
          <div class="col-md-4">
            <label class="form-label m-2">Description</label>
            <input
              type="email"
              class="form-control"
              v-model="addDescription"
              id="addDescription"
            />
          </div>
          <div class="col-md-4">
            <label class="form-label m-2">Tags</label>
            <input
              type="email"
              class="form-control"
              v-model="addTags"
              id="addTags"
            />
          </div>
          <div class="col-md-4 mt-3">
            <button @click.prevent="addProduct()" class="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
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
    pageSize: 4,
    currentPage: 1,
    currPageItems: [],
    pageTitle: "products page",
    addName: "Name",
    addPrice: "addPrice",
    addManufacturer: "addManufacturer",
    addCategory: "addCategory",
    addDescription: "addDescription",
    addTags: "addTags",
    categories: [],
    isView: true,
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
      this.currItemsForPageChange();
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
    deleteProduct(id) {
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
          console.log(response.data.id);
          this.products.filter((_product) => id != id);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    addProduct() {
      const options = {
        method: "POST",
        url: "https://my-store2.p.rapidapi.com/catalog/product",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "0ee78aac30mshfa933e509f75de9p102ecfjsn94dec59f7f3e",
          "X-RapidAPI-Host": "my-store2.p.rapidapi.com",
        },
        data: '{"name":"123","price":0,"manufacturer":"22","category":"32","description":"32","tags":"23"}',
      };

      this.$axios
        .request(options)
        .then(function (response) {
          const n1 = response.date;
          console.log(n1);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
};
</script>
