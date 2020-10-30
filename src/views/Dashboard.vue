<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container class="my-5">
      <v-layout row justify-start class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" text small flat color="grey" @click="sortBy('title')" slot="activator">
              <v-icon small left>folder</v-icon>
              <span class="caption text-lowercase">By project name</span>
            </v-btn>
          </template>
          <span>Sort projects by project name</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" text small flat color="grey" @click="sortBy('person')" slot="activator">
              <v-icon small left>person</v-icon>
              <span class="caption text-lowercase">by person</span>
            </v-btn>
          </template>
          <span>Sort projects by person</span>
        </v-tooltip>
      </v-layout>
      <v-card flat class="px-3 mb-4" elevation="3" v-for="project in projects" :key="project.title">
        <v-layout row wrap :class="`px-3 py-5 project ${project.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Project Title</div>
            <div>{{ project.title }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{ project.person }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>{{ project.due }}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="right">
              <v-chip small :class="`${project.status} white--text my-2 caption`">
                {{ project.status }}
              </v-chip>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>

export default {
  data() {
    return {
      projects: [
        {
          title: 'Design a new website',
          person: 'Cavid Babayev',
          due: '31 Dec 2020',
          status: 'ongoing',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam architecto, aut beatae cupiditate deleniti ducimus enim impedit iusto mollitia, nam necessitatibus neque omnis quo tempore totam ut vel voluptas?'
        },
        {
          title: 'Conversation',
          person: 'Nihad Jabrayilzade',
          due: '11 May 2018',
          status: 'complete',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam architecto, aut beatae cupiditate deleniti ducimus enim impedit iusto mollitia, nam necessitatibus neque omnis quo tempore totam ut vel voluptas?'
        },
        {
          title: 'Meeting',
          person: 'Nihad Jabrayilzade',
          due: '21 Oct 2018',
          status: 'complete',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam architecto, aut beatae cupiditate deleniti ducimus enim impedit iusto mollitia, nam necessitatibus neque omnis quo tempore totam ut vel voluptas?'
        },
        {
          title: 'Complete vue.js course',
          person: 'Huseyn Jabrayilov',
          due: '28 Oct 2020',
          status: 'overdue',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam architecto, aut beatae cupiditate deleniti ducimus enim impedit iusto mollitia, nam necessitatibus neque omnis quo tempore totam ut vel voluptas?'
        }
      ]
    }
  },
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => a[prop] < b[prop] ? -1 : 1);
    }
  },
  computed: {
    project_status() {
      if (this.projects.status == 'complete') return "#3cd1c2"
      if (this.projects.status == 'overdue') return "#f83e70"
      else return "#ffaa2c"
    }
  }
}
</script>

<style>

.project.complete {
  border-left: 4px solid #3cd1c2;
}

.project.ongoing {
  border-left: 4px solid orange;
}

.project.overdue {
  border-left: 4px solid tomato;
}

.v-chip.complete {
  background: #3cd1c2;
}

.v-chip.ongoing {
  background: #ffaa2c;
}

.v-chip.overdue {
  background: #f83e70;
}

</style>


