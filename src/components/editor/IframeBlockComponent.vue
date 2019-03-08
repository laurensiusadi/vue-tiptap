<template>
  <div class="iframe">
    <iframe class="iframe__embed" :src="src" :class="{ 'empty' : !src }"></iframe>
    <input class="iframe__input" @paste.stop type="text" v-model="src" v-if="editable" placeholder="Paste youtube embed url"/>
  </div>
</template>

<script>
export default {
  name: 'IframeBlockComponent',
  props: ['node', 'updateAttrs', 'editable'],
  computed: {
    src: {
      get() {
        return this.node.attrs.src
      },
      set(src) {
        this.updateAttrs({
          src,
        })
      },
    },
  },
}
</script>

<style lang="scss">
.iframe {
  width: 100%;
  padding-top: calc( 56.25% + 70px );
  display: block;
  height: 0;
  overflow: hidden;
  position: relative;
  &__embed {
    border: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc( 100% - 70px );
    &.empty {
      background: black;
    }
  }
  &__input {
    display: block;
    width: 100%;
    font: inherit;
    border: 0;
    text-align: center;
    background-color: rgba(0,0,0,.05);
    color: rgba(0,0,0,.7);
    padding: 0 0.5rem;
    height: 30px;
    line-height: 30px;
    position: absolute;
    margin-bottom: 30px;
    bottom: 0;
  }
}
</style>
