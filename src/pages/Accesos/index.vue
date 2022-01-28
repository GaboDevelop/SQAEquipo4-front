<template>
  <div class="tables-basic">
    <h2 class="page-title">Accesos</h2>
     <b-row class="mt-4 align-items-center">
      <b-col>
        <b-form-group
          label="Fecha inicio"
          label-for="sandwich-size-input"
        >
          <b-form-input
            id="sandwich-size-input"
            v-model="init_date"
            type="date"/>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group
          label="Fecha fin"
          label-for="sandwich-size-input"
        >
          <b-form-input
            id="sandwich-size-input"
            v-model="end_date"
            type="date"
            placeholder="xx-xx-xxxx"/>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group
          label="Por Rol"
          label-for="sandwich-size-input"
        >

          <b-form-select v-model="rol">
            <option value="">Todos</option>
            <option value="cashier">Cajero</option>
            <option value="client">Cliente</option>
          </b-form-select>
        </b-form-group>
      </b-col>
      <b-col>
        <b-button
          variant="primary"
          @click="onSearchOrders"
        >
          Buscar
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
         <p>Listado Historico de accesos de usuario.</p>
         <div class="table-responsive">
           <table class="table table-hover">
             <thead>
               <tr>
                 <th># identificador</th>
                 <th>Nombre</th>
                 <th>Correo</th>
                 <th>Fecha</th>
               </tr>
             </thead>
             <tbody>
               <tr v-for="(user,i) in users" :key="i+'sasas'">
                 <td>{{user.id}}</td>
                 <td>{{user.name}}</td>
                 <td>{{user.email}}</td>
                  <td>
                    <b-badge variant="success">{{user.date}}</b-badge>
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
      rol:'',
      date: new Date(),
      users: [],
      name:'',
      email:'',
      password:'',
      init_date: '',
        end_date: '',
      list_ingredients: [],
      sizesSandwich: [],
    };
  },
  mounted(){
    HTTP.get('users/history')
      .then((res)=>{
        if(res.data && res.data.success){
          this.users = res.data.data;
        }
      })
  },
  methods: {
      onSearchOrders(){
      const {init_date, end_date, rol} = this;
        HTTP.get(`users/history?init_date=${init_date}&end_date=${end_date}&rol=${rol}`)
        .then(response => {
            if(response.data && response.data.success){
            this.users = response.data.data
            }
        })
        .catch(e => {
            // eslint-disable-next-line no-console
            console.error(e)
        })
      
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="../Pedidos/Basic.scss" lang="scss" scoped />
