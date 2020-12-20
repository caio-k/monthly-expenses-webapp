import ServerApi from "../api/ServerApi";

const API_PATH = "/api/auth/";

class AuthService {
  login(username, password) {
    return ServerApi
      .post(API_PATH + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    const role = "user";

    return ServerApi.post(API_PATH + "signup", {
      username,
      email,
      role,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
