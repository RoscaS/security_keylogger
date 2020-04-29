class DOM {
  // private
  static _getFieldValue = id => document.getElementById(id).value;
  static _setFieldValue = (el, value) => el.setAttribute(el, value);

  static _getEmailValue = () => DOM._getFieldValue('email-field');
  static _getPasswordValue = () => DOM._getFieldValue('password-field');
  static _getEmailError = () => DOM._getFieldValue('email-error');
  static _getPasswordError = () => DOM._getFieldValue('password-error');


  // public
  static setEmailError(value) {
    return DOM._getEmailError()._setFieldValue('value', value);
  }

  static setPasswordError(value) {
    return DOM._getPasswordError()._setFieldValue('value', value);
  }

  static getCredentials() {
    return { email: DOM._getEmailValue(), password: DOM._getPasswordValue() };
  };
}

class Rules {
  static req = v => !!v || 'Required';
  static email = v => /\S+@\S+\.\S+/.test(v) || 'This email is invalid.';
  static min = v => (!v || v.length >= 8) || `Passwords must contain at least 8 characters`;
}


function validate() {
  let emailCheck = value => Rules.req(value) && Rules.email(value)
  let passwordCheck = value => Rules.req(value) && Rules.min(value)


  let { email, password } = DOM.getCredentials();
  DOM.setEmailError(emailCheck(email))
  DOM.setPasswordError(passwordCheck(password))
}


function submit() {
  let credentials = DOM.getCredentials();
  console.log(`email: ${ credentials.email }\npassword: ${ credentials.password }`);
  return credentials;
}





