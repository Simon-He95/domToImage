<script setup lang="ts">
import { domTransformToImage } from '../../../src'

const wrapper = ref()
const inner = ref('<div>text</div>')
const innerClass = ref('div {\ncolor: red;\n}')
const download = (type: any) => {
  domTransformToImage(wrapper.value, type)
}
let effect: any
const vdata = 'data-v-domtoimage'
const reg = /\.*(\w+)[\s.>+\w]*{/gm
const addStyle = (content: string) => {
  const style = document.createElement('style')
  style.type = 'text/css'
  content = content.replace(reg, (v, k) => v.replace(k, `${k}[${vdata}]`))
  style.innerHTML = content
  document.head.appendChild(style)
  return () => document.head.removeChild(style)
}
watch(innerClass, async (v) => {
  if (effect)
    effect()
  effect = addStyle(v)
})
</script>

<template>
  <div flex="~ gap-4" justify-center mb4>
    <textarea v-model="inner" placeholder="html" border-1 border-gray border-rd-1 cols="50" rows="10" />
    <textarea v-model="innerClass" placeholder="style" border-1 border-gray border-rd-1 cols="50" rows="10" />
  </div>
  <div flex="~ gap3" justify-center mb-4>
    <button btn @click="download('png')">
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
    </button>
  </div>
  <div ref="wrapper" data-v-domtoimage v-html="inner" />
</template>

<style scoped>
</style>
