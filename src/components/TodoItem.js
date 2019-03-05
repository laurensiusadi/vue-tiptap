import { Node } from 'tiptap'
import { splitToDefaultListItem, liftListItem } from 'tiptap-commands'

export default class TodoItem extends Node {

  get name() {
    return 'todo_item'
  }

  get view() {
    return {
      props: ['node', 'updateAttrs', 'editable'],
      methods: {
        onChange() {
          this.updateAttrs({
            done: !this.node.attrs.done,
          })
        },
        onEndDateChange(e) {
          console.log(e.target.value)
          this.updateAttrs({
            endDate: e.target.value
          })
        }
      },
      template: `
        <li data-type="todo_item" :data-done="node.attrs.done.toString()" :data-end-date="node.attrs.endDate">
          <span class="todo-checkbox" contenteditable="false" @click="onChange"></span>
          <div class="todo-content" ref="content" :contenteditable="editable.toString()"></div>
          <input type="date" class="todo-end-date" :value="node.attrs.endDate" @input="onEndDateChange"/>
        </li>
      `,
    }
  }

  get schema() {
    return {
      attrs: {
        done: {
          default: false,
        },
        endDate: {
          default: null
        }
      },
      draggable: true,
      content: 'paragraph',
      toDOM(node) {
        const { done, endDate } = node.attrs

        return ['li', {
            'data-type': 'todo_item',
            'data-done': done.toString(),
            'data-end-date': endDate
          },
          ['span', { class: 'todo-checkbox', contenteditable: 'false' }],
          ['div', { class: 'todo-content' }, 0],
        ]
      },
      parseDOM: [{
        priority: 51,
        tag: '[data-type="todo_item"]',
        getAttrs: dom => ({
          done: dom.getAttribute('data-done') === 'true',
          endDate: dom.getAttribute('data-end-date')
        }),
      }],
    }
  }

  keys({ type }) {
    return {
      Enter: splitToDefaultListItem(type),
      'Shift-Tab': liftListItem(type),
    }
  }

}
