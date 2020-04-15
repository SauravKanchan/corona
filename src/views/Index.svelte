<script>
  let overview = []

  import Overview from './Overview.svelte'
  import Chart from './Chart.svelte'
  import StateWiseTable from './StatewiseTable.svelte'
  import MostAffected from './MostAffected.svelte'
  import MostDeaths from './MostDeaths.svelte'
  import RecoveredState from './RecoveredState.svelte'
  import PercentageChange from './PercentageChange.svelte'
  import PieChart from './PieChart.svelte'

  import { afterUpdate } from 'svelte'

  let total = { lastupdatedtime: '-' }
  let statewise = []
  let state_data = []
  let global_overview = []
  let global_update_date = ''
  let countries = []
  let cases_time_series = []

  function sortByProperty (property) {
    return function (a, b) {
      if (a[property] > b[property]) {
        return -1
      } else if (a[property] < b[property]) {
        return 1
      }

      return 0
    }
  }

  (async () => {
    let res = await window.api.get('https://api.covid19india.org/data.json')
    total = res.data.statewise[0]
    cases_time_series = res.data.cases_time_series

    statewise = res.data.statewise.slice(1)
    overview = [
      {
        number: total.confirmed,
        title: 'Confirmed',
        class: 'danger',
        delta: total.deltaconfirmed
      },
      {
        number: total.recovered,
        title: 'Recovered',
        class: 'success',
        delta: total.deltarecovered
      },
      {
        number: total.active,
        title: 'Active',
        class: 'info',
        delta: total.deltarecovered
      },
      {
        number: total.deaths,
        title: 'Deaths',
        class: 'warning',
        delta: total.deltadeaths
      }
    ]

    let state_res
    try {
      state_res = await window.api.get('https://api.covid19india.org/state_district_wise.json')
    } catch (e) {
      state_res = await window.api.get('https://cors-anywhere.herokuapp.com/https://api.covid19india.org/state_district_wise.json')
    }
    let state_raw_data = state_res.data
    for (let state in state_raw_data) {
      state_data[state] = []
      for (let district in state_raw_data[state].districtData) {
        let dist = state_raw_data[state].districtData[district]
        dist.district = district
        state_data[state].push(state_raw_data[state].districtData[district])
      }
      state_data[state] = state_data[state].sort(sortByProperty('confirmed'))
    }
    state_data = state_data
    let global = await window.api('https://pomber.github.io/covid19/timeseries.json')
    let data = global.data
    global_overview = [
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
    for (let country in data) {
      global_overview[0].number += data[country][data[country].length - 1].confirmed
      global_overview[1].number += data[country][data[country].length - 1].recovered
      global_overview[2].number += data[country][data[country].length - 1].confirmed -
        data[country][data[country].length - 1].recovered - data[country][data[country].length - 1].deaths
      global_overview[3].number += data[country][data[country].length - 1].deaths
    }

    let global_data = global.data.Global

    let date = new Date(global.data.Date)
    global_update_date = date.toLocaleString().replace(',', '')

  })()

  afterUpdate(() => {
    if (global_update_date) {
      window.$('#countries').DataTable({
        pageLength: 35,
        aaSorting: [[1, 'desc']]
      })
      window.$('.dataTables_length').addClass('bs-select')
    }
  })

</script>

<div class="container-fluid">
  <h1 class="h1 title text-center mt-5 col-md-12">COVID-19 Overview</h1>
  <div class="row mt-5">
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-6" style="border-right: 1px solid grey ">
          <Overview title="India" overview={overview} lastupdatedtime={total.lastupdatedtime}/>
        </div>
        <div class="col-md-6">
          <Overview title="Global" overview={global_overview}/>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-6 col-xs-12 mt-3">
          <StateWiseTable statewise={statewise} state_data={state_data}/>
        </div>
        <div class="col-md-6 col-xs-12 mt-3 table-responsive">
          <MostAffected statewise={statewise}></MostAffected>
          <RecoveredState statewise={statewise}></RecoveredState>
          <MostDeaths statewise={statewise}></MostDeaths>
          <PieChart pieData={total}></PieChart>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <Chart/>
    </div>
    <div class="col-md-12 mt-5">
      <PercentageChange cases_time_series={cases_time_series}/>
    </div>
  </div>
</div>
