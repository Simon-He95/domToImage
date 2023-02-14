import domtoimage from 'dom-to-image'
import { download } from 'lazy-js-utils'
import type { IdomTransformToImage } from './types'

export function domTransformToImage(
  el: HTMLElement,
  type: IdomTransformToImage = 'png',
) {
  const map = {
    jpeg: 'toJpeg',
    blob: 'toBlob',
    png: 'toPng',
    svg: 'toSvg',
    pixel: 'toPixelData',
  }
  ;(domtoimage as any)[map[type]](el).then(download)
}
