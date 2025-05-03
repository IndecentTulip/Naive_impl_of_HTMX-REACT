function passHTMX(html, target) {
  console.log("sending",html)
  const targetComponent = document.querySelector(target);
  if (targetComponent) {
    targetComponent.internal_getHTMX(html); 
  }
}
//function getHTMX(html) {
//}


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
        hx-get="/data/vars-1.html"
        hx-trigger="click"
        hx-target="#content"
      >Load New Content</button>

      <!-- Button to add new item -->
      <button id="add-btn">Interact with "Element inside another shadowRoot"</button>
    `
    this.send = `
    <div id="temp-revealed" hx-get="/data/vars.html" hx-swap="none" hx-trigger="revealed">
    </div>
    `
    this.target = "demo-2"

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
    this.shadowRoot.querySelector('#add-btn').addEventListener('click', () => {
      if (typeof this.externalFunction === 'function') {
        this.externalFunction(this.send, this.target);  // Calls the light DOM function
      }
    });
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
class Demo2 extends HTMLElement {
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
          border-color: blue;
          display: inline-block;
        }
      </style>

      <h2>Element inside another shadowRoot</h2>

      <!-- List container -->
      <ul id="item-list">
      </ul>


      `


    this.shadowRoot.appendChild(this.wrapper);

  }
  internal_getHTMX(html){
    const fragment = document.createRange().createContextualFragment(html);
    this.wrapper.appendChild(fragment);

    htmx.process(this.shadowRoot);
  }
  // <><><><><><><> LIFECYCLE <><><><><><><>
  connectedCallback() {
    // for HTMX
    htmx.process(this.shadowRoot);
  }

  // <><><><><><><> LIFECYCLE <><><><><><><>

}

customElements.define('demo-1', Demo1);

const demoElement1 = document.querySelector('demo-1');
demoElement1.externalFunction = passHTMX;

customElements.define('demo-2', Demo2);




