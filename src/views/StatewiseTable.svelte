<script>
  export let statewise

  let linkDom;
  function nav (state) {
    linkDom.href = `/state/${state}`
    linkDom.click()
  }

</script>
<a href="/state/" class="d-none" bind:this={linkDom}></a>
<h2 class="h2 text-center">State and District Wise</h2>
<h5 class="h5 text-center text-muted">Click on state to see in detail</h5>
<div class="table-responsive">
  <table class="table">
    <thead class="mdb-color darken-3 white-text">
    <tr>
      <th scope="col">State</th>
      <th scope="col">Confirmed</th>
      <th scope="col">Active</th>
      <th scope="col">Recovered</th>
      <th scope="col">Deaths</th>
    </tr>
    </thead>
    <tbody>
    {#each statewise as state, i}
      <tr on:click={()=> nav(state.state)}>
        <td><a href="/state/{state.state}">{ state.state }</a></td>
        <td>{ state.confirmed } {#if state.deltaconfirmed!=0}
          <span class="text-danger"> +{state.deltaconfirmed}</span>{/if}</td>
        <td>{ state.active }</td>
        <td>{ state.recovered } {#if state.deltarecovered!=0}
          <span class="text-success"> +{state.deltarecovered}</span>{/if}</td>
        <td>{ state.deaths } {#if state.deltadeaths!=0}
          <span class="text-warning"> +{state.deltadeaths}</span>{/if}</td>
      </tr>
    {/each}
    </tbody>
  </table>
</div>
