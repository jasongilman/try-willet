ace.define("ace/mode/willet_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var WilletHighlightRules = function() {

    this.$rules = {
        start: [{
            token: "text",
            regex: /(?=([A-Za-z0-9])(?:\((?:[^\(\)]*)?\)|[\w$]+)\s*=>)/,
            push: [{
                token: "text",
                regex: /(})|(?!\s*{|\G\(|\G[\w$]+|\s*\/\*|\s*\/\/)(?=\s*\S)/,
                next: "pop"
            }, {
                include: "#comments"
            }, {
                include: "#function_body"
            }, {
                token: "meta.function.arrow.willet",
                regex: /\G/,
                push: [{
                    token: "meta.function.arrow.willet",
                    regex: /(=>)/,
                    next: "pop"
                }, {
                    include: "#arrow_function_innards"
                }, {
                    defaultToken: "meta.function.arrow.willet"
                }]
            }]
        }, {
            token: "text",
            regex: /(?=(?:\.)?[a-zA-Z_$][\w$]*\s*=\s*(?:\((?:[^\(\)]*)?\)|[\w$]+)\s*=>)/,
            push: [{
                token: "text",
                regex: /(})|(?!\s*{|\G(?:\.)?[a-zA-Z_$][\w$]*\s*=\s*\(|\G(?:\.)?[a-zA-Z_$][\w$]*\s*=\s*[\w$]+|\s*\/\*|\s*\/\/)(?=\s*\S)/,
                next: "pop"
            }, {
                include: "#comments"
            }, {
                include: "#function_body"
            }, {
                token: "meta.function.arrow.willet",
                regex: /\G/,
                push: [{
                    token: "meta.function.arrow.willet",
                    regex: /(=>)/,
                    next: "pop"
                }, {
                    token: [
                        "meta.delimiter.method.period.willet",
                        "entity.name.function.willet",
                        "text",
                        "keyword.operator.assignment.willet"
                    ],
                    regex: /\G((?:\.)?)([a-zA-Z_$][\w$]*)(\s*)(=)/
                }, {
                    include: "#arrow_function_innards"
                }, {
                    defaultToken: "meta.function.arrow.willet"
                }]
            }]
        }, {
            token: "text",
            regex: /(?=\b[a-zA-Z_$][\w$]*\s*:\s*(?:\((?:[^\(\)]*)?\)|[\w$]+)\s*=>)/,
            push: [{
                token: "text",
                regex: /(})|(?!\s*{|\G[\w$]+\s*:|\s*\/\*|\s*\/\/)(?=\s*\S)/,
                next: "pop"
            }, {
                include: "#comments"
            }, {
                include: "#function_body"
            }, {
                token: "meta.function.arrow.json.willet",
                regex: /\G/,
                push: [{
                    token: "meta.function.arrow.json.willet",
                    regex: /(=>)/,
                    next: "pop"
                }, {
                    token: [
                        "entity.name.function.willet",
                        "text",
                        "keyword.operator.assignment.willet",
                        "text"
                    ],
                    regex: /\b([a-zA-Z_$][\w$]*)(\s*)(:)(\s*)/
                }, {
                    include: "#arrow_function_innards"
                }, {
                    defaultToken: "meta.function.arrow.json.willet"
                }]
            }]
        }, {
            token: "text",
            regex: /(?=(?:'[^']*?'|"[^"]*?")\s*:\s*(?:\((?:[^\(\)]*)?\)|[\w$]+)\s*=>)/,
            push: [{
                token: "text",
                regex: /(})|(?!\G(?:'[^']*?'|"[^"]*?")|\s*{|\s*\/\*|\s*\/\/)(?=\s*\S)/,
                next: "pop"
            }, {
                include: "#comments"
            }, {
                include: "#function_body"
            }, {
                token: "meta.function.arrow.json.willet",
                regex: /\G/,
                push: [{
                    token: "meta.function.arrow.json.willet",
                    regex: /(=>)/,
                    next: "pop"
                }, {
                    token: [
                        "punctuation.definition.string.begin.willet",
                        "entity.name.function.willet",
                        "punctuation.definition.string.end.willet",
                        "punctuation.definition.string.begin.willet",
                        "entity.name.function.willet",
                        "punctuation.definition.string.end.willet",
                        "text",
                        "keyword.operator.assignment.willet"
                    ],
                    regex: /(?:(')([^']*?)(')|(")([^"]*?)("))(\s*)(:)/
                }, {
                    include: "#arrow_function_innards"
                }, {
                    defaultToken: "meta.function.arrow.json.willet"
                }]
            }]
        }, {
            token: "storage.type.function.arrow.willet",
            regex: /=>/
        }, {
            token: [
                "keyword.operator.new.willet",
                "meta.class.instance.constructor.willet",
                "entity.name.type.instance.willet"
            ],
            regex: /(new)(\s+)([\w$]+[\w.$]*)/
        }, {
            token: "entity.name.type.object.console.willet",
            regex: /([\w$])console(?![\w$]|\s*:)/,
            push: [{
                token: "text",
                regex: /(\))|(?=(?!\s*\/\/|\s*\/\*|\s*\.\s*(?:assert|clear|debug|error|info|log|profile|profileEnd|time|timeEnd|warn)\s*\()\s*\S)/,
                next: "pop"
            }, {
                include: "#comments"
            }, {
                token: [
                    "meta.method-call.willet",
                    "meta.delimiter.method.period.willet",
                    "meta.method-call.willet",
                    "support.function.console.willet",
                    "meta.method-call.willet"
                ],
                regex: /(\s*)(\.)(\s*)(\w+)(\s*)(?=\()/,
                push: [{
                    token: "meta.method-call.willet",
                    regex: /(\))/,
                    next: "pop"
                }, {
                    include: "#arguments"
                }, {
                    defaultToken: "meta.method-call.willet"
                }]
            }]
        }, {
            token: "support.class.math.willet",
            regex: /([\w$])Math(?![\w$]|\s*:)/,
            push: [{
                token: "text",
                regex: /(E|LN10|LN2|LOG10E|LOG2E|PI|SQRT1_2|SQRT2|\))|(?=(?!\s*\/\/|\s*\/\*|\s*\.\s*(?:(?:abs|acos|acosh|asin|asinh|atan|atan2|atanh|cbrt|ceil|clz32|cos|cosh|exp|expm1|floor|fround|hypot|imul|log|log10|log1p|log2|max|min|pow|random|round|sign|sin|sinh|sqrt|tan|tanh|trunc)\s*\(|(?:E|LN10|LN2|LOG10E|LOG2E|PI|SQRT1_2|SQRT2)(?!\s*[\w$(])))\s*\S)/,
                next: "pop"
            }, {
                include: "#comments"
            }, {
                token: [
                    "meta.method-call.willet",
                    "meta.delimiter.method.period.willet",
                    "meta.method-call.willet",
                    "support.function.math.willet",
                    "meta.method-call.willet"
                ],
                regex: /(\s*)(\.)(\s*)(\w+)(\s*)(?=\()/,
                push: [{
                    token: "meta.method-call.willet",
                    regex: /(\))/,
                    next: "pop"
                }, {
                    include: "#arguments"
                }, {
                    defaultToken: "meta.method-call.willet"
                }]
            }, {
                token: [
                    "text",
                    "meta.delimiter.property.period.willet",
                    "text",
                    "support.constant.property.math.willet"
                ],
                regex: /(\s*)(\.)(\s*)(\w+)\b/
            }]
        }, {
            token: "support.class.promise.willet",
            regex: /([\w$])Promise(?![\w$]|\s*:)/,
            push: [{
                token: "text",
                regex: /(\))|(?=(?!\s*\/\/|\s*\/\*|\s*\.\s*(?:all|race|reject|resolve)\s*\()\s*\S)/,
                next: "pop"
            }, {
                include: "#comments"
            }, {
                token: [
                    "meta.method-call.willet",
                    "meta.delimiter.method.period.willet",
                    "meta.method-call.willet",
                    "support.function.promise.willet",
                    "meta.method-call.willet"
                ],
                regex: /(\s*)(\.)(\s*)(\w+)(\s*)(?=\()/,
                push: [{
                    token: "meta.method-call.willet",
                    regex: /(\))/,
                    next: "pop"
                }, {
                    include: "#arguments"
                }, {
                    defaultToken: "meta.method-call.willet"
                }]
            }]
        }, {
            include: "#strings"
        }, {
            include: "#comments"
        }, {
            token: "storage.type.var.willet",
            regex: /(\.)\blet(?!\s*:)\b/
        }, {
            token: "storage.type.const.willet",
            regex: /(\.)\bconst(?!\s*:)\b/,
            push: [{
                token: [
                    "keyword.operator.$1.willet",
                    "punctuation.terminator.statement.willet",
                    "keyword.operator.assignment.willet"
                ],
                regex: /(\bof\b|\bin\b)|(;)|(=)|([,{])$/,
                next: "pop"
            }, {
                token: [
                    "text",
                    "text",
                    "keyword.operator.assignment.willet",
                    "text",
                    "constant.other.willet"
                ],
                regex: /([$_a-zA-Z][$_a-zA-Z0-9]*)(\s*)(:)(\s*)((?:[$_a-zA-Z][$_a-zA-Z0-9]*)?)/
            }, {
                token: "constant.other.willet",
                regex: /[$_a-zA-Z][$_a-zA-Z0-9]*/
            }, {
                token: "keyword.operator.spread.willet",
                regex: /\.\.\./
            }, {
                token: "meta.delimiter.object.comma.willet",
                regex: /,/
            }, {
                token: "meta.brace.round.willet",
                regex: /\(|\)/
            }, {
                token: "meta.brace.curly.willet",
                regex: /{|}/
            }, {
                token: "meta.brace.square.willet",
                regex: /\[|\]/
            }, {
                include: "#comments"
            }]
        }, {
            token: "keyword.control.willet",
            regex: /(?:(\.{3})|(\.))\bawait(?!\s*:)\b/
        }, {
            token: "keyword.control.willet",
            regex: /(\.)\b(?:catch|else|finally|for|if|elseif|throw|try)(?!\s*:)\b/
        }, {
            token: "keyword.operator.$1.willet",
            regex: /(\.)\b(?:delete|new|typeof)(?!\s*:)\b/
        }, {
            token: "keyword.operator.spread.willet",
            regex: /\.\.\./
        }, {
            token: "constant.language.boolean.$1.willet",
            regex: /(\.)\b(?:true|false)(?!\s*:)\b/
        }, {
            token: "constant.language.null.willet",
            regex: /(\.)\bnull(?!\s*:)\b/
        }, {
            token: "support.class.willet",
            regex: /(\$)\b(?:Array|ArrayBuffer|Atomics|Boolean|DataView|Date|Error|EvalError|Float32Array|Float64Array|Function|Generator|GeneratorFunction|Int16Array|Int32Array|Int8Array|InternalError|Intl|JSON|Map|Number|Object|Proxy|RangeError|ReferenceError|Reflect|RegExp|Set|SharedArrayBuffer|SIMD|String|Symbol|SyntaxError|TypeError|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|URIError|WeakMap|WeakSet)\b/
        }, {
            token: [
                "meta.delimiter.property.period.willet",
                "text",
                "support.variable.property.willet",
                "support.constant.willet"
            ],
            regex: /(\.)(\s*)(?:(constructor|length|prototype)|(EPSILON|MAX_SAFE_INTEGER|MAX_VALUE|MIN_SAFE_INTEGER|MIN_VALUE|NEGATIVE_INFINITY|POSITIVE_INFINITY))\b/
        }, {
            token: [
                "meta.delimiter.property.period.willet",
                "text",
                "support.constant.dom.willet",
                "support.variable.property.dom.willet"
            ],
            regex: /(\.)(\s*)(?:(ATTRIBUTE_NODE|CDATA_SECTION_NODE|COMMENT_NODE|DOCUMENT_FRAGMENT_NODE|DOCUMENT_NODE|DOCUMENT_TYPE_NODE|DOMSTRING_SIZE_ERR|ELEMENT_NODE|ENTITY_NODE|ENTITY_REFERENCE_NODE|HIERARCHY_REQUEST_ERR|INDEX_SIZE_ERR|INUSE_ATTRIBUTE_ERR|INVALID_CHARACTER_ERR|NO_DATA_ALLOWED_ERR|NO_MODIFICATION_ALLOWED_ERR|NOT_FOUND_ERR|NOT_SUPPORTED_ERR|NOTATION_NODE|PROCESSING_INSTRUCTION_NODE|TEXT_NODE|WRONG_DOCUMENT_ERR)|(_content|[xyz]|abbr|above|accept|acceptCharset|accessKey|action|align|[av]Link(?:color)?|all|alt|anchors|appCodeName|appCore|applets|appMinorVersion|appName|appVersion|archive|areas|arguments|attributes|availHeight|availLeft|availTop|availWidth|axis|background|backgroundColor|backgroundImage|below|bgColor|body|border|borderBottomWidth|borderColor|borderLeftWidth|borderRightWidth|borderStyle|borderTopWidth|borderWidth|bottom|bufferDepth|callee|caller|caption|cellPadding|cells|cellSpacing|ch|characterSet|charset|checked|childNodes|chOff|cite|classes|className|clear|clientInformation|clip|clipBoardData|closed|code|codeBase|codeType|color|colorDepth|cols|colSpan|compact|complete|components|content|controllers|cookie|cookieEnabled|cords|cpuClass|crypto|current|data|dateTime|declare|defaultCharset|defaultChecked|defaultSelected|defaultStatus|defaultValue|defaultView|defer|description|dialogArguments|dialogHeight|dialogLeft|dialogTop|dialogWidth|dir|directories|disabled|display|docmain|doctype|documentElement|elements|embeds|enabledPlugin|encoding|enctype|entities|event|expando|external|face|fgColor|filename|firstChild|fontFamily|fontSize|fontWeight|form|formName|forms|frame|frameBorder|frameElement|frames|hasFocus|hash|headers|height|history|host|hostname|href|hreflang|hspace|htmlFor|httpEquiv|id|ids|ignoreCase|images|implementation|index|innerHeight|innerWidth|input|isMap|label|lang|language|lastChild|lastIndex|lastMatch|lastModified|lastParen|layer[sXY]|left|leftContext|lineHeight|link|linkColor|links|listStyleType|localName|location|locationbar|longDesc|lowsrc|lowSrc|marginBottom|marginHeight|marginLeft|marginRight|marginTop|marginWidth|maxLength|media|menubar|method|mimeTypes|multiline|multiple|name|nameProp|namespaces|namespaceURI|next|nextSibling|nodeName|nodeType|nodeValue|noHref|noResize|noShade|notationName|notations|noWrap|object|offscreenBuffering|onLine|onreadystatechange|opener|opsProfile|options|oscpu|outerHeight|outerWidth|ownerDocument|paddingBottom|paddingLeft|paddingRight|paddingTop|page[XY]|page[XY]Offset|parent|parentLayer|parentNode|parentWindow|pathname|personalbar|pixelDepth|pkcs11|platform|plugins|port|prefix|previous|previousDibling|product|productSub|profile|profileend|prompt|prompter|protocol|publicId|readOnly|readyState|referrer|rel|responseText|responseXML|rev|right|rightContext|rowIndex|rows|rowSpan|rules|scheme|scope|screen[XY]|screenLeft|screenTop|scripts|scrollbars|scrolling|sectionRowIndex|security|securityPolicy|selected|selectedIndex|selection|self|shape|siblingAbove|siblingBelow|size|source|specified|standby|start|status|statusbar|statusText|style|styleSheets|suffixes|summary|systemId|systemLanguage|tagName|tags|target|tBodies|text|textAlign|textDecoration|textIndent|textTransform|tFoot|tHead|title|toolbar|top|type|undefined|uniqueID|updateInterval|URL|URLUnencoded|useMap|userAgent|userLanguage|userProfile|vAlign|value|valueType|vendor|vendorSub|version|visibility|vspace|whiteSpace|width|X[MS]LDocument|zIndex))\b/
        }, {
            token: "support.variable.willet",
            regex: /(\.)\b(?:module|exports|__filename|__dirname|global|process)(?!\s*:)\b/
        }, {
            token: "constant.language.willet",
            regex: /\b(?:Infinity|NaN|undefined)\b/
        }, {
            token: [
                "string.regexp.willet",
                "punctuation.definition.string.begin.willet"
            ],
            regex: /([\[{=(?:+*,!~-]|^|return|=>|&&|\|\|)(\s*)(\/)(?![\/*+?])(?=.*\/)/,
            push: [{
                token: [
                    "punctuation.definition.string.end.willet",
                    "meta.flag.regexp"
                ],
                regex: /(\/)([gimsuy]*)/,
                next: "pop"
            }, {
                include: "source.js.regexp"
            }, {
                defaultToken: "string.regexp.willet"
            }]
        }, {
            include: "#operators"
        }, {
            include: "#method_calls"
        }, {
            include: "#function_calls"
        }, {
            include: "#numbers"
        }, {
            include: "#objects"
        }, {
            include: "#properties"
        }, {
            token: "constant.other.willet",
            regex: /(\.|[\w$])(?![_\$]+[^A-Z0-9_$])\$*\b[A-Z_$][A-Z0-9_$]*\b\$*/
        }, {
            token: "invalid.illegal.identifier.willet",
            regex: /(\$)\b[0-9]+[\w$]*/
        }, {
            token: "punctuation.terminator.statement.willet",
            regex: /\;/
        }, {
            token: "meta.delimiter.object.comma.willet",
            regex: /,/
        }, {
            token: "meta.delimiter.method.period.willet",
            regex: /\./
        }, {
            token: [
                "punctuation.section.scope.begin.willet",
                "punctuation.section.scope.end.willet"
            ],
            regex: /({)(})/
        }, {
            todo: {
                token: "meta.brace.curly.willet",
                regex: /{/,
                push: [{
                    token: "meta.brace.curly.willet",
                    regex: /}/,
                    next: "pop"
                }, {
                    include: "$self"
                }]
            }
        }, {
            todo: {
                token: "meta.brace.round.willet",
                regex: /\(/,
                push: [{
                    token: "meta.brace.round.willet",
                    regex: /\)/,
                    next: "pop"
                }, {
                    include: "$self"
                }]
            }
        }, {
            token: "meta.brace.square.willet",
            regex: /\[|\]/
        }, {
            token: "comment.line.shebang.willet",
            regex: /\A#!.*$/
        }],
        "#arguments": [{
            todo: {
                token: "punctuation.definition.arguments.begin.bracket.round.willet",
                regex: /\(/,
                push: [{
                    token: "punctuation.definition.arguments.end.bracket.round.willet",
                    regex: /\)/,
                    next: "pop"
                }, {
                    include: "$self"
                }, {
                    defaultToken: "meta.arguments.willet"
                }]
            }
        }],
        "#arrow_function_innards": [{
            token: "storage.type.function.arrow.willet",
            regex: /=>/
        }, {
            include: "#function_params"
        }, {
            token: "variable.parameter.function.willet",
            regex: /[a-zA-Z_$][\w$]*(?=\s*=>)/
        }, {
            token: "invalid.illegal.identifier.willet",
            regex: /\d[\w$]*/
        }],
        "#comments": [{
            token: [
                "punctuation.definition.comment.begin.willet",
                "punctuation.definition.comment.end.willet"
            ],
            regex: /(\/\*)(\*\/)/
        }, {
            token: "punctuation.definition.comment.begin.willet",
            regex: /\/\*\*/,
            push: [{
                token: "punctuation.definition.comment.end.willet",
                regex: /\*\//,
                next: "pop"
            }, {
                include: "source.jsdoc"
            }, {
                defaultToken: "comment.block.documentation.willet"
            }]
        }, {
            token: "punctuation.definition.comment.begin.willet",
            regex: /\/\*/,
            push: [{
                token: "punctuation.definition.comment.end.willet",
                regex: /\*\//,
                next: "pop"
            }, {
                defaultToken: "comment.block.willet"
            }]
        }, {
            token: "punctuation.definition.comment.willet",
            regex: /\/\//,
            push: [{
                token: "comment.line.double-slash.willet",
                regex: /$/,
                next: "pop"
            }, {
                defaultToken: "comment.line.double-slash.willet"
            }]
        }],
        "#function_body": [{
            todo: {
                token: "punctuation.definition.function.body.begin.bracket.curly.willet",
                regex: /{/,
                push: [{
                    token: "punctuation.definition.function.body.end.bracket.curly.willet",
                    regex: /}/,
                    next: "pop"
                }, {
                    include: "$self"
                }]
            }
        }],
        "#function_calls": [{
            token: [
                "meta.function-call.willet",
                "meta.function-call.willet"
            ],
            regex: /([\w$]+)(\s*)(?=\()/,
            push: [{
                token: "meta.function-call.willet",
                regex: /(\))/,
                next: "pop"
            }, {
                include: "#arguments"
            }, {
                defaultToken: "meta.function-call.willet"
            }]
        }],
        "#function_params": [{
            todo: {
                token: "punctuation.definition.parameters.begin.bracket.round.willet",
                regex: /\(/,
                push: [{
                    token: "punctuation.definition.parameters.end.bracket.round.willet",
                    regex: /\)/,
                    next: "pop"
                }, {
                    token: [
                        "keyword.operator.spread.willet",
                        "variable.parameter.rest.function.willet"
                    ],
                    regex: /(\.\.\.)([a-zA-Z_$][\w$]*)/
                }, {
                    include: "$self"
                }, {
                    token: "variable.parameter.function.willet",
                    regex: /[a-zA-Z_$][\w$]*/
                }, {
                    defaultToken: "meta.parameters.willet"
                }]
            }
        }],
        "#interpolated_js": [{
            todo: {
                token: "punctuation.section.embedded.willet",
                regex: /\${/,
                push: [{
                    token: "punctuation.section.embedded.willet",
                    regex: /}/,
                    next: "pop"
                }, {
                    todo: {
                        token: "meta.brace.curly.willet",
                        regex: /{/,
                        push: [{
                            token: "meta.brace.curly.willet",
                            regex: /}/,
                            next: "pop"
                        }, {
                            include: "$self"
                        }]
                    }
                }, {
                    include: "$self"
                }, {
                    defaultToken: "source.js.embedded.source"
                }]
            }
        }],
        "#method_calls": [{
            token: [
                "meta.delimiter.method.period.willet",
                "meta.method-call.willet",
                "meta.method-call.willet",
                "meta.method-call.willet"
            ],
            regex: /(\.)(\s*)([\w$]+)(\s*)(?=\()/,
            push: [{
                token: "meta.method-call.willet",
                regex: /(\))/,
                next: "pop"
            }, {
                include: "#arguments"
            }, {
                defaultToken: "meta.method-call.willet"
            }]
        }],
        "#numbers": [{
            token: "constant.numeric.hex.willet",
            regex: /\b(\$)0(?:x|X)[0-9a-fA-F]+n?\b(?!\$)/
        }, {
            token: "constant.numeric.binary.willet",
            regex: /\b(\$)0(?:b|B)[01]+n?\b(?!\$)/
        }, {
            token: "constant.numeric.octal.willet",
            regex: /\b(\$)0(?:o|O)?[0-7]+n?\b(?!\$)/
        }, {
            token: [
                "text",
                "meta.delimiter.decimal.period.willet",
                "text",
                "text",
                "meta.delimiter.decimal.period.willet",
                "text",
                "meta.delimiter.decimal.period.willet",
                "text",
                "text",
                "meta.delimiter.decimal.period.willet",
                "text",
                "text",
                "meta.delimiter.decimal.period.willet",
                "meta.delimiter.decimal.period.willet",
                "text"
            ],
            regex: /(\$)(?:\b([0-9]+)(\.)([0-9]+[eE][+-]?[0-9]+\b)|\b([0-9]+)(\.)([eE][+-]?[0-9]+\b)|\B(\.)([0-9]+[eE][+-]?[0-9]+\b)|\b[0-9]+[eE][+-]?[0-9]+\b|\b([0-9]+)(\.)([0-9]+\b)|\b([0-9]+)(\.)\B|\B(\.)([0-9]+\b)|\b[0-9]+n?\b(?!\.))(?!\$)/
        }],
        "#objects": [{
            token: "constant.other.object.willet",
            regex: /[A-Z][A-Z0-9_$]*(?=\s*\.\s*[a-zA-Z_$]\w*)/
        }, {
            token: "variable.other.object.willet",
            regex: /[a-zA-Z_$][\w$]*(?=\s*\.\s*[a-zA-Z_$]\w*)/
        }],
        "#operators": [{
            token: "keyword.operator.assignment.compound.willet",
            regex: /%=|\+=|-=|\*=|(\()\/=/
        }, {
            token: "keyword.operator.assignment.compound.bitwise.willet",
            regex: /&=|\^=|<<=|>>=|>>>=|\|=/
        }, {
            token: "keyword.operator.bitwise.shift.willet",
            regex: /<<|>>>|>>/
        }, {
            token: "keyword.operator.comparison.willet",
            regex: /!=|<=|>=|==|<|>/
        }, {
            token: "keyword.operator.logical.willet",
            regex: /&&|!!|!|\|\|/
        }, {
            token: "keyword.operator.bitwise.willet",
            regex: /&|\||\^|~/
        }, {
            token: "keyword.operator.assignment.willet",
            regex: /=|:/
        }, {
            token: "keyword.operator.willet",
            regex: /%|\*|\/|-|\+/
        }],
        "#prevent_object_keys_matching": [{
            token: "text",
            regex: /\w+(?=\s*:)/
        }],
        "#properties": [{
            token: [
                "meta.delimiter.property.period.willet",
                "text",
                "constant.other.object.property.willet"
            ],
            regex: /(\.)(\s*)([A-Z][A-Z0-9_$]*\b\$*)(?=\s*\.\s*[a-zA-Z_$]\w*)/
        }, {
            token: [
                "meta.delimiter.property.period.willet",
                "text",
                "variable.other.object.property.willet"
            ],
            regex: /(\.)(\s*)(\$*[a-zA-Z_$][\w$]*)(?=\s*\.\s*[a-zA-Z_$]\w*)/
        }, {
            token: [
                "meta.delimiter.property.period.willet",
                "text",
                "constant.other.property.willet"
            ],
            regex: /(\.)(\s*)([A-Z][A-Z0-9_$]*\b\$*)/
        }, {
            token: [
                "meta.delimiter.property.period.willet",
                "text",
                "variable.other.property.willet"
            ],
            regex: /(\.)(\s*)(\$*[a-zA-Z_$][\w$]*)/
        }, {
            token: [
                "meta.delimiter.property.period.willet",
                "text",
                "invalid.illegal.identifier.willet"
            ],
            regex: /(\.)(\s*)([0-9][\w$]*)/
        }],
        "#string_escapes": [{
            token: "invalid.illegal.unicode-escape.willet",
            regex: /\\u(?![A-Fa-f0-9]{4}|{[A-Fa-f0-9]+})[^'"]*/
        }, {
            token: [
                "constant.character.escape.willet",
                "constant.character.escape.willet",
                "punctuation.definition.unicode-escape.begin.bracket.curly.willet",
                "constant.character.escape.willet",
                "punctuation.definition.unicode-escape.end.bracket.curly.willet"
            ],
            regex: /(\\u)(?:([A-Fa-f0-9]{4})|({)([A-Fa-f0-9]+)(}))/
        }, {
            token: "constant.character.escape.willet",
            regex: /\\(?:x[0-9A-Fa-f]{2}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)/
        }],
        "#strings": [{
            token: "punctuation.definition.string.begin.willet",
            regex: /'/,
            push: [{
                token: "punctuation.definition.string.end.willet",
                regex: /'/,
                next: "pop"
            }, {
                include: "#string_escapes"
            }, {
                defaultToken: "string.quoted.single.willet"
            }]
        }, {
            token: "punctuation.definition.string.begin.willet",
            regex: /"/,
            push: [{
                token: "punctuation.definition.string.end.willet",
                regex: /"/,
                next: "pop"
            }, {
                include: "#string_escapes"
            }, {
                defaultToken: "string.quoted.double.willet"
            }]
        }, {
            token: [
                "entity.name.function.willet",
                "string.quoted.template.html.willet",
                "punctuation.definition.string.begin.willet"
            ],
            regex: /((?:\w+)?(?:html|HTML|Html))(\s*)(`)/,
            push: [{
                token: "punctuation.definition.string.end.willet",
                regex: /`/,
                next: "pop"
            }, {
                include: "#string_escapes"
            }, {
                include: "#interpolated_js"
            }, {
                include: "text.html.basic"
            }, {
                defaultToken: "string.quoted.template.html.willet"
            }]
        }, {
            token: [
                "entity.name.function.willet",
                "string.quoted.template.graphql.willet",
                "punctuation.definition.string.begin.willet"
            ],
            regex: /(Relay\.QL|gql)(\s*)(`)/,
            push: [{
                token: "punctuation.definition.string.end.willet",
                regex: /`/,
                next: "pop"
            }, {
                include: "#string_escapes"
            }, {
                include: "#interpolated_js"
            }, {
                include: "source.graphql"
            }, {
                defaultToken: "string.quoted.template.graphql.willet"
            }]
        }, {
            token: [
                "entity.name.function.willet",
                "string.quoted.template.sql.willet",
                "punctuation.definition.string.begin.willet"
            ],
            regex: /(sql|SQL|Sql)(\s*)(`)/,
            push: [{
                token: "punctuation.definition.string.end.willet",
                regex: /`/,
                next: "pop"
            }, {
                include: "#string_escapes"
            }, {
                include: "#interpolated_js"
            }, {
                include: "source.sql"
            }, {
                defaultToken: "string.quoted.template.sql.willet"
            }]
        }, {
            token: "punctuation.definition.string.begin.willet",
            regex: /`/,
            push: [{
                token: "punctuation.definition.string.end.willet",
                regex: /`/,
                next: "pop"
            }, {
                include: "#string_escapes"
            }, {
                include: "#interpolated_js"
            }, {
                defaultToken: "string.quoted.template.willet"
            }]
        }]
    }

    this.normalizeRules();
};

WilletHighlightRules.metaData = {
    fileTypes: ["wlt"],
    name: "Willet",
    scopeName: "source.willet"
}


oop.inherits(WilletHighlightRules, TextHighlightRules);

exports.WilletHighlightRules = WilletHighlightRules;
});

ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"], function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var Range = require("../../range").Range;
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function(commentRegex) {
    if (commentRegex) {
        this.foldingStartMarker = new RegExp(
            this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
        );
        this.foldingStopMarker = new RegExp(
            this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
        );
    }
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {
    
    this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;
    this.singleLineBlockCommentRe= /^\s*(\/\*).*\*\/\s*$/;
    this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
    this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;
    this._getFoldWidgetBase = this.getFoldWidget;
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
    
        if (this.singleLineBlockCommentRe.test(line)) {
            if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                return "";
        }
    
        var fw = this._getFoldWidgetBase(session, foldStyle, row);
    
        if (!fw && this.startRegionRe.test(line))
            return "start"; // lineCommentRegionStart
    
        return fw;
    };

    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
        var line = session.getLine(row);
        
        if (this.startRegionRe.test(line))
            return this.getCommentRegionBlock(session, line, row);
        
        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);
                
            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
            
            if (range && !range.isMultiLine()) {
                if (forceMultiline) {
                    range = this.getSectionRange(session, row);
                } else if (foldStyle != "all")
                    range = null;
            }
            
            return range;
        }

        if (foldStyle === "markbegin")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) {
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
        }
    };
    
    this.getSectionRange = function(session, row) {
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) {
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent === -1)
                continue;
            if  (startIndent > indent)
                break;
            var subRange = this.getFoldWidgetRange(session, "all", row);
            
            if (subRange) {
                if (subRange.start.row <= startRow) {
                    break;
                } else if (subRange.isMultiLine()) {
                    row = subRange.end.row;
                } else if (startIndent == indent) {
                    break;
                }
            }
            endRow = row;
        }
        
        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
    };
    this.getCommentRegionBlock = function(session, line, row) {
        var startColumn = line.search(/\s*$/);
        var maxRow = session.getLength();
        var startRow = row;
        
        var re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
        var depth = 1;
        while (++row < maxRow) {
            line = session.getLine(row);
            var m = re.exec(line);
            if (!m) continue;
            if (m[1]) depth--;
            else depth++;

            if (!depth) break;
        }

        var endRow = row;
        if (endRow > startRow) {
            return new Range(startRow, startColumn, endRow, line.length);
        }
    };

}).call(FoldMode.prototype);

});

ace.define("ace/mode/willet",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/willet_highlight_rules","ace/mode/folding/cstyle"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var WilletHighlightRules = require("./willet_highlight_rules").WilletHighlightRules;
var FoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() {
    this.HighlightRules = WilletHighlightRules;
    this.foldingRules = new FoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    this.$id = "ace/mode/willet";
}).call(Mode.prototype);

exports.Mode = Mode;
});                (function() {
                    ace.require(["ace/mode/willet"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            