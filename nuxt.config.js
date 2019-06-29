export default {
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - My Pet Adoption',
    meta: [
      { hid: 'charset', charset: 'utf-8' },
      {
        hid: 'viewport',
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      { name: 'og:type', hid: 'og:type', content: 'website' },
      { name: 'og:locale', hid: 'og:locale', content: 'en_US' },
      { name: 'og:site_name', hid: 'og:site_name', content: 'My Pet Adoption' },
      {
        name: 'og:image',
        hid: 'og:image',
        content: 'https://pensive-fermat-55a1e3.netlify.com/ogmediablack.png'
      },
      {
        name: 'twitter:card',
        hid: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Pet adoption and resource website.'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/style.styl'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/persistedState.js', mode: 'client' },
    '~/plugins/mpaMeta.js',
    '~/plugins/mpaSchema.js'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/feed',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-140812554-1'
      }
    ],
    '@nuxtjs/moment',
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    '@nuxtjs/vuetify',
    [
      'prismic-nuxt',
      {
        endpoint: 'https://andrewzigler.cdn.prismic.io/api/v2', // FIX
        deferLoad: true,
        linkResolver: function(doc) {
          if (doc.isBroken) {
            return '/404'
          }
        }
      }
    ],
    'nuxt-basic-auth-module'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    optimization: {
      splitChunks: {
        maxSize: 244000
      }
    },
    transpile: ['@andrewzigler/head-helper']
  },

  generate: {
    fallback: true,
    routes: () => {
      return ['/']
    }
  },

  feed: [
    {
      path: '/atom.xml',
      link: 'https://www.mypetadoption.com',
      create(feed) {
        feed.options = {
          title: 'My Pet Adoption',
          link: 'https://www.mypetadoption.com/atom.xml',
          description: 'Pet adoption and resource website.'
        }
      },
      cacheTime: 1000 * 60 * 15,
      type: 'atom1'
    }
  ],

  vuetify: {
    treeShake: true
    /*
    theme: {
      primary: '#B29ED9',
      secondary: '#C7B3BD',
      accent: '#FFF4F4'
    }
    */
  },

  manifest: {
    name: 'My Pet Adoption',
    short_name: 'MPA',
    start_url: '/',
    /* background_color: '#CEB9F6',
    theme_color: '#B29ED9', */
    orientation: 'any',
    lang: 'en-US',
    description: 'Pet adoption and resource website.'
  },

  icon: {
    iconFileName: 'symbol512black.png'
  },

  sitemap: {
    gzip: true,
    cacheTime: 1000 * 60 * 15,
    hostname: 'https://www.mypetadoption.com',
    filter({ routes }) {
      return routes.filter(function(route) {
        if (
          !route.url.endsWith('/') &&
          route.url.length > 1 &&
          route.url !== '/khnum'
        ) {
          return (route.url = `${route.url}/`)
        } else if (route.url !== '/khnum') {
          return route
        }
      })
    }
  },

  basic: {
    name: 'thedogdays',
    pass: 'areover!',
    match: function(req) {
      if (req.url === '/khnum') {
        return true
      }
    }
  }
}
