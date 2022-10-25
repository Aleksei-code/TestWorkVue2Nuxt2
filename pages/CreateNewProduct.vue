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
};
</script>
