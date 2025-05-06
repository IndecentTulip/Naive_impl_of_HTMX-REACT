// standard for self use
// 1. external functions
// 2. web component classes declaration
// 3. defining/assigning funcs for web components


function demo1_passHTMX(html, target) {
  console.log("sending",html)
  const targetComponent = document.querySelector(target);
  if (targetComponent) {
    targetComponent.external_getHTMX1(html); 
  }
}
function demo2_getHTMX(html) {
  const fragment = document.createRange().createContextualFragment(html);
  this.wrapper.appendChild(fragment);

  htmx.process(this.shadowRoot);
}


class Demo1 extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({ mode: 'open' });

    this.wrapper = document.createElement('div');
    this.wrapper.className = 'wrapper'
    this.wrapper.innerHTML = `
      <div className="wrapper">
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

  }
  // <><><><><><><> LIFECYCLE <><><><><><><>
  connectedCallback() {
    this.shadowRoot.querySelector('#add-btn').addEventListener('click', () => {
      if (typeof this.external_passHTMX1 === 'function') {
        this.external_passHTMX1(this.send, this.target);  // Calls the light DOM function
      }
    });
    // for HTMX
    htmx.process(this.shadowRoot);

    console.log('Element connected to the DOM');

  }
  // <><><><><><><> LIFECYCLE <><><><><><><>

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
  // <><><><><><><> LIFECYCLE <><><><><><><>
  connectedCallback() {
    // for HTMX
    htmx.process(this.shadowRoot);
  }

  // <><><><><><><> LIFECYCLE <><><><><><><>

}

customElements.define('demo-1', Demo1);

const demoElement1 = document.querySelector('demo-1');
demoElement1.external_passHTMX1 = demo1_passHTMX;

customElements.define('demo-2', Demo2);

const demoElement2 = document.querySelector('demo-2');
demoElement2.external_getHTMX1 = demo2_getHTMX;




