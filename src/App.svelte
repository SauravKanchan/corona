<script>
  import router, { page } from './router'
  import axios from 'axios'
  import { setupCache } from 'axios-cache-adapter'
  let title = ""
  router.start()


  const cache = setupCache({
    maxAge: 15 * 60 * 1000
  })

  window.api = axios.create({
    adapter: cache.adapter
  })

  function toggle(){
    window.$('#sidebar').toggleClass('activeSideBar');
    window.$("#sidebarCollapse").toggleClass('activeSideBar');
  }
</script>

<div class="wrapper">
  <!-- Sidebar Holder -->
  <nav id="sidebar">
    <div class="sidebar-header">
      <h3>COVID-19</h3>
    </div>

    <ul class="list-unstyled components">
      <li>
        <a class="link" href="/">Home <span class="sr-only">(current)</span></a>
      </li>
      <li>
        <a class="link" href="/countries">Countries</a>
      </li>
      <li>
        <a class="link" href="/district">District</a>
      </li>
      <li>
        <a class="link" href="/news">News</a>
      </li>
      <li>
        <a class="link" href="/information">Information</a>
      </li>
      <li>
        <a class="link" href="/faq" >FAQ</a>
      </li>
      <li>
        <div class="p-2">National Helpline Number:</div>
        <a class="link" href="tel:+911123978046">+91-11-23978046</a>
      </li>
    </ul>
    <ul class="list-unstyled CTAs">
      <li>
        <a href="https://github.com/SauravKanchan/corona" target="_blank" class="download"><i class="fab fa-github"></i> Github</a>
      </li>
    </ul>
  </nav>

  <!-- Page Content Holder -->
  <div id="content">

    <nav class="navbar cyan darken-1">
            <button type="button" id="sidebarCollapse" class="navbar-btn" on:click={toggle} style="position: fixed; z-index: 99">
              <span></span>
              <span></span>
              <span></span>
            </button>
        <h1 class="h1 title text-white text-center ml-auto mr-auto">{title}</h1>
    </nav>

    <svelte:component this={$page.component} {...$page.props} bind:title />
    <footer class="page-footer font-small mdb-color lighten-2 mt-5">
      <div class="text-center py-3">Made with <i class="fas fa-heart"></i> by
        <a href="https://saurav.tech/" target="_blank">Saurav Kanchan</a>, <a href="https://www.linkedin.com/in/akhil-kedare" target="_blank">Akhil Kedare</a> & <a href="https://www.linkedin.com/in/nikita-chorghe" target="_blank">Nikita Chorghe</a>
      </div>
    </footer>

  </div>
</div>

