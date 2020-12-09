<template>
  <v-app>
    <v-main>
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card elevation="12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 teal--text text--accent-3">Sign in ToDoWish</h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div>
                        <v-form>
                          <v-text-field
                              v-model="lEmail"
                              label="Email"
                              name="Email"
                              prepend-icon="email"
                              type="text"
                              color="teal accent-3">
                            >
                          </v-text-field>
                          <v-text-field
                              v-model="lPassword"
                              id="password"
                              label="Password"
                              name="Password"
                              prepend-icon="lock"
                              type="password"
                              color="teal accent-3"
                          >
                          </v-text-field>
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn rounded color="teal accent-3" @click="signin">SIGN IN</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Hey gang!</h1>
                        <h5 class="text-center">Enter your personal details and start using ToDoWish</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined="" dark @click="step++">SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Welcome!</h1>
                        <h5 class="text-center">To start using ToDoWish please fill in rows</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--">SIGN IN</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 teal--text text--accent-3">Create account</h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div>
                        <v-form>
                          <v-text-field
                              v-model="rName"
                              label="Name"
                              name="Name"
                              prepend-icon="person"
                              type="text"
                              color="teal accent-3"
                          >
                          </v-text-field>
                          <v-text-field
                              v-model="rFirstName"
                              label="First name"
                              name="First name"
                              prepend-icon="person"
                              type="text"
                              color="teal accent-3"
                          >
                          </v-text-field>
                          <v-text-field
                              v-model="rEmail"
                              label="Email"
                              name="Email"
                              prepend-icon="email"
                              type="text"
                              color="teal accent-3"
                          >
                          </v-text-field>
                          <v-text-field
                              v-model="rPassword"
                              label="Password"
                              name="Password"
                              prepend-icon="lock"
                              type="Password"
                              color="teal accent-3"
                          >
                          </v-text-field>
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-n5">
                        <v-btn rounded color="teal accent-3" dark @click="signup">SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    step: 1,
    rName: '',
    rFirstName: '',
    rEmail: '',
    rPassword: '',
    lEmail: '',
    lPassword: ''
  }),
  props: {
    source: String
  },
  methods: {
    async signup() {
      const user = {
        email: this.rEmail,
        name: this.rName,
        firstName: this.rFirstName,
        password: this.rPassword
      };
      await axios.post('Auth/UserRegister', user);
      this.step--;
    },
    async signin() {
      const response = await axios.post('Auth/UserLogin',
          {'email': this.lEmail, 'password': this.lPassword});
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data.name + " " + response.data.firstName);
      await this.$router.push('/dashboard');
      window.location.reload();
    }
  }
}
</script>

<style scoped>

</style>