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
                        <h1 class="text-center display-2" style="color: #B388FF">Sign in ToDoWish</h1>
                        <v-form>
                          <v-text-field
                              v-model="lEmail"
                              label="Email"
                              name="Email"
                              prepend-icon="email"
                              type="text"
                              color="deep-purple accent-1">
                            >
                          </v-text-field>
                          <v-text-field
                              v-model="lPassword"
                              id="password"
                              label="Password"
                              name="Password"
                              prepend-icon="lock"
                              type="password"
                              color="deep-purple accent-1"
                          >
                          </v-text-field>
                        </v-form>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded color="deep-purple accent-1 white--text" @click="signin">SIGN IN</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="deep-purple accent-1">
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
                    <v-col cols="12" md="4" class="deep-purple accent-1">
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
                        <h1 class="text-center display-2" style="color: #B388FF">Create account</h1>
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
                              color="deep-purple accent-1"
                          >
                          </v-text-field>
                          <v-text-field
                              v-model="rFirstName"
                              label="First name"
                              name="First name"
                              prepend-icon="person"
                              type="text"
                              color="deep-purple accent-1"
                          >
                          </v-text-field>
                          <v-text-field
                              v-model="rEmail"
                              label="Email"
                              name="Email"
                              prepend-icon="email"
                              type="text"
                              color="deep-purple accent-1"
                          >
                          </v-text-field>
                          <v-text-field
                              v-model="rPassword"
                              label="Password"
                              name="Password"
                              prepend-icon="lock"
                              type="Password"
                              color="deep-purple accent-1"
                          >
                          </v-text-field>
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-n5">
                        <v-btn rounded color="deep-purple accent-1 white--text" dark @click="signup">SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <div class="btn_wrap">
        <span class="flwSpan">Follow us</span>
        <div class="followContainer">
          <i class="fab fa-facebook"></i>
          <i class="fab fa-twitter"></i>
          <i class="fab fa-instagram"></i>
          <i class="fab fa-github"></i>
        </div>
      </div>
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

<style>

.fab {
  opacity: 0;
  font-size: 28px;
  color: #1F1E1E;
  will-change: transform;
  transform: scale(.1);
  transition: all .3s ease;
}

.btn_wrap {
  right: 50px;
  bottom: 50px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  width: 240px;
  height: 72px;
  background-color: #EEEEED;
  border-radius: 80px;
  padding: 0 18px;
  will-change: transform;
  transition: all .2s ease-in-out;
}

.btn_wrap:hover {
  transform: scale(1.1);
}

.flwSpan {
  position: absolute;
  z-index: 99;
  width: 240px;
  height: 72px;
  border-radius: 80px;
  font-size: 20px;
  text-align: center;
  line-height: 70px;
  letter-spacing: 2px;
  color: #EEEEED;
  background-color: #B388FF;
  padding: 0 18px;
  transition: all 1.2s ease;
}

.followContainer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 240px;
  height: 64px;
  border-radius: 80px;
}

.followContainer i:nth-of-type(1) {
  transition-delay: 1.1s;
}

.followContainer i:nth-of-type(2) {
  transition-delay: .9s;
}

.followContainer i:nth-of-type(3) {
  transition-delay: .7s;
}

.followContainer i:nth-of-type(4) {
  transition-delay: .4s;
}

.btn_wrap:hover .flwSpan {
  transition-delay: .25s;
  transform: translateX(-280px);
}

.btn_wrap:hover i {
  opacity: 1;
  transform: scale(1);
}

</style>