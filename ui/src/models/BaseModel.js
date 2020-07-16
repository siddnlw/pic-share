import { handleReponse } from "./ErrorHandler";

export default class BaseModel {
  constructor(api) {
    const isLocalhost = Boolean(
      window.location.hostname === "localhost" ||
        window.location.hostname === "[::1]" ||
        window.location.hostname.match(
          /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        )
    );
    this.baseApi = isLocalhost
      ? "http://localhost:3001"
      : "https://my-picshare.herokuapp.com";
    this.currentUserToken = (
      JSON.parse(localStorage.getItem("currentUser")) || {}
    ).token;
    this.api = api;
  }

  find = id => {
    return fetch(`${this.baseApi}/${this.api}/${id}`).then(handleReponse);
  };

  create = data => {
    this.currentUserToken = (
      JSON.parse(localStorage.getItem("currentUser")) || {}
    ).token;
    return fetch(`${this.baseApi}/${this.api}`, {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": this.currentUserToken
      },
      body: JSON.stringify(data)
    }).then(handleReponse);
  };

  delete = id => {
    return fetch(`${this.baseApi}/${this.api}/${id}`, {
      method: "delete"
    }).then(handleReponse);
  };

  update = (id, data) => {
    this.currentUserToken = (
      JSON.parse(localStorage.getItem("currentUser")) || {}
    ).token;
    return fetch(`${this.baseApi}/${this.api}/${id}`, {
      method: "put",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": this.currentUserToken
      },
      body: JSON.stringify(data)
    }).then(handleReponse);
  };
}
