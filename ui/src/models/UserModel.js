import { extendObservable } from "mobx";
import { handleReponse } from "./ErrorHandler";

class UserModel {
  constructor() {
    const isLocalhost = Boolean(
      window.location.hostname === "localhost" ||
        window.location.hostname === "[::1]" ||
        window.location.hostname.match(
          /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        )
    );
    this.baseApi = isLocalhost
      ? "http://localhost:3001/api"
      : "https://my-picshare.herokuapp.com/api";
    extendObservable(this, {
      currentUser: localStorage.getItem("currentUser")
        ? JSON.parse(localStorage.getItem("currentUser"))
        : null
    });
  }

  login = values => {
    return fetch(`${this.baseApi}/login`, {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
      .then(handleReponse)
      .then(res => {
        this.currentUser = res.result;
        localStorage.setItem("currentUser", JSON.stringify(res.result));
      });
  };

  signup = values => {
    return fetch(`${this.baseApi}/signup`, {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    }).then(handleReponse);
  };

  logout = () => {
    return fetch(`${this.baseApi}/logout`, {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: this.currentUser.email })
    })
      .then(handleReponse)
      .then(() => {
        this.currentUser = null;
        localStorage.clear();
      });
  };
}

const user = new UserModel();

export default user;
