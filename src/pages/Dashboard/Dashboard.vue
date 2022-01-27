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
                  <th>Cantidad de pedidos</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in masPedidos"
                  :key="row.id"
                >
                  <td>{{row.product}}</td>
                  <td>5</td>
                  <td>{{row.price}}</td>
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
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in masPedidos"
                  :key="row.id"
                >
                  <td>{{row.product}}</td>
                  <td>5</td>
                  <td>{{row.price}}</td>
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
import mock from './mock';
import { HTTP } from '../../http-common';

import { Chart } from 'highcharts-vue';

export default {
  name: 'Reportes',
  components: {
    Widget, BigStat, highcharts: Chart
  },
  data() {
    return {
      masPedidos:[
        {
          id:13232,
          product:'Tomate',
          price:12.5,
        },
        {
          id: 13233,
          product: 'Tocineta',
          price: 15.5,
        },
        {
          id: 13234,
          product: 'Salsa picante',
          price: 10.5,
        },
        {
          id: 13235,
          product: 'Cebolla caramelizada',
          price: 8.5,
        },
        {
          id: 13236,
          product: 'Sandwich de jamón',
          price: 12.5,
        },
        {
          id: 13237,
          product: 'Sandwich de salchicha',
          price: 12.5,
        },
        {
          id: 13238,
          product: 'Sandwich de tocino',
          price: 12.5,
        },
        {
          id: 13239,
          product: 'Sandwich de salami',
          price: 12.5,
        },
        {
          id: 13240,
          product: 'Sandwich de salchicha',
          price: 12.5,
        },
        {
          id: 13241,
          product: 'Sandwich de salchicha',
          price: 12.5,
        }
      ]
    };
  },
  mounted() {
    HTTP.get('sandwich/maspedido').then(response => {
      console.log("response",response)
    });
  },
};
</script>

<style src="./Dashboard.scss" lang="scss" />
