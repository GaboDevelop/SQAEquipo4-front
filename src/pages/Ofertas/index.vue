<template>
  <div class="tables-basic">
    <h2 class="page-title">Ofertas</h2>
    <b-button variant="primary" @click="modalShow = !modalShow">Crear Oferta</b-button>

  <b-modal v-model="modalShow" title="Registrar Oferta">
      <form class="mt" @submit.prevent="registerOffer">
          <div class="form-group">
            <input v-model="name" class="form-control no-border" ref="first_name" required type="text" name="first_name" placeholder="Nombre de oferta" />
          </div>
          <div class="form-group">
            <input v-model="discount" class="form-control no-border" ref="password" required type="number"  placeholder="1-100%" />
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
          :disabled="!name || discount < 1 || discount > 100"
          @click="registerOffer"
        >
          Registrar Oferta
        </b-button>
      </div>
    </template>
  </b-modal>

    <b-row>
      <b-col>
         <p>Listado de Ofertas.</p>
         <div class="table-responsive">
           <table class="table table-hover">
             <thead>
               <tr>
                 <th># identificador</th>
                 <th>Nombre</th>
                 <th>Descuento</th>
                 <th>Acciones</th>
               </tr>
             </thead>
             <tbody>
               <tr v-for="(offer,i) in offers" :key="i+'sasas'">
                 <td>{{offer.id}}</td>
                 <td>{{offer.name}}</td>
                 <td>{{offer.discount}}%</td>
                  <td>
                    <b-button variant="danger" @click="deleteOffer(offer)">Cancelar</b-button>
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
      offers: [],
      name:'',
      discount:1,
      password:'',
      list_ingredients: [],
      sizesSandwich: [],
    };
  },
  mounted(){
    this.getOffers()
  },
  methods: {
    getOffers(){
      HTTP.get(`offers`)
      .then((res)=>{
        if(res.data && res.data.success){
          this.offers = res.data.data;
        }
      })
    },
    registerOffer() {
      const {name,discount} = this;
      const data = {
        name,discount
      }
      HTTP.post(`offers`, data)
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
          this.name = ''
          this.discount = 1
          this.getOffers();
          this.modalShow = false;
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
      .catch(() => {
        //console.log(e)
      })
    },
    deleteOffer(offer){
      const {id} = offer;
      HTTP.delete(`offers/${id}`)
      .then((res) => {
        if(res.data && res.data.success){
          this.$toasted.success('Registro eliminado!', {
            action: {
              text: 'Cerrar',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          })
          this.getOffers();
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
      .catch(() => {
        //console.log(e)
      })
      
    }
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="../Pedidos/Basic.scss" lang="scss" scoped />
