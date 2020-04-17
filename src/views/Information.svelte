<script>
  let info_data = []
  let state
  let selected = 0
  let info_type
  let contacts = [];

  (async () => {
    info_data = await window.api('https://covid-fyi-backend-2.herokuapp.com/api/v1/covidfyi/info_types/')
    info_data = info_data.data
    info_type = info_data[0].info_type.name
  })()

  async function update_contact (e) {
    state = e.target.innerText
    let contacts_temp = []
    let res = await window.api(`https://covid-fyi-backend-2.herokuapp.com/api/v1/covidfyi/states/${state}/`)
    for (let district in res.data) {
      let district_data = res.data[district].entries
      for (let entry in district_data) {
        let temp_data = district_data[entry]
        temp_data.district = res.data[district].district
        contacts_temp.push(temp_data)
      }
    }
    contacts = contacts_temp.filter((d) => {
      return d.infotype == info_type
    })
    console.log(contacts)
    window.$('#basicExampleModal').modal('show')
  }

  function update_info_type (e) {
    info_type = e.target.innerText
  }

</script>
<style>
  .md-tabs {
    position: relative;
    z-index: 1;
    padding: .7rem;
    margin-right: 1rem;
    margin-bottom: -20px;
    margin-left: 1rem;
    background-color: #2bbbad;
    border: 0;
    border-radius: .25rem;
    -webkit-box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
  }

  .md-tabs .nav-link {
    color: #fff;
    border: 0;
    -webkit-transition: all .4s;
    transition: all .4s;
  }

  .md-tabs .nav-link.active, .md-tabs .nav-item.open .nav-link {
    color: #fff;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: .25rem;
    -webkit-transition: all 1s;
    transition: all 1s;
  }
</style>
<div class="container-fluid mt-5">
  <ul class="nav nav-tabs md-tabs justify-content-between" id="myTabMD" role="tablist">
    {#each info_data as info,i}
      <li class="nav-item">
        <a class:active={i === selected} class="nav-link" id="tab{i}" data-toggle="tab" href="#data{i}" role="tab"
        aria-controls="data{i}" aria-selected="true" on:click={update_info_type}> {info.info_type.name}</a>
      </li>
    {/each}
  </ul>
<div class="tab-content card pt-5 pb-5" id="myTabContentMD">
  {#each info_data as info,i}
    <div class="tab-pane container" class:active={i
    === selected} id="data{i}" role="tabpanel" aria-labelledby="tab{i}">
    <div class="row">
      {#each info.states as states}
        <div class="col-md-4">
          <div class="card p-5 w-100 mb-3 light-green lighten-2 text-center" on:click={update_contact}>{states}</div>
        </div>
      {/each}
    </div>
  </div>
  {/each}
</div>
</div>

{#if state}
  <div class="modal fade" id="basicExampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{state} {info_type}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            {#each contacts as con}
              <div class="col-md-6">
                <div class="card" style="width: 18rem;">
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                      card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
{/if}
