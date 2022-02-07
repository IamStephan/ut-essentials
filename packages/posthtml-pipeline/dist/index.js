var $cpcoz$yup = require("yup");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $87eb75fde0e0d655$export$2e2bcd8739ae039);

const $87eb75fde0e0d655$var$LOOP_LIMIT = 50;
const $87eb75fde0e0d655$var$AlteredDomMessageSchema = $cpcoz$yup.object({
    type: $cpcoz$yup.string().oneOf([
        'altered_dom'
    ]).required()
});
const $87eb75fde0e0d655$var$PostHTMLExtends = (options)=>(tree)=>{
        const pipelinePlugins = options.pipelinePlugins ?? [];
        const plugins = options.plugins ?? [];
        let messages = [];
        let _tree = tree;
        let isComplete = false;
        let loopCounter = 0;
        while(!isComplete && loopCounter <= $87eb75fde0e0d655$var$LOOP_LIMIT){
            isComplete = true;
            loopCounter++;
            pipelinePlugins.forEach((plugin)=>{
                _tree = plugin(_tree, messages);
            });
            plugins.forEach((plugin)=>{
                _tree = plugin(_tree);
            });
            messages = messages.map((message)=>{
                if ($87eb75fde0e0d655$var$AlteredDomMessageSchema.isValidSync(message)) {
                    isComplete = false;
                    return null;
                }
                return message;
            });
        }
        return _tree;
    }
;
var $87eb75fde0e0d655$export$2e2bcd8739ae039 = $87eb75fde0e0d655$var$PostHTMLExtends;


