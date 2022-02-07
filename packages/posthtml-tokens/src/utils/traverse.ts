import { merge, get } from 'lodash'
import { Node } from 'posthtml'
import { IOptions, TTokenState, TMessages } from '../types'

function traverse(
  tree: Node,
  tokenState: TTokenState,
  tokenNamespaces: IOptions['tokens'],
  messages: TMessages,
  cb: Function
) {
  if (Array.isArray(tree)) {
    for (let i = 0; i < tree.length; i++) {
      const _node = tree[i] as Node

      if (_node.attrs && _node.attrs['token-scope']) {
        const tokenScope = _node.attrs['token-scope']

        tokenState = merge(tokenState, get(tokenNamespaces, tokenScope))
      }

      tree[i] = traverse(
        cb(tree[i], tokenState, messages),
        tokenState,
        tokenNamespaces,
        messages,
        cb
      )
    }
  } else if (
    tree &&
    typeof tree === 'object' &&
    Object.prototype.hasOwnProperty.call(tree, 'content')
  ) {
    traverse(tree.content as any, tokenState, tokenNamespaces, messages, cb)
  }

  return tree
}

export default traverse
