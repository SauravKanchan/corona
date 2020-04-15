<script>
  import { afterUpdate, onMount } from 'svelte'

  let countries = []
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
      window.$('#countries').DataTable({
        pageLength: 35,
        aaSorting: [[1, 'desc']]
      })
      window.$('.dataTables_length').addClass('bs-select')
    }
  })

</script>
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
        <tr>
          <th scope="row">{c.country}</th>
          <td>{c.confirmed}</td>
          <td>{c.active}</td>
          <td>{c.recovered}</td>
          <td>{c.deaths   }</td>
        </tr>
      {/each}
      </tbody>
    </table>
  {/if}
</div>
