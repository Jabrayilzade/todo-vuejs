<template>
  <div class="projects">
    <Navbar/>
    <h1 class="subheading grey--text">Projects</h1>
    <v-container class="my-5">

      <v-expansion-panels>
        <v-expansion-panel v-for="project in projects" :key="project.id">
          <v-expansion-panel-header>{{ project.title }}</v-expansion-panel-header>
          <v-expansion-panel-content class="px-4 grey--text">
            <div class="font-weight-bold" :value="computedDateFormat">{{ project.due }}</div>
            <div>{{ project.content }}</div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/Navbar";

export default {
  components: {
    Navbar
  },
  data() {
    return {
      projects: [],
    }
  },
  computed: {
    // computedDateFormat(due) {
    //   return this.due ? format(new Date(this.due), 'EEEE, MMMM do yyyy') : ''
    // },
  },
  async mounted() {
    await this.getProjects();
  },
  methods: {
    async getProjects() {
      const response = await axios.get('User/GetProjects');
      this.projects = response.data;
    }
  }
}
</script>
