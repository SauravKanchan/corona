<script>
  const chart = require('chart.js')
  import { afterUpdate } from 'svelte'
  export let pieData
  let options

  afterUpdate(() => {
    let data = {
      datasets: [{
        data: [pieData.active, pieData.recovered, pieData.deaths],
        backgroundColor:['#ffbb33','#558b2f','#f44336']
      }],
      labels: [
        'Active',
        'Recovered',
        'Deaths'
      ]
    }
    let ctx = document.getElementById('pieChart')
    let myPieChart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {title: {
          display: true,
          text: 'Distribution of cases',
          fontSize: 25
        }}
    })
  })
</script>
{#if pieData}
<canvas id="pieChart" class="w-100" height="500"></canvas>
{/if}
