<template>
  <section>
    <h1>{{ pageTitle }}</h1>
    <div class="row mt-3 card">
      <div class="text-center">
        <h3 class="m-2">Create a new product card</h3>
      </div>
      <form class="p-4">
        <div class="mb-3 row">
          <div class="col-md-4">
            <label class="form-label m-2">Name</label>
            <input
              type="text"
              placeholder="Enter the name"
              class="form-control"
              v-model="addName"
              id="addName"
            />
          </div>
          <div class="col-md-4">
            <label class="form-label m-2">Price</label>
            <input
              type="text"
              placeholder="Enter the price"
              class="form-control"
              v-model="addPrice"
              id="addPrice"
            />
          </div>
          <div class="col-md-4">
            <label class="form-label m-2">Manufacturer</label>
            <input
              type="text"
              placeholder="Enter the manufacturer"
              class="form-control"
              v-model="addManufacturer"
              id="addManufacturer"
            />
          </div>
          <div class="col-md-4">
            <label class="form-label m-2">Category</label>
            <input
              type="text"
              placeholder="Enter the category"
              class="form-control"
              v-model="addCategory"
              id="addCategory"
            />
          </div>
          <div class="col-md-4">
            <label class="form-label m-2">Description</label>
            <input
              type="text"
              placeholder="Enter the description"
              class="form-control"
              v-model="addDescription"
              id="addDescription"
            />
          </div>
          <div class="col-md-4">
            <label class="form-label m-2">Tags</label>
            <input
              type="text"
              placeholder="Enter tags"
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
      <div v-if="resp">
        <div>Successful creation!</div>
        <button class="btn btn-success" @click.prevent="openProduct()">
          Go to your new product
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { timingSafeEqual } from "crypto";

export default {
  data: () => ({
    pageTitle: "",
    addName: "",
    addPrice: "",
    addManufacturer: "",
    addCategory: "",
    addDescription: "",
    addTags: "",
    collectedData: {},
    resp: "",
  }),
  methods: {
    collectData() {
      this.collectedData = {
        name: this.addName,
        price: this.addPrice,
        manufacturer: this.addManufacturer,
        category: this.addCategory,
        description: this.addDescription,
        tags: this.addTags,
      };
      let b = JSON.stringify(this.collectedData);
      console.log(b);
    },
    openProduct() {
      this.$router.push("/products/" + this.resp);
    },
    addProductAxios() {
      this.collectData();
      let vm = this;
      const options = {
        method: "POST",
        url: "https://my-store2.p.rapidapi.com/catalog/product",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "0ee78aac30mshfa933e509f75de9p102ecfjsn94dec59f7f3e",
          "X-RapidAPI-Host": "my-store2.p.rapidapi.com",
        },
        data: this.collectedData,
      };

      this.$axios
        .request(options)
        .then(function (response) {
          vm.resp = response.data.id;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    addProduct() {
      this.addProductAxios();
    },
  },
};
</script>
