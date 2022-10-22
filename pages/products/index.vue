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
    <div class="mt-3 gx-5" v-bind:class="{ row: isView }">
      <div
        v-for="product of products"
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

    <div class="overflow-auto">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="pageSize"
        aria-controls="my-table"
      ></b-pagination>
      <p class="mt-3">Current Page: {{ currentPage }}</p>
    </div>

    <div class="d-flex mt-2">
      <div v-for="page of 3" :key="page">
        <nuxt-link class="btn btn-light mr-2" to="/products/">{{
          page
        }}</nuxt-link>
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
export default {
  async fetch({ store }) {
    if (store.getters["products/products"].length === 0) {
      await store.dispatch("products/fetch");
    }
  },
  data: () => ({
    pageSize: 4,
    currentPage: 1,
    pageTitle: "products page",
    addName: "Name",
    addPrice: "addPrice",
    addManufacturer: "addManufacturer",
    addCategory: "addCategory",
    addDescription: "addDescription",
    addTags: "addTags",
    categories: [],
    isView: true,
  }),
  computed: {
    products() {
      return this.$store.getters["products/products"];
    },
    rows() {
      return this.products.length;
    },
    delPr(id) {
      console.log(id);

      this.products.filter((_product) => id != id);
    },
  },
  methods: {
    changeView() {
      this.isView = !this.isView;
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
          this.delPr(id);
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
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
};
</script>
