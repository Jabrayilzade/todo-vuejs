<template>
  <nav>
    <v-snackbar v-model="snackbar" :timeout="4000" top color="#20B2AA">
      <span>Awesome! You added a new project.</span>
      <v-btn text color="white" @click="snackbar=false">Close</v-btn>
    </v-snackbar>
    <v-toolbar flat>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="grey--text"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Todo</span>
        <span>Wish</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>



      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text large color="grey" v-bind="attrs" v-on="on">
              <v-icon left>expand_more</v-icon>
              <span>Menu</span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="link in links_2" :key="link.text" router :to="link.route">
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-btn @click="sigout" text large color="grey">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer app temporary v-model="drawer" color="#6D9773">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="@/assets/avatar-2.png">
          </v-avatar>
          <p class="white--text subheading mt-1">
            {{ user }}
          </p>
        </v-flex>
        <v-flex class="mt-4 mb-3">
          <Popup @projectAdded="snackbar=true"/>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-item v-for="link in links_1" :key="link.text" router :to="link.route">
          <v-list-item-icon>
            <v-icon v-text="link.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Popup from "@/components/Popup";
import axios from "axios";

export default {
  components: {
    Popup,
  },
  data() {
    return {
      user: localStorage.getItem('user'),
      drawer: false,
      tasks: [],
      links_1: [
        {icon: 'mdi-home', text: 'Dashboard', route: '/dashboard'},
        {icon: 'mdi-folder', text: 'My Projects', route: '/projects'},
        {icon: 'groups', text: 'Team', route: '/team'},
        {icon: 'mdi-calendar', text: 'Agenda & Timeline', route: '/agenda'}
      ],
      links_2: [
        {text: 'Profile', route: '/profile'},
        {text: 'Friends', route: '/friends'},
        {text: 'About us', route: '/about'},
      ],
      snackbar: false
    }
  },
  async mounted() {
    await this.getTasks();
  },
  methods: {
    async sigout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      await this.$router.push('/');
    },
    async getTasks() {
      const response = await axios.get('User/GetTasks');
      this.tasks = response.data.slice(0, 10);
    },
  },

}
</script>

