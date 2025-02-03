import { DEFAULT_BASE_URL } from '../constants/base.js';
import { GET, POST, PUT } from '../constants/method.js';

export class Api {

  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  async _sendRequest(
    url,
    method,
    body = null,
    params = null
  ) {
    const data = {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }
    if (body) {
      data.body = JSON.stringify(body);
    }
    if (params) {
      Object.keys(params).forEach(item => {
        if (!params[item]) {
          delete params[item];
        }
      });
    }
    return fetch(
      `${this._baseUrl}/${url}?${new URLSearchParams(params || {})}`,
       data
    ).then(res => {
      return res.ok
      ? res.json()
      : res.json().then((err) => Promise.reject(err.message));
    });
  }

  async getUserCurrent() {
    return this._sendRequest('user/current', GET);
  }

  async getUserDetail(id) {
    return this._sendRequest(`user/${id}`, GET);
  }

  async createUser(body) {
    return this._sendRequest('user', POST, body);
  }

  async getUserList(params) {
    return this._sendRequest('user', GET, null, params);
  }

  async blockUser(id) {
    return this._sendRequest(`user/${id}/block`, PUT);
  }

  async unblockUser(id) {
    return this._sendRequest(`user/${id}/unblock`, PUT);
  }

  async getOrganizationList() {
    return this._sendRequest('organization', GET);
  }
}

const api = new Api({
  baseUrl: process.env.REACT_APP_BASE_URL || DEFAULT_BASE_URL,
});

export default api;
