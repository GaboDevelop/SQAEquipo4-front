<template>
  <div class="dashboard-page">
    <h1 class="page-title">Reportes</h1>

    <b-row>
      <b-col xs="12">
          <h3>Sandwich mas pedido</h3>
          <div class="table-responsive">
            <table class="table table-striped table-lg mb-0 requests-table">
              <thead>
                <tr class="text-muted">
                  <th>Nombre</th>
                  <th>Cantidad de sandwich vendidos</th>
                  <th>Precio unidad</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in sandwichs"
                  :key="row.id"
                >
                  <td>{{row.name}}</td>
                  <td>{{row.quantity}}</td>
                  <td>{{row.price}}$</td>
                  <td>{{row.total}}$</td>
                </tr>
              </tbody>
            </table>
          </div>
      </b-col>
    </b-row>

    <b-row>
      <b-col xs="12">
          <h3>Ingrediente mas pedido</h3>
          <div class="table-responsive">
            <table class="table table-striped table-lg mb-0 requests-table">
              <thead>
                <tr class="text-muted">
                  <th>Nombre</th>
                  <th>Cantidad de pedidos</th>
                  <th>Precio unitario</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in ingredients"
                  :key="row.id+'asasa'"
                >
                  <td>{{row.name}}</td>
                  <td>{{row.quantity}}</td>
                  <td>{{row.price}}$</td>
                  <td>{{row.total}}$</td>
                </tr>
              </tbody>
            </table>
          </div>
      </b-col>
    </b-row>
    
    <b-row v-if="user && user.rol_name == 'admin'" >
      <b-col xs="12">
          <h3>Ordenes por dia</h3>
          <div class="table-responsive">
            <table class="table table-striped table-lg mb-0 requests-table">
              <thead>
                <tr class="text-muted">
                  <th>Fecha</th>
                  <th>Cantidad de pedidos</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in ordersDate"
                  :key="row.id+'asaxxsa'"
                >
                  <td>{{row.date}}</td>
                  <td>{{row.count}}</td>
                </tr>
              </tbody>
            </table>
          </div>
      </b-col>
    </b-row>

    <b-row v-if="user && user.rol_name == 'admin'" >
      <b-col xs="12">
          <h3>Visitas de usuarios</h3>
          <div class="table-responsive">
            <table class="table table-striped table-lg mb-0 requests-table">
              <thead>
                <tr class="text-muted">
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Cantidad de visitas</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in usersRestaurant"
                  :key="row.id+'asaxxsa'"
                >
                  <td>{{row.name}}</td>
                  <td>{{row.email}}</td>
                  <td>{{row.count}}</td>
                </tr>
              </tbody>
            </table>
          </div>
      </b-col>
    </b-row>


    <b-row v-if="user && user.rol_name == 'admin'" >
      <b-col xs="12">
          <h3>Gastos por usuario</h3>
          <div class="table-responsive">
            <table class="table table-striped table-lg mb-0 requests-table">
              <thead>
                <tr class="text-muted">
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Cantidad gastada</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in usersAmount"
                  :key="row.id+'asaxxs23a'"
                >
                  <td>{{row.name}}</td>
                  <td>{{row.email}}</td>
                  <td>{{row.total_price}}$</td>
                </tr>
              </tbody>
            </table>
          </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import BigStat from './components/BigStat/BigStat';
import { mapState, mapActions } from 'vuex';
import { HTTP } from '../../http-common';

import { Chart } from 'highcharts-vue';

export default {
  name: 'Reportes',
  components: {
    Widget, BigStat, highcharts: Chart
  },
  data() {
    return {
      sandwichs:[],
      ingredients:[],
      ordersDate: [],
      usersRestaurant:[],
      usersAmount:[]
    };
  },
  computed: {
    ...mapState('user', ['user']),
  },
  mounted() {
    HTTP.get('sandwichs/mostSold').then(response => {
      if(response.data && response.data.success){
        this.sandwichs = response.data.data;
      }
    });
    HTTP.get('ingredients/mostSold').then(response => {
      if(response.data && response.data.success){
        this.ingredients = response.data.data;
      }
    });
    HTTP.get('orders/date').then(response => {
      if(response.data && response.data.success){
        this.ordersDate = response.data.data;
      }
    });
    HTTP.get('users/group-orders').then(response => {
      if(response.data && response.data.success){
        this.usersRestaurant = response.data.data;
      }
    });
    HTTP.get('users/amount').then(response => {
      if(response.data && response.data.success){
        this.usersAmount = response.data.data;
      }
    });
  },
};
</script>

<style src="./Dashboard.scss" lang="scss" />
