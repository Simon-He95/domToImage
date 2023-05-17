<script setup lang="ts">
import { addStyle } from 'lazy-js-utils'
import { domTransformToImage } from '../../../src'

const wrapper = ref()
const inner = ref('<div>text</div>')
const innerClass = ref('div {\ncolor: red;\n}')
const download = (type: any) => {
  domTransformToImage(wrapper.value, type)
}
let effect: any
const vdata = 'data-v-domtoimage'

watch(
  innerClass,
  async (v) => {
    if (effect)
      effect()
    effect = addStyle(v, vdata)
  },
  {
    immediate: true,
  },
)

const paste = async () => {
  const content = await window.navigator.clipboard.readText()
  if (content)
    inner.value = content
}
onMounted(paste)
</script>

<template>
  <div flex="~ gap-4" justify-center mb4 items-center>
    <textarea
      v-model="inner"
      placeholder="html"
      border-1
      border-gray
      border-rd-1
      p-2
      cols="50"
      rows="10"
    />
    <button i-carbon-paste @click="paste" />
    <textarea
      v-model="innerClass"
      placeholder="style"
      border-1
      border-gray
      border-rd-1
      p-2
      cols="50"
      rows="10"
    />
  </div>
  <div flex="~ gap3" justify-center mb-4>
    --------<button btn @click="download('png')">
      toPNG
    </button>
    <button btn @click="download('jpeg')">
      toJPEG
    </button>
    <button btn @click="download('blob')">
      toBlob
    </button>
    <button btn @click="download('svg')">
      toSVG
    </button>
    <button btn @click="download('pixel')">
      toPIXEL
    </button>--------
  </div>
  <div border-1 border-light bg-dark-400:100 max-h-200 min-h-50 text-left p4>
    <div ref="wrapper" data-v-domtoimage v-html="inner" />
  </div>
</template>

<style scoped></style>
