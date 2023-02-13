import domtoimage from 'dom-to-image'
import { download } from 'lazy-js-utils'

type IdomTransformToImage = 'jpeg' | 'blob' | 'png' | 'svg' | 'pixel'
export function domTransformToImage(el: HTMLElement, type: IdomTransformToImage = 'png') {
  const map = {
    jpeg: 'toJpeg',
    blob: 'toBlob',
    png: 'toPng',
    svg: 'toSvg',
    pixel: 'toPixelData',
  }
  domtoimage[map[type]](el).then(download)
}
