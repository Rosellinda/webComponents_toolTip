const template = document.createElement("template");
template.innerHTML = `

    <style>

        .tooltip-container {
            display: inline-block;
            position: relative;
            z-index: 2;
        }

        .cancel {
            display: none;
        }

        svg {
            width: 1em;
            cursor: pointer;
        }

        .notify-container {
            position: absolute;
            bottom: 125%;
            z-index: 9;
            width: 300px;
            background: white;
            box-shadow: 5px 5px 10px rgba(0,0,0,.1);
            font-size: .8em;
            border-radius: .5em;
            padding: 1em;
            transform: scale(0);
            transform-origin: bottom-left;
            transition: transform .5s cubic-bezier(0.860, 0.000, 0.070, 1.000);
        }


    </style>

    <div class="tooltip-container">
        <svg class="alert" id="alert" viewBox="0 0 286.054 286.054" style="enable-background:new 0 0 286.054 286.054;">
            <g>
                <path style="fill:#E2574C;" d="M143.027,0C64.04,0,0,64.04,0,143.027c0,78.996,64.04,143.027,143.027,143.027
                    c78.996,0,143.027-64.022,143.027-143.027C286.054,64.04,222.022,0,143.027,0z M143.027,259.236
                    c-64.183,0-116.209-52.026-116.209-116.209S78.844,26.818,143.027,26.818s116.209,52.026,116.209,116.209
                    S207.21,259.236,143.027,259.236z M143.036,62.726c-10.244,0-17.995,5.346-17.995,13.981v79.201c0,8.644,7.75,13.972,17.995,13.972
                    c9.994,0,17.995-5.551,17.995-13.972V76.707C161.03,68.277,153.03,62.726,143.036,62.726z M143.036,187.723
                    c-9.842,0-17.852,8.01-17.852,17.86c0,9.833,8.01,17.843,17.852,17.843s17.843-8.01,17.843-17.843
                    C160.878,195.732,152.878,187.723,143.036,187.723z"/>
            </g>
        </svg>
        <svg class="cancel" id="cancel" viewBox="0 0 455.111 455.111" style="enable-background:new 0 0 455.111 455.111;">
            <circle style="fill:#E24C4B;" cx="227.556" cy="227.556" r="227.556"/>
            <path style="fill:#D1403F;" d="M455.111,227.556c0,125.156-102.4,227.556-227.556,227.556c-72.533,0-136.533-32.711-177.778-85.333
                c38.4,31.289,88.178,49.778,142.222,49.778c125.156,0,227.556-102.4,227.556-227.556c0-54.044-18.489-103.822-49.778-142.222
                C422.4,91.022,455.111,155.022,455.111,227.556z"/>
            <path style="fill:#FFFFFF;" d="M331.378,331.378c-8.533,8.533-22.756,8.533-31.289,0l-72.533-72.533l-72.533,72.533
                c-8.533,8.533-22.756,8.533-31.289,0c-8.533-8.533-8.533-22.756,0-31.289l72.533-72.533l-72.533-72.533
                c-8.533-8.533-8.533-22.756,0-31.289c8.533-8.533,22.756-8.533,31.289,0l72.533,72.533l72.533-72.533
                c8.533-8.533,22.756-8.533,31.289,0c8.533,8.533,8.533,22.756,0,31.289l-72.533,72.533l72.533,72.533
                C339.911,308.622,339.911,322.844,331.378,331.378z"/>
        </svg>

        <div class="notify-container">
            <slot name="message" />
        </div>
    </div>
`;


class PopupNotify extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        //shadow is encapsulated in main
        this.shadowRoot.appendChild(template.content.cloneNode(true));

    }

    tooltip(expandState) {
        const tooltip = this.shadowRoot.querySelector('.notify-container');
        const alert = this.shadowRoot.querySelector('.alert');
        const cancel = this.shadowRoot.querySelector('.cancel');

        if(expandState == true) {
            tooltip.style.transform = 'scale(1)';
            alert.style.display = 'none';
            cancel.style.display = 'block';
            expandState = false;
        } else {
            tooltip.style.transform = 'scale(0)';
            cancel.style.display = 'none';
            alert.style.display = 'block';
        }
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.alert').addEventListener('click', () => {
            this.tooltip(true);
        });
        this.shadowRoot.querySelector('.cancel').addEventListener('click', () => {
            this.tooltip(false);
        });

        if(this.getAttribute('tip_background')){
            this.shadowRoot.querySelector('.notify-container').style.background = this.getAttribute('tip_background');
        }
    }
}



window.customElements.define('popup-notify', PopupNotify);