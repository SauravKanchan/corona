<script>
  export let statewise
  const Chart = require('chart.js')
  import { afterUpdate } from 'svelte'
  let local_statewise

  afterUpdate(async () => {
    let labels = []
    let data = []
    local_statewise = statewise.slice()
    local_statewise.sort((a,b)=>{
      return (b.recovered/b.confirmed - a.recovered/a.confirmed)
    })
    for(let s in local_statewise.slice(0,6)){
      if (local_statewise[s].state === "Andaman and Nicobar Islands"){
        labels.push("Andaman & N")
      }else{
        labels.push(local_statewise[s].state)
      }
      data.push(local_statewise[s].recovered*100/local_statewise[s].confirmed)
    }
    let ctx = document.getElementById('recovereChart').getContext('2d')
    let recovereChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Percentage Recovered',
          data: data,
          backgroundColor: [
            '#2e7d32',
            '#558b2f',
            '#43a047',
            '#8bc34a',
            '#aed581',
            '#c5e1a5'
          ],
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Most recovered state in India',
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
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: 'Percentage Recovered'
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
{#if local_statewise}
<canvas id="recovereChart" class="w-100" height="500"></canvas>
{/if}
