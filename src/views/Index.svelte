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
<div class="container-fluid">
  <div class="row mt-5">
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-8">
          <h1 class="title h1">India COVID-19 Overview</h1>
        </div>
        <div class="col-md-4">
          <h3 class="h3 text-secondary">{total.lastupdatedtime} </h3>
        </div>
      </div>
    </div>
    {#each overview as o}
      <div class="col-md-3">
        <div class="text-center text-{ o.class }">
          <h2 class="h1 mb-0">{ o.number }</h2>
          <p><strong>{ o.title }</strong></p>
        </div>
      </div>
    {/each}
    <div class="col-md-8">
      <div class="table-responsive">
        <table class="table">
          <thead>
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

          {#each statewise as state}
          <tr class="accordion-toggle collapsed" id="accordion1" data-toggle="collapse" data-parent="#accordion1"
              href="#collapseOne">
            <td class="expand-button"></td>
            <td>{ state.state }</td>
            <td>{ state.confirmed }</td>
            <td>{ state.active }</td>
            <td>{ state.recovered }</td>
            <td>{ state.deaths }</td>
          </tr>
          <tr class="hide-table-padding">
            <td></td>
            <td colspan="5">
              <div id="collapseOne" class="collapse in p-3">
                <div class="row">
                  <div class="col-2">label</div>
                  <div class="col-6">value 1</div>
                </div>
                <div class="row">
                  <div class="col-2">label</div>
                  <div class="col-6">value 2</div>
                </div>
                <div class="row">
                  <div class="col-2">label</div>
                  <div class="col-6">value 3</div>
                </div>
                <div class="row">
                  <div class="col-2">label</div>
                  <div class="col-6">value 4</div>
                </div>
              </div>
            </td>
          </tr>
          {/each}

          </tbody>
        </table>
      </div>

    </div>
  </div>
</div>
<script>
  let overview = []
  const axios = require('axios')
  let total = { lastupdatedtime: '-' }
  let statewise = [];
  (async () => {
    let res = await axios.get('https://api.covid19india.org/data.json')
    total = res.data.statewise[0]
    statewise = res.data.statewise.slice(1)
    window.statewise = statewise
    overview = [
      {
        number: total.confirmed,
        title: 'Confirmed',
        class: 'danger'
      },
      {
        number: total.recovered,
        title: 'Recovered',
        class: 'success'
      },
      {
        number: total.active,
        title: 'Active',
        class: 'info'
      },
      {
        number: total.deaths,
        title: 'Deaths',
        class: 'warning'
      }
    ]
  })()
</script>
