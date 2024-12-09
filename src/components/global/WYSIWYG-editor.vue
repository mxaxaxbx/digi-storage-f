<template>
  <div class="border border-gray-500 rounded">
    <!-- Toolbar -->
    <div class="
      bg-gray-100
      flex space-x-4 flex-wrap
      p-2 border-b-4
    ">
      <!-- Font selector -->
      <label for="font" class="sr-only">Font</label>
      <select id="font" @change="setFont" class="select-style">
        <option disabled selected>Font</option>
        <option v-for="font in fonts" :key="font" :value="font">
          {{ font }}
        </option>
      </select>

      <!-- Heading selector -->
      <label for="heading" class="sr-only">Font</label>
      <select id="heading" @change="setHeading" class="select-style">
        <option disabled selected>Style</option>
        <option
          v-for="h in headings"
          :key="h.tag"
          :value="h.tag"
          :data-style="h.style"
        >
          {{ h.label }}
        </option>
      </select>

      <button
        v-for="cmd in commands"
        :key="cmd.name"
        @click="(e) => format(e, cmd.command)"
        class="px-2 py-1 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
      >
        {{ cmd.icon }}
      </button>
    </div>

    <!-- Editable content area -->
    <div
      ref="editor"
      contenteditable="true"
      class="min-h-32 p-4 focus:bg-gray-50 focus:outline-none"
      @input="updateContent"
    ></div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  defineEmits,
  defineProps,
  watch,
  onMounted,
} from 'vue';

const editor = ref<HTMLElement | null>(null);

const emits = defineEmits(['update:content']);

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});

const fonts = [
  'Arial',
  'Courier New',
  'Georgia',
  'Lucida Sans Unicode',
  'Tahoma',
  'Times New Roman',
  'Trebuchet MS',
  'Verdana',
];

const headings = [
  { label: 'Normal', tag: 'p' },
  { label: 'H1', tag: 'h1', style: 'font-size: 2em;' },
  { label: 'H2', tag: 'h2', style: 'font-size: 1.5em;' },
  { label: 'H3', tag: 'h3', style: 'font-size: 1.17em;' },
  { label: 'H4', tag: 'h4', style: 'font-size: 1.12em;' },
  { label: 'H5', tag: 'h5', style: 'font-size: 0.83em;' },
  { label: 'H6', tag: 'h6', style: 'font-size: 0.75em;' },
];

const commands = [
  { name: 'Bold', icon: 'B', command: 'bold' },
  { name: 'Italic', icon: 'I', command: 'italic' },
  { name: 'Underline', icon: 'U', command: 'underline' },
];

function format(e: Event, command: string, value?: string, style?: string) {
  e.preventDefault();

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) {
    console.warn('No text selected');
    return;
  }

  const range = selection.getRangeAt(0);

  if (range.collapsed) {
    console.warn('Selection is collapsed; nothing to format.');
    return;
  }

  const container = range.commonAncestorContainer.nodeType === 3
    ? range.commonAncestorContainer.parentNode as HTMLElement
    : range.commonAncestorContainer as HTMLElement;

  if (command === 'formatBlock') {
    const blockElement = document.createElement(value || 'p');
    if (style) {
      blockElement.style.cssText = style;
    }
    blockElement.appendChild(range.extractContents());
    range.insertNode(blockElement);
    selection.removeAllRanges();
    selection.addRange(range);
    return;
  }

  const parentNode = container.closest('span') as HTMLElement;
  const computedStyle = parentNode ? window.getComputedStyle(parentNode) : null;

  let shouldRemoveStyle = false;

  switch (command) {
    case 'bold':
      shouldRemoveStyle = computedStyle?.fontWeight === 'bold' || computedStyle?.fontWeight === '700';
      break;
    case 'italic':
      shouldRemoveStyle = computedStyle?.fontStyle === 'italic';
      break;
    case 'underline':
      shouldRemoveStyle = computedStyle?.textDecoration?.includes('underline') ?? false;
      break;
    case 'fontName':
      if (value) {
        container.style.fontFamily = value;
      }
      return;
    default:
      console.warn(`Unsupported command: ${command}`);
      return;
  }

  if (shouldRemoveStyle && parentNode) {
    // Unwrap the span if the style is applied
    const fragment = document.createDocumentFragment();
    while (parentNode.firstChild) {
      fragment.appendChild(parentNode.firstChild);
    }
    parentNode.replaceWith(fragment);
  } else {
    // Apply the new style
    const span = document.createElement('span');
    switch (command) {
      case 'bold':
        span.style.fontWeight = 'bold';
        break;
      case 'italic':
        span.style.fontStyle = 'italic';
        break;
      case 'underline':
        span.style.textDecoration = 'underline';
        break;
      default:
        console.warn(`Unsupported command: ${command}`);
        return;
    }
    span.appendChild(range.extractContents());
    range.insertNode(span);
  }

  selection.removeAllRanges();
  selection.addRange(range);
  editor.value?.focus();
}

function updateContent() {
  if (editor.value) {
    emits('update:content', editor.value.innerHTML);
  }
}

function setFont(e: Event) {
  const target = e.target as HTMLSelectElement;
  format(e, 'fontName', target.value);
}

function setHeading(e: Event) {
  const target = e.target as HTMLSelectElement;
  const style = headings.find((h) => h.tag === target.value)?.style;
  format(e, 'formatBlock', target.value, style);
}

onMounted(() => {
  if (editor.value) {
    editor.value.innerHTML = props.content;
  }
});

watch(() => props.content, () => {
  if (editor.value) {
    editor.value.innerHTML = props.content;
  }
});
</script>
