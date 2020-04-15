<script>
  import { onMount } from 'svelte'
  import PercentageChange from './PercentageChange.svelte'
  import Overview from './Overview.svelte'

  export let name
  export let display
  const Chart = require('chart.js')
  let data
  let labels = []
  let cases_time_series = [{ dailyconfirmed: 0, date: '', totalconfirmed: 0 }]
  let overview = [
    {
      number: 0,
      title: 'Confirmed',
      class: 'danger',
      delta: 0
    },
    {
      number: 0,
      title: 'Recovered',
      class: 'success',
      delta: 0
    },
    {
      number: 0,
      title: 'Active',
      class: 'info',
      delta: 0
    },
    {
      number: 0,
      title: 'Deaths',
      class: 'warning',
      delta: 0
    }
  ]

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
    data = [{ confirmed: 0 }].concat(global.data[name])
    for (let element in data.slice(1)) {
      element = parseInt(element) + 1
      labels.push(data[element].date)
      graphData[0].data.push(data[element].confirmed)
      graphData[1].data.push(data[element].recovered)
      graphData[2].data.push(data[element].deaths)
      cases_time_series.push({
        dailyconfirmed: data[element].confirmed - data[element - 1].confirmed,
        date: data[element].date,
        totalconfirmed: data[element].confirmed
      })

    }
    overview[0].number = data[data.length - 1].confirmed
    overview[1].number = data[data.length - 1].recovered
    overview[2].number = data[data.length - 1].confirmed - data[data.length - 1].recovered - data[data.length - 1].deaths
    overview[3].number = data[data.length - 1].deaths

    cases_time_series = cases_time_series
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
          text: `Confirmed vs Recoverd vs Deaths in ${name}`,
          fontSize: 20
        },

        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'No. of cases'
            }
          }],
          xAxes: [{
            ticks: {
              autoSkip: true,
              maxTicksLimit: 20
            },
            distribution: 'series'
          }]
        }
      }
    })

  })
</script>
<div class="container-fluid mt-5">
  {#if !display}
    <Overview overview={overview} title={name}></Overview>
  {/if}
  <canvas id="country" class="w-100 mb-5" height=500></canvas>
  <PercentageChange cases_time_series={cases_time_series} name={name}></PercentageChange>
</div>
