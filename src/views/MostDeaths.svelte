<script>
  export let statewise
  const Chart = require('chart.js')
  import { afterUpdate } from 'svelte'

  let state_local
  afterUpdate(async () => {
      state_local = statewise.slice()
      state_local.sort((a, b) => {
        return b.deaths - a.deaths
      })
      let labels = []
      let data = []
      for (let s in state_local.slice(0, 5)) {
        labels.push(state_local[s].state)
        data.push(state_local[s].deaths)
      }

    if(!document.getElementById('mostDeathWrapper')){return }
    document.getElementById('mostDeathWrapper').innerHTML=""
    let ctx_element = document.createElement("canvas");
    ctx_element.setAttribute('class','w-100')
    ctx_element.height = "400"
    document.getElementById('mostDeathWrapper').appendChild(ctx_element)
    let ctx = ctx_element.getContext('2d')

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
  <div id="mostDeathWrapper"></div>
{/if}
