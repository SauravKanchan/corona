<script>
  export let cases_time_series
  const Chart = require('chart.js')
  import { afterUpdate } from 'svelte'

  afterUpdate(async () => {
    let ctx = document.getElementById('myChart').getContext('2d')
    let myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [' 0-10', '10-100', '100-500', '500-1000', '1000-5000', '5000-10000'],
        datasets: [{
          label: 'No of Days',
          data: [23, 10, 9, 5, 9, 5],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)'
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
          text: 'Growth in Covid19 Cases in India',
          fontSize: 25
        },
        legend: {
          display: true,
          labels: {
            fontColor: '#000'
          }
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'No. of days'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'No. of Cases'
            }
          }]
        }
      }
    })
  })
</script>
<canvas id="myChart" width="400" height="300"></canvas>
