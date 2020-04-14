<script>
  let news;
  (async () => {
    let res = await api.get('https://raw.githubusercontent.com/atapas/covid-19/3b03d46985af80d2d458ff5031ddae23b2beccd0/src/js/utils/top-headlines.json')
    news = res.data.articles
    console.log(news[0])
  })()
</script>

<div class="container-fluid mt-5">
  {#if news}
  <div class="row">
    {#each news as n}
      <div class="col-md-3">
        <div class="card card-cascade">

          <!-- Card image -->
          <div class="view view-cascade overlay">
            <img class="card-img-top" src="{n.urlToImage}" alt="Card image cap">
            <a>
              <div class="mask rgba-white-slight"></div>
            </a>
          </div>

          <!-- Card content -->
          <div class="card-body card-body-cascade text-center">

            <!-- Title -->
            <h4 class="card-title"><strong>{n.title}</strong></h4>
            <!-- Subtitle -->
            {#if n.author}<h6 class="font-weight-bold indigo-text py-2">{n.author}</h6>{/if}
            <!-- Text -->
            <p class="card-text">{n.description}</p>

            <a class="btn btn-unique" href="{n.url}" target="_blank">Read More</a>

          </div>

        </div>
      </div>
    {/each}
  </div>

  {:else}
    <h1 class="h1 title center">News not loaded</h1>
  {/if}
</div>
