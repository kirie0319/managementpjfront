<template>
  <div class="">
    <div class="auth">
      <div class="auth__box">
        <h1 class="ttl">ログイン</h1>
          <input class="auth__input" v-model="email" type="email" placeholder="メールアドレス" required />
          <input class="auth__input" v-model="password" type="password" placeholder="パスワード" required />
        <button class="login btn" @click="login">ログイン</button>
        <NuxtLink class="register btn" to="/register">新規登録</NuxtLink>
      </div>
    </div>
  </div>
</template>


<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      email: null,
      password: null,
    }
  },
  methods: {
    login() {
      if (!this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert('ログインが完了しました')
          this.$router.push('/dashborad')
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/user-disabled':
              alert('ユーザーが無効になっています。')
              break
            case 'auth/user-not-found':
              alert('ユーザーが存在しません。')
              break
            case 'auth/wrong-password':
              alert('パスワードが間違っております。')
              break
            default:
              alert('エラーが起きました。しばらくしてから再度お試しください。')
              break
          }
        })
    },
  },
}
</script>