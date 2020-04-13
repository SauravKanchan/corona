<script>
  const Chart = require('chart.js')
  import { onMount } from 'svelte';

  onMount(() => {

    var ctx = document.getElementById('myChart').getContext('2d')
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {

        datasets: [{
          label: 'India',
          fill: false,
          borderColor: 'rgb(255, 165, 0)',
          data: [0, 3, 1397, 7189]
        },
          {
            label: 'USA',
            fill: false,
            borderColor: 'rgb(0, 0, 255)',
            data: [0, 68, 189967, 532879],

            // Changes this dataset to become a line
            type: 'line'
          },
          {
            label: 'Spain',
            fill: false,
            borderColor: 'rgb(0, 255, 0)',
            data: [0, 58, 95923, 163027]
          },
          {
            label: 'Italy',
            fill: false,
            borderColor: 'rgb(255, 0, 0)',
            data: [0, 1128, 105792, 152271]
          },
          {
            label: 'France',
            fill: false,
            borderColor: 'rgb(255, 0, 127)',
            data: [0, 100, 52128, 129654]
          },
          {
            label: 'Germany',
            fill: false,
            borderColor: 'rgb(102, 255, 255)',
            data: [0, 63, 54933, 65181]
          },
          {
            label: 'China',
            fill: false,
            borderColor: 'rgb(255, 204, 229)',
            data: [11791, 79824, 81554, 82052]
          }],
        labels: ['January,31', 'February,29', 'March,31', 'April,11']
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
              labelString: 'No. of cases'
            }
          }]
        }

      }
    })
  })

</script>
<canvas id="myChart" class="w-100" height="500"></canvas>
