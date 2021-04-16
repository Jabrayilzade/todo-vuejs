<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on" class="success">Add new project</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h2 style="color:#2F4F4F">Add a new project</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3">
          <v-text-field label="Title" v-model="title" prepend-icon="folder" :rules="inputRules"></v-text-field>
          <v-textarea label="Content" v-model="content" prepend-icon="edit" :rules="inputRules">content</v-textarea>
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
          <v-btn text class="success mx-0 mt-3" :loading="loading" @click="submit">Add project</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {format, parseISO} from 'date-fns'
import axios from 'axios'

export default {
  data() {
    return {
      title: '',
      content: '',
      due: null,
      menu: false,
      inputRules: [
        v => !!v || 'This field is required',
        v => v.length >= 3 || 'Minimum length is 3 characters'
      ],
      loading: false,
      dialog: false
    }
  },
  methods: {
    async submit() {
      this.loading = true;
      const project = {
        title: this.title,
        content: this.content,
        due: format(parseISO(new Date(this.due).toISOString()), 'yyyy-MM-dd')
      };
      await axios.post('User/CreateProject', project).then(() => {
        this.loading = false;
        this.dialog = false;
        this.$emit('projectAdded')
      });
    },
  },
  computed: {
    computedDateFormat() {
      return this.due ? format(new Date(this.due), 'EEEE, MMMM do yyyy') : ''
    },
  }
}
</script>

<style scoped>

</style>