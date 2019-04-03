<template>
  <li class="todo" :data-type="node.type.name" :data-done="node.attrs.done.toString()">
    <span class="todo-checkbox" contenteditable="false" @click="onChange"></span>
    <div class="todo-content" ref="content" :contenteditable="editable.toString()"></div>
    <div class="todo-actions" contenteditable="false">
      <button @click="setDate">Date</button>
      <button @click="deleteNode" style="color: red">Del</button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['node', 'updateAttrs', 'editable', 'view', 'getPos'],
  methods: {
    onChange() {
      this.updateAttrs({
        done: !this.node.attrs.done,
      })
    },
    setDate() {
      console.log('setDate', this.node.schema)
      
    },
    deleteNode() {
      // make a prosemirror transaction
      // which available on editor node
      let tr = this.view.state.tr
      let pos = this.getPos()
      tr.delete(pos, pos + this.node.nodeSize)
      this.view.dispatch(tr)
    }
  },
}
</script>

<style lang="scss" scoped>
.todo {
  padding: 2px 8px;
  &:hover {
    background-color: rgba(0,0,0,.03);
  }
}
.todo-actions {
  display: flex;
  align-items: center;
  button {
    border: 0;
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 10px;
    letter-spacing: 1px;
    font-weight: 600;
    text-transform: uppercase;
    background-color: transparent;
    margin-left: 6px;
    color: #777777;
    &:hover {
      color: #000000;
      background-color: rgba(0,0,0,.05)
    }
  }
}
</style>

