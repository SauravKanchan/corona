<style>
  body{
    overflow-x: hidden;
    overflow-y: hidden;
  }
</style>
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
<nav class="navbar navbar-expand-lg navbar-dark purple darken-4">
  <a class="navbar-brand" href="/">COVID-19</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a href="/countries" class="nav-link">Countries</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/district">District</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/news">News</a>
      </li>
      <li class="nav-item">
        <a href="/information" class="nav-link">Information</a>
      </li>
      <li class="nav-item">
        <a href="/faq" class="nav-link">FAQ</a>
      </li>
      <li class="nav-item">
        <a href="https://github.com/SauravKanchan/corona" target="_blank" class="nav-link"><i class="fab fa-github"></i></a>
      </li>
    </ul>
  </div>
</nav>
<svelte:component this={$page.component} {...$page.props} />
<footer class="page-footer font-small indigo mt-5">
<div class="text-center py-3">Made with <i class="fas fa-heart"></i> by
  <a href="https://saurav.tech/">Saurav Kanchan</a>, <a href="https://www.linkedin.com/in/akhil-kedare">Akhil Kedare</a> & <a href="https://www.linkedin.com/in/nikita-chorghe">Nikita Chorge</a>
  </div>
</footer>
