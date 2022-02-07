import { Node } from "posthtml";
import { IOptions } from "./types";
declare const PostHTMLTokens: (options: IOptions) => (tree: Node, messages: Array<any>) => Node<string | void, void | import("posthtml").NodeAttributes>;
export default PostHTMLTokens;

//# sourceMappingURL=types.d.ts.map
