import { LitElement, html, css } from 'lit';
import {customElement, property} from 'lit/decorators.js'

@customElement('input-chat')
export class InputChat extends LitElement {
  render() {
    return html`
      <input type="text" name="chat" id="chat-2" style="width:220px; height: 50px;">
    `
  }
}
