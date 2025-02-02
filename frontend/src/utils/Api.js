import { DEFAULT_BASE_URL } from './constans.js';
import { GET, POST } from './method.js';

export class Api {

  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }
  
  _sendRequest(
    url,
    method,
    body = null,
  ) {
    const data = {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }
    if (body) {
      data.body = JSON.stringify(body);
    }
    return fetch(url, data).then(res => {
      if (res.ok) {
        return res.json();
      }
      return res.json().then((err) => Promise.reject(err.message));
    });
  }

  getUserCurrent() {
    return this._sendRequest(
      `${this._baseUrl}/user/current`,
      GET
    );
  }

  getUserDetail(id) {
    return this._sendRequest(`${this._baseUrl}/user/${id}`, GET);
  }

  getUserCreate(body) {
    return this._sendRequest(`${this._baseUrl}/user`, POST, body);
  }

  getUserList() {
    return this._sendRequest(`${this._baseUrl}/user`, GET);
  }

  getOrganizationList() {
    return this._sendRequest(`${this._baseUrl}/organization`, GET);
  }
}

const api = new Api({
  baseUrl: process.env.REACT_APP_BASE_URL || DEFAULT_BASE_URL,
});
  
export default api;
