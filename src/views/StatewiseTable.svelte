<script>
  export let statewise
  export let state_data
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
<h2 class="h2 text-center">State and District Wise</h2>
<div class="table-responsive">
  <table class="table mt-5" id="stateTable">
    <thead class="purple darken-4 white-text">
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
      <tr class="accordion-toggle collapsed" id="accordion{i}" data-toggle="collapse"
          data-parent="#accordion{i}"
          href="#collapse{i}" aria-expanded="false">
        <td class="expand-button"></td>
        <td>{ state.state }</td>
        <td>{ state.confirmed } {#if state.deltaconfirmed!=0}
          <span class="text-danger"> +{state.deltaconfirmed}</span>{/if}</td>
        <td>{ state.active }</td>
        <td>{ state.recovered } {#if state.deltarecovered!=0}
          <span class="text-success"> +{state.deltarecovered}</span>{/if}</td>
        <td>{ state.deaths } {#if state.deltadeaths!=0}
          <span class="text-warning"> +{state.deltadeaths}</span>{/if}</td>
      </tr>
      <tr class="hide-table-padding">
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
