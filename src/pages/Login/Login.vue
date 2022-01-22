<template>
  <div class="auth-page">
    <b-container>
      <h5 class="auth-logo">
        <i class="fa fa-circle text-primary"></i>
        SandwicherApp
        <i class="fa fa-circle text-danger"></i>
      </h5>
      <Widget class="widget-auth mx-auto" title="<h3 class='mt-0'>Ingresar</h3>" customHeader>
        <p class="widget-auth-info">
            Usa tu email para ingresar
        </p>
        <form class="mt" @submit.prevent="login">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{errorMessage}}
          </b-alert>
          <div class="form-group">
            <input v-model="email" class="form-control no-border" ref="email" required type="email" name="email" placeholder="email" />
          </div>
          <div class="form-group">
            <input v-model="password" class="form-control no-border" ref="password" required type="password" name="password" placeholder="Contrasena" />
          </div>
          <b-button type="submit" size="sm" class="auth-btn mb-3" variant="inverse">Ingresar</b-button>

        </form>
        <p class="widget-auth-info">
          No tienes una cuenta? 
        </p>
        <router-link class="d-block text-center" to="/register">Registrate</router-link>
      </Widget>
    </b-container>
    <footer class="auth-footer">
      2022 &copy; SandwicherApp 
    </footer>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import { HTTP } from '../../http-common';
import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('user');

export default {
  name: 'LoginPage',
  components: { Widget },
  data() {
    return {
      errorMessage: null,
      email: '',
      password: ''
    };
  },
  methods: {
     ...mapActions(['setUser']),
    login() {
      const { email, password } = this;
      const data = {
        email,
        password
      }
      HTTP.post(`users/login`, data)
      .then((res) => {
        if(res.data && res.data.success){
          this.setUser(res.data.data);
          this.$toasted.success('Login exitoso!', {
            action: {
              text: 'Cerrar',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          })
          setTimeout(()=>{
            window.localStorage.setItem('authenticated', true);
            this.$router.push('/app/reportes');
          },1000)
        }else{
          this.$toasted.error('Credenciales invalidas!', {
            action: {
              text: 'Cerrar',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          })
        }  
      })
      .catch(e => {
        this.$toasted.error('Credenciales invalidas!', {
            action: {
              text: 'Cerrar',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          })
      })
    },
  },
  created() {
    if (window.localStorage.getItem('authenticated') === 'true') {
      this.$router.push('/app/reportes');
    }
  },
};
</script>
