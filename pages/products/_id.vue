<template>
  <section>
    <h1>Item id #{{ product.id }}</h1>

    <hr />
    <h3>Category: {{ product.category }}</h3>
    <h3>Created: {{ product.created }}</h3>
    <h3>Description: {{ product.description }}</h3>
    <h3>Manufacturer: {{ product.manufacturer }}</h3>
    <h3>Name: {{ product.name }}</h3>
    <h3>Price: {{ product.price }}</h3>
    <h3>Status: {{ product.status }}</h3>
    <h3>Tags: {{ product.tags }}</h3>
    <nuxt-link class="btn btn-primary mt-2" to="/products">Get back</nuxt-link>
  </section>
</template>

<script>
export default {
  // validate({params}) {
  //   return /^\d+$/.test(params.id)
  // },
  async asyncData({ $axios, params }) {
    const product = await $axios.$get(
      "https://my-store2.p.rapidapi.com/catalog/product/" + params.id,
      {
        headers: {
          "X-RapidAPI-Key":
            "0ee78aac30mshfa933e509f75de9p102ecfjsn94dec59f7f3e",
          "X-RapidAPI-Host": "my-store2.p.rapidapi.com",
        },
      }
    );
    console.log(product);
    return { product };
  },
};
</script>
