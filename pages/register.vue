<template>
  <div class="">
    <div class="auth">
      <div class="auth__box">
        <h1 class="ttl">新規登録</h1>
          <input class="auth__input" v-model="newName" type="text" placeholder="ユーザーネーム" required />
          <input class="auth__input" v-model="email" type="email" placeholder="メールアドレス" required />
          <input class="auth__input" v-model="password" type="password" placeholder="パスワード" required />
        <button class="register btn" @click="register">新規登録</button>
        <NuxtLink class="login btn" to="/login">ログイン</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      newName: null,
      email: null,
      password: null,
    }
  },
  methods: {
    register() {
      if (!this.email || !this.password || !this.newName) {
        alert('ユーザーネーム、メールアドレスまたはパスワードが入力されていません。');
        return;
      }
      if (this.newName.length >= 20 || this.password.lenth <= 6) {
        alert('ユーザーネームまたはパスワードが既定の文字数ではありません。');
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          const sendData = {
            name: this.newName,
            id: data.user.uid,
          }
          this.$axios.post("https://sheltered-reaches-61763.herokuapp.com/api/user/register", sendData);
          return data.user.updateProfile({
            displayName: this.newName,
          }).then(() => {
            this.$router.replace("/dashborad");
          });
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。')
              break
            case 'auth/email-already-in-use':
              alert('このメールアドレスはすでに使われています。')
              break
            case 'auth/weak-password':
              alert('パスワードは6文字以上で入力してください。')
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