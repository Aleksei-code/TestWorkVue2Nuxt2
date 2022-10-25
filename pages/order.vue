<template>
  <section>
    <form>
      <h1>Cart page</h1>
      <div class="form-group">
        <input type="text" class="form-control" />
      </div>

      <p>
        <nuxt-link to="/">Whats in your order</nuxt-link>
      </p>

      <button class="btn btn-primary" type="submit">Login</button>
    </form>
  </section>
</template>
<style scoped>
form {
  width: 500px;
  margin: 0 auto;
}
</style>
