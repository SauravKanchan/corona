<script>
  import { afterUpdate, onMount } from 'svelte'

  export let title
  let linkDom

  function nav (state) {
    linkDom.href = `/state/${state}`
    linkDom.click()
  }

  function fix_table () {
    let width = window.$(window).width()

    if (width <= 500) {
      window.$('#districtTable').addClass('table-responsive')
      window.$('.dataTables_info').addClass('table-responsive')
    } else {
      window.$('#districtTable').removeClass('table-responsive')
      window.$('.dataTables_info').removeClass('table-responsive')
    }
  }

  window.$(window).resize(fix_table)

  let district = []
  onMount(async () => {
    let state_res = await window.api.get('https://api.covid19india.org/state_district_wise.json')
    let data = state_res.data
    for (let s in data) {
      for (let d in data[s].districtData) {
        let json = data[s].districtData[d]
        json.name = d
        json.state = s
        district.push(json)
      }
    }

    district = district
    fix_table()
    title = `All ${district.length} District`

  })
  afterUpdate(() => {
    if (district.length && !window.$.fn.DataTable.isDataTable('#countries')) {
      window.$('#districtTable').DataTable({
        pageLength: 25,
        aaSorting: [[2, 'desc']]
      })
      window.$('.dataTables_length').addClass('bs-select')
      fix_table()
      window.$.fn.dataTable.ext.errMode = 'none'
    }
  })


</script>
<a href="/state/" class="d-none" bind:this={linkDom}></a>
<div class="container-fluid mt-5">
  <h3 class="text-muted h4 text-center">Click on state/district to see more detail</h3>
  {#if district.length }
    <table id="districtTable" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
      <thead class="mdb-color darken-3 white-text">
      <tr>
        <th class="th-sm">District</th>
        <th class="th-sm">State</th>
        <th class="th-sm">Confirmed</th>
        <th class="th-sm">Active</th>
        <th class="th-sm">Recovered</th>
        <th class="th-sm">Deaths</th>
      </tr>
      </thead>
      <tbody>
      {#each district as d}
        <tr on:click={()=> nav(d.state)}>
          <td>{d.name}</td>
          <td>{d.state}</td>
          <td>{d.confirmed}</td>
          <td>{d.active}</td>
          <td>{d.recovered}</td>
          <td>{d.deceased}</td>
        </tr>
      {/each}
      </tbody>
      <tfoot>
      <tr>
        <th class="th-sm">District</th>
        <th class="th-sm">State</th>
        <th class="th-sm">Confirmed</th>
        <th class="th-sm">Active</th>
        <th class="th-sm">Recovered</th>
        <th class="th-sm">Deaths</th>
      </tr>
      </tfoot>
    </table>
  {/if}
</div>
