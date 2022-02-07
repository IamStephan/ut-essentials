import { Node, Plugin } from "posthtml";
interface IOptions {
    pipelinePlugins?: Array<(tree: Node, messages: Array<any>) => Node>;
    plugins?: Array<Plugin<Node>>;
}
declare const PostHTMLExtends: (options: IOptions) => (tree: Node) => Node<string | void, void | import("posthtml").NodeAttributes>;
export default PostHTMLExtends;

//# sourceMappingURL=types.d.ts.map
