<script>
  let info_data = []
  let state
  let selected = 0
  let info_type
  let contacts = []
  let title = 'What are you looking for?'
  let area1 = []
  let step = 1
  let info_type_index
  let loader = true;

  (async () => {
    info_data = await window.api('https://covid-fyi-backend-2.herokuapp.com/api/v1/covidfyi/info_types/')
    info_data = info_data.data
    info_type = info_data[0].info_type.name
	update_data()
  })()

  function update_data (e) {
    switch (step) {
      case 1: {
        area1 = []
        for (let i in info_data) {
          area1.push(info_data[i].info_type.name)
        }
        area1 = area1
        title = 'What are you looking for?'
        contacts = []
        step = 2
    	loader=false
        break
      }
      case 2: {
        if (e) {
          info_type_index = e.target.getAttribute('data')
        }
        area1 = info_data[info_type_index].states
		contacts=[]
        info_type = info_data[info_type_index].info_type.name
        title = `${info_type}: Select your state`
        step = 3
        break
      }
      case 3: {
        (async () => {
          if (e) {
            state = e.target.getAttribute('value')
          }
          let contacts_temp = []
          area1 = []
          contacts = []
          loader = true
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
          title = `${info_type}: Contacts`
          step = 4
          loader = false
        })()
      }
    }
  }

  function previous () {
    step -= 2
	console.log(step)
    update_data()
  }

</script>
<div class="container-fluid mt-5">
  <div class="row">
    <div class="col-md-10">
      <h1 class="h1 title">{title}</h1>
    </div>
    <div class="col-md-2">
      <button class="btn btn-primary w-100" disabled='{step!==4 && step!==3}' on:click={previous}><i
        class="fas fa-arrow-left"></i> Previous
      </button>
    </div>
  </div>
  <div class="row mt-3" id="area1">
    {#each area1 as ele, i}
      <div class="col-md-3">
        <div class="card p-4 w-100 mb-3 cyan lighten-1 text-center font-weight-bold" data={i} value={ele}
             on:click={update_data}>{ele}</div>
      </div>
    {/each}
  </div>
  <div class="row" id="area2">
    {#each contacts as ele, i}
      <div class="col-sm-3 mb-5">
        <div class="card" style="width: 18rem;">
          <div class="card-body justify-content-center">
            <h5 class="card-title">{ele.name}</h5>
            <h6 class="card-subtitle mb-2">Source: {ele.source}</h6>
            <h6 class="card-subtitle mb-2">District: {ele.district}</h6>
            {#if ele.email_id_1}
              <h6 class="card-subtitle mb-2"><i class="far fa-envelope"></i> E-mail: <a href="mailto:{ele.email_id_1}"
                                                                                        target="_top">{ele.email_id_1}</a>
              </h6>{/if}
            {#if ele.phone_1}
              <h6 class="card-subtitle mb-2"><i class="fas fa-phone"></i> Phone: <a href="tel:{ele.phone_1}"
                                                                                    target="_top">{ele.phone_1}</a>
              </h6>{/if}
            <a href="{ele.source_link}" target="_blank" class="card-link">Source Link {#if ele.source}
              ({ele.source}){/if}</a>
          </div>
        </div>
      </div>
    {/each}
  </div>
  {#if loader}
    <div class="d-flex justify-content-center">
      <div class="spinner-border text-secondary" role="status" style="width: 5rem; height: 5rem;">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  {/if}
</div>
