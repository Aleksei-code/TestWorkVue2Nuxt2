export const state = () => ({
  products: [],
  categories: [],
});

export const getters = {
  products: (state) => state.products,
};

export const mutations = {
  setProducts(state, products) {
    state.products = products.products;
  },
};

export const actions = {
  async fetch({ commit }) {
    const options = {
      method: "GET",
      url: "https://my-store2.p.rapidapi.com/catalog/products",
      headers: {
        "X-RapidAPI-Key": "0ee78aac30mshfa933e509f75de9p102ecfjsn94dec59f7f3e",
        "X-RapidAPI-Host": "my-store2.p.rapidapi.com",
      },
    };

    const products = await this.$axios
      .request(options)
      .then(function (response) {
        let products = response.data;
        commit("setProducts", products);
      })
      .catch(function (error) {
        console.error(error);
      });
  },
};
