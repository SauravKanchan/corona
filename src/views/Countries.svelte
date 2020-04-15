<h2 class="h2 text-center mb-3">Countries</h2>
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
      <th scope="row">{c.Country}</th>
      <td>{c.TotalConfirmed}</td>
      <td>{c.TotalConfirmed - c.TotalRecovered}</td>
      <td>{c.TotalRecovered}</td>
      <td>{c.TotalDeaths}</td>
    </tr>
  {/each}
  </tbody>
</table>
