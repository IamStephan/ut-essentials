import { readFile } from '../token-utils'
import { TTokenState, TMessages } from '../types'

function replaceTokens(
  text: string,
  tokenState: TTokenState,
  messages: TMessages
) {
  let _text = text

  for (let [token, value] of Object.entries(tokenState)) {
    if (text.includes(token)) {
      messages.push({
        type: 'altered_dom',
      })

      if (typeof value === 'function') {
        const _value = value({ readFile })
        _text = text.replaceAll(token, _value)
      } else {
        _text = text.replaceAll(token, value as string)
      }
    }
  }

  return _text
}

export default replaceTokens
