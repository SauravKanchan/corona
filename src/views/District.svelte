<style>
  table.dataTable thead .sorting:after,
  table.dataTable thead .sorting:before,
  table.dataTable thead .sorting_asc:after,
  table.dataTable thead .sorting_asc:before,
  table.dataTable thead .sorting_asc_disabled:after,
  table.dataTable thead .sorting_asc_disabled:before,
  table.dataTable thead .sorting_desc:after,
  table.dataTable thead .sorting_desc:before,
  table.dataTable thead .sorting_desc_disabled:after,
  table.dataTable thead .sorting_desc_disabled:before {
    bottom: .5em;
  }
</style>
<script>
  import { afterUpdate, onMount } from 'svelte'

  let district = []
  onMount(async () => {
    let state_res = await window.api.get('https://api.covid19india.org/state_district_wise.json')
    let data = state_res.data
    for (let s in data) {
      for (let d in data[s].districtData) {
        let json = data[s].districtData[d]
        json.name = d
        district.push(json)
      }
    }

    district = district

  })
  afterUpdate(() => {
    if (district.length) {
      console.log(district.length)
      window.$('#dtBasicExample').DataTable()
      window.$('.dataTables_length').addClass('bs-select')
    }
  })

</script>
<div class="container-fluid mt-5">
  {#if district.length }
    <h2 class="text-center title h2">All {district.length} Districts</h2>
    <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
      <thead>
      <tr>
        <th class="th-sm">District
        </th>
        <th class="th-sm">Confirmed
        </th>
      </tr>
      </thead>
      <tbody>
      {#each district as d}
        <tr>
          <td>{d.name}</td>
          <td>{d.confirmed}</td>
        </tr>
      {/each}
      </tbody>
      <tfoot>
      <tr>
        <th class="th-sm">District
        </th>
        <th class="th-sm">Confirmed
        </th>
      </tr>
      </tfoot>
    </table>
  {/if}
</div>
