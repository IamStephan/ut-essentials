export type TToken = [string, string]

export type TScopedTokens = [TToken]

export interface IOptions {
  mode: 'development' | 'production'
  /**
   * @description Token scopes
   */
  tokens: Record<string, Record<string, string | Function>>
}

export type TTokenState = Record<string, string | Function>
export type TMessages = Array<{
  type: string
}>
