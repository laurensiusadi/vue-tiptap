<template>
  <li :data-type="node.type.name" :data-done="node.attrs.done.toString()">
    <span class="todo-checkbox" contenteditable="false" @click="onChange"></span>
    <div class="todo-content" ref="content" :contenteditable="editable.toString()"></div>
  </li>
</template>

<script>
export default {
  props: ['node', 'updateAttrs', 'editable'],
  methods: {
    onChange() {
      this.updateAttrs({
        done: !this.node.attrs.done,
      })
    },
  },
}
</script>
