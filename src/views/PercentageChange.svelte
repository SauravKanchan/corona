<script>
  import { afterUpdate } from 'svelte'

  const Chart = require('chart.js')
  export let cases_time_series


  afterUpdate(() => {
    let series = [{ dailyconfirmed: 0, date: '', totalconfirmed: 0 }].concat(cases_time_series)
    series = series.slice(Math.max(series.length -80,0), series.length)
    if (series.length > 1) {
      let labels = []
      let data = [0]
      // let s = series.splice(0,series.length-1)
      for (let c in series.slice(0, series.length - 1)) {
        labels.push(series[c].date)
        c = parseInt(c)
        let prev = parseInt(series[c].totalconfirmed)
        let current = parseInt(series[c + 1].dailyconfirmed)
        let percent
        if (prev) {
          percent = (current) * 100 / prev
        } else {
          percent = current
        }
        data.push(percent)
      }
      let ctx = document.getElementById('percentageChart')
      let stackedLine = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
          datasets: [{
            label: 'Percentage Change',
            backgroundColor: 'rgba(252, 132, 3,0.4)',
            borderColor: 'red',
            data: data
          }],
          labels: labels
        },

        // Configuration options go here
        options: {
          title: {
            display: true,
            text: 'Percentage change in COVID-19 cases in India'
          },

          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Percentage',
              },
              // stacked: true
            }],
            xAxes:[{
              ticks: {
                autoSkip: true,
                maxTicksLimit: 20
              },
              distribution: 'series'
            }]
          }

        }
      })
    }
  })

</script>
{#if cases_time_series}
  <canvas id="percentageChart" class="w-100" height="500"></canvas>
{/if}
