import 'core-js'
import { Node } from 'posthtml'
import { TTokenState } from '../types'

import replaceTokens from './replaceTokens'

function handleTokens(
  node: Node,
  tokenState: TTokenState,
  messages: Array<any>
) {
  if (typeof node === 'string') {
    return replaceTokens(node as string, tokenState, messages)
  }

  // Hanle tokens in attributes
  if (node.attrs) {
    /**
     * NOTE:
     * ======
     * Instead of looping over node attributes, I'm converting the
     * obj to a string, replacing them and reconvert to an obj.
     *
     * This is much faster than looping over every attr of a node
     * and checking/replacing tokens.
     */
    let _attr = JSON.stringify(node.attrs)
    node.attrs = JSON.parse(replaceTokens(_attr, tokenState, messages))
  }

  return node
}

export default handleTokens
