

export const state = () => ({
  productList: [],
  otherProductList: [],
  compareTotalPrice: 0,
});

export const getters = {
  productTotalPrice(state, getters) {
    return state.productList.reduce((total, product) => {
      return total + product.price;
    }, 0)
  },
  otherTotalPrice(state, getters) {
    return state.otherProductList.reduce((total, product) => {
      return total + product.price;
    }, 0)
  },
};

export const mutations = {
  addProductList(state, product) {
    state.productList = [];
    for (let i = 0; i < product.length; i++) {
      state.productList.push({
        id: product[i].id,
        name: product[i].name,
        price: product[i].price,
        user_id: product[i].user_id,
        updated_at: product[i].updated_at,
      })
    }
  },
  addOtherUserList(state, product) {
    state.otherProductList = [];
    for (let i = 0; i < product.length; i++) {
      state.otherProductList.push({
        id: product[i].id,
        name: product[i].name,
        price: product[i].price,
        user_id: product[i].user_id,
        updated_at: product[i].updated_at,
      })
    }
  },
  selectOtherTotalPrice(state, { myTotal, otherTotal }) {
    let total = myTotal - otherTotal;
    state.compareTotalPrice = total;
  }
};

export const actions = {
  async getProductList({ state, commit }, id) {
    const sendData = {
      user_id: id
    }
    const resDate = await this.$axios.post('https://sheltered-reaches-61763.herokuapp.com/api/product', sendData);
    console.log(resDate.data.data);
    commit('addProductList', resDate.data.data);
  },
  async getOtherUserList({ state, commit }, id) {
    const sendData = {
      user_id: id
    }
    console.log(sendData);
    const resData = await this.$axios.post('https://sheltered-reaches-61763.herokuapp.com/api/product/other', sendData);
    console.log(resData.data);
    commit('addOtherUserList', resData.data.others);
  }
}