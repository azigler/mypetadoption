export default {
  auth: {
    strategies: {
      auth0: {
        domain: 'mypetadoption.auth0.com',
        client_id: '24ZuFqsddywamCHeCHNcRbvY4vJQpyLA'
      }
    },
    redirect: {
      callback: '/login/redirect'
    },
    watchLoggedIn: false
  },

  axios: {},

  build: {
    extend(config, ctx) {
      // run ESLint on save
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

  css: ['~/assets/style.styl'],

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

  generate: {
    fallback: true,
    routes: () => {
      return ['/']
    }
  },

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

  icon: {
    iconFileName: 'symbol512black.png'
  },

  loading: false,

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
        endpoint: 'https://mypetadoption.cdn.prismic.io/api/v2',
        deferLoad: true,
        linkResolver: function(doc) {
          if (doc.isBroken) {
            return '/404'
          }
        }
      }
    ]
  ],

  plugins: [
    { src: '~/plugins/persistedState.js', mode: 'client' },
    '~/plugins/mpaMeta.js',
    '~/plugins/mpaSchema.js'
  ],

  sitemap: {
    gzip: true,
    cacheTime: 1000 * 60 * 15,
    hostname: 'https://pensive-fermat-55a1e3.netlify.com',
    filter({ routes }) {
      const hiddenRoutes = ['/admin']

      return routes.filter(function(route) {
        if (
          !route.url.endsWith('/') &&
          route.url !== '/' &&
          !hiddenRoutes.includes(route.url)
        ) {
          return (route.url = `${route.url}/`)
        } else if (!hiddenRoutes.includes(route.url)) {
          return route
        }
      })
    }
  },

  vuetify: {
    treeShake: true,
    theme: {
      primary: '#7dc3e6',
      secondary: '#f7f5b1',
      accent: '#0a7324'
    }
  }
}
