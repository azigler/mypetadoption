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
    '@nuxtjs/auth',
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
    ]
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
      link: 'https://pensive-fermat-55a1e3.netlify.com',
      create(feed) {
        feed.options = {
          title: 'My Pet Adoption',
          link: 'https://pensive-fermat-55a1e3.netlify.com/atom.xml',
          description: 'Pet adoption and resource website.'
        }
      },
      cacheTime: 1000 * 60 * 15,
      type: 'atom1'
    }
  ],

  vuetify: {
    treeShake: true,
    theme: {
      primary: '#f7f5b1',
      secondary: '#7dc3e6',
      accent: '#0a7324'
    }
  },

  manifest: {
    name: 'My Pet Adoption',
    short_name: 'MPA',
    start_url: '/',
    background_color: '#f7f5b1',
    theme_color: '#7dc3e6',
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
    hostname: 'https://pensive-fermat-55a1e3.netlify.com',
    filter({ routes }) {
      return routes.filter(function(route) {
        if (
          !route.url.endsWith('/') &&
          route.url.length > 1 &&
          route.url !== '/admin'
        ) {
          return (route.url = `${route.url}/`)
        } else if (route.url !== '/admin') {
          return route
        }
      })
    }
  },

  auth: {
    strategies: {
      auth0: {
        domain: 'mypetadoption.auth0.com',
        client_id: '24ZuFqsddywamCHeCHNcRbvY4vJQpyLA'
      }
    },
    redirect: {
      callback: '/login/redirect'
    }
  }
}
