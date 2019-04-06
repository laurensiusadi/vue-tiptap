<template>
  <li class="todo"
    :data-block-id="node.attrs.blockId"
    :data-type="node.type.name"
    :data-done="node.attrs.done.toString()"
    :data-end-date="node.attrs.endDate"
  >
    <span class="todo-checkbox" contenteditable="false" @click="onChange"></span>
    <div class="todo-content" ref="content" :contenteditable="editable.toString()"></div>
    <div class="todo-actions" contenteditable="false">
      <datepicker
        contenteditable="false"
        v-if="endDate || editDate"
        name="endDatePicker"
        ref="datepicker"
        :calendar-button="true"
        calendar-button-icon="far fa-calendar-alt"
        :clear-button="true"
        clear-button-icon="far fa-calendar-times"
        @cleared="onDatepickerCleared"
        v-model="endDate"
      />
      <button class="btn" title="Set Date" v-if="!endDate && !editDate" @click="setDate">
        <i class="far fa-calendar"></i>
      </button>
      <button class="btn" title="Delete To-do" @click="deleteNode">
        <i class="fa fa-times"></i>
      </button>
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
      this.$nextTick(() => {
        this.$refs.datepicker.showCalendar()
        this.$refs.datepicker.$el.querySelector('input').focus()
      })
    },
    onDatepickerCleared() {
      this.editDate = false
    },
    // TODO: onDatepickerBlur https://github.com/charliekassel/vuejs-datepicker/issues/493
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
    .btn, .vdp-datepicker__clear-button {
      opacity: 1;
    }
  }
}
.todo-actions {
  display: flex;
  align-items: center;
  .btn {
    border: 0;
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 16px;
    letter-spacing: 1px;
    font-weight: 600;
    text-transform: uppercase;
    background-color: transparent;
    margin-left: 6px;
    color: #AAAAAA;
    opacity: 0;
    &:hover {
      color: #000000;
    }
  }
  
  .vdp-datepicker__clear-button {
    opacity: 0;
    font-size: 16px;
    border-radius: 4px;
    padding: 4px 8px;
    color: #AAAAAA;
    &:hover {
      color: #000000;
    }
  }

  .vdp-datepicker__calendar-button {
    color: #000000;
    font-size: 16px;
  }

  .vdp-datepicker {
    white-space: normal;
    input {
      line-height: 20px;
      width: 90px;
      text-align: right;
      background-color: transparent;
    }
  }
}
</style>

