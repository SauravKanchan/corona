<script>
  import { afterUpdate, onMount } from 'svelte'
  let selected_country
  let countries = []
  let flag = []
  let oldNewMap = {
    "UK": "United Kingdom",
    "UAE": "United Arab Emirates",
    "Taiwan": "Taiwan*",
    "S. Korea": "Korea, South",
    "North Macedonia": "Macedonia",
    "Libyan Arab Jamahiriya": "Libya",
    "Côte d'Ivoire": "Cote d'Ivoire",
    "USA": "US"
  }

  function fix_table () {
    let width = window.$(window).width()

    if (width <= 500) {
      window.$('#countries').addClass('table-responsive')
      window.$('.dataTables_info').addClass('table-responsive')
    }else{
      window.$('#countries').removeClass('table-responsive')
      window.$('.dataTables_info').removeClass('table-responsive')
    }
  }
  window.$(window).resize(fix_table)


  onMount(async () => {
    flag = await window.api('https://pomber.github.io/covid19/countries.json')
    flag = flag.data
    let global = await window.api('https://corona.lmao.ninja/v2/countries')
    countries = global.data
    for(let count in countries){
      if(Object.keys(oldNewMap).includes(countries[count].country)){
        countries[count].country = oldNewMap[countries[count].country]
      }
    }
    countries = countries
  })

  afterUpdate(() => {
    if (countries.length !== 0) {
      if ( ! window.$.fn.DataTable.isDataTable( '#countries' ) ) {
        window.$('#countries').DataTable({
          pageLength: 50,
          aaSorting: [[2, 'desc']]
        })
        window.$('.dataTables_length').addClass('bs-select')
        fix_table()
      }
    }
  })

  function country_link (e) {
    let link = document.getElementById('cl')
    let count = e.target.getAttribute('country');
    link.href = "/country/"+count
    link.click()
  }

</script>
<a href={selected_country} class="d-none" id="cl"></a>
<div class="container-fluid">
  {#if countries !== 0}
    <h2 class="h2 text-center mt-5 mb-3">Countries</h2>
    <h4 class="h4 text-center text-muted">Click on country to see more detail</h4>
    <table class="table" id="countries">
      <thead class="purple darken-4 white-text">
      <tr>
        <th scope="col">Flag</th>
        <th scope="col">Country</th>
        <th scope="col">Confirmed</th>
        <th scope="col">New Cases</th>
        <th scope="col">Deaths</th>
        <th scope="col">New Deaths</th>
        <th scope="col">Active</th>
        <th scope="col">Recovered</th>
        <th scope="col">Cases/1M pop</th>
        <th scope="col">Deaths/1M pop</th>
        <th scope="col">Critical</th>
        <th scope="col">Tests</th>
        <th scope="col">Tests/1M pop</th>
      </tr>
      </thead>
      <tbody>
      {#each countries as c}
        <tr on:click={country_link} >
          <td country={c.country}>{#if flag[c.country]}{flag[c.country]["flag"]}{:else}<img country={c.country} class="img-thumbnail" width="25" height="25" src="{c.countryInfo.flag}">{/if}</td>
          <th country={c.country} scope="row">{c.country}</th>
          <td country={c.country}>{c.cases}</td>
          <td country={c.country} class="text-danger">{#if c.todayCases}+{c.todayCases}{/if}</td>
          <td country={c.country}>{c.deaths }</td>
          <td country={c.country} class="text-danger">{#if c.todayDeaths}+{c.todayDeaths }{/if}</td>
          <td country={c.country}>{c.active}</td>
          <td country={c.country}>{c.recovered}</td>
          <td country={c.country}>{c.casesPerOneMillion}</td>
          <td country={c.country}>{c.deathsPerOneMillion}</td>
          <td country={c.country}>{c.critical}</td>
          <td country={c.country}>{c.tests}</td>
          <td country={c.country}>{c.testsPerOneMillion}</td>
        </tr>
      {/each}
      </tbody>
    </table>
  {/if}
</div>
