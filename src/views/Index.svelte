<script>
  let overview = []

  import Overview from './Overview.svelte'
  import Chart from './Chart.svelte'

  let total = { lastupdatedtime: '-' }
  let statewise = []
  let state_data = []
  let global_overview = []
  let global_update_date = ''
  let countries = []

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
    let global
    try {
      global = await window.api.get('https://api.covid19api.com/summary')
    } catch (e) {
      global = await window.api.get('https://cors-anywhere.herokuapp.com/https://api.covid19api.com/summary')
    }
    let global_data = global.data.Global
    countries = global.data.Countries.sort(sortByProperty('TotalConfirmed')).slice(0, 37)
    global_overview = [
      {
        number: global_data.TotalConfirmed,
        title: 'Confirmed',
        class: 'danger',
        delta: global_data.NewConfirmed
      },
      {
        number: global_data.TotalRecovered,
        title: 'Recovered',
        class: 'success',
        delta: global_data.NewRecovered
      },
      {
        number: global_data.TotalConfirmed - global_data.TotalRecovered,
        title: 'Active',
        class: 'info',
        delta: null
      },
      {
        number: global_data.TotalDeaths,
        title: 'Deaths',
        class: 'warning',
        delta: global_data.NewDeaths
      }
    ]
    let date = new Date(global.data.Date)
    global_update_date = date.toLocaleString().replace(',', '')

  })()

</script>

<style>
  tr.hide-table-padding td {
    padding: 0;
  }

  .expand-button {
    position: relative;
  }

  .accordion-toggle .expand-button:after {
    position: absolute;
    left: .75rem;
    top: 50%;
    transform: translate(0, -50%);
    content: '-';
  }

  .accordion-toggle.collapsed .expand-button:after {
    content: '+';
  }
</style>
<div class="container-fluid">
  <h1 class="h1 title text-center mt-5">COVID-19 Overview</h1>
  <div class="row mt-5">

    <div class="row">
      <div class="col-md-6" style="border-right: 1px solid grey ">
        <Overview title="India" overview={overview} lastupdatedtime={total.lastupdatedtime}/>
      </div>

      {#if global_update_date}
        <div class="col-md-6">
          <Overview title="Global" overview={global_overview} lastupdatedtime={global_update_date}/>
        </div>
      {/if}
    </div>
    <div class="col-md-6 mt-3">
      <h2 class="h2 text-center mb-3">State and District Wise</h2>
      <div class="table-responsive">
        <table class="table">
          <thead class="black white-text">
          <tr>
            <th scope="col">#</th>
            <th scope="col">State</th>
            <th scope="col">Confirmed</th>
            <th scope="col">Active</th>
            <th scope="col">Recovered</th>
            <th scope="col">Deaths</th>
          </tr>
          </thead>
          <tbody>

          {#each statewise as state, i}
            <tr class="accordion-toggle collapsed" id="accordion{i}" data-toggle="collapse" data-parent="#accordion{i}"
                href="#collapse{i}">
              <td class="expand-button"></td>
              <td>{ state.state }</td>
              <td>{ state.confirmed }</td>
              <td>{ state.active }</td>
              <td>{ state.recovered }</td>
              <td>{ state.deaths }</td>
            </tr>
            <tr class="hide-table-padding table">
              <td></td>
              <td colspan="5">
                <div id="collapse{i}" class="collapse in p-3">
                  {#if state_data[state.state]}
                    {#each state_data[state.state] as sd}
                      <div class="row">
                        <div class="col-4 m-2 text-center">{sd.district}</div>
                        <div class="col-4 m-2 text-center">{sd.confirmed}</div>
                      </div>
                    {/each}
                  {/if}
                </div>
              </td>
            </tr>
          {/each}
          </tbody>
        </table>
      </div>

    </div>
    {#if global_update_date}
      <div class="col-md-6 mt-3">
        <h2 class="h2 text-center mb-3">Top countries</h2>
        <table class="table">
          <thead class="black white-text">
          <tr>
            <th scope="col">Country</th>
            <th scope="col">Confirmed</th>
            <th scope="col">Active</th>
            <th scope="col">Recovered</th>
            <th scope="col">Deaths</th>
          </tr>
          </thead>
          <tbody>
          {#each countries as c}
            <tr>
              <th scope="row">{c.Country}</th>
              <td>{c.TotalConfirmed}</td>
              <td>{c.TotalConfirmed - c.TotalRecovered}</td>
              <td>{c.TotalRecovered}</td>
              <td>{c.TotalDeaths}</td>
            </tr>
          {/each}
          </tbody>
        </table>
      </div>
    {/if}
    <div class="col-md-12">
      <Chart/>
    </div>

  </div>
</div>
