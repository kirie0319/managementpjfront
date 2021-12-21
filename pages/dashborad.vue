<template>
  <div class="">
    <header class="header">
      <button class="logout-btn" @click="logout()">ログアウト</button>
      <p class="name" v-if="user">お名前：{{user.name}}</p>
    </header>
    <div class="zone add-zone">
      <label class="label" for="">商品：
        <input class="input" type="text" v-model="productName">
      </label>
      <label class="label" for="">金額：
        <input class="input" type="number" v-model="productPrice">
      </label>
      <button class="add button" @click="addToProductList(user.id, productName, productPrice)">追加</button>
    </div>
    <div class="zone">
      <p>自分の全金額：{{productTotalPrice}}</p>
      <select class="custom-select sources" v-model="selectValue" @change="select(selectValue)" id="">
        <option class="option" value="" hidden>誰か選択</option>
        <option class="option" :value="user.id" v-for="(user, index) in userList" :key="index">{{user.name}}</option>
      </select>
      <button class="compare button" @click="compare(productTotalPrice, otherTotalPrice)">比べる</button>
      <p>相手の全金額：{{otherTotalPrice}}</p>
    </div>
    <p class="dif">差分：{{compareTotalPrice}}</p>
    <div class="zone" v-for="(product, index) in productList" :key="index">
      <p>購入物：{{product.name}}</p>
      <p>価格：{{product.price}}</p>
      <input class="input" type="text" v-model="editName">
      <input class="input" type="number" v-model="editPrice">
      <button class="button" @click="updateProductList(product, editName, editPrice)">変更</button>
      <button class="button" @click="deleteProduct(product)">削除</button>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      message: 'ログインができておりません',
      user: null,
      productName: 0,
      productPrice: 0,
      editPrice: 0,
      editName: 0,
      userList: [],
      selectValue: ''
    }
  },
  computed: {
    productList() {
      return this.$store.state.productList;
    },
    productTotalPrice() {
      return this.$store.getters.productTotalPrice;
    },
    otherTotalPrice() {
      return this.$store.getters.otherTotalPrice;
    },
    compareTotalPrice() {
      return this.$store.state.compareTotalPrice;
    }
  },
  methods: {
      getUserData(){
        firebase.auth().onAuthStateChanged(async (user) => {
          if (user) {
            const resData = await this.$axios.get('https://sheltered-reaches-61763.herokuapp.com/api/user/' + user.uid);
            this.user = resData.data.data;
            this.message = 'ログイン済みです'
            this.getProductList();
          } else {
            this.$router.replace("/login")
          }
        })
      },
      logout() {
        firebase
          .auth()
          .signOut()
          .then(() => {
            alert('ログアウトが完了しました')
            this.$router.replace('/login')
        })
      },
      async addToProductList(id, productName, productPrice) {
        const sendData = {
          user_id: id,
          name: productName,
          price: productPrice
        };
        await this.$axios.post('https://sheltered-reaches-61763.herokuapp.com/api/product/store', sendData);
        this.getProductList();
      },
      async updateProductList(product, editName, editPrice) {
        if(editName == null | editPrice == null) {
          return alert('入力してください');
        }
        const sendData = {
          id: product.id,
          name: editName,
          price: editPrice,
          user_id: product.user_id
        }
        await this.$axios.post('https://sheltered-reaches-61763.herokuapp.com/api/product/update', sendData);
        this.getProductList();
      },
      async deleteProduct(product) {
        const sendData = {
          id: product.id,
          user_id: product.user_id
        }
        await this.$axios.post('https://sheltered-reaches-61763.herokuapp.com/api/product/destroy', sendData);
        this.getProductList();
      },
      getProductList() {
        this.$store.dispatch('getProductList', this.user.id);
      },
      compare(myTotal, otherTotal) {
        this.$store.commit('selectOtherTotalPrice', {myTotal, otherTotal});
      },
      select(value) {
        this.$store.dispatch('getOtherUserList', value);
      },
      async getUserList() {
        const resData = await this.$axios.get('https://sheltered-reaches-61763.herokuapp.com/api/list');
        console.log(resData.data);
        this.userList = resData.data.data;
      },
    },
  async created() {
    this.getUserData();
    this.getUserList();
  },
}
</script>

<style>
.balance {
  display: none;
}
.balance.is-active {
  display: block;
}
</style>