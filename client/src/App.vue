<template>
  <div id="app">
    <div v-if="!login">
      <form @submit.prevent="enterName()">
        <input v-model="name" placeholder="Adınız">
        <input type="submit" value="Giriş Yap">
      </form>
    </div>
    <div v-else>
      Online kullanıcılar
      <ul>
        <li v-bind:key="user.id" v-for="user in users">{{ user.name }}</li>
      </ul>
      <form @submit.prevent="sendMessage()">
        <input v-model="message" placeholder="Mesajınız">
        <input type="submit">
      </form>
      Mesajlar
      <ul>
        <li v-bind:key="message" v-for="message in messages" v-html="message"></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      login: false,
      name: "",
      users: [],
      message: "",
      messages: []
    }
  },
  sockets: {
    users(data) {
      this.users = data;
    },
    messages(data) {
      this.messages = data;
    }
  },
  methods: {
    enterName() {
      this.login = true;
      this.$socket.emit('new_user', this.name);
    },
    sendMessage() {
      this.$socket.emit('new_message', {
        name: this.name,
        message: this.message
      });
      this.message = '';
    }
  }
}
</script>