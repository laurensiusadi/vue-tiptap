<template>
  <li class="todo" :data-type="node.type.name" :data-done="node.attrs.done.toString()">
    <span class="todo-checkbox" contenteditable="false" @click="onChange"></span>
    <div class="todo-content" ref="content" :contenteditable="editable.toString()"></div>
    <div class="todo-actions" contenteditable="false">
      <button v-if="!endDate && !editDate" @click="setDate">Date</button>
      <datepicker v-if="endDate || editDate" name="startDatePicker" :typeable="true" v-model="endDate"></datepicker>
      <button @click="deleteNode" style="color: red">Del</button>
    </div>
  </li>
</template>

<script>
import Datepicker from 'vuejs-datepicker'

export default {
  components: { Datepicker },
  props: ['node', 'updateAttrs', 'editable', 'view', 'getPos'],
  data() {
    return {
      editDate: false,
    }
  },
  computed: {
    endDate: { 
      get() {
        return this.node.attrs.endDate
      },
      set(endDate) {
        this.updateAttrs({ endDate })
      }
    }
  },
  methods: {
    onChange() {
      this.updateAttrs({
        done: !this.node.attrs.done,
      })
    },
    setDate() {
      this.editDate = true

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

<style lang="scss">
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
  .vdp-datepicker {
    height: 20px;
    white-space: normal;
    margin-right: 8px;
    input {
      line-height: 20px;
      width: 90px;
      text-align: right;
      top: -4px;
      position: relative;
    }
  }
}
</style>

