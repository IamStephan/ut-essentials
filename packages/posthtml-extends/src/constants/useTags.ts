import { IOptions } from '../types'

export const TemplateUseTags: IOptions['useTags'] = {
  use: {
    path: './',
    default: '',
  },
  page: {
    path: './src/globals',
    default: './page_base.html',
  },
  widget: {
    path: './src/widgets',
  },
}
