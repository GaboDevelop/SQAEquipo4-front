<template>
  <div class="auth-page">
    <b-container>
      <h5 class="auth-logo">
        <i class="fa fa-circle text-primary"></i>
        SandwicherApp
        <i class="fa fa-circle text-danger"></i>
      </h5>
      <Widget class="widget-auth mx-auto" title="<h3 class='mt-0'>Registrate</h3>" customHeader>
        <p class="widget-auth-info">
            Completa la informacion
        </p>
        <form class="mt" @submit.prevent="register">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{errorMessage}}
          </b-alert>
          <div class="form-group">
            <input v-model="name" class="form-control no-border" ref="first_name" required type="text" name="first_name" placeholder="Nombre" />
          </div>
          <div class="form-group">
            <input v-model="email" class="form-control no-border" ref="email" required type="email" name="email" placeholder="Correo" />
          </div>
          <div class="form-group">
            <input v-model="password" class="form-control no-border" ref="password" required type="password" name="password" placeholder="Contrasena" />
          </div>
          <b-button type="submit" size="sm" class="auth-btn mb-3" variant="inverse">Registrate</b-button>

        </form>
        <p class="widget-auth-info">
          Ya tienes una cuenta?
        </p>
        <router-link class="d-block text-center" to="/login">Ingresa</router-link>
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
export default {
  name: 'LoginPage',
  components: { Widget },
  data() {
    return {
      errorMessage: null,
      name: '',
      email:'',
      password:'',
      rols: []
    };
  },
  mounted(){
    HTTP.get('rols')
      .then((res)=>{
        if(res.data && res.data.success){
          this.rols = res.data.data;
        }
      })
  },
  methods: {
    register() {
      const {name,email,password} = this;
      const rol = this.rols.find(rol => rol.name == 'client');
      const rol_client_id = rol ? rol.id : 3;
      const data = {
        name,email,password, rol_id: rol_client_id
      }
      HTTP.post(`users`, data)
      .then((res) => {
        if(res.data && res.data.success){
          this.$toasted.success('Registro exitoso!', {
            action: {
              text: 'Cerrar',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          })
          setTimeout(()=>{
            this.$router.push('/login')
          },1000)
        }else{
          this.$toasted.error(res.data.mesage, {
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
        const message = e.response.data.message;
        this.$toasted.error(message, {
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
      this.$router.push('/app/main/analytics');
    }
  },
};
</script>
