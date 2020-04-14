<script>
  import { afterUpdate } from 'svelte'

  const Chart = require('chart.js')

  afterUpdate(() => {
    let ctx = document.getElementById('percentageChart')
    let data = [{
      x: 10,
      y: 20
    }, {
      x: 15,
      y: 10
    }, {
      x: 30,
      y: 20
    }, {
      x: 45,
      y: 60
    }]
    let stackedLine = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        datasets: [{
          label: 'India',
          borderColor: 'red',
          data: [0, 3, 1397, 7189,400,0]
        }],
        labels: ['January,31', 'February,29', 'March,31', 'April,11', 'March,31', 'April,11']
      },

      // Configuration options go here
      options: {
        title: {
          display: true,
          text: 'Total no. of COVID-19 cases in world'
        },

        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'No. of cases',
            },
            // stacked: true
          }]
        }

      }
    })
  })

</script>
<canvas id="percentageChart" class="w-100 col-md-8" height="500"></canvas>
