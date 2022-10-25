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
  data: () => ({
    pageTitle: "Products page",
    addName: "Name",
    addPrice: "addPrice",
    addManufacturer: "addManufacturer",
    addCategory: "addCategory",
    addDescription: "addDescription",
    addTags: "addTags",
  }),
  methods: {
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
