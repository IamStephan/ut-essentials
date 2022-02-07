import { Node } from "posthtml";
import { IOptions } from "./types";
declare const PostHTMLExtends: (options: IOptions) => (tree: Node, messages: Array<any>) => Node<string | void, void | import("posthtml").NodeAttributes>;
export default PostHTMLExtends;

//# sourceMappingURL=types.d.ts.map
