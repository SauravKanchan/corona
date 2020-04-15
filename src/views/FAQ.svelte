<style>
  .md-accordion .card .card-body {
    font-size: .9rem;
    font-weight: 300;
    line-height: 1.7;
    color: #626262;
  }

  .md-accordion .card .card-header a:not(.collapsed) .rotate-icon {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .md-accordion .card .fa-angle-down {
    float: right;
  }

  .md-accordion .card .card-header a:not(.collapsed) .rotate-icon {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
</style>
<script>
  let faq = [{
    ques: 'Are you official?',
    answer: 'No'
  }, {
    ques: 'What are your sources? How is the data gathered for this project ?',
    answer: 'The data is validated by a group of volunteers and published into a Google sheet and an API. API is available for all at api.covid19india.org'
  },{
    ques: "Why does covid19india.org have more positive count than MoH?",
    answer: "MoHFW updates the data at a scheduled time. However, API source updates them based on state press bulletins, official (CM, Health M) handles, PBI, Press Trust of India, ANI reports. These are generally more recent."
  }]
</script>
<div class="container-fluid mt-5">
  <h1 class="title h1 text-center">FAQ</h1>
  <div class="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true">
    {#each faq as f,i}
    <!-- Accordion card -->
      <div class="card">

        <!-- Card header -->
        <div class="card-header" role="tab" id="headingThree{i}">
          <a class="collapsed" data-toggle="collapse" data-parent="#accordionEx" href="#collapseThree{i}"
             aria-expanded="false" aria-controls="collapseThree{i}">
            <h5 class="mb-0">
              #{i+1} {f.ques} <i class="fas fa-angle-down rotate-icon"></i>
            </h5>
          </a>
        </div>

        <!-- Card body -->
        <div id="collapseThree{i}" class="collapse" role="tabpanel" aria-labelledby="headingThree{i}"
             data-parent="#accordionEx">
          <div class="card-body">
            {f.answer}
          </div>
        </div>

      </div>
      <!-- Accordion card -->
    {/each}
  </div>
</div>
