<script>
  import { afterUpdate, onMount } from 'svelte'
  let selected_country
  let countries = []

  function fix_table () {
    let width = window.$(window).width()

    if (width <= 500) {
      window.$('#countries').addClass('table-responsive')
    }else{
      window.$('#countries').removeClass('table-responsive')
    }
  }
  window.$(window).resize(fix_table)
  setTimeout(fix_table,1)


  onMount(async () => {
    let global = await window.api('https://pomber.github.io/covid19/timeseries.json')
    let data = global.data
    for (let country in data) {
      let temp_data = {}
      temp_data.country = country
      temp_data.confirmed = data[country][data[country].length - 1].confirmed
      temp_data.recovered = data[country][data[country].length - 1].recovered
      temp_data.deaths = data[country][data[country].length - 1].deaths
      temp_data.active = temp_data.confirmed - temp_data.recovered - temp_data.deaths
      countries.push(temp_data)
    }
    countries = countries

  })

  afterUpdate(() => {
    if (countries.length !== 0) {
      if ( ! window.$.fn.DataTable.isDataTable( '#countries' ) ) {
        window.$('#countries').DataTable({
          pageLength: 50,
          aaSorting: [[1, 'desc']]
        })
        window.$('.dataTables_length').addClass('bs-select')
      }
    }
  })

  function country_link (e) {
    let link = document.getElementById('cl')
    link.href = "/country/"+e.target.getAttribute('country')
    link.click()
  }

</script>
<a href={selected_country} class="d-none" id="cl"></a>
<div class="container-fluid">
  {#if countries !== 0}
    <h2 class="h2 text-center mt-5 mb-3">Countries</h2>
    <table class="table" id="countries">
      <thead class="purple darken-4 white-text">
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
        <tr on:click={country_link} >
          <th country={c.country} scope="row">{c.country}</th>
          <td country={c.country}>{c.confirmed}</td>
          <td country={c.country}>{c.active}</td>
          <td country={c.country}>{c.recovered}</td>
          <td country={c.country}>{c.deaths }</td>
        </tr>
      {/each}
      </tbody>
    </table>
  {/if}
</div>
