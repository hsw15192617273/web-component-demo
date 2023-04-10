// 红色div
customElements.define( // 组件注册函数（也可以单独定义好class再去注册）
  'red-div',  // 组件名称，有命名要求，名称中必须包含至少一个中横线
  class RedDiv extends HTMLElement { // 继承自HTMLElement的class
    // 重写构造函数
    constructor() {
      super() // 需要调用一下父类
      this.attachShadow({mode: 'open'}) // 这里是把ShadowDOM设为可编辑模式，该函数返回的对象是shadowRoot

      // 写具体的组件内容到ShadowDOM的根节点ShadowRoot中
      this.shadowRoot.innerHTML = `
        <style>
          div {
            color: red
          }
        </style>
        <div>
          <slot></slot>
        </div>
      `
    }
  }
)

// 小组例会div
customElements.define(
  'group-div',
  class GroupDiv extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({mode: 'open'})

      // 这里有两点
      // 1. 换了一种给组件添加标签的方式，不是直接修改innerHTML，而是添加node的方式
      // 2. 通过全局DOM获取组件外的templete,并赋值给当前shadowRoot，这里要使用cloneNode来拷贝 (原因应该是构造函数之后组件内就无法再指向外部的对象 ShadowDOM)
      this.shadowRoot.appendChild(document.getElementById('my-meeting').content.cloneNode(true))
    }
  }
)

// 可点击div
customElements.define(
  'click-div',
  class ClickDiv extends HTMLElement {
    // 定义好计数属性count的getter和setter函数，方便后续计数使用

    // 定义一个count属性的getter函数，默认为0
    get count() {
      return this.getAttribute('count') || 0
    }

    // 定义一个count属性的setter函数
    set count(_count) {
      this.setAttribute('count', _count)
    }

    constructor() {
      super()
      this.attachShadow({mode: 'open'})

      this.shadowRoot.innerHTML = `
        <style>
          div {
            border: 1px solid;
            height: 80px;
            width: 80px;
            font-size: 60px;
            cursor: pointer;
          }
        </style>
        <div>${this.count}</div>
      `

      // 获取上面注册的div对象，并且添加点击事件，计数++
      this.shadowRoot.querySelector('div').addEventListener('click', () => this.count++)
    }

    // 如果只是添加完点击事件，组件内部虽然会让count的值不断变化，但是并没有渲染到组件外部，还需要添加以下代码

    // 需要对count属性添加一个监听
    static get observedAttributes() { return ['count'] }

    // 添加Web Component的生命周期回调函数实现，这个回调是当属性发生变化时的回调，只有加了上面一行监听代码才会触发回调
    // 有三个参数，分别是属性名称，修改前的值和修改后的值 (有点像vue里的watch)
    attributeChangedCallback(attr, oldVal, newVal) {
      // 当触发的属性名是count时，获取根节点的div标签，并将内容设置为修改后的值
      if (attr == 'count') {
        this.shadowRoot.querySelector('div').textContent = newVal
      }
    }
  }
)
