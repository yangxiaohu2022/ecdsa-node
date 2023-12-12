// import axios from "axios";

// const server = axios.create({
//   baseURL: "",
//   headers: {
//     'Accept-Encoding': 'identity'
//   }
// });
// export default axios;

export default {
  post: (url, data) => {
    return fetch(url, {
      method: 'POST',
        headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
    }).then(res => res.json())
  },
  get: (url) => {
    return fetch(url, {
      method: 'GET',
              headers: {
    'Content-Type': 'application/json'
  }
    }).then(res => res.json())
  }
}
