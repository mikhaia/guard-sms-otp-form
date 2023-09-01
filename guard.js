class Guard {

  length = 4;
  container;
  inputs;

  constructor() {
    this.container = document.getElementsByClassName('guard-fields')[0];
    for (let i = 0; i < this.length; i++) {
      this.container.appendChild(
        guardInput.content.cloneNode(true)
      );
    }
    this.inputs = this.container.children;
    this.bindEvents();
  }

  bindEvents() {
    for (let i = 0; i < this.length; i++) {
      this.inputs[i].addEventListener('keyup', this.up);
      this.inputs[i].addEventListener('keypress', this.press);
    }
    document.addEventListener('paste', this.paste);
  }

  up(event) {
    console.log(event);
    const key = event.key || event.code;
    const el = event.target;
    console.log(event.key);

    switch (key) {
      case 'Backspace':
        el.value = '';
        this.focus(el.previousSibling);
        break;
      case 'Delete':
        el.value = '';
        this.focus(el.nextSibling);
        break;
      case 'Enter':
        this.submit();
        break;
      default:
        if (el.value) this.focus(el.nextSibling);
        break;
    }
  }

  press(event) {
    if (event.which != 8 && isNaN(parseInt(String.fromCharCode(event.which))))
      event.preventDefault();
  }
  
  paste(event) {
    const value = event.clipboardData.getData('Text').replace(/[^0-9]/g, '');
    for (let i = 0; i < this.length; i++) {
      this.inputs[i].value = parseInt(value[i]);
    }
  }

  focus(target) {
    if (target && target.nodeType === 1) {
      target.focus();
      target.setSelectionRange(0, 1);
    }
  }

  submit() {
    let otp = '';
    for (let i = 0; i < this.length; i++) {
      otp += this.inputs[i].value;
    }
    alert('Entered code is: ' + otp);
  }
}

const guard = new Guard();