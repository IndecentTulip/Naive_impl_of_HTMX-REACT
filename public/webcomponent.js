class Demo1 extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({ mode: 'open' });

    this.wrapper = document.createElement('div');
    this.wrapper.className = 'wrapper'
    this.wrapper.innerHTML = `
      <style>
        .wrapper {
          font-size: 16px;
          color: #333;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          background-color: #f9f9f9;
          display: inline-block;
        }
        .button {
          margin-top: 10px;
        }
      </style>



      <h2>Default JS with web component</h2>
      <p id='message_t' messageTEST='I am not used'></p>
      <input id='message_i'></input>
      <h2>HTMX with web component</h2>
      <p id="content">REPLACE ME</p>
      <button class="button"
        id="load-button"
        hx-get="/data/vars.html"
        hx-trigger="click"
        hx-target="#content"
      >Load New Content</button>
    `

    this.shadowRoot.appendChild(this.wrapper);

    const input = this.shadowRoot.querySelector('#message_i');
    input.addEventListener('keydown', (event) => {
      if (event.key == 'Enter'){
        this.setAttribute('message', event.target.value)
      }
    });

  }
  // <><><><><><><> LIFECYCLE <><><><><><><>
  connectedCallback() {
    // for just JS
    this.updateMessage()
    // for HTMX
    htmx.process(this.shadowRoot);

    console.log('Element connected to the DOM');

    console.log(this.getAttribute('message'));
    console.log(this.shadowRoot.querySelector('#message_t').getAttribute('messageTEST'));
  }
  disconnectedCallback() {
    console.log('Element disconnected from the DOM');
  }
  adoptedCallback() {
    console.log('Element adopted into a new document');
  }

  static get observedAttributes() {
    return ['message'];
    // ^^ IS A MESSAGE FROM <demo-1> !!!!!!!!!!!!
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // name is name of Attribute that is changed AKA 'message'
    console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`);
    if (name === 'message'){
      this.updateMessage()
    }
  }

  // <><><><><><><> LIFECYCLE <><><><><><><>


  // <><><><><><><> HELPER FUNKS <><><><><><><>
  updateMessage(){
    this.shadowRoot.querySelector('#message_t').textContent = this.getAttribute('message');
  }

  // <><><><><><><> HELPER FUNKS <><><><><><><>

}

customElements.define('demo-1', Demo1);



