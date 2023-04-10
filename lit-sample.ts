import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'

@customElement('blue-div') // 用装饰器注册组件
export class BlueDiv extends LitElement { // 继承的class改为LitElement，其也是对HTMLElement的继承
  // 对于样式可通过css选择器进行修改
  static styles = css`
    div {
      color: blue;
    }
  `

  // 实现render函数，返回组件html内容
  render() {
    return html`
      <div><slot></slot></div>
    `
  }
}

@customElement('lit-click-div')
export class LitClickDiv extends LitElement {
  static styles = css`
    div {
      border: 1px solid;
      height: 80px;
      width: 80px;
      font-size: 60px;
      cursor: pointer;
      background-color: deepskyblue;
    }
  `

  // 定义属性，是响应式的
  @property()
  count = 0

  render() {
    return html`
      <div @click=${() => this.count++}>${this.count}</div>
    `
  }
}
