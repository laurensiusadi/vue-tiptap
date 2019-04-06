import { Node, Plugin } from 'tiptap'
import { splitToDefaultListItem, liftListItem } from 'tiptap-commands'
import TodoItemComponent from './TodoItemComponent'
import uuid from 'uuid'

export default class TodoItem extends Node {

  get name() {
    return 'todo_item'
  }

  get view() {
    return TodoItemComponent
  }

  get schema() {
    return {
      attrs: {
        blockId: {
          default: null
        },
        done: {
          default: false
        },
        endDate: {
          default: null
        }
      },
      draggable: true,
      content: 'paragraph',
      toDOM: node => {
        const { blockId, done, endDate } = node.attrs

        return [
          'li',
          { 
            'data-type': this.name,
            'data-done': done.toString(),
            'data-end-date' : endDate,
            'data-block-id': blockId
          },
          ['span', { class: 'todo-checkbox', contenteditable: 'false' }],
          ['div', { class: 'todo-content' }, 0],
          ['div', { class: 'todo-actions', contenteditable: 'false' }],
        ]
      },
      parseDOM: [{
        priority: 51,
        tag: `[data-type="${this.name}"]`,
        getAttrs: dom => ({
          blockId: dom.getAttribute('data-block-id') || uuid.v4(),
          done: dom.getAttribute('data-done') === 'true',
          endDate: dom.getAttribute('data-end-date'),
        }),
      }],
    }
  }

  get plugins() {
    return [
      new Plugin({
        appendTransaction: (transactions, oldState, newState) => {
          const newTr = newState.tr
          let modified = false
          newState.doc.descendants((node, pos) => {
            if (!!node.type && (node.type.name === 'todo_item')) {
              const { blockId, ...rest} = node.attrs
              if (blockId === undefined || blockId === null || blockId === '') {
                // Adds a unique id to a node
                newTr.setNodeMarkup(pos, undefined, { blockId: uuid.v4(), ...rest })
                modified = true
              }
            }
          })
    
          if (modified) {
            return newTr
          }
        }
      })
    ]
  }

  keys({ type }) {
    return {
      Enter: splitToDefaultListItem(type),
      'Shift-Tab': liftListItem(type),
    }
  }

}
