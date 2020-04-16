<script>
  import { afterUpdate } from 'svelte'

  const Chart = require('chart.js')
  export let cases_time_series
  export let name


  afterUpdate(() => {
    let series = [{ dailyconfirmed: 0, date: '', totalconfirmed: 0 }].concat(cases_time_series)
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

      document.getElementById('percentageWrapper').innerHTML=""
      let ctx_element = document.createElement("canvas");
      ctx_element.setAttribute('class','w-100')
      ctx_element.height = "400"
      document.getElementById('percentageWrapper').appendChild(ctx_element)
      let ctx = ctx_element.getContext('2d')


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
            text: `Percentage change in COVID-19 cases in ${name}`
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
<div id="percentageWrapper"></div>
