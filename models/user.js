class User {
  constructor({ firstName, lastName, email, phoneNumber, password }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
  }
}
// exports.User = {
//   id: Number, // userID
//   firstName: String, // userFirstName
//   lastName: String, // userLastName
//   email: String, // userEmail
//   phoneNumber: String, // userNumber
//   password: String, // userPassword
// };

module.exports.User = User;
