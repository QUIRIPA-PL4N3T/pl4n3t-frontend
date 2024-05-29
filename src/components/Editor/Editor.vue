<script setup lang="ts">
import { Color } from '@tiptap/extension-color'
import { Editor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import BulletList from '@tiptap/extension-bullet-list'
import Document from '@tiptap/extension-document'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import TextStyle from '@tiptap/extension-text-style'
import Blockquote from '@tiptap/extension-blockquote'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'

interface ActiveText {
  textAlign: string
}

interface Saving {
  type: string
  time?: string
}

interface Menu {
  icon: string
  action: Function
  active: string | ActiveText
}

const { saving, content } = defineProps<{
  saving: Saving
  content: string
}>()
const emit = defineEmits<{
  (e: 'onChange', content: string): void
}>()
let editor = $ref<any>()
let menu = $ref<Menu[]>([])

editor = new Editor({
  content,
  extensions: [
    Document,
    Paragraph,
    Blockquote,
    BulletList,
    OrderedList,
    ListItem,
    StarterKit,
    TextStyle,
    Color,
    Underline,
    TextAlign.configure({
      types: ['paragraph', 'blockquote', 'bulletList', 'doc', 'listItem', 'orderedList'],
    }),
  ],
  onUpdate: () => {
    emit('onChange', editor.getHTML())
  },
})
menu = [
  {
    icon: 'radix-icons:letter-case-capitalize',
    action: () => null,
    active: 'italic',
  },
  {
    icon: 'radix-icons:font-bold',
    action: () => editor.chain().focus().toggleBold().run(),
    active: 'bold',
  },
  {
    icon: 'radix-icons:font-italic',
    action: () => editor.chain().focus().toggleItalic().run(),
    active: 'italic',
  },
  {
    icon: 'radix-icons:strikethrough',
    action: () => editor.chain().focus().toggleStrike().run(),
    active: 'strike',
  },
  {
    icon: 'radix-icons:underline',
    action: () => editor.chain().focus().toggleUnderline().run(),
    active: 'underline',
  },
  {
    icon: 'radix-icons:text-align-left',
    action: () => editor.chain().focus().setTextAlign('left').run(),
    active: { textAlign: 'left' },
  },
  {
    icon: 'radix-icons:text-align-center',
    action: () => editor.chain().focus().setTextAlign('center').run(),
    active: { textAlign: 'center' },
  },
  {
    icon: 'radix-icons:text-align-right',
    action: () => editor.chain().focus().setTextAlign('right').run(),
    active: { textAlign: 'right' },
  },
  {
    icon: 'radix-icons:text-align-justify',
    action: () => editor.chain().focus().setTextAlign('justify').run(),
    active: { textAlign: 'justify' },
  },
]
function getIcon(type: string) {
  switch (type) {
    case 'saving':
      return 'eos-icons:loading'
    case 'complete':
      return 'radix-icons:check'
    default:
      return 'radix-icons:clock'
  }
}
</script>

<template>
  <div v-if="editor" class="max-w-4xl mx-auto">
    <div class="py-2 px-3 flex flex-wrap justify-center items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
      <div class="flex flex-wrap items-center space-x-1 sm:pr-4">
        <input
          class="w-6"
          type="color"
          :value="editor.getAttributes('textStyle').color"
          @input="editor.chain().focus().setColor($event.target.value).run()"
        >
        <button
          v-for="item in menu"
          :key="item.icon"
          type="button"
          class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          :class="{ 'bg-blue-100': editor.isActive(item.active) }"
          @click="item.action"
        >
          <Icon :icon="item.icon" />
        </button>
        <button
          type="button"
          class="p-2 text-gray-500 flex flex-wrap justify-center items-center gap-2 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          disabled
        >
          <Icon :icon="getIcon(saving.type)" />
          {{ saving.time ? saving.time : '' }}
        </button>
      </div>
    </div>
    <div class="w-full mt-2 flex flex-wrap justify-center">
      <div class="editor-mark">
        <editor-content :editor="editor" />
      </div>
    </div>
  </div>
</template>

<style>
.editor-mark {
  left: calc(51.1496px);
  top: calc(20px);
  width: 210mm;
  padding: 10mm 15mm;
  transform: scale(1);
  min-height: 297mm;
  border: solid 1px
}
.tiptap {
    position: absolute;
    border: solid 1px;
    min-height: 297mm;
    box-sizing: border-box;
    transform-origin: center top;
    background:#333, white;
    box-shadow: #333, 0 1px 3px 1px rgba(60, 64, 67, 0.15);
    border: 1px;
    border-radius: 10px;
    transition: left 0.3s, top 0.3s;
    overflow: hidden;
    pointer-events: all;
}
.tiptap:focus-visible {
  outline: 3px
}
</style>
