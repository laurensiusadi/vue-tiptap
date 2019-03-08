import { Node } from 'tiptap'
import EventBlockComponent from './EventBlockComponent'

export default class EventBlock extends Node {

  get name() {
    return 'event'
  }

  commands({ type }) {
    return attrs => (state, dispatch) => {
      const { selection } = state
      const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos
      const node = type.create(attrs)
      const transaction = state.tr.insert(position, node)
      dispatch(transaction)
    }
  }

  get schema() {
    return {
      attrs: {
        startDate: {
          default: null
        },
        text: {
          default: ''
        }
      },
      group: 'block',
      selectable: false,
      // draggable: true,
      parseDOM: [{
        tag: 'event',
        getAttrs: dom => ({
          startDate: dom.getAttribute('startDate'),
          text: dom.getAttribute('text'),
        }),
      }],
      toDOM: node => ['event', {
        startDate: node.attrs.startDate,
        text: node.attrs.text,
      }],
    }
  }

  get view() {
    return EventBlockComponent
  }
}
