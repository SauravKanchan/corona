<script>
  export let overview
  export let lastupdatedtime
  export let title
  let flag
  (async () => {
    flag = await window.api('https://pomber.github.io/covid19/countries.json')
    flag = flag.data
  })()
</script>
<style>
  .text-responsive {
    font-size: calc(40% + 1vw + 1vh);
  }
</style>
{#if overview}
  <div class="row">
    <div class="col-md-12">
      <div class="row mb-3">
        <div class="col-md-12">
          <h1 class="title h1 text-center">{#if flag}{#if flag[title]}{flag[title]["flag"]}{/if}{/if} {title}</h1>
          <h3 class="h6 text-muted text-center">{#if lastupdatedtime}
            Last Update at {lastupdatedtime}{:else} &nbsp; {/if}</h3>
        </div>
      </div>
    </div>
    {#each overview as o}
      <div class="col-md-3">
        <div
          class="text-center text-{ o.class }">
          <h2 class="h1 mb-0 text-responsive">{ o.number }</h2>
          <p class="h6 text-small">{#if o.delta}[+ {o.delta }]{/if}</p>
          <p><strong>{ o.title }</strong></p>
        </div>
      </div>
    {/each}
  </div>
{/if}
