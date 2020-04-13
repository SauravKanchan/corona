<script>
  const Chart = require('chart.js')
  import { onMount } from 'svelte'

  const axios = require('axios')
  let status = 'Confirmed'
  const stateCodes = {
    AP: 'Andhra Pradesh',
    AR: 'Arunachal Pradesh',
    AS: 'Assam',
    BR: 'Bihar',
    CT: 'Chhattisgarh',
    GA: 'Goa',
    GJ: 'Gujarat',
    HR: 'Haryana',
    HP: 'Himachal Pradesh',
    JH: 'Jharkhand',
    KA: 'Karnataka',
    KL: 'Kerala',
    MP: 'Madhya Pradesh',
    MH: 'Maharashtra',
    MN: 'Manipur',
    ML: 'Meghalaya',
    MZ: 'Mizoram',
    NL: 'Nagaland',
    OR: 'Odisha',
    PB: 'Punjab',
    RJ: 'Rajasthan',
    SK: 'Sikkim',
    TN: 'Tamil Nadu',
    TG: 'Telangana',
    TR: 'Tripura',
    UT: 'Uttarakhand',
    UP: 'Uttar Pradesh',
    WB: 'West Bengal',
    AN: 'Andaman and Nicobar Islands',
    CH: 'Chandigarh',
    DN: 'Dadra and Nagar Haveli',
    DD: 'Daman and Diu',
    DL: 'Delhi',
    JK: 'Jammu and Kashmir',
    LA: 'Ladakh',
    LD: 'Lakshadweep',
    PY: 'Puducherry',
  }

  let whitelisted_states = ['mh', 'dl', 'kl', 'tn', 'rj']
  let state_daily
  let remaining_states = []
  let colors = {}

  let uinque_colors = ['#E52B50', '#FFBF00', '#9966CC', '#FBCEB1', '#7FFFD4', '#007FFF', '#89CFF0', '#F5F5DC', '#000000', '#0000FF', '#0095B6', '#8A2BE2', '#DE5D83', '#CD7F32', '#964B00', '#800020', '#702963', '#960018', '#DE3163', '#007BA7', '#F7E7CE', '#7FFF00', '#7B3F00', '#0047AB', '#6F4E37', '#B87333', '#FF7F50', '#DC143C', '#00FFFF', '#EDC9Af', '#7DF9FF', '#50C878', '#00FF3F', '#FFD700']

  let c = 0
  for (let s in stateCodes) {
    colors[s.toLowerCase()] = uinque_colors[c]
    c++
  }

  // colors

  function update_remaing_states () {
    for (let s in stateCodes) {
      if (!whitelisted_states.includes(s)) {
        remaining_states.push(s.toLowerCase())
      }
    }
    remaining_states = remaining_states
  }

  update_remaing_states()

  let addNew

  function update_graph (res, whitelisted_states) {
    let datasets_temp = {
      'an': '0',
      'ap': '1',
      'ar': '0',
      'as': '0',
      'br': '0',
      'ch': '0',
      'ct': '0',
      'dd': '0',
      'dl': '7',
      'dn': '0',
      'ga': '0',
      'gj': '0',
      'hp': '0',
      'hr': '14',
      'jh': '0',
      'jk': '0',
      'ka': '6',
      'kl': '19',
      'la': '0',
      'ld': '0',
      'mh': '14',
      'ml': '0',
      'mn': '0',
      'mp': '0',
      'mz': '0',
      'nl': '0',
      'or': '0',
      'pb': '1',
      'py': '0',
      'rj': '3',
      'sk': '0',
      'tg': '1',
      'tn': '1',
      'tr': '0',
      'tt': '79',
      'up': '12',
      'ut': '0',
      'wb': '0'
    }
    let datasets = []

    for (let s in datasets_temp) {
      if (whitelisted_states.includes(s)) {
        datasets.push({
          label: s,
          fill: false,
          borderColor: colors[s],
          data: [0],
        })
      }
    }
    let labels = ['']
    let cases = res.data.states_daily.filter((d) => d.status === status)
    cases = cases.splice(0, 30)
    for (let day in cases) {
      labels.push(cases[day].date)
      for (let states in cases[day]) {
        if (states !== 'date' && states !== 'status') {
          if (whitelisted_states.includes(states)) {
            for (let s in datasets) {
              if (datasets[s].label === states) {
                datasets[s].data.push(datasets[s].data[datasets[s].data.length - 1] + parseInt(cases[day][states]))
              }
            }
          }
        }
      }
    }

    for (let d in datasets) {
      datasets[d].label = stateCodes[datasets[d].label.toUpperCase()]
    }
    let ctx = document.getElementById('myChart').getContext('2d')
    let chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: datasets,
        labels: labels
      },

      // Configuration options go here
      options: {
        title: {
          display: true,
          text: 'Statewise Total no. of COVID-19 cases in India',
          fontSize: 30
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'No. of cases'
            }
          }],
        }

      }
    })
  }

  onMount(async () => {
    state_daily = await axios('https://api.covid19india.org/states_daily.json')
    update_graph(state_daily, whitelisted_states)
  })

  function addState () {
    whitelisted_states.push(addNew)
    update_remaing_states()
    update_graph(state_daily, whitelisted_states)
  }

</script>
<div class="row mt-5">
  <canvas id="myChart" class="w-100 col-md-8" height="500"></canvas>
  <div class="col-md-4">
    <select class="browser-default custom-select" bind:value={addNew}>
      <option value="0" selected>Add states here</option>
      {#each  remaining_states as state}
        <option value="{state}">{ stateCodes[state.toUpperCase()] }</option>
      {/each}
    </select>
    <div class="row mt-2">
      <div class="col text-center">
        <button class="btn btn-primary" on:click={addState}>Submit</button>
      </div>
    </div>
  </div>
</div>
