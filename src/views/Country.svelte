<style>
  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 15px;
    border-radius: 5px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
  }

  .slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
  }

</style>
<script>
  import { onMount } from 'svelte'
  import PercentageChange from './PercentageChange.svelte'
  import Overview from './Overview.svelte'

  export let name
  export let display
  const Chart = require('chart.js')
  let data
  let days = 45
  let cases_time_series = [{ dailyconfirmed: 0, date: '', totalconfirmed: 0 }]
  let cumulative = true
  let total_days = 50
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
  let global
  let labels

  function update_graph (data, cumulative) {
    let graphData = [
      {
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
    labels = []
    for (let element in data.slice(1)) {
      element = parseInt(element) + 1
      labels.push(data[element].date)
      if (cumulative) {
        graphData[0].data.push(data[element].confirmed)
        graphData[1].data.push(data[element].recovered)
        graphData[2].data.push(data[element].deaths)
      } else {
        graphData[0].data.push(data[element].confirmed - data[element - 1].confirmed)
        graphData[1].data.push(data[element].recovered - data[element - 1].recovered)
        graphData[2].data.push(data[element].deaths - data[element - 1].deaths)
      }
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
          }]
        }
      }
    })

  }

  onMount(async () => {
    global = await window.api('https://pomber.github.io/covid19/timeseries.json')
    data = [{ confirmed: 0, recoverd: 0, deaths: 0 }].concat(global.data[name])
    total_days = data.length - 1
    update_graph(data.slice(data.length - days, data.length), cumulative)
  })

  function update () {
    update_graph(data.slice(data.length - days, data.length), cumulative)
    console.log(days, cumulative)
  }
</script>
<div class="container-fluid mt-5">
  <div class="row">
    {#if !display}
      <div class="col-md-12">
        <Overview overview={overview} title={name}></Overview>
      </div>
    {/if}
    <div class="text-center border border-light p-5 col-md-12">
      <p class="h4 mb-4">Change parameters of graphs below</p>
      <div class="row">
        <div class="col-md-8">
          <div class="row">
            <label class="form-control-label col-md-2" for="CountryDaysId">Days</label>
            <input type="range" id="CountryDaysId" class="slider col-md-8" bind:value={days} max="{total_days}"
                   min="1" on:change={update}>
            <p class="col-md-2 h5">{days}</p>
          </div>
        </div>
        <div class="custom-control custom-switch col-md-4">
          <input type="checkbox" class="custom-control-input" bind:checked={cumulative} on:change={update}
                 id="cumulativeCountry">
          <label class="custom-control-label" for="cumulativeCountry">Add previous day values(cumulative)</label>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <canvas id="country" class="w-100 mb-5" height=500></canvas>
    </div>
    <div class="col-md-12">
      <PercentageChange cases_time_series={cases_time_series} name={name}></PercentageChange>
    </div>
  </div>
</div>
