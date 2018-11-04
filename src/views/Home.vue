<template>
  <div class="home">
    <editor>
      <!-- Add HTML to the scoped slot called `content` -->
      <div slot="content" slot-scope="props">
        <p>Hi, I'm just a boring paragraph</p>
      </div>
    </editor>
  </div>
</template>

<script>
import Editor from '@/components/Editor'

export default {
  components: {
    Editor,
  },
}
</script>
