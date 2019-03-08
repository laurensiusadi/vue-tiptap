import { Node } from 'tiptap'
import IframeBlockComponent from './IframeBlockComponent'

export default class Iframe extends Node {

  get name() {
    return 'embedVideo'
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
        src: {
          default: null,
        },
      },
      group: 'block',
      selectable: false,
      parseDOM: [{
        tag: 'embedVideo',
        getAttrs: dom => ({
          src: dom.getAttribute('src'),
        }),
      }],
      toDOM: node => ['embedVideo', {
        src: node.attrs.src,
        frameborder: 0,
        allowfullscreen: 'true',
      }],
    }
  }

  get view() {
    return IframeBlockComponent
  }
}
