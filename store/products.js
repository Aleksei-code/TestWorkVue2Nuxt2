export const state = () => ({
  products: [],
  categories: [],
});

export const mutations = {
  setProducts(state, products) {
    state.products = products.products;
    console.log(state.products);
  },
};

export const actions = {
  async fetch({ commit }) {
    const zapros = {
      method: "GET",
      url: "https://my-store2.p.rapidapi.com/catalog/products",
      headers: {
        "X-RapidAPI-Key": "0ee78aac30mshfa933e509f75de9p102ecfjsn94dec59f7f3e",
        "X-RapidAPI-Host": "my-store2.p.rapidapi.com",
      },
    };

    const products = await this.$axios
      .request(zapros)
      .then(function (response) {
        let products = response.data;
        commit("setProducts", products);
      })
      .catch(function (error) {
        console.error(error);
      });
  },
};

export const getters = {
  products: (s) => s.products,
};

//   async fetch({commit}) {
//     const options = {
//     method: 'GET',
//   url: 'https://my-store2.p.rapidapi.com/catalog/categories',
//     headers: {
//     'X-RapidAPI-Key': '0ee78aac30mshfa933e509f75de9p102ecfjsn94dec59f7f3e',
//     'X-RapidAPI-Host': 'my-store2.p.rapidapi.com'
//     }
//   };

//     this.$axios.request(options).then(function (response) {
//       console.log(response.data)
//     }).catch(function (error) {
//     console.error(error);
// });}
