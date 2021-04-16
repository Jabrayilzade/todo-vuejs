<template>
  <div class="dashboard">
    <Navbar/>
    <v-snackbar v-model="snackbar" :timeout="4000" top color="#20B2AA">
      <span>Awesome! You added a new task.</span>
      <v-btn text color="white" @click="snackbar=false">Close</v-btn>
    </v-snackbar>
    <h1 class="subheading grey--text">Dashboard</h1>
    <template>
      <v-autocomplete
          style="width: 500px;left: 690px"
          v-model="model"
          :items="searchTasks"
          :loading="isLoading"
          :search-input.sync="search"
          chips
          clearable
          hide-details
          hide-selected
          item-text="name"
          item-value="symbol"
          label="Search.."
          solo
      >
        <template v-slot:no-data>
          <v-list-item>
            <v-list-item-title>
              Search for your favorite
              <strong>Cryptocurrency</strong>
            </v-list-item-title>
          </v-list-item>
        </template>
        <template v-slot:selection="{ attr, on, task, selected }">
          <v-chip
              v-bind="attr"
              :input-value="selected"
              color="blue-grey"
              class="white--text"
              v-on="on"
          >
            <span v-text="task.content"></span>
          </v-chip>
        </template>
        <template v-slot:task="{ task }">
          <v-list-item-avatar
              color="indigo"
              class="headline font-weight-light white--text"
          >
            {{ task.content.charAt(0) }}
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="task.author"></v-list-item-title>
            <v-list-item-subtitle v-text="task.content"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-chip small :class="`chip${task.status} white--text my-2 caption`">
              {{ task.status }}
            </v-chip>
          </v-list-item-action>
        </template>
      </v-autocomplete>

      <!--      <a href="#" class="search-btn">-->
      <!--        <i class="fas fa-search"></i>-->
      <!--      </a>-->
    </template>

    <v-container class="my-5">
      <v-container style="max-width: 500px">

        <h2 class="display-1 grey--text pl-10">
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
            <v-btn v-bind="attrs" v-on="on" text small color="grey" @click="sortBy('due')" slot="activator">
              <v-icon small left>folder</v-icon>
              <span class="caption text-lowercase">By due date</span>
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
            <v-btn @click="clearCompletedTasks" v-bind="attrs" v-on="on" text small color="grey" slot="activator">
              <v-icon small left>delete</v-icon>
            </v-btn>
          </template>
          <span>Clear completed tasks</span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <v-dialog max-width="1200px" v-model="dialog_timeline">
          <template v-slot:activator="{on, attrs}">
            <v-btn text large color="grey" v-on="on" v-bind="attrs">
              <v-icon small left>timeline</v-icon>
              <span class="caption">show timeline</span>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <h2 style="color:#2F4F4F">Timeline</h2>
            </v-card-title>
            <v-card-text>
              <v-form class="px-3">
                <template>
                  <v-container>
                    <v-timeline>
                      <v-timeline-item
                          v-for="task in tasks"
                          :key="task.id"
                          large
                      >
                        <template v-slot:icon>
                          <v-avatar>
                            <img src="http://i.pravatar.cc/64">
                          </v-avatar>
                        </template>
                        <template v-slot:opposite>
                          <v-chip small :class="`chip${task.status} white--text my-2 caption`">
                            {{ task.status }}
                          </v-chip>
                        </template>
                        <v-card class="elevation-2">
                          <v-card-title class="headline">
                            {{ task.author }}
                          </v-card-title>
                          <v-card-text>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet
                            nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril
                            disputando voluptatibus, vix an salutandi sententiae.
                          </v-card-text>
                        </v-card>
                      </v-timeline-item>
                    </v-timeline>
                  </v-container>
                </template>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-dialog max-width="600px" v-model="dialog_newTask">
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
      <v-card color="#FFFFFF" text class="px-3 mb-4" elevation="3" v-for="task in tasks" :key="task.id">
        <v-layout row wrap :class="`px-3 task ${task.status}`">
          <v-flex align-self-center>
            <v-checkbox
                :key="task.id"
                v-model="task.isDone"
                @click="markTask(task.id)"
            ></v-checkbox>
          </v-flex>
          <v-flex xs12 md4>
            <div class="caption grey--text">Content</div>
            <div>{{ task.content }}</div>
          </v-flex>
          <v-flex align-self-center xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{ task.author }}</div>
          </v-flex>
          <v-flex align-self-center xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>{{ task.due | formatDate(task.due) }}</div>
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
      isLoading: false,
      searchTasks: [],
      model: null,
      search: null,
      tab: null,
      tasks: [],
      completedList: [],
      statistics: null,
      loading: false,
      dialog_newTask: false,
      dialog_timeline: false,
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
    async clearCompletedTasks() {
      await axios.delete('User/ClearCompletedTasks');
      await this.getTasks();
    },
    async markTask(id) {
      await axios.put(`User/Mark?taskId=${id}`);
      await this.getTasks();
    }
  },
  computed: {
    computedDateFormat() {
      return this.due ? format(new Date(this.due), 'EEEE, MMMM do yyyy') : ''
    },
    // task_status() {
    //   if (this.tasks.status == 'complete') return "#3cd1c2"
    //   if (this.tasks.status == 'overdue') return "#f83e70"
    //   else return "#ffaa2c"
    // },
    completedTasks() {
      let completed = 0;
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].status == 'complete') {
          completed++;
        }
      }
      return completed;
    },
    progress() {
      let completed = 0;
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].status == 'complete') {
          completed++;
        }
      }
      return completed / this.tasks.length * 100
    },
    remainingTasks() {
      let ongoing = 0;
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].status == 'ongoing') {
          ongoing++;
        }
      }
      return ongoing;
    },
  },
  watch: {
    model(val) {
      if (val != null) this.tab = 0
      else this.tab = null
    },
    search(val) {
      if (this.searchTasks.length > 0) return
      this.isLoading = true
      axios.get(`User/SearchTasks?value=${val}`)
          .then(res => {
            this.searchTasks = res.data
            console.log(this.searchTasks)
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
    },
  }
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

.search-container {
  position: absolute;
  left: 390px;
  top: 220px;
  width: 200px;
  background: #fff;
  height: 30px;
  border-radius: 30px;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.8s;
  box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, .3),
  -4px -4px 6px 0 rgba(116, 125, 136, .2),
  inset -4px -4px 6px 0 rgba(255, 255, 255, .2),
  inset 4px 4px 6px 0 rgba(0, 0, 0, .2);
}

.search-container:hover > .search-input {
  width: 100px;
}

.search-container > .search-input {
  background: transparent;
  border: none;
  outline: none;
  width: 0px;
  font-weight: 500;
  font-size: 16px;
  transition: 0.8s;
}

.search-container .search-btn .fas {
  color: #5cbdbb;
}

@keyframes hoverShake {
  0% {
    transform: skew(0deg, 0deg);
  }

  25% {
    transform: skew(5deg, 5deg);
  }

  75% {
    transform: skew(-5deg, -5deg);
  }

  100% {
    transform: skew(0deg, 0deg);
  }
}

.search-container:hover {
  animation: hoverShake 0.15s linear 3;
}

</style>


