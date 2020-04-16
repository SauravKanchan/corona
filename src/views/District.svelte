<script>
  import { afterUpdate, onMount } from 'svelte'

  function fix_table () {
    let width = window.$(window).width()

      if (width <= 500) {
        window.$('#districtTable').addClass('table-responsive')
        window.$('.dataTables_info').addClass('table-responsive')
      }else{
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

  })
  afterUpdate(() => {
    if (district.length) {

      window.$('#districtTable').DataTable({
        pageLength: 25,
        aaSorting: [[2, 'desc']]
      })
      window.$('.dataTables_length').addClass('bs-select')
      fix_table()
    }
  })


</script>
<div class="container-fluid mt-5">
  {#if district.length }
    <h2 class="text-center title h2">All {district.length} Districts</h2>
    <table id="districtTable" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
      <thead class="purple darken-2 white-text">
      <tr>
        <th class="th-sm">District
        </th>
        <th class="th-sm">State</th>
        <th class="th-sm">Confirmed
        </th>
      </tr>
      </thead>
      <tbody>
      {#each district as d}
        <tr>
          <td>{d.name}</td>
          <td>{d.state}</td>
          <td>{d.confirmed}</td>
        </tr>
      {/each}
      </tbody>
      <tfoot>
      <tr>
        <th class="th-sm">District
        </th>
        <th class="th-sm">State</th>

        <th class="th-sm">Confirmed
        </th>
      </tr>
      </tfoot>
    </table>
  {/if}
</div>
