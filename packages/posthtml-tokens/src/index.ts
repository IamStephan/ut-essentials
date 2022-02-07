import 'core-js'
import { merge } from 'lodash'
import { Node } from 'posthtml'
import * as yup from 'yup'
import { IOptions } from './types'

import traverse from './utils/traverse'
import handleTokens from './utils/handleTokens'

const AddTokenScopeMessage = yup.object({
  type: yup.string().oneOf(['add_token_scope']).required(),
  handled: yup.bool().optional(),
  scopeName: yup.string().required(),
  data: yup.object().required(),
})

const PostHTMLTokens =
  (options: IOptions) => (tree: Node, messages: Array<any>) => {
    const _tokenNamespaces = merge({}, options.tokens ?? {})
    let initialTokenState = {}

    messages = messages.map((message) => {
      if (AddTokenScopeMessage.isValidSync(message) && !message.handled) {
        return {
          ...messages,
          handled: true,
        }
      }

      return message
    })

    traverse(tree, initialTokenState, _tokenNamespaces, messages, handleTokens)

    return tree
  }

export default PostHTMLTokens
