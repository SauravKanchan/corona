<script>
  import router, { page } from './router'
  import axios from 'axios'
  import { setupCache } from 'axios-cache-adapter'
  router.start()


  const cache = setupCache({
    maxAge: 15 * 60 * 1000
  })

  window.api = axios.create({
    adapter: cache.adapter
  })

</script>
<nav class="navbar navbar-expand-lg navbar-dark purple darken-3">
  <a class="navbar-brand" href="/">COVID-19</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/district">District</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/news">News</a>
      </li>
    </ul>
  </div>
</nav>
<svelte:component this={$page.component} {...$page.props} />
