const prefix = "blog_system_bms"

export const tokenStore = {
  set: function(v) {
    localStorage.setItem(`${prefix}_token`, v)
  },
  get: function() {
    return localStorage.getItem(`${prefix}_token`)
  }
}