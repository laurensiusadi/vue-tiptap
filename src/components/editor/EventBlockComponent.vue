<template>
  <div class="event">
    <input class="event__content" @paste.stop type="text" v-model="text" v-if="editable"/>
    <input class="event__date" type="date" v-model="startDate" v-if="editable">
  </div>
</template>

<script>
export default {
  name: 'EventBlockComponent',
  props: ['node', 'updateAttrs', 'editable'],
  computed: {
    startDate: {
      get() { return this.node.attrs.startDate },
      set(startDate) { this.updateAttrs({ startDate }) },
    },
    text: {
      get() { return this.node.attrs.text },
      set(text) { this.updateAttrs({ text }) },
    },
  },
  methods: {

  },
}
</script>

<style lang="scss">
.event {
  width: 100%;
  display: flex;
  background-color: rgba(0,0,0,.12);
  padding: 8px;
  &__content {
    flex: 1;
    border: 0;
    margin-right: 8px;
  }
  &__date {
    border: 0;
    height: 1rem;
  }
}
</style>
