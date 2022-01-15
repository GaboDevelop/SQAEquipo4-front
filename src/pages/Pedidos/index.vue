<template>
  <div class="tables-basic">
    <h2 class="page-title">Pedidos</h2>
    <b-button variant="primary" @click="modalShow = !modalShow">Crear pedido</b-button>

  <b-modal v-model="modalShow" title="Nuevo Pedido">
    <form ref="form" @submit.stop.prevent="onSubmitOrder">
        <b-form-group
          label="Tamano de sandwich"
          label-for="sandwich-size-input"
          invalid-feedback="El tipo de sandwich es requerido"
        >
          <multiselect 
            v-model="size" 
            :options="sizesSandwich" 
            :multiple="false" 
            :close-on-select="true" 
            :clear-on-select="false" 
            :preserve-search="true" 
            placeholder="Selecciona tamano del sandwich" 
            label="tamaño"
            track-by="tamaño" 
            :preselect-first="false"
            >
              <template 
                slot="singleLabel" 
                slot-scope="props"
              >
                <span class="option__desc">
                  <span class="option__title">
                    Nombre: {{ props.option.tamaño }} / Precio: {{ props.option.precio }}$
                  </span>
                </span>
              </template>
              <template 
                slot="option" 
                slot-scope="props"
              >
                <div class="option__desc">
                  <span class="option__title">
                    Nombre: {{ props.option.tamaño }} 
                  </span>
                  <span class="option__small">
                    precio: {{ props.option.precio }}$
                  </span>
                </div>
              </template>
          </multiselect>
        </b-form-group>

        <b-form-group label="Ingredientes" label-for="ingredients-input">
          <multiselect 
            v-model="ingredient" 
            :options="list_ingredients" 
            :multiple="false" 
            :close-on-select="true" 
            :clear-on-select="false" 
            :preserve-search="true" 
            placeholder="Selecciona los ingredientes" 
            label="nombre"
            track-by="nombre" 
            :preselect-first="false"
            >
              <template 
                slot="singleLabel" 
                slot-scope="props"
              >
                <span class="option__desc">
                  <span class="option__title">
                    Nombre: {{ props.option.tamaño }} / Precio: {{ props.option.precio }}$
                  </span>
                </span>
              </template>
              <template 
                slot="option" 
                slot-scope="props"
              >
                <div class="option__desc">
                  <span class="option__title">
                    Nombre: {{ props.option.tamaño }} 
                  </span>
                  <span class="option__small">
                    precio: {{ props.option.precio }}$
                  </span>
                </div>
              </template>
          </multiselect>
        </b-form-group>
      </form>
      <div class="row justify-content-center" v-if="size && ingredient">
        <div class="col-12">
          <h5>Resumen de pedido</h5>
        </div>
        <div class="col-12">
          <p>Cantidad de sandwich: {{ quantity }}</p>
        </div>
        <div class="col-12">
          <p>Tamano: {{ size.tamaño }}</p>
        </div>
        <div class="col-12">
          <p>Precio sandwich: {{ size.precio }}$</p>
        </div>
        <div class="col-12">
          <p>Precio ingrediente: {{ ingredient.precio }}$</p>
        </div>
        <p>
          <b>Total: {{ size.precio + ingredient.precio }}$</b>
        </p>
      </div>
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
            @click="onSubmitOrder"
            :disabled="!size || !ingredient"
          >
            Crear
          </b-button>
        </div>
      </template>
  </b-modal>

    <b-row>
      <b-col>
         <p>Listado historico de pedidos.</p>
         <div class="table-responsive">
           <table class="table table-hover">
             <thead>
               <tr>
                 <th>Orden #</th>
                 <th>Tamano</th>
                 <th>Ingredientes</th>
                 <th>Precio</th>
                 <!--<th>Estado</th>-->
                 <!--<th>Acciones</th>-->
               </tr>
             </thead>
             <tbody>
               <tr v-for="(order,i) in orders" :key="i+'sasas'">
                 <td>{{order.id_pedido}}</td>
                 <td>{{order.tamaño}}</td>
                 <td>{{order.ingrediente}}</td>
                 <td>{{order.precio}}$</td>
                 <!--<td><b-badge variant="primary" pill>{{order.status}}</b-badge></td>-->
                  <!--<td>
                    <b-button class="mr-2" variant="primary" @click="openEditModal(order)">Editar</b-button>
                    <b-button variant="danger" @click="openDeleteModal(order, i)">Eliminar</b-button>
                  </td>-->
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
      orders: [
        {
          id_pedido: 1,
          tamaño: 'Mediano',
          ingrediente: 'Pan',
          precio: 20
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
<style src="./Basic.scss" lang="scss" scoped />
