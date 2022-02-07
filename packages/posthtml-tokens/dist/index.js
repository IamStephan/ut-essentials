require("core-js");
var $7n91G$lodash = require("lodash");
var $7n91G$yup = require("yup");
var $7n91G$path = require("path");
var $7n91G$fs = require("fs");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $f85664fe4b25c2e5$export$2e2bcd8739ae039);




function $c1462427ee12ba52$var$traverse(tree, tokenState, tokenNamespaces, messages, cb) {
    if (Array.isArray(tree)) for(let i = 0; i < tree.length; i++){
        const _node = tree[i];
        if (_node.attrs && _node.attrs['token-scope']) {
            const tokenScope = _node.attrs['token-scope'];
            tokenState = $7n91G$lodash.merge(tokenState, $7n91G$lodash.get(tokenNamespaces, tokenScope));
        }
        tree[i] = $c1462427ee12ba52$var$traverse(cb(tree[i], tokenState, messages), tokenState, tokenNamespaces, messages, cb);
    }
    else if (tree && typeof tree === 'object' && Object.prototype.hasOwnProperty.call(tree, 'content')) $c1462427ee12ba52$var$traverse(tree.content, tokenState, tokenNamespaces, messages, cb);
    return tree;
}
var $c1462427ee12ba52$export$2e2bcd8739ae039 = $c1462427ee12ba52$var$traverse;





const $25d2a430ae725d6f$export$72c04af63de9061a = (pathFromRoot)=>{
    const fullPath = ($parcel$interopDefault($7n91G$path)).resolve(process.cwd(), pathFromRoot);
    return ($parcel$interopDefault($7n91G$fs)).readFileSync(fullPath, 'utf8');
};




function $6c874093ef0799ac$var$replaceTokens(text, tokenState, messages) {
    let _text = text;
    for (let [token, value] of Object.entries(tokenState))if (text.includes(token)) {
        messages.push({
            type: 'altered_dom'
        });
        if (typeof value === 'function') {
            const _value = value({
                readFile: $25d2a430ae725d6f$export$72c04af63de9061a
            });
            _text = text.replaceAll(token, _value);
        } else _text = text.replaceAll(token, value);
    }
    return _text;
}
var $6c874093ef0799ac$export$2e2bcd8739ae039 = $6c874093ef0799ac$var$replaceTokens;


function $3f4065ce40a51613$var$handleTokens(node, tokenState, messages) {
    if (typeof node === 'string') return $6c874093ef0799ac$export$2e2bcd8739ae039(node, tokenState, messages);
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
     */ let _attr = JSON.stringify(node.attrs);
        node.attrs = JSON.parse($6c874093ef0799ac$export$2e2bcd8739ae039(_attr, tokenState, messages));
    }
    return node;
}
var $3f4065ce40a51613$export$2e2bcd8739ae039 = $3f4065ce40a51613$var$handleTokens;


const $f85664fe4b25c2e5$var$AddTokenScopeMessage = $7n91G$yup.object({
    type: $7n91G$yup.string().oneOf([
        'add_token_scope'
    ]).required(),
    handled: $7n91G$yup.bool().optional(),
    scopeName: $7n91G$yup.string().required(),
    data: $7n91G$yup.object().required()
});
const $f85664fe4b25c2e5$var$PostHTMLTokens = (options)=>(tree, messages)=>{
        const _tokenNamespaces = $7n91G$lodash.merge({
        }, options.tokens ?? {
        });
        let initialTokenState = {
        };
        messages = messages.map((message)=>{
            if ($f85664fe4b25c2e5$var$AddTokenScopeMessage.isValidSync(message) && !message.handled) return {
                ...messages,
                handled: true
            };
            return message;
        });
        $c1462427ee12ba52$export$2e2bcd8739ae039(tree, initialTokenState, _tokenNamespaces, messages, $3f4065ce40a51613$export$2e2bcd8739ae039);
        return tree;
    }
;
var $f85664fe4b25c2e5$export$2e2bcd8739ae039 = $f85664fe4b25c2e5$var$PostHTMLTokens;


