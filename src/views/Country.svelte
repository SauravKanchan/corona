<script>
  import { onMount } from 'svelte'

  export let name
  const Chart = require('chart.js')
  let data
  let labels = []
  let graphData = [{
    label: 'Confirmed',
    fill: false,
    borderColor: '#ffbb33',
    data: []
  },
    {
      label: 'Recovered',
      fill: false,
      borderColor: '#00C851',
      data: [],
    }, {
      label: 'Deaths',
      fill: false,
      borderColor: '#ff4444',
      data: [],
    }]

  onMount(async () => {
    let global = await window.api('https://pomber.github.io/covid19/timeseries.json')
    data = global.data[name]
    console.log(data[0])
    for (let element in data) {
      labels.push(data[element].date)
      graphData[0].data.push(data[element].confirmed)
      graphData[1].data.push(data[element].recovered)
      graphData[2].data.push(data[element].deaths)
    }

    let ctx = document.getElementById('country').getContext('2d')
    let chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {

        datasets: graphData,
        labels: labels
      },

      // Configuration options go here
      options: {
        title: {
          display: true,
          text: `Confirmed vs Recoverd vs Deaths in ${name}`
        },

        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'No. of cases'
            }
          }]
        }
      }
    })

  })
</script>
<div class="container-fluid mt-5">
  <h1 class="h1 title text-center col-md-12">{name}</h1>
  <canvas id="country" class="w-100" height=500></canvas>
</div>
