<script>
  const chart = require('chart.js')
  import { afterUpdate } from 'svelte'

  export let pieData
  let options
  let activePercentage, recoveredPercentage, deathsPercentage

  afterUpdate(() => {

    let total = parseInt(pieData.active) + parseInt(pieData.recovered) + parseInt(pieData.deaths)
    activePercentage = Math.round(parseInt(pieData.active) * 10000 / total) / 100
    recoveredPercentage = Math.round(parseInt(pieData.recovered) * 10000 / total) / 100
    deathsPercentage = Math.round(parseInt(pieData.deaths) * 10000 / total) / 100

    let data = {
      datasets: [{
        data: [pieData.active, pieData.recovered, pieData.deaths],
        backgroundColor: ['#ffbb33', '#558b2f', '#f44336']
      }],
      labels: [
        'Active',
        'Recovered',
        'Deaths'
      ]
    }
    let ctx = document.getElementById('pieChart')
    let myPieChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        title: {
          display: true,
          text: 'Distribution of cases',
          fontSize: 25
        }
      }
    })
  })
</script>
<div style="height: 100% !important;">
  {#if pieData}

    <canvas id="pieChart" class="w-100" height="500"></canvas>
  {/if}
  <div class="row mt-5">
    <div class="col-sm-4 text-warning h2 text-center">Active: {activePercentage}%</div>
    <div class="col-sm-4 text-success text-center h2">Recovered: {recoveredPercentage}%</div>
    <div class="col-sm-4 text-danger text-center h2">Dead: {deathsPercentage}%</div>
  </div>
</div>
