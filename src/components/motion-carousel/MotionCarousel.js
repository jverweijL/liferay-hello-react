import {LitElement, html} from 'lit';
import {animate} from '@lit-labs/motion';
import {styleMap} from 'lit/directives/style-map.js';
import {styles} from './styles.js';

export class MotionCarousel extends LitElement {
  static properties = {
    selected: {type: Number},
  };
  static styles = styles;

  constructor() {
    super();
    this.selected = 0;
  }

  data = Array(7).fill(null, 0);

  render() {
    return html`
      <div class="container">
        ${this.data.map((_v, i) => {
          const count = this.data.length;
          const center = Math.trunc(count / 2);
          const order = (count + center + i - this.selected) % count;
          const zIndex = order === 0 || order === count - 1 ? -1 : 1;
          const fraction = i / this.data.length;
          return html`<div
            @click=${order < center ? this.dec : this.inc}
            style=${styleMap({
              order: String(order),
              zIndex: String(zIndex),
              background: `hsl(
                    ${Math.trunc(360 * fraction)},
                    ${20 + Math.trunc(60 * fraction)}%,
                    ${30 + Math.trunc(30 * fraction)}%)`,
            })}
            class="card"
            ${animate()}
          >
            ${i}
          </div>`;
        })}
      </div>
    `;
  }

  shift(i) {
    const last = this.data.length - 1;
    return i > last ? 0 : i < 0 ? last : i;
  }

  dec() {
    this.selected = this.shift(this.selected - 1);
  }
  inc() {
    this.selected = this.shift(this.selected + 1);
  }
}
customElements.define('motion-carousel', MotionCarousel);