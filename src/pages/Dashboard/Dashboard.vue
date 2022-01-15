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
                  v-for="row in mock.table"
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
                  v-for="row in mock.table"
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

import { Chart } from 'highcharts-vue';

export default {
  name: 'Reportes',
  components: {
    Widget, BigStat, highcharts: Chart
  },
  data() {
    return {
      mock
    };
  },
  methods: {
    getRandomData() {
      const arr = [];

      for (let i = 0; i < 25; i += 1) {
        arr.push(Math.random().toFixed(1) * 10);
      }

      return arr;
    },
    getRevenueData() {
      const data = [];
      const seriesCount = 3;
      const accessories = ['SMX', 'Direct', 'Networks'];

      for (let i = 0; i < seriesCount; i += 1) {
        data.push({
          label: accessories[i],
          data: Math.floor(Math.random() * 100) + 1,
        });
      }

      return data;
    }
  },
  computed: {
    donut() {
      let revenueData = this.getRevenueData();
      let {danger, info, primary} = this.appConfig.colors;
      let series = [
        {
          name: 'Revenue',
          data: revenueData.map(s => {
            return {
              name: s.label,
              y: s.data
            }
          })
        }
      ];
      return {
        chart: {
          type: 'pie',
          height: 120
        },
        credits: {
          enabled: false
        },
        title: false,
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: false
            },
            borderColor: null,
            showInLegend: true,
            innerSize: 60,
            size: 100,
            states: {
              hover: {
                halo: {
                  size: 1
                }
              }
            }
          }
        },
        colors: [danger, info, primary],
        legend: {
          align: 'right',
          verticalAlign: 'middle',
          layout: 'vertical',
          itemStyle: {
            color: '#495057',
            fontWeight: 100,
            fontFamily: 'Montserrat'
          },
          itemMarginBottom: 5,
          symbolRadius: 0
        },
        exporting: {
          enabled: false
        },
        series
      };
    }
  }
};
</script>

<style src="./Dashboard.scss" lang="scss" />
