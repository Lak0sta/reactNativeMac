let baseUrl = 'https://api-dev.historysearch.net/v1/'

const auth = {
  signUp() {
    return `${baseUrl}users`
  },
  login() {
    return `${baseUrl}auth`
  }
}

const account = {
  info() {
    return `${baseUrl}account`
  },
  updatePassword() {
    return `${baseUrl}account/password`
  }
}

const events = {
  page(currentPage) {
    return `admin/get_event_list/${currentPage}`
  },
  currentEvent(id) {
    return `event/${id}`
  },
  add() {
    return `users/create_event`
  },
  update() {
    return `users/update_event`
  },
  delete() {
    return `admin/delete_event`
  },
  registrations(id) {
    return `admin/gps_per_event/${id}`
  },
  upload() {
    return `admin/upload_csv`
  },
  search() {
    return `admin/search`
  },
  saveInApp() {
    return `users/add_event`
  }
}

export const api = {
  auth,
  events,
  account
}
