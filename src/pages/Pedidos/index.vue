<template>
  <div class="tables-basic">
    <b-modal v-model="modalShow" title="Nuevo Pedido">
      <form ref="form" @submit.stop.prevent="onSubmitOrder">
          <div class="col-12 px-0">
            <b-form-group
              label="Comentario"
              label-for="sandwich-size-input"
            >
              <b-form-input
                id="sandwich-size-input"
                v-model="comment"
                required
                placeholder="Comentario del pedido"/>
            </b-form-group>
          </div>
          <div class="col-12 px-0">
            <b-form-group
              label="Tiempo estimado de pedido (en minutos)"
              label-for="sandwich-size-input"
            >
              <b-form-input
                id="sandwich-size-input"
                v-model="estimate_time"
                type="number"
                required
                placeholder="Comentario del pedido"/>
            </b-form-group>
          </div>
          
          <template v-for="(sandwich,i) in sandwichs">
            <div class="mb-4 row justify-content-end" :key="'sandwich'+i">
              
              <div class="col-12">
                <b-form-group
                  label="Tamano de sandwich"
                  label-for="sandwich-size-input"
                  invalid-feedback="El tipo de sandwich es requerido"
                >
                  <multiselect 
                    v-model="sandwich.size" 
                    :options="sizesSandwich" 
                    :multiple="false" 
                    :close-on-select="true" 
                    :clear-on-select="false" 
                    :preserve-search="true" 
                    :placeholder="`Tamano del sandwich ${i+1}`" 
                    label="name"
                    track-by="name" 
                    :preselect-first="false"
                    >
                      <template 
                        slot="singleLabel" 
                        slot-scope="props"
                      >
                        <span class="option__desc">
                          <span class="option__title">
                            {{ props.option.name }} / Precio: {{ props.option.price }}$
                          </span>
                        </span>
                      </template>
                      <template 
                        slot="option" 
                        slot-scope="props"
                      >
                        <div class="option__desc">
                          <span class="option__title">
                            {{ props.option.name }} 
                          </span>
                          <span class="option__small">
                            precio: {{ props.option.price }}$
                          </span>
                        </div>
                      </template>
                  </multiselect>
                </b-form-group>
              </div>
              <div class="col-12">
                <b-form-group label="Ingredientes" label-for="ingredients-input">
                  <multiselect 
                    v-model="sandwich.ingredients" 
                    :options="list_ingredients" 
                    :multiple="true" 
                    :close-on-select="true" 
                    :clear-on-select="false" 
                    :preserve-search="true" 
                    :placeholder="`Ingredientes del sandwich ${i+1}`" 
                    label="name"
                    track-by="name" 
                    :preselect-first="false"
                    >
                      <template 
                        slot="singleLabel" 
                        slot-scope="props"
                      >
                        <span class="option__desc">
                          <span class="option__title">
                            {{ props.option.name }} / Precio: {{ props.option.price }}$
                          </span>
                        </span>
                      </template>
                      <template 
                        slot="option" 
                        slot-scope="props"
                      >
                        <div class="option__desc">
                          <span class="option__title">
                            {{ props.option.name }} 
                          </span>
                          <span class="option__small">
                            precio: {{ props.option.price }}$
                          </span>
                        </div>
                      </template>
                  </multiselect>
                </b-form-group>
              </div>
              <div class="col-6">
                <b-button
                  variant="primary"
                  size="sm"
                  class="float-right mb-4"
                  @click="deleteSandwich(i)"
                >
                  Eliminar sandwich
                </b-button>
              </div>
            </div>
          </template>
          
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="addSandwich"
          >
            Agregar sandwich
          </b-button>
        </form>
        <div class="row col-12 px-0 m-0" v-if="user && user.rol_name != 'client'">
          <div class="col-12 px-0">
            <b-form-group
            label="Descuento del pedido"
            label-for="sandwich-size-input"
            invalid-feedback="El tipo de sandwich es requerido"
          >
            <multiselect 
              v-model="offer" 
              :options="offers" 
              :multiple="false" 
              :close-on-select="true" 
              :clear-on-select="false" 
              :preserve-search="true" 
              :placeholder="`Descuentos`" 
              label="name"
              track-by="name" 
              :preselect-first="false"
              >
                <template 
                  slot="singleLabel" 
                  slot-scope="props"
                >
                  <span class="option__desc">
                    <span class="option__title">
                      {{ props.option.name }} / decuento: {{ props.option.discount }}%
                    </span>
                  </span>
                </template>
                <template 
                  slot="option" 
                  slot-scope="props"
                >
                  <div class="option__desc">
                    <span class="option__title">
                      {{ props.option.name }} 
                    </span>
                    <span class="option__small">
                      precio: {{ props.option.discount }}%
                    </span>
                  </div>
                </template>
            </multiselect>
          </b-form-group>
          </div>
        </div>
        <div class="row col-12 justify-content-center">
          <div class="col-12">
            <h5>Resumen de pedido</h5>
          </div>
          <div class="col-12">
            <p>Cantidad de sandwich: {{ sandwichs.length }}</p>
          </div>
          <div class="col-12">
            <p>Precio en sandwichs: {{ getPricesSandwichs }}$</p>
          </div>
          <div class="col-12">
            <p>Precio en ingredientes: {{ getPricesIngredients }}$</p>
          </div>
          <div class="col-12" v-if="offer">
            <p>Descuento: {{ offer.discount }}%</p>
          </div>
          <div class="col-12">
            <p>Subtotal: {{ getPricesSandwichs + getPricesIngredients }}$</p>
          </div>
          <p>
            <b>Total: {{ getDiscount(getPricesSandwichs + getPricesIngredients) }}$</b>
          </p>
        </div>
        <div class="col-12 px-0 mb-4">
            <b-form-group
              label="Nombre de cliente(factura)"
              label-for="sandwich-size-input"
            >
              <b-form-input
                id="sandwich-size-input"
                v-model="client_name"
                type="text"
                required
                placeholder="Gerardo ..."/>
            </b-form-group>
          </div>
          
        <div class="col-12 px-0 mb-4">
          <b-form-group
            label="Tarjeta de credio o debito"
            label-for="sandwich-size-input"
          >
            <b-form-input
              id="sandwich-size-input"
              v-model="card_number"
              v-mask="'####-####-####-####'"
              type="text"
              required
              placeholder="####-####-####-####"/>
          </b-form-group>
        </div>
        <div class="col-12 row mb-4">
          <div class="col-6 pl-0">
            <b-form-group
              label="Fecha de vencimiento"
              label-for="sandwich-size-input"
            >
              <b-form-input
                id="sandwich-size-input"
                v-model="card_expiration"
                v-mask="'##/##'"
                type="text"
                required
                placeholder="##/##"/>
            </b-form-group>
          </div>
          <div class="col-6 pr-0">
            <b-form-group
              label="Codigo de seguridad"
              label-for="sandwich-size-input"
            >
              <b-form-input
                id="sandwich-size-input"
                v-model="card_security"
                v-mask="'###'"
                type="text"
                required
                placeholder="###"/>
            </b-form-group>
          </div>
          
          
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
              :disabled="card_expiration == '' || card_security == '' || card_number == '' || client_name == ''"
              @click="onSubmitOrder"
            >
              Pagar
            </b-button>
          </div>
        </template>
    </b-modal>

    <b-modal  v-model="modalShowDelete" title="Rechazar pedido">
      <p>
        ¿Esta seguro que desea rechazar el pedido?
      </p>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="outline-primary"
            size="sm"
            class="float-right ml-4"
            @click="modalShowDelete=false"
          >
            Cerrar
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="onRejectOrder"
          >
            Rechazar
          </b-button>
        </div>
      </template>

    </b-modal>

    <b-modal size="xl" v-model="modalShowOrder" title="Resumen Pedido">
      <div class="row" v-if="orderSelected">
        <div class="col-12">
          <p>
            <b>Factura de Pedido:</b> {{ orderSelected.id }}
          </p>
        </div>
        <div class="col-12">
          <p>
            <b>Fecha de Pedido:</b> {{ orderSelected.date }}
          </p>
        </div>
         <div class="col-12">
          <p>
            <b>Tiempo estimado:</b> {{ orderSelected.estimate_time }}
          </p>
        </div>
        <div class="col-12">
          <table class="table table-hover">
             <thead>
               <tr>
                 <th>Sandwich</th>
                 <th>Precio Sandwich</th>
                 <th>Ingredientes</th>
                 <th>Total</th>
               </tr>
             </thead>
             <tbody>
               <tr v-for="(sandwich,i) in orderSelected.sandwichs" :key="i+'sasxxas'">
                 <td>{{sandwich.name}}</td>
                 <th>{{sandwich.price}}</th>
                 <td>
                   <p v-for="(ingredient, j) in sandwich.ingredients" :key="j+i+'asasa3'">
                     {{ingredient.name}} <b>Precio:</b> {{ingredient.price}}$
                   </p>
                  </td>
                 <td>{{getTotalSandwichIngredient(sandwich)}}$</td>
               </tr>
               <tr>
                  <td></td>
                  <td></td>
                  <td><b>Subtotal:</b></td>
                  <td>{{orderSelected.price}}$</td>
               </tr>
               <tr v-if="orderSelected.offer">
                  <td></td>
                  <td></td>
                  <td><b>Descuento:</b></td>
                  <td>{{orderSelected.offer.discount}}% (- {{orderSelected.price *(orderSelected.offer.discount/100)  }}$)</td>
               </tr>
               <tr>
                  <td></td>
                  <td></td>
                  <td><b>Total:</b></td>
                  <td>{{orderSelected.total_price}}$</td>
               </tr>
             </tbody>
           </table>
        </div>
      </div>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="outline-primary"
            size="sm"
            class="float-right ml-4"
            @click="modalShowOrder=false"
          >
            Cerrar
          </b-button>
        </div>
      </template>
    </b-modal>


    <h2 class="page-title">Pedidos</h2>
    <b-button variant="primary" @click="modalShow = !modalShow">Crear pedido</b-button>
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
         <p>Listado historico de pedidos.</p>
         <div class="table-responsive">
           <table class="table table-hover">
             <thead>
               <tr>
                 <th>Orden #</th>
                 <th>Fecha Pedido</th>
                 <th>Tiempo estimado pedido</th>
                 <th>Cantidad de sandwich</th>
                 <th>Precio</th>
                 <!--<th>Estado</th>-->
                 <th>Acciones</th>
               </tr>
             </thead>
             <tbody>
               <tr v-for="(order,i) in orders" :key="i+'sasas'">
                 <td>{{order.id}}</td>
                 <th>{{order.date}}</th>
                 <th>{{order.estimate_time}}</th>
                 <td>{{order.sandwichs.length}}</td>
                 <td>{{order.total_price}}$</td>
                 <!--<td><b-badge variant="primary" pill>{{order.status}}</b-badge></td>-->
                  <td>
                    
                    <b-button variant="danger" @click="openDeleteModal(order, i)">Rechazar</b-button>
                    <b-button
                      variant="primary"
                      size="sm"
                      class="float-right"
                      @click="onShowOrder(order)"
                      >
                        Ver
                    </b-button>
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
import { mapState } from 'vuex';
import Multiselect from 'vue-multiselect'
import Widget from '@/components/Widget/Widget';
import Sparklines from '../../components/Sparklines/Sparklines'

export default {
  name: 'Tables',
  components: { Widget, Sparklines, Multiselect },
  data() {
    return {
      modalShowOrder: false,
      modalShow:false,
      modalShowDelete: false,
      comment: '',
      rol: '',
      client_name: '',
      card_number: '',
      card_expiration: '',
      card_security: '',
      init_date: '',
      end_date: '',
      estimate_time: 5,
      sandwichs : [
        {
          size: null,
          ingredients: []
        }
      ],
      orderSelected: null,
      size: null,
      ingredient: null,
      quantity: 1,
      date: new Date(),
      orders: [
      ],
      offers:[],
      offer: null,
      list_ingredients: [],
      sizesSandwich: [],
    };
  },
  computed:{
    ...mapState('user', ['user']),
    getPricesSandwichs: function(){
      var total = 0;
      for(var i = 0; i < this.sandwichs.length; i++){
        if(this.sandwichs[i].size != null){
          total += this.sandwichs[i].size.price;
        }
      }
      return total;
    },
    getPricesIngredients: function(){
      var total = 0;
      for(var i = 0; i < this.sandwichs.length; i++){
        for(var j = 0; j < this.sandwichs[i].ingredients.length; j++){
          total += this.sandwichs[i].ingredients[j].price;
        }
      }
      return total;
    }
  },
  mounted(){
    
    HTTP.get(`ingredients`)
    .then(response => {
      if(response.data && response.data.success){
        this.list_ingredients = response.data.data
      }
    })
    .catch(e => {
  
      // eslint-disable-next-line no-console
      console.error(e)
    })

    HTTP.get(`sandwichs`)
    .then(response => {
      if(response.data && response.data.success){
        this.sizesSandwich = response.data.data
      }
    })
    .catch(() => {
      //this.errors.push(e)
    })

     HTTP.get(`offers`)
      .then((res)=>{
        if(res.data && res.data.success){
          this.offers = res.data.data;
        }
      })

    this.getPedidos()
  },
  methods: {
    addSandwich(){
      this.sandwichs.push({
        size: null,
        ingredients: []
      })
    },
    deleteSandwich(i){
      this.sandwichs.splice(i, 1)
    },
    getPedidos(){
      let count = 0
      const interval = setInterval(() => {
        if(this.user){
          HTTP.get(`orders${this.user.rol_name === 'admin' ? '': '?id='+this.user.id}`)
          .then(response => {
            if(response.data && response.data.success){
              this.orders = response.data.data
            }
          })
          .catch(e => {
            // eslint-disable-next-line no-console
            console.error(e)
          })
          clearInterval(interval)
        }else{
          count++
          if(count > 10){
            clearInterval(interval)
          }
        }
        
      }, 1000)
      
    },
    onSubmitOrder(){
      const day = this.date.getDate();
      const month = this.date.getMonth() + 1;
      const year = this.date.getFullYear();
      const minutes = this.date.getMinutes();
      const hours = this.date.getHours();
      const seconds = this.date.getSeconds();
      const date = `${year}-${month < 10? '0'+month:month}-${day} ${hours}:${minutes}:${seconds}`;
      //const date = `${year}-${month < 10? '0'+month:month}-${day} ${this.date.getHours()}:${this.date.getMinutes()}:${this.date.getSeconds()}`;
      const body = []
      for(var i = 0; i < this.sandwichs.length; i++){
        var sandwich = {
          id: this.sandwichs[i].size.id,
          number: i,
          price: this.sandwichs[i].size.price,
          ingredients: []
        }
        for(var j = 0; j < this.sandwichs[i].ingredients.length; j++){
          sandwich.ingredients.push({
            id: this.sandwichs[i].ingredients[j].id,
            price: this.sandwichs[i].ingredients[j].price
          })
        }
        body.push(sandwich)
      }

      const data = {
        "date": date,
        "user_id": this.user.id,
        "comment": this.comment,
        "estimate_time": this.estimate_time,
        "offer": this.offer,
        "data": body
      }
      HTTP.post(`orders`, data)
      .then((res) => {
        if(res && res.data && res.data.success){
          this.modalShow=false;
          this.$toasted.success('Pedido creado con exito!', {
            action: {
              text: 'Cerrar',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          })
          this.sandwichs = [
            {
              size: null,
              ingredients: []
            }
          ]
          this.comment = ""
          this.estimate_time = 5;
          this.getPedidos();
        }else{
          this.$toasted.error('Error al crear el pedido!', {
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
    onRejectOrder(){
      this.modalShowDelete=false;
      HTTP.delete(`orders/${this.orderToDelete.id}`)
      this.orders.splice(this.indexToDelete, 1);
    },
    onShowOrder(order){
      this.orderSelected = order;
      this.modalShowDelete=false;
      this.modalShow=false;
      this.modalShowOrder = true;
    },
    getTotalSandwichIngredient(sandwich){
      let total = 0;
      total += sandwich.price;
      for(var i = 0; i < sandwich.ingredients.length; i++){
        total += sandwich.ingredients[i].price;
      }
      return total
    },
    onSearchOrders(){
      let {init_date, end_date,rol} = this;
  
      HTTP.get(`orders?init_date=${init_date}&end_date=${end_date}&rol=${rol}&${this.user.rol_name === 'admin' ? '': 'id='+this.user.id}`)
      .then(response => {
        if(response.data && response.data.success){
          this.orders = response.data.data
        }
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.error(e)
      })
      
    },
    getDiscount(total){
      if(this.offer){
        return total - (total * (this.offer.discount / 100))
      } 
      return total
    }
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="./Basic.scss" lang="scss" scoped />
