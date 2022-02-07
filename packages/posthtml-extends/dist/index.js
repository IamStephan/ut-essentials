var $jpO7i$lodash = require("lodash");
var $jpO7i$fs = require("fs");
var $jpO7i$posthtmlparser = require("posthtml-parser");
var $jpO7i$posthtmllibapi = require("posthtml/lib/api");
var $jpO7i$path = require("path");

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

$parcel$export(module.exports, "default", () => $7eb6f6572d795d3b$export$2e2bcd8739ae039);

const $543ac75f959eddad$export$fac2108599979873 = {
    use: {
        path: './',
        default: ''
    },
    page: {
        path: './src/globals',
        default: './page_base.html'
    },
    widget: {
        path: './src/widgets'
    }
};





var /**
 * PostHtml does not explicitly declare that it's exporting
 * the match api. So I'm importing the match function (expecting it to throw)
 * and then explicitly exporting it with some basic typings.
 */ $d0830fd031875216$export$2e2bcd8739ae039 = (_this, exp, callback)=>$jpO7i$posthtmllibapi.match.call(_this, exp, callback)
;



function $810f98954ac1dfd4$export$2e2bcd8739ae039(node, useTagsConfig) {
    const _tag = node.tag;
    const _useTagConfig = useTagsConfig[_tag];
    const pathPrefix = _useTagConfig.path;
    const defaultFile = _useTagConfig?.default ?? '';
    // src
    if (!node.attrs || !node.attrs.src) {
        // This means there isn't proper definitions
        if (!defaultFile) throw new Error('Insufficient data to find node content');
        // Using default file specified in the config
        return ($parcel$interopDefault($jpO7i$path)).resolve(pathPrefix, defaultFile);
    }
    const src = node.attrs.src;
    // Using src provided from tag
    return ($parcel$interopDefault($jpO7i$path)).resolve(pathPrefix, src);
}



function $32797a982d21a230$export$2e2bcd8739ae039(tag, tree) {
    const nodes = {
    };
    $d0830fd031875216$export$2e2bcd8739ae039(tree, {
        tag: tag
    }, (node)=>{
        if (!node.attrs || !node.attrs.name) {
            console.warn('No name was provided');
            return node;
        }
        nodes[node.attrs.name] = node;
        return node;
    });
    return nodes;
}


function $8037b5b8aba17e27$export$2e2bcd8739ae039(node) {
    let fillType = (node.attrs && node.attrs.type || '').toLowerCase();
    if (![
        'replace',
        'prepend',
        'append'
    ].includes(fillType)) fillType = 'replace';
    return fillType;
}


function $84e1a2e12f25cdd5$export$2e2bcd8739ae039(fillNode, slotNode, fillType) {
    fillNode = fillNode || [];
    slotNode = slotNode || [];
    switch(fillType){
        case 'replace':
            slotNode = fillNode;
            break;
        case 'prepend':
            slotNode = fillNode.concat(slotNode);
            break;
        case 'append':
            slotNode = slotNode.concat(fillNode);
            break;
        default:
            break;
    }
    return slotNode;
}


function $1813d7f836a275b3$var$_handleSlotFillNodes(layoutTree, useNode) {
    // Get slot and fill Nodes
    const slotNodes = $32797a982d21a230$export$2e2bcd8739ae039('slot', layoutTree);
    const fillNodes = $32797a982d21a230$export$2e2bcd8739ae039('fill', useNode.content);
    // loop over slot nodes and place them inside fill nodes
    for (const slotName of Object.keys(slotNodes)){
        const fillNode = fillNodes[slotName];
        // Check if a fill node exists with the defined name from the slot
        if (!fillNode) continue;
        // Content that needs to placed inside the fill slot
        const contentNode = slotNodes[slotName];
        // Hide Slot tag
        slotNodes[slotName].tag = false;
        // Insert the slot content into the fill content
        contentNode.content = $84e1a2e12f25cdd5$export$2e2bcd8739ae039(fillNode.content, contentNode.content, $8037b5b8aba17e27$export$2e2bcd8739ae039(fillNode));
        // Remove Fill nodes
        delete fillNodes[slotName];
    }
    return layoutTree;
}
var $1813d7f836a275b3$export$2e2bcd8739ae039 = $1813d7f836a275b3$var$_handleSlotFillNodes;


function $4f00bf8a90b44681$export$2e2bcd8739ae039(tree, options, messages) {
    const nodeExp = Object.keys(options.useTags).map((tag)=>({
            tag: tag
        })
    );
    let _tree = tree;
    $d0830fd031875216$export$2e2bcd8739ae039(_tree, nodeExp, (useNode)=>{
        let useNodeContentPath;
        let useNodeContent;
        // This is a reference item
        messages.push({
            type: 'altered_dom'
        });
        try {
            useNodeContentPath = $810f98954ac1dfd4$export$2e2bcd8739ae039(useNode, options.useTags);
        } catch (e) {
            console.warn(`Could not load file: ${e}`);
            return useNode;
        }
        try {
            useNodeContent = ($parcel$interopDefault($jpO7i$fs)).readFileSync(useNodeContentPath, 'utf-8');
        } catch (e1) {
            console.warn(`Could not load file: ${e1}`);
            return useNode;
        }
        // Recursively repeat this logic until the entire tree is built
        const newTree = $jpO7i$posthtmlparser.parser(useNodeContent);
        // Remove the tag from the ouput tree but keep it intact for the AST
        useNode.tag = false;
        // Slot and fill behaviour
        useNode.content = [
            $1813d7f836a275b3$export$2e2bcd8739ae039(newTree, useNode)
        ];
        return useNode;
    });
    return _tree;
}


const $7eb6f6572d795d3b$var$DefaultOptions = {
    useTags: {
        ...$543ac75f959eddad$export$fac2108599979873
    }
};
const $7eb6f6572d795d3b$var$PostHTMLExtends = (options)=>(tree, messages)=>{
        const mergedOptions = $jpO7i$lodash.merge($7eb6f6572d795d3b$var$DefaultOptions, options);
        return $4f00bf8a90b44681$export$2e2bcd8739ae039(tree, mergedOptions, messages);
    }
;
var // TODO: correct relative imports first before inserting into the main AST
$7eb6f6572d795d3b$export$2e2bcd8739ae039 = $7eb6f6572d795d3b$var$PostHTMLExtends;


