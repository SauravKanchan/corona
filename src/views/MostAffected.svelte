<script>
  export let statewise
  const Chart = require('chart.js')
  import { afterUpdate } from 'svelte'

  afterUpdate(async () => {
    let labels = []
    let data = []
    for(let s in statewise.slice(0,5)){
      labels.push(statewise[s].state)
      data.push(statewise[s].confirmed)
    }
    let ctx = document.getElementById('mostAfffectedChart').getContext('2d')
    let mostAfffectedChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'No of Cases',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderColor: [
            'rgb(255, 165, 0)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Most affected state in India',
          fontSize: 25
        },
        legend: {
          display: false,
          labels: {
            fontColor: '#000'
          }
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'No. of cases'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'States'
            }
          }]
        }
      }
    })
  })
</script>
<div class="wrapper" style="height: 100% !important;">
{#if statewise}
<canvas id="mostAfffectedChart" class="w-100" height="500"></canvas>
{/if}
</div>
