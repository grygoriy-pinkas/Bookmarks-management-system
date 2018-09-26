const host = 'http://localhost:3001/people/';

export default {
  get: () =>
    fetch(host, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }),

  post: userData => {
    return fetch(host, {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(userData)
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    });
  },

  patch: (id, userData) => {
    return fetch(host + id, {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(userData)
    }).then(response => {
      if (response.ok) {
        return true;
      }
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    });
  },

//   delete: id => {
//     return fetch(host + id, {
//       headers: {
//         Accept: 'application/json',
//         'Content-type': 'application/json'
//       },
//       method: 'DELETE'
//     }).then(response => {
//       if (response.ok) {
//         return true;
//       }
//       const error = new Error(response.statusText);
//       error.response = response;
//       throw error;
//     });
//   }
};
