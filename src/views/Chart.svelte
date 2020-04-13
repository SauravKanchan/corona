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

  onMount(async () => {
    let res = await axios('https://api.covid19india.org/states_daily.json')
    let datasets_temp = {
      "an": "0",
      "ap": "1",
      "ar": "0",
      "as": "0",
      "br": "0",
      "ch": "0",
      "ct": "0",
      "dd": "0",
      "dl": "7",
      "dn": "0",
      "ga": "0",
      "gj": "0",
      "hp": "0",
      "hr": "14",
      "jh": "0",
      "jk": "0",
      "ka": "6",
      "kl": "19",
      "la": "0",
      "ld": "0",
      "mh": "14",
      "ml": "0",
      "mn": "0",
      "mp": "0",
      "mz": "0",
      "nl": "0",
      "or": "0",
      "pb": "1",
      "py": "0",
      "rj": "3",
      "sk": "0",
      "tg": "1",
      "tn": "1",
      "tr": "0",
      "tt": "79",
      "up": "12",
      "ut": "0",
      "wb": "0"
    }
    let datasets = []
    function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    for(let s in datasets_temp){
      datasets.push({
        label:s,
        fill: false,
        borderColor: getRandomColor(),
        data: [0],
        hidden: !whitelisted_states.includes(s)
      })
    }
    let labels = ['']
    let cases = res.data.states_daily.filter((d) => d.status === status)
    for (let day in cases) {
      labels.push(cases[day].date)
      for (let states in cases[day]) {
        if (states !== 'date' && states !== 'status') {
          for(let s in datasets){
            if(datasets[s].label === states){
              // console.log("asdf",datasets[s].data, cases[day])
              datasets[s].data.push(datasets[s].data[datasets[s].data.length -1]+parseInt(cases[day][states]))
              continue;
            }
          }
        }
      }
    }

    let ctx = document.getElementById('myChart').getContext('2d')
    console.log(datasets)
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
          text: 'Total no. of COVID-19 cases in world'
        },

        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'No. of cases'
            }
          }]
        }

      }
    })
  })

</script>
<canvas id="myChart" class="w-100" height="500"></canvas>
