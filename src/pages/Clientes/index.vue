<template>
  <div class="tables-basic">
    <h2 class="page-title">Clientes</h2>


    <b-row>
      <b-col>
         <p>Listado Clientes.</p>
         <div class="table-responsive">
           <table class="table table-hover">
             <thead>
               <tr>
                 <th># identificador</th>
                 <th>Nombre</th>
                 <!--<th>Estado</th>-->
                 <!--<th>Acciones</th>-->
               </tr>
             </thead>
             <tbody>
               <tr v-for="(user,i) in users" :key="i+'sasas'">
                 <td>{{user.id}}</td>
                 <td>{{user.nombre}}</td>
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
      users: [
        {
          id: 1,
          nombre: 'Mediano'
        }
      ],
      list_ingredients: [],
      sizesSandwich: [],
    };
  },
  mounted(){
    HTTP.get(`ingrediente/ingredientes`)
    .then(response => {
      this.list_ingredients = response.data
    })
    .catch(e => {
  
      // eslint-disable-next-line no-console
      console.error(e)
    })

    HTTP.get(`sandwich/sandwiches`)
    .then(response => {
      this.sizesSandwich = response.data
    })
    .catch(() => {
      //this.errors.push(e)
    })

    this.getPedidos()
  },
  methods: {
    getPedidos(){
      HTTP.get(`pedido/pedidos`)
      .then(response => {
        this.orders = response.data
      })
      .catch(() => {
        //this.errors.push(e)
      })
    },
    onSubmitOrder(){
      //
      const day = this.date.getDate();
      const month = this.date.getMonth() + 1;
      const year = this.date.getFullYear();
      const date = `${year}-${month < 10? '0'+month:month}-${day} ${this.date.getHours()}:${this.date.getMinutes()}:${this.date.getSeconds()}`;
      const data = {
        "cantidad": this.quantity,
        "precioSandwich": this.size.precio,
        "fecha_pedido":date,
        "idSandwich":this.size.id_sandwich,
        "idIngrediente":this.ingredient.id_ingrediente,
        "precioIngrediente": this.ingredient.precio
      }
      HTTP.post(`pedido/nuevo`, data)
      .then(() => {
          this.modalShow=false;
          this.$toasted.success('Pedido creado con exito!', {
            action: {
              text: 'Cerrar',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          })
          this.getPedidos();
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    openEditModal(order){
      this.modalShow =true;
      this.size = {
         value: 'b', 
         text: order.size 
      };
      this.ingredients = order.ingredients.map(item => {
        return {
          name: item,
          value: 1
        }
      });
    },
    openDeleteModal(order, index){
      this.modalShowDelete = true;
      this.orderToDelete = order;
      this.indexToDelete = index;
    },
    onDeleteOrder(){
      this.modalShowDelete=false;
      this.orders.splice(this.indexToDelete, 1);
    }
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="../Pedidos/Basic.scss" lang="scss" scoped />
