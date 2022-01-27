<template>
  <div class="tables-basic">
    <h2 class="page-title">Cajero</h2>
    <b-button variant="primary" @click="modalShow = !modalShow">Crear cajeros</b-button>

  <b-modal v-model="modalShow" title="Registrar Cajero">
      <form class="mt" @submit.prevent="register">
          <div class="form-group">
            <input v-model="name" class="form-control no-border" ref="first_name" required type="text" name="first_name" placeholder="Nombre" />
          </div>
          <div class="form-group">
            <input v-model="email" class="form-control no-border" ref="email" required type="email" name="email" placeholder="Correo" />
          </div>
          <div class="form-group">
            <input v-model="password" class="form-control no-border" ref="password" required type="password" name="password" placeholder="Contrasena" />
          </div>
    </form>
    <template #modal-footer>
      <div class="w-100">
        <b-button
          variant="outline-primary"
          size="sm"
          class="float-right ml-4"
          @click="modalShow=false"
        >
          Cerrar
        </b-button>
        <b-button
          variant="primary"
          size="sm"
          class="float-right"
          :disabled="!name || !email || !password"
          @click="register"
        >
          Registrar cajero
        </b-button>
      </div>
    </template>
  </b-modal>

    <b-row>
      <b-col>
         <p>Listado Cajeros.</p>
         <div class="table-responsive">
           <table class="table table-hover">
             <thead>
               <tr>
                 <th># identificador</th>
                 <th>Nombre</th>
                 <th>Correo</th>
                 <th>Acciones</th>
               </tr>
             </thead>
             <tbody>
               <tr v-for="(user,i) in users" :key="i+'sasas'">
                 <td>{{user.id}}</td>
                 <td>{{user.name}}</td>
                 <td>{{user.email}}</td>
                  <td>
                    <b-button variant="danger" @click="deleteUser(user)">Bloquear</b-button>
                  </td>
                  </tr>
             </tbody>
           </table>
         </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { HTTP } from '../../http-common';
import Multiselect from 'vue-multiselect'
import Widget from '@/components/Widget/Widget';
import Sparklines from '../../components/Sparklines/Sparklines'

export default {
  name: 'Tables',
  components: { Widget, Sparklines, Multiselect },
  data() {
    return {
      modalShow:false,
      modalShowDelete: false,
      size: null,
      ingredient: null,
      quantity: 1,
      date: new Date(),
      users: [],
      name:'',
      email:'',
      password:'',
      list_ingredients: [],
      sizesSandwich: [],
    };
  },
  mounted(){
    HTTP.get('rols')
      .then((res)=>{
        if(res.data && res.data.success){
          this.rols = res.data.data;
        }
      })
    
    this.getUsers()
  },
  methods: {
    getUsers(){
      HTTP.get(`users?rol=cashier`)
      .then((res)=>{
        if(res.data && res.data.success){
          this.users = res.data.data;
        }
      })
    },
    register() {
      const {name,email,password} = this;
      const rol = this.rols.find(rol => rol.name == 'cashier');
      const rol_cashier_id = rol ? rol.id : 2;
      const data = {
        name,email,password, rol_id: rol_cashier_id
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
          this.modalShow = false;
          this.email = ''
          this.password = ''
          this.name = ''
          this.getUsers()
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
    deleteUser(user){
      HTTP.delete(`users/${user.id}`)
      .then((res) => {
        if(res.data && res.data.success){
          this.$toasted.success('Cajero bloqueado!', {
            action: {
              text: 'Cerrar',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          })
          this.modalShow = false;
          this.getUsers()
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
    }
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="../Pedidos/Basic.scss" lang="scss" scoped />
