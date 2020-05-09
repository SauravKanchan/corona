<script>
  import Overview from './Overview.svelte'

  export let name

  let state_data = []
  let zones = {}
  let state_res
  let lastUpdateTime

  let overview = []

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
    let res_state = await window.api.get('https://api.covid19india.org/data.json')
    let statewise = res_state.data.statewise.filter(d => d.state === name)[0]
    lastUpdateTime = statewise.lastupdatedtime
    overview = [
      {
        number: statewise.confirmed,
        title: 'Confirmed',
        class: 'danger',
        delta: statewise.deltaconfirmed
      },
      {
        number: statewise.recovered,
        title: 'Recovered',
        class: 'success',
        delta: statewise.deltarecovered
      },
      {
        number: statewise.active,
        title: 'Active',
        class: 'info',
        delta: 0
      },
      {
        number: statewise.deaths,
        title: 'Deaths',
        class: 'warning',
        delta: statewise.deltadeaths
      }
    ]
    try {
      state_res = await window.api.get('https://api.covid19india.org/state_district_wise.json')
    } catch (e) {
      state_res = await window.api.get('https://cors-anywhere.herokuapp.com/https://api.covid19india.org/state_district_wise.json')
    }
    let state_raw_data = state_res.data[name]
    for (let district in state_raw_data.districtData) {
      let dist = state_raw_data.districtData[district]
      dist.district = district
      state_data.push(state_raw_data.districtData[district])
    }
    state_data = state_data.sort(sortByProperty('confirmed'))
    let res = await window.api('https://api.covid19india.org/zones.json')
    let data = res.data.zones
    data.map(d => {
      zones[d.district] = d.zone === 'Red' ? 'red' : d.zone === 'Green' ? 'green' : 'orange'
    })
    state_data = state_data
  })()


</script>
<div class="container-fluid mt-5">
  <Overview title={name} overview={overview} lastupdatedtime={lastUpdateTime} />
  <div col="row">
    <div class="col">
      <table class="table table-striped table-responsive">
        <thead class="mdb-color darken-3 white-text">
        <tr>
          <th scope="col">District</th>
          <th scope="col">Confirmed</th>
          <th scope="col">Active</th>
          <th scope="col">Recovered</th>
          <th scope="col">Deaths</th>
          <th scope="col">Zone</th>
        </tr>
        </thead>
        <tbody>
        {#each state_data as district}
          <tr>
            <th>{district.district}</th>
            <td>{district.confirmed}{#if district.delta.confirmed}
              <b class="text-danger"> [+{district.delta.confirmed}]</b>{/if}</td>
            <td>{district.active}</td>
            <td>{district.recovered}{#if district.delta.recovered}
              <b class="text-success"> [+{district.delta.recovered}]</b>{/if}</td>
            <td>{district.deceased}{#if district.delta.deceased}
              <b class="text-warning"> [+{district.delta.deceased}]</b>{/if}</td>
            <td class="{zones[district.district]} text-white text-center h5">{zones[district.district]}</td>
          </tr>
        {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
