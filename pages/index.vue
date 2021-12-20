<template>
  <div>
    <img src="@/assets/img/Rectangle.png" alt="">
    <div class="container">
      <button @click="register()" class="register">新規登録</button>
      <button @click="login()" class="login">ログイン</button>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      register() {
        this.$router.push("/register");
      },
      login() {
        this.$router.push("/login");
      },
    }
  }
</script>
