import Vue from 'vue'

Vue.prototype.$mpaSchema = {
  get entireSchema() {
    return {
      schema: this.schema,
      webSite: this.webSite,
      webSiteSchema: this.webSiteSchema,
      AndrewZigler: this.AndrewZigler,
      AndrewZiglerSchema: this.AndrewZiglerSchema,
      webPage: this.webPage,
      webPageSchema: this.webPageSchema
    }
  },

  /*
  SCHEMA.ORG
  --------
  N/A
  */
  get schema() {
    return {
      '@context': 'http://schema.org'
    }
  },

  /*
  WEB SITE
  --------
  N/A
  */
  get webSite() {
    return {
      '@id': 'mypetadoptiondotcom',
      author: this.AndrewZiglerSchema,
      creator: this.AndrewZiglerSchema,
      description: 'Pet adoption and resource website.',
      headline: 'My Pet Adoption',
      image: 'https://pensive-fermat-55a1e3.netlify.com/ogmediablack.png',
      name: 'Andrew Zigler',
      thumbnailUrl:
        'https://pensive-fermat-55a1e3.netlify.com/ogmediablack.png',
      url: 'https://pensive-fermat-55a1e3.netlify.com/'
    }
  },

  get webSiteSchema() {
    return { ...this.schema, '@type': 'WebSite', ...this.webSite }
  },

  /*
  ANDREW ZIGLER (PERSON)
  ------
  N/A
  */
  get AndrewZigler() {
    return {
      '@id': 'AndrewZigler',
      description: 'Andrew Zigler is the creator of My Pet Adoption.',
      email: 'me@andrewzigler.com',
      familyName: 'Zigler',
      givenName: 'Andrew',
      image:
        'https://en.gravatar.com/userimage/28005451/31f00adf19b8a17dc8fc7e92aca68bdf.jpg?size=300',
      name: 'Andrew Zigler',
      mainEntityOfPage: 'https://www.andrewzigler.com/',
      url: 'https://www.andrewzigler.com/'
    }
  },

  get AndrewZiglerSchema() {
    return { ...this.schema, '@type': 'Person', ...this.AndrewZigler }
  },

  /*
  WEB PAGE
  --------
  description: 'DESCRIPTION FROM PAGE',
  headline: 'TITLE FROM PAGE',
  image: 'URL',
  name: 'TITLE FROM PAGE',
  thumbnailUrl: 'URL',
  url: 'URL FROM PAGE'
  */
  get webPage() {
    return {
      '@id': 'webpage',
      author: this.AndrewZiglerSchema,
      creator: this.AndrewZiglerSchema,
      isPartOf: this.webSiteSchema
    }
  },

  get webPageSchema() {
    return { ...this.schema, '@type': 'WebPage', ...this.webPage }
  }
}
