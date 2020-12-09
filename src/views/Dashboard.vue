<template>
  <div class="dashboard">
    <Navbar/>
    <v-snackbar v-model="snackbar" :timeout="4000" top color="#20B2AA">
      <span>Awesome! You added a new task.</span>
      <v-btn text color="white" @click="snackbar=false">Close</v-btn>
    </v-snackbar>
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container class="my-5">
      <v-container style="max-width: 500px">

        <h2 class="display-1 grey--text pl-4">
          Tasks:&nbsp;
          <v-fade-transition leave-absolute>
        <span :key="`tasks-${tasks.length}`">
          {{ tasks.length }}
        </span>
          </v-fade-transition>
        </h2>

        <v-divider class="mt-4"></v-divider>

        <v-row
            class="my-1"
            align="center"
        >
          <strong class="mx-4 grey--text text--darken-2">
            Ongoing: {{ remainingTasks }}
          </strong>

          <v-divider vertical></v-divider>

          <strong class="mx-4 grey--text text--darken-2">
            Completed: {{ completedTasks }}
          </strong>

          <v-spacer></v-spacer>

          <v-progress-circular
              :value="progress"
              class="mr-2"
          ></v-progress-circular>
        </v-row>

        <v-divider class="mb-4"></v-divider>
      </v-container>
      <v-layout row justify-start class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" text small color="grey" @click="sortBy('content')" slot="activator">
              <v-icon small left>folder</v-icon>
              <span class="caption text-lowercase">By project name</span>
            </v-btn>
          </template>
          <span>Sort projects by project name</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" text small color="grey" @click="sortBy('author')" slot="activator">
              <v-icon small left>person</v-icon>
              <span class="caption text-lowercase">by author</span>
            </v-btn>
          </template>
          <span>Sort projects by person</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn @click="cleatCompletedTasks" v-bind="attrs" v-on="on" text small color="grey" slot="activator">
              <v-icon small left>delete</v-icon>
            </v-btn>
          </template>
          <span>Clear completed tasks</span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <v-dialog max-width="600px" v-model="dialog">
          <template v-slot:activator="{on, attrs}">
            <v-btn text large color="grey" v-on="on" v-bind="attrs">
              <v-icon small left>add</v-icon>
              <span class="caption">add a new task</span>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <h2 style="color:#2F4F4F">Add a new task</h2>
            </v-card-title>
            <v-card-text>
              <v-form class="px-3">
                <v-textarea label="Content" v-model="content" prepend-icon="edit" :rules="inputRules">content
                </v-textarea>
                <template>
                  <v-container>
                    <v-menu v-model="menu" :close-on-content-click="true" max-width="290">
                      <template v-slot:activator="{on, attrs}">
                        <v-text-field
                            :value="computedDateFormat"
                            clearable
                            label="Due by"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            @click:clear="due = null"
                            prepend-icon="date_range"
                            :rules="inputRules">
                        </v-text-field>
                      </template>
                      <v-date-picker
                          v-model="due"
                          @change="menu = false"></v-date-picker>
                    </v-menu>
                  </v-container>
                </template>
                <v-spacer></v-spacer>
                <v-btn text class="success mx-0 mt-3" :loading="loading" @click="submit">Add task</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>
      <v-card text class="px-3 mb-4" elevation="3" v-for="task in tasks" :key="task.id">
        <v-layout row wrap :class="`px-3 task ${task.status}`">
          <v-flex align-self-center>
            <label class="form-checkbox">
              <input type="checkbox">
              <i class="form-icon"></i>
            </label>
          </v-flex>
          <v-flex xs12 md4>
            <div class="caption grey--text">Content</div>
            <div>{{ task.content }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{ task.author }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>{{ task.due }}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="right">
              <v-chip small :class="`chip${task.status} white--text my-2 caption`">
                {{ task.status }}
              </v-chip>
            </div>
          </v-flex>

          <v-spacer class="d-flex justify-space-between align-end"/>
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text dark icon color="grey" v-bind="attrs" v-on="on">
                <v-icon left>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="editTask">
                <v-icon left>edit</v-icon>
                <v-list-item-title>Edit</v-list-item-title>
              </v-list-item>
              <v-list-item @click="removeTask(task.id)">
                <v-icon left>delete</v-icon>
                <v-list-item-title>Remove</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<!--<template>-->
<!--  <v-card>-->
<!--    <v-card-text>-->
<!--      <v-row align="center">-->
<!--        <v-checkbox-->
<!--            v-model="enabled"-->
<!--            hide-details-->
<!--            class="shrink mr-2 mt-0"-->
<!--        ></v-checkbox>-->
<!--        <v-text-field-->
<!--            :disabled="!enabled"-->
<!--            label="I only work if you check the box"-->
<!--        ></v-text-field>-->
<!--      </v-row>-->
<!--    </v-card-text>-->
<!--  </v-card>-->
<!--</template>-->

<script>
import axios from 'axios'
import {format, parseISO} from "date-fns";
import Navbar from "@/components/Navbar";

export default {
  components: {
    Navbar
  },
  data() {
    return {
      tasks: [],
      statistics: null,
      loading: false,
      dialog: false,
      content: '',
      due: null,
      menu: false,
      inputRules: [
        v => !!v || 'This field is required',
        v => v.length >= 3 || 'Minimum length is 3 characters'
      ],
      snackbar: false
    }
  },
  async created() {
    await this.getTasks();
  },
  methods: {
    async editTask() {

    },
    async removeTask(id) {
      await axios.delete(`User/RemoveTask?taskId=${id}`);
      console.log(id);
      await this.getTasks();
    },
    async submit() {
      this.loading = true;
      const task = {
        content: this.content,
        due: format(parseISO(new Date(this.due).toISOString()), 'yyyy-MM-dd')
      };
      await axios.post('User/CreateTask', task).then(() => {
        this.loading = false;
        this.dialog = false;
        this.snackbar = true;
      });
      await this.getTasks();
    },
    async sortBy(prop) {
      await this.tasks.sort((a, b) => a[prop] < b[prop] ? -1 : 1);
    },
    async getTasks() {
      const response = await axios.get('User/GetTasks');
      this.tasks = response.data;
    },
    async cleatCompletedTasks() {
      await axios.delete('User/ClearCompletedTasks');
      await this.getTasks();
    },
    async getStatistic() {
      const response = await axios.get('User/GetStatistics');
      this.statistics = response.data;
    }
  },
  computed: {
    computedDateFormat() {
      return this.due ? format(new Date(this.due), 'EEEE, MMMM do yyyy') : ''
    },
    task_status() {
      if (this.tasks.status == 'complete') return "#3cd1c2"
      if (this.tasks.status == 'overdue') return "#f83e70"
      else return "#ffaa2c"
    },
    completedTasks() {
      var completed = 0;
      for (var i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].status == 'complete') {
          completed++;
        }
      }
      return completed;
    },
    progress() {
      var completed = 0;
      for (var i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].status == 'complete') {
          completed++;
        }
      }
      return completed / this.tasks.length * 100
    },
    remainingTasks() {
      var ongoing = 0;
      for (var i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].status == 'ongoing') {
          ongoing++;
        }
      }
      return ongoing;
    },
  },
}
</script>

<style>

.task.complete {
  border-left: 4px solid #3cd1c2;
}

.task.ongoing {
  border-left: 4px solid orange;
}

.task.overdue {
  border-left: 4px solid #f83e70;
}

.chipcomplete {
  background: #3cd1c2 !important;
}

.chipongoing {
  background: #ffaa2c !important;
}

.chipoverdue {
  background: #f83e70 !important;
}

</style>


