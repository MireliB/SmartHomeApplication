// class component of User with OOP Approach
class User {
  constructor(email) {
    this.email = email;
    this.token = null;
    this.loginTime = null;
  }

  // login function that holds the token and loginTime,
  login(token) {
    this.token = token;
    this.loginTime = Date.now();
    localStorage.setItem("token", this.token);
    localStorage.setItem("loginTime", JSON.stringify(this.loginTime));
    localStorage.setItem("userEmail", this.email);
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
  }

  // logout function that removes the token and loginTime,
  logout() {
    this.token = null;
    this.loginTime = null;
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
  }
  //   function that holds token and loginTime and tells that if the user is LoggedIn
  // then it will get new token and loginTime of 8 hours with exparation date
  isLoggedIn() {
    const token = localStorage.getItem("token");
    const loginTime = localStorage.getItem("loginTime");
    const expirationTime = 8 * 60 * 60 * 1000; //8 hours in milliseconds
    return token && Date.now() - loginTime < expirationTime;
  }
}

export default User;
