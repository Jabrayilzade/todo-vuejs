<template>
  <div class="team">
    <Navbar/>
    <h1 class="subheading grey--text">Team</h1>
    <v-container row class="my-5">
      <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
        <v-card flat class="text-center ma-3" elevation="3">
          <v-responsive class="pt-4">
            <v-avatar size="100">
              <img :src='`${person.avatar}`'>
            </v-avatar>
          </v-responsive>
          <v-card-text>
            <div class="subheading">{{ person.name }}</div>
            <div class="grey--text">{{ person.role }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn text large color="grey">
              <v-icon small left>message</v-icon>
              <span>Message</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  components: {
    Navbar
  },
  data: function () {
    return {
      team: [
        {
          name: 'Nihad Jabrayilzade',
          role: 'Tech lead',
          avatar: require('@/assets/avatar-3.png')
        },
        {
          name: 'Javid Babayev',
          role: 'Front-end developer',
          avatar: require('@/assets/avatar-5.png')
        },
        {
          name: 'Huseyin Jabrayilov',
          role: 'Database administrator',
          avatar: require('@/assets/avatar-5.png')
        },
        {
          name: 'Hesen Zulfuqarov',
          role: 'Web designer',
          avatar: require('@/assets/avatar-2.png')
        }
      ]
    }
  }
}
</script>
