const PRISMIC_API_URL = 'https://mypetadoption.cdn.prismic.io/api/v2'

export default class {
  static async fetchMasterRef() {
    const { refs } = await fetch(PRISMIC_API_URL).then(function(response) {
      return response.json()
    })
    return refs[0].ref
  }
}
