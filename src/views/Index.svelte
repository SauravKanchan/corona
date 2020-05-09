<script>
  let overview = []

  import Overview from './Overview.svelte'
  import Chart from './Chart.svelte'
  import StateWiseTable from './StatewiseTable.svelte'
  import MostAffected from './MostAffected.svelte'
  import MostDeaths from './MostDeaths.svelte'
  import RecoveredState from './RecoveredState.svelte'
  import Country from './Country.svelte'
  import PieChart from './PieChart.svelte'
  export let title
  title="Overview"

  let total = { lastupdatedtime: '-' }
  let statewise = []
  let global_overview = []
  let global_update_date = ''
  let countries = []
  let cases_time_series = [];


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
        delta: 0
      },
      {
        number: total.deaths,
        title: 'Deaths',
        class: 'warning',
        delta: total.deltadeaths
      }
    ]

    let global = await window.api('https://corona.lmao.ninja/v2/all')
    let data = global.data
    global_overview = [
      {
        number: data.cases,
        title: 'Confirmed',
        class: 'danger',
        delta: data.todayCases
      },
      {
        number: data.recovered,
        title: 'Recovered',
        class: 'success',
        delta: 0
      },
      {
        number: data.active,
        title: 'Active',
        class: 'info',
        delta: 0
      },
      {
        number: data.deaths,
        title: 'Deaths',
        class: 'warning',
        delta: data.todayDeaths
      }
    ]

    let date = new Date(data.updated)
    global_update_date = date.toLocaleString().replace(',', '')

    // cache countries
    await window.api('https://corona.lmao.ninja/v2/countries');


  })()

</script>

<div class="container-fluid">
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
          <StateWiseTable statewise={statewise}/>
        </div>
        <div class="col-md-6 col-xs-12 mt-3">
          <div class="row">
            <div class="col-md-12">
              <MostAffected statewise={statewise}></MostAffected>
            </div>
            <div class="col-md-12">
              <RecoveredState statewise={statewise}></RecoveredState>
            </div>
            <div class="col-md-12">
              <MostDeaths statewise={statewise}></MostDeaths>
            </div>
            <div class="col-md-12">
              <PieChart pieData={total}></PieChart>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <Chart/>
    </div>
    <div class="col-md-12 mt-5">
      <Country name="India" display={true}></Country>
    </div>
  </div>
</div>
