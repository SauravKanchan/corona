import { writable } from 'svelte/store'
import router from 'page'

export const page = writable({
  component: null,
  props: {}
})

router('/', () =>
  import(/* webpackChunkName: "index" */ './views/Index.svelte').then(module =>
    page.set({ component: module.default })
  )
)

router('/district', () =>
  import(/* webpackChunkName: "index" */ './views/District.svelte').then(module =>
    page.set({ component: module.default })
  )
)

router('/news', () =>
  import(/* webpackChunkName: "index" */ './views/News.svelte').then(module =>
    page.set({ component: module.default })
  )
)

router('/information', () =>
  import(/* webpackChunkName: "index" */ './views/Information.svelte').then(module =>
    page.set({ component: module.default })
  )
)

export default router
