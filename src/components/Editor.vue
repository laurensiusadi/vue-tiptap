<template>
	<div class="editor">
    <editor-menu-bubble :editor="editor">
      <div
        slot-scope="{ commands, isActive, menu }"
        class="menububble"
        :class="{ 'is-active': menu.isActive }"
        :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
      >
        <button
          class="menububble__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
          title="Bold"
        >
          <icon name="bold" />
        </button>

        <button
          class="menububble__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
          title="Italic"
        >
          <icon name="italic" />
        </button>

        <button
          class="menububble__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
          title="Underline"
        >
          <icon name="underline" />
        </button>

        <button
          class="menububble__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
          title="Strikethrough"
        >
          <icon name="strike" />
        </button>

        <button
          class="menububble__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
          title="Inline Code"
        >
          <icon name="code" />
        </button>

        <button
          class="menububble__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
          title="Bullet List"
        >
          <icon name="ul" />
        </button>

        <button
          class="menububble__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
          title="Number List"
        >
          <icon name="ol" />
        </button>
        
        <button
          class="menububble__button"
          :class="{ 'is-active': isActive.todo_list() }"
          @click="commands.todo_list"
          title="Todo List"
        >
          <icon name="checklist" />
        </button>

      </div>
    </editor-menu-bubble>
		<editor-floating-menu :editor="editor">
      <div
        slot-scope="{ commands, isActive, menu }"
        class="editor__floating-menu"
        :class="{ 'is-active': menu.isActive }"
        :style="`top: ${menu.top}px`"
      >
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
          title="Heading Large"
        >
          H1
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
          title="Heading Medium"
        >
          H2
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
          title="Heading Small"
        >
          H3
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
          title="Bullet List"
        >
          <icon name="ul" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
          title="Number List"
        >
          <icon name="ol" />
        </button>
        
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.todo_list() }"
          @click="commands.todo_list"
          title="Todo List"
        >
          <icon name="checklist" />
        </button>

				<button
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
          title="Code Block"
        >
					<icon name="code" />
				</button>

      </div>
		</editor-floating-menu>
		<editor-content class="editor__content" :editor="editor"/>
	</div>
</template>

<script>
import { Editor, EditorContent, EditorFloatingMenu, EditorMenuBubble } from 'tiptap'
import { Blockquote, Bold, BulletList, Code, CodeBlock,
	HardBreak, Heading, History, Italic, Link, ListItem,
	OrderedList, Strike, TodoList, Underline } from 'tiptap-extensions'
import TodoItem from '@/components/editor/TodoItem'
import Icon from '@/components/Icon'

export default {
	components: {
    Editor,
    EditorContent,
    EditorFloatingMenu,
    EditorMenuBubble,
    Icon,
	},
	data() {
		return {
			editor: null,
      customProp: 2,
		}
	},
	mounted() {
    this.editor = new Editor({
			extensions: [
				new Blockquote(),
				new BulletList(),
				new CodeBlock(),
				new HardBreak(),
				new Heading({ levels: [1, 2, 3] }),
				new ListItem(),
				new OrderedList(),
				new TodoItem(),
				new TodoList(),
				new Bold(),
				new Strike(),
				new Code(),
				new Italic(),
				new Link(),
				new Underline(),
        new History()
			],
			content: `
				<h2>
					Hiding Menu Bar
				</h2>
				<p>
					Click into this text to see the menu. Click outside and the menu will disappear. It's like magic.
				</p>
				<ul data-type="todo_list">
					<li data-block-id="32f1dff3-7033-4000-9009-a13e7be730d2" data-type="todo_item" data-done="true">
						Buy beer
					</li>
					<li data-type="todo_item" data-done="true">
						Buy meat
					</li>
					<li data-type="todo_item" data-done="true" data-end-date="2019-03-06">
						Buy milk
					</li>
					<li data-type="todo_item" data-done="false">
						Call mom
					</li>
				</ul>
			`,
		})
	},
	beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style lang="scss">
.editor {
  max-width: 900px;
  margin: 0 auto;
  padding: 10px 15px;
  position: relative;
  &__floating-menu {
    position: absolute;
    margin-top: -0.25rem;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s, visibility 0.2s;
    &.is-active {
      opacity: 1;
      visibility: visible;
    }
  }
}

</style>
