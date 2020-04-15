<script>
  export let statewise
  const Chart = require('chart.js')
  import { afterUpdate } from 'svelte'
  let state_local
  afterUpdate(async () => {
    state_local = statewise
    state_local.sort((a,b)=>{return b.deaths-a.deaths})
    let labels = []
    let data = []
    for(let s in state_local.slice(0,5)){
      labels.push(state_local[s].state)
      data.push(state_local[s].deaths)
    }
    let ctx = document.getElementById('mostDeath').getContext('2d')
    let mostDeath = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'No of Cases',
          data: data,
          backgroundColor: [
            '#b71c1c',
            '#f44336',
            '#ef5350',
            '#e57373',
            '#ef9a9a',
            '#ffcdd2'
          ],
          borderColor: [
            '#b71c1c',
            '#f44336',
            '#ef5350',
            '#e57373',
            '#ef9a9a',
            '#ffcdd2'
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Most deaths',
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
{#if state_local}
<canvas id="mostDeath" class="w-100" height="500"></canvas>
{/if}
