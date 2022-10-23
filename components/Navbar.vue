<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Nuxt SSR</a>

    <div class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <nuxt-link
            exact
            no-prefetch
            active-class="active"
            class="nav-link"
            to="/"
          >
            Home
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link active-class="active" class="nav-link" to="/about">
            About
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link active-class="active" class="nav-link" to="/products">
            Products
          </nuxt-link>
        </li>
        <li class="nav-item" v-if="!hasToken">
          <nuxt-link active-class="active" class="nav-link" to="/login">
            Login
          </nuxt-link>
        </li>
        <li class="nav-item" v-else>
          <a @click.prevent="logout" class="nav-link" href="#"> Logout </a>
        </li>
        <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="searchingFor"
          />
          <button @click.prevent="searchBar(searchingFor)" class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    searchingFor:'',
  }),
  computed: {
    hasToken() {
      return this.$store.getters.hasToken;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  searchBar(req) {
    const options = {
  method: 'GET',
  url: 'https://my-store2.p.rapidapi.com/catalog/products',
  params: {skip: req, limit: '3'},
  headers: {
    'X-RapidAPI-Key': '0ee78aac30mshfa933e509f75de9p102ecfjsn94dec59f7f3e',
    'X-RapidAPI-Host': 'my-store2.p.rapidapi.com'
  }
};
console.log (req)
console.log (options)
this.$axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
  }
  },
};
</script>
