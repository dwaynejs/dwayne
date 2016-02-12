(function(){
	D = window.D = function D(node, element){
		if ((typeof node == "number" || typeof node == "string") && parseInt(node) == node && node >= 0){
			node = parseInt(node);
			var a = [];
			for (var i=0;i<node;i++)
				a[i] = i;
			return create(a,"array");
		}
		else if (typeof node == "string")
			return D(document.querySelector.call(D(element || document).$, node));
		else if (node instanceof D.Object)
			return node;
		else if (node && node[Symbol.for("D.Object")])
			return node[Symbol.for("D.Object")];
		else if (node instanceof EventTarget){
			var name = node.nodeName && node.nodeName.toLowerCase().replace(/^#/g,"");
			return create(node,node instanceof Node ? name in htmlTags ? htmlTags[name] ? htmlTags[name] : name : name in svgTags ? svgTags[name] ? svgTags[name] : name : "htmlElement" :
				node instanceof Window ? "window" : 
				node instanceof FileReader ? "fileReader" : "null"
			)
		}
		else if (node instanceof HTMLCollection || node instanceof NodeList)
			return create(Array.prototype.map.call(node,x => D(x)),"htmlCollection");
		else if (node instanceof Array)
			return create(node,"array");
		else if (node && node.__proto__.constructor.name == "Socket")
			return create(node,"socket");
		else if (node instanceof Object)
			return create(node,"object");
		else if (arguments.length)
			return create(null);
		else
			return create({},"object");
	}
	const svgAttrNS = "http://www.w3.org/1999/xlink";
	const origSort = {
		asc : (x, y) => isNaN(Number(x.key)) ? isNaN(Number(y.key)) ? 0 : 1 : isNaN(Number(y.key)) ? -1 : Number(x.key) > Number(y.key) ? 1 : Number(x.key) < Number(y.key) ? -1 : 0,
		desc : (x, y) => isNaN(Number(x.key)) ? isNaN(Number(y.key)) ? 0 : 1 : isNaN(Number(y.key)) ? -1 : Number(x.key) > Number(y.key) ? -1 : Number(x.key) < Number(y.key) ? 1 : 0
	}
	const htmlTags = {
		"input" : "",
		"meter" : "",
		"option" : "",
		"progress" : "",
		"select" : "",
		"textarea" : "textArea",
		"audio" : "",
		"video" : "",
		"a" : "",
		"form" : "",
		"link" : "",
		"iframe" : "iFrame",
		"img" : "",
		"script" : "",
		"b" : "",
		"body" : "",
		"br" : "",
		"button" : "",
		"canvas" : "",
		"div" : "",
		"document" : "",
		"fieldset" : "fieldSet",
		"head" : "",
		"html" : "HTML",
		"i" : "",
		"legend" : "",
		"meta" : "",
		"null" : "",
		"ol" : "",
		"p" : "",
		"pre" : "",
		"span" : "",
		"style" : "",
		"table" : "",
		"tbody" : "tBody",
		"td" : "",
		"th" : "",
		"thead" : "tHead",
		"title" : "",
		"tr" : "",
		"ul" : ""
	}
	const svgTags = {
		"circle" : "",
		"g" : "",
		"path" : "",
		"polygon" : "",
		"rect" : "",
		"svg" : "",
		"text" : ""
	}
	const css = {
		"alignContent":1,
		"alignItems":1,
		"alignSelf":1,
		"alignmentBaseline":1,
		"all":1,
		"animation":1,
		"animationDelay":1,
		"animationDirection":1,
		"animationDuration":1,
		"animationFillMode":1,
		"animationIterationCount":1,
		"animationName":1,
		"animationPlayState":1,
		"animationTimingFunction":1,
		"backfaceVisibility":1,
		"background":1,
		"backgroundAttachment":1,
		"backgroundBlendMode":1,
		"backgroundClip":1,
		"backgroundColor":1,
		"backgroundImage":1,
		"backgroundOrigin":1,
		"backgroundPosition":1,
		"backgroundPositionX":1,
		"backgroundPositionY":1,
		"backgroundRepeat":1,
		"backgroundRepeatX":1,
		"backgroundRepeatY":1,
		"backgroundSize":1,
		"baselineShift":1,
		"border":1,
		"borderBottom":1,
		"borderBottomColor":1,
		"borderBottomLeftRadius":1,
		"borderBottomRightRadius":1,
		"borderBottomStyle":1,
		"borderBottomWidth":1,
		"borderCollapse":1,
		"borderColor":1,
		"borderImage":1,
		"borderImageOutset":1,
		"borderImageRepeat":1,
		"borderImageSlice":1,
		"borderImageSource":1,
		"borderImageWidth":1,
		"borderLeft":1,
		"borderLeftColor":1,
		"borderLeftStyle":1,
		"borderLeftWidth":1,
		"borderRadius":1,
		"borderRight":1,
		"borderRightColor":1,
		"borderRightStyle":1,
		"borderRightWidth":1,
		"borderSpacing":1,
		"borderStyle":1,
		"borderTop":1,
		"borderTopColor":1,
		"borderTopLeftRadius":1,
		"borderTopRightRadius":1,
		"borderTopStyle":1,
		"borderTopWidth":1,
		"borderWidth":1,
		"bottom":1,
		"boxShadow":1,
		"boxSizing":1,
		"bufferedRendering":1,
		"captionSide":1,
		"clear":1,
		"clip":1,
		"clipPath":1,
		"clipRule":1,
		"color":1,
		"colorInterpolation":1,
		"colorInterpolationFilters":1,
		"colorRendering":1,
		"content":1,
		"counterIncrement":1,
		"counterReset":1,
		"cursor":1,
		"cx":1,
		"cy":1,
		"direction":1,
		"display":1,
		"dominantBaseline":1,
		"emptyCells":1,
		"enableBackground":1,
		"fill":1,
		"fillOpacity":1,
		"fillRule":1,
		"filter":1,
		"flex":1,
		"flexBasis":1,
		"flexDirection":1,
		"flexFlow":1,
		"flexGrow":1,
		"flexShrink":1,
		"flexWrap":1,
		"float":1,
		"floodColor":1,
		"floodOpacity":1,
		"font":1,
		"fontFamily":1,
		"fontKerning":1,
		"fontSize":1,
		"fontStretch":1,
		"fontStyle":1,
		"fontVariant":1,
		"fontVariantLigatures":1,
		"fontWeight":1,
		"glyphOrientationHorizontal":1,
		"glyphOrientationVertical":1,
		"imageRendering":1,
		"isolation":1,
		"justifyContent":1,
		"left":1,
		"letterSpacing":1,
		"lightingColor":1,
		"lineHeight":1,
		"listStyle":1,
		"listStyleImage":1,
		"listStylePosition":1,
		"listStyleType":1,
		"margin":1,
		"marginBottom":1,
		"marginLeft":1,
		"marginRight":1,
		"marginTop":1,
		"marker":1,
		"markerEnd":1,
		"markerMid":1,
		"markerStart":1,
		"mask":1,
		"maskType":1,
		"maxHeight":1,
		"maxWidth":1,
		"maxZoom":1,
		"minHeight":1,
		"minWidth":1,
		"minZoom":1,
		"mixBlendMode":1,
		"objectFit":1,
		"objectPosition":1,
		"opacity":1,
		"order":1,
		"orientation":1,
		"orphans":1,
		"outline":1,
		"outlineColor":1,
		"outlineOffset":1,
		"outlineStyle":1,
		"outlineWidth":1,
		"overflow":1,
		"overflowWrap":1,
		"overflowX":1,
		"overflowY":1,
		"padding":1,
		"paddingBottom":1,
		"paddingLeft":1,
		"paddingRight":1,
		"paddingTop":1,
		"page":1,
		"pageBreakAfter":1,
		"pageBreakBefore":1,
		"pageBreakInside":1,
		"paintOrder":1,
		"perspective":1,
		"perspectiveOrigin":1,
		"pointerEvents":1,
		"position":1,
		"quotes":1,
		"r":1,
		"resize":1,
		"right":1,
		"rx":1,
		"ry":1,
		"shapeImageThreshold":1,
		"shapeMargin":1,
		"shapeOutside":1,
		"shapeRendering":1,
		"size":1,
		"speak":1,
		"src":1,
		"stopColor":1,
		"stopOpacity":1,
		"stroke":1,
		"strokeDasharray":1,
		"strokeDashoffset":1,
		"strokeLinecap":1,
		"strokeLinejoin":1,
		"strokeMiterlimit":1,
		"strokeOpacity":1,
		"strokeWidth":1,
		"tabSize":1,
		"tableLayout":1,
		"textAlign":1,
		"textAnchor":1,
		"textDecoration":1,
		"textIndent":1,
		"textOverflow":1,
		"textRendering":1,
		"textShadow":1,
		"textTransform":1,
		"top":1,
		"touchAction":1,
		"transform":1,
		"transformOrigin":1,
		"transformStyle":1,
		"transition":1,
		"transitionDelay":1,
		"transitionDuration":1,
		"transitionProperty":1,
		"transitionTimingFunction":1,
		"unicodeBidi":1,
		"unicodeRange":1,
		"userZoom":1,
		"vectorEffect":1,
		"verticalAlign":1,
		"visibility":1,
		"webkitAppRegion":1,
		"webkitAppearance":1,
		"webkitBackgroundClip":1,
		"webkitBackgroundComposite":1,
		"webkitBackgroundOrigin":1,
		"webkitBorderAfter":1,
		"webkitBorderAfterColor":1,
		"webkitBorderAfterStyle":1,
		"webkitBorderAfterWidth":1,
		"webkitBorderBefore":1,
		"webkitBorderBeforeColor":1,
		"webkitBorderBeforeStyle":1,
		"webkitBorderBeforeWidth":1,
		"webkitBorderEnd":1,
		"webkitBorderEndColor":1,
		"webkitBorderEndStyle":1,
		"webkitBorderEndWidth":1,
		"webkitBorderHorizontalSpacing":1,
		"webkitBorderImage":1,
		"webkitBorderStart":1,
		"webkitBorderStartColor":1,
		"webkitBorderStartStyle":1,
		"webkitBorderStartWidth":1,
		"webkitBorderVerticalSpacing":1,
		"webkitBoxAlign":1,
		"webkitBoxDecorationBreak":1,
		"webkitBoxDirection":1,
		"webkitBoxFlex":1,
		"webkitBoxFlexGroup":1,
		"webkitBoxLines":1,
		"webkitBoxOrdinalGroup":1,
		"webkitBoxOrient":1,
		"webkitBoxPack":1,
		"webkitBoxReflect":1,
		"webkitClipPath":1,
		"webkitColumnBreakAfter":1,
		"webkitColumnBreakBefore":1,
		"webkitColumnBreakInside":1,
		"webkitColumnCount":1,
		"webkitColumnGap":1,
		"webkitColumnRule":1,
		"webkitColumnRuleColor":1,
		"webkitColumnRuleStyle":1,
		"webkitColumnRuleWidth":1,
		"webkitColumnSpan":1,
		"webkitColumnWidth":1,
		"webkitColumns":1,
		"webkitFilter":1,
		"webkitFontFeatureSettings":1,
		"webkitFontSizeDelta":1,
		"webkitFontSmoothing":1,
		"webkitHighlight":1,
		"webkitHyphenateCharacter":1,
		"webkitLineBoxContain":1,
		"webkitLineBreak":1,
		"webkitLineClamp":1,
		"webkitLocale":1,
		"webkitLogicalHeight":1,
		"webkitLogicalWidth":1,
		"webkitMarginAfter":1,
		"webkitMarginAfterCollapse":1,
		"webkitMarginBefore":1,
		"webkitMarginBeforeCollapse":1,
		"webkitMarginBottomCollapse":1,
		"webkitMarginCollapse":1,
		"webkitMarginEnd":1,
		"webkitMarginStart":1,
		"webkitMarginTopCollapse":1,
		"webkitMask":1,
		"webkitMaskBoxImage":1,
		"webkitMaskBoxImageOutset":1,
		"webkitMaskBoxImageRepeat":1,
		"webkitMaskBoxImageSlice":1,
		"webkitMaskBoxImageSource":1,
		"webkitMaskBoxImageWidth":1,
		"webkitMaskClip":1,
		"webkitMaskComposite":1,
		"webkitMaskImage":1,
		"webkitMaskOrigin":1,
		"webkitMaskPosition":1,
		"webkitMaskPositionX":1,
		"webkitMaskPositionY":1,
		"webkitMaskRepeat":1,
		"webkitMaskRepeatX":1,
		"webkitMaskRepeatY":1,
		"webkitMaskSize":1,
		"webkitMaxLogicalHeight":1,
		"webkitMaxLogicalWidth":1,
		"webkitMinLogicalHeight":1,
		"webkitMinLogicalWidth":1,
		"webkitPaddingAfter":1,
		"webkitPaddingBefore":1,
		"webkitPaddingEnd":1,
		"webkitPaddingStart":1,
		"webkitPerspectiveOriginX":1,
		"webkitPerspectiveOriginY":1,
		"webkitPrintColorAdjust":1,
		"webkitRtlOrdering":1,
		"webkitRubyPosition":1,
		"webkitTapHighlightColor":1,
		"webkitTextCombine":1,
		"webkitTextDecorationsInEffect":1,
		"webkitTextEmphasis":1,
		"webkitTextEmphasisColor":1,
		"webkitTextEmphasisPosition":1,
		"webkitTextEmphasisStyle":1,
		"webkitTextFillColor":1,
		"webkitTextOrientation":1,
		"webkitTextSecurity":1,
		"webkitTextStroke":1,
		"webkitTextStrokeColor":1,
		"webkitTextStrokeWidth":1,
		"webkitTransformOriginX":1,
		"webkitTransformOriginY":1,
		"webkitTransformOriginZ":1,
		"webkitUserDrag":1,
		"webkitUserModify":1,
		"webkitUserSelect":1,
		"webkitWritingMode":1,
		"whiteSpace":1,
		"widows":1,
		"willChange":1,
		"wordBreak":1,
		"wordSpacing":1,
		"wordWrap":1,
		"writingMode":1,
		"x":1,
		"y":1,
		"zIndex":1,
		"zoom":1
	}
	const math = {
		"e":"E",
		"ln10":"LN10",
		"ln2":"LN2",
		"log2e":"LOG2E",
		"log10e":"LOG10E",
		"pi":"PI",
		"sqrt1_2":"SQRT1_2",
		"sqrt2":"SQRT2",
		"rand":"random",
		"abs":"",
		"acos":"",
		"asin":"",
		"atan":"",
		"ceil":"",
		"exp":"",
		"floor":"",
		"ln":"log",
		"round":"",
		"sqrt":"",
		"atan2":"",
		"pow":"",
		"max":"",
		"min":"",
		"imul":"",
		"sign":"",
		"trunc":"",
		"tanh":"",
		"asinh":"",
		"acosh":"",
		"atanh":"",
		"hypot":"",
		"fround":"",
		"clz32":"",
		"cbrt":"",
		"cos":"",
		"sin":"",
		"tan":"",
		"sinh":"",
		"cosh":"",
		"log":"log10",
		"lg":"log2",
		"log1p":"",
		"expm1":""
	}
	const events = {
		"onabort":"abort",
		"onautocomplete":"autocomplete",
		"onautocompleteerror":"autocompleteerror",
		"onbeforecopy":"beforecopy",
		"onbeforecut":"beforecut",
		"onbeforepaste":"beforepaste",
		"onblur":"blur",
		"oncancel":"cancel",
		"oncanplay":"canplay",
		"oncanplaythrough":"canplaythrough",
		"change":"change",
		"click":"click",
		"onclose":"close",
		"oncopy":"copy",
		"oncut":"cut",
		"rightClick":"contextmenu",
		"oncuechange":"cuechange",
		"ondblclick":"dblclick",
		"ondrag":"drag",
		"ondragend":"dragend",
		"ondragenter":"dragenter",
		"ondragleave":"dragleave",
		"ondragover":"dragover",
		"ondragstart":"dragstart",
		"ondrop":"drop",
		"ondurationchange":"durationchange",
		"onemptied":"emptied",
		"onended":"ended",
		"onerror":"error",
		"onfocus":"focus",
		"oninput":"input",
		"oninvalid":"invalid",
		"onkeydown":"keydown",
		"onkeypress":"keypress",
		"onkeyup":"keyup",
		"ok":"load",
		"onloadeddata":"loadeddata",
		"onloadedmetadata":"loadedmetadata",
		"onloadstart":"loadstart",
		"onmousedown":"mousedown",
		"onmouseenter":"mouseenter",
		"onmouseleave":"mouseleave",
		"onmousemove":"mousemove",
		"onmouseout":"mouseout",
		"onmouseover":"mouseover",
		"onmouseup":"mouseup",
		"onmousewheel":"mousewheel",
		"onpaste":"paste",
		"onpause":"pause",
		"onplay":"play",
		"onplaying":"playing",
		"onprogress":"progress",
		"onratechange":"ratechange",
		"onreset":"reset",
		"onresize":"resize",
		"onsearch":"search",
		"onscroll":"scroll",
		"onseeked":"seeked",
		"onseeking":"seeking",
		"onselect":"select",
		"onselectstart":"selectstart",
		"onshow":"show",
		"onstalled":"stalled",
		"onsubmit":"submit",
		"onsuspend":"suspend",
		"ontimeupdate":"timeupdate",
		"ontoggle":"toggle",
		"onvolumechange":"volumechange",
		"onwaiting":"waiting",
		"onwheel":"wheel"
	}
	function create(node,name){
		name = name || (!node ? "null" : node.nodeName ? node.nodeName.toLowerCase() : "object");
		name = name[0].toUpperCase() + name.substring(1);
		var n = Object.create(typeof D[name] == "function" ? D[name].prototype : D.Object.prototype);
		node && (node[Symbol.for("D.Object")] = n);
		Object.defineProperty(n, "$", { value: node });
		return n;
	}
	function array(x){
		var a = [];
		var bool = D.Array && x instanceof D.Array;
		var node = x.$;
		if (node){
			Object.keys(node).forEach((key) => key != "toString" && key != "valueOf" && a.push({key:bool?Number(key):key,val:node[key]}));
		}
		return a;
	}
	Object.defineProperty(D,"toString",{value:() => "© Крутой Поцык Данил, 2015"});
	Object.defineProperties((D.Object = function Object(){},D.Object.prototype = Object.create(Object.prototype)),{
		do : {
			value : function(f,n,sort){
				(typeof n == "function" || typeof n == "string") && (sort = n, n = 1);
				return (function(f,n,tree){
					var o = array(this);
					(typeof sort == "function" || typeof sort == "string") && o.sort(sort in origSort ? origSort[sort].bind(this) : sort.bind(this));
					return this.$ ? n > 1 ? 
						D(o.reduce((o,x) => (o[x.key] = arguments.callee.call(D(x.val),f,n-1,tree.concat({key:x.key,val:x.val}),sort).$, o),this.$ instanceof Array ? [] : {})) :
						D(o.reduce((o,x) => (o[x.key] = f.call(this,x.val,x.key,tree), o),this.$ instanceof Array ? [] : {})) : undefined;
				}).call(this,f,n,[{key:null,val:this.$}]);
			},
			enumerable : true
		},
		assign : {
			value : function(){
				return D(arguments).do(x => D(x).do((x,key) => this.$[key] = x)), this;
			},
			enumerable : true
		},
		toString : {
			value :  function(){
				return this.objectName + (this.$ !== undefined ? (
					this.__proto__ == D.Array.prototype || this.__proto__ == D.Object.prototype ? " " + this.printed() : (
						this instanceof D.Array ? "["+this.count+"]" : 
						this instanceof D.HtmlElement ? 
							(this.id() ? " #" + this.id() : "") +
							(this.class() ? " " + D(this.class().split(/\s+/)).do(x => "." + x).join("") : "") +
							(this instanceof D.Source && this.src() ? " ->" + this.src() : "") + 
							(this.text() ? " `" + this.text() + "`" : "") : ""
					)
				) : "");
			}
		}
	})
	Object.defineProperties(D.Object.prototype,D({
		count : function(){return this.$ && Object.keys(this.$).length},
		max : function(){return this.$ && this.reduce((o,x) => D.max(o,x),-Infinity)},
		min : function(){return this.$ && this.reduce((o,x) => D.min(o,x),Infinity)},
		sum : function(){return this.$ && this.reduce((o,x) => o + Number(x),0)},
		avg : function(){return this.$ && this.sum/this.count},
		json : function(){return this.$ && JSON.stringify(this.$)},
		keys : function(){return this.$ && D(Object.keys(this.$))},
		copy : function(){return this.$ && JSON.parse(this.json)},
		objectName : function(){return this.$ === undefined ? this.constructor.name : this.__proto__.constructor.name.replace(/^[A-Z]+/,(x) => x.toLowerCase())}
	}).do(x => ({get:x,enumerable:true})).assign(D({
		get : function(prop){
			return this.$ && this.$[prop];
		},
		set : function(prop,value){
			if (arguments.length == 2)
				return this.$ && (this.$[prop] = value), this;
			else if (arguments.length == 1)
				return D(prop).do((val,key) => this.set(key,val)), this;
		},
		delete : function(key){
			delete(this.$[key]);
			return this;
		},
		call : function(){
			var f = Array.prototype.shift.call(arguments);
			return f.apply(this,arguments);
		},
		extract : function(prop){
			return this.do(x => x[prop]);
		},
		sort : function(sort){
			if (typeof sort == "function" || sort in origSort){
				var o = array(this);
				o.sort(sort in origSort ? origSort.bind(this) : sort.bind(this));
				return this.$ && D(o.reduce((o,x) => (this instanceof D.Array ? o.push(x.val) : (o[x.key] = x.val), o),this instanceof D.Array ? [] : {}));
			}
			else
				return this;
		},
		$do : function(f,n,sort){
			(typeof n == "function" || typeof n == "string") && (sort = n, n = 1);
			return (function(f,n,tree){
				var o = array(this.sort(sort));
				return this.$ ? n > 1 ? 
					D(o.reduce((o,x) => (o[x.key] = arguments.callee.call(D(x.val),f,n-1,tree.concat({key:x.key,val:x.val})).$, o),this.$)) : 
					D(o.reduce((o,x) => (o[x.key] = f.call(this,x.val,x.key,tree), o),this.$)) : undefined;
			}).call(this,f,n,[{key:null,val:this.$}]);
		},
		changeKeys : function(f,sort){
			return this.$ && D(this.reduce((o,x,key) => (o[f.call(this,x,key)] = x, o),this instanceof D.Array ? [] : {}, sort));
		},
		reduce : function(f,IV,sort){
			return this.$ && array(this.sort(sort)).reduce((o,x) => f.call(this,o,x.val,x.key),IV);
		},
		every : function(f,sort){
			return this.$ && array(this.sort(sort)).every(x => f.call(this,x.val,x.key));
		},
		some : function(f,sort){
			return this.$ && array(this.sort(sort)).some(x => f.call(this,x.val,x.key));
		},
		match : function(f,sort){
			var index = null;
			this.some(typeof f == "function" ? (x,key) => {
				if (f.call(this,x,key)){
					index = {key:key,val:x};
					return true;
				}
			} : f instanceof RegExp ? (x,key) => {
				if (x.match(f)){
					index = {key:key,val:x};
					return true;
				}
			} : (x,key) => {
				if (x == f){
					index = {key:key,val:x};
					return true;
				}
			}, sort);
			return index;
		},
		filter : function(f,sort){
			return this.reduce((o,x,key) => f.call(this,x,key) ? (this instanceof D.Array ? o.push(x) : o.set(key,x)) : o,this instanceof D.Array ? D([]) : D({}),sort);
		},
		return : function(f,IV,sort){
			return this.reduce((o,x,key) => (f.call(this,o,x,key), o),IV,sort);
		},
		word : function(f,sort){
			return this.reduce((s,x,key) => s + String(f.call(this,x,key)),"",sort);
		},
		add : function(f,sort){
			return this.reduce((a,x,key) => a + Number(f.call(this,x,key)),0,sort);
		},
		console : function(){
			console.log(this);
			return this;
		},
		properties : function(prop,value){
			if (arguments.length == 2)
				return Object.defineProperty(
					this,
					prop.match(/^get /) ? prop.replace(/^get /,"") : prop.match(/^set /) ? prop.replace(/^set /,"") : prop,
					prop.match(/^get /) ? {get:value,enumerable:true,configurable:true} : prop.match(/^set /) ? {set:value,enumerable:true,configurable:true} : {value:value,writable:true,enumerable:true,configurable:true}
				),this;
			else if (arguments.length == 1)
				return D(prop).do((x,key) => this.properties(key,x)), this;
		},
		define : function(prop,value){
			if (arguments.length == 2){
				value = value.bind(this);
				return this.$ && Object.defineProperty(
					this.$,
					prop.match(/^get /) ? prop.replace(/^get /,"") : prop.match(/^set /) ? prop.replace(/^set /,"") : prop,
					prop.match(/^get /) ? {get:value,enumerable:true,configurable:true} : prop.match(/^set /) ? {set:value,enumerable:true,configurable:true} : {value:value,writable:true,enumerable:true,configurable:true}
				),this;
			}
			else if (arguments.length == 1)
				return D(prop).do((x,key) => this.define(key,x)), this;
		},
		getter : function(prop,value){
			return this.define("get " + prop,value);
		},
		getters : function(getters){
			return D(getters).do((x,key) => this.getter(key,x)), this;
		},
		setter : function(prop,value){
			return this.define("set " + prop,value);
		},
		setters : function(setters){
			return D(setters).do((x,key) => this.setter(key,x)), this;
		},
		inherit : function(constructor){
			if (constructor != D){
				D[constructor.name] = constructor;
				constructor.prototype.__proto__ = this;
				return constructor.prototype;
				//return constructor.prototype = Object.create(this);
			}
			return D.__proto__ = this, D;
		},
		proto : function(n){
			if (!n) return this;
			else return this.__proto__.proto(n-1);
		},
		printed : function(f){
			function print(o,n){
				if (!n)
					string += (o instanceof Array ? "[" : "{") + "\r\n";
				n++;
				var s = D(n).word(() => "\t");
				var counter = 0;
				var end = ",";
				D(o).do(function(x,p){
					if (counter == this.count - 1)
						end = "";
					if (x instanceof Object){
						var j = n;
						var type;
						var start = (!(this instanceof D.Array) ? "\"" + p + "\"" + ": " : "");
						if (x instanceof Array){
							type = "array";
							string += s + start + "[" + "\r\n";
						}
						else if (x instanceof Function){
							var ss = x.toString(),
								tabs = 0;
							var lastLine = ss.match(/\n\t*[^\n]+$/);
							if (lastLine){
								var t = lastLine[0].replace(/^\n/,"");
								/^\t+/.test(t) && (tabs = t.match(/^\t+/)[0].length);
							}
							string += s + start + ss.replace(new RegExp(`\n\t{${ tabs }}`,"g"),"\n" + s);
						}
						else if (x instanceof Date){
							string += s + start + `new Date("${ x }")`;
						}
						else if (x instanceof RegExp|| x == null){
							string += s + start + x.toString();
						}
						else if (x instanceof Object){
							type = "object";
							string += s + start + "{" + "\r\n";
						}
						if (type == "object"){
							print(x,n);
							string += s + "}";
						}
						else if (type == "array"){
							print(x,n);
							string += s + "]";
						}
						string += end + "\r\n";
						n = j;
					}
					else
						string += s + (!(this instanceof D.Array) ? '"' + p + '"' + ": " : "") + (typeof x == "string" ? '"' + x.replace(/"/g,'\\"') + '"' : x) + end + "\r\n";
					counter++;
				},typeof f == "function" ? f : typeof f == "object" ? f[n] : null)
				if (n == 1)
					return string += (o instanceof Array ? "]" : "}"), string;
			}
			var string = "";
			return this.$ && print(this.$,0);
		},
		proxy : function(){
			var wrap = this;
			this.$ && delete(this.$[Symbol.for("D.Object")]);
			return this.$ && window.Proxy ? new Proxy(this.$, {
				get (receiver, name){
					return name in wrap ? wrap[name] : receiver[name];
				}
			}) : this;
		}
	}).do(x => ({value:x,enumerable:true}))).$)
		.inherit(function Array(){}).properties({
			"get last" : function(){return this.$ && this.$[this.count-1]},
			push : function(){
				this.$ && this.$.push.apply(this.$,arguments);
				return this;
			},
			pop : function(){
				return this.$ && this.$.pop.apply(this.$,arguments);
			},
			shuffle : function(){
				return this.do(x => x).reduce(function(o,x,i){
					var k = i + Math.floor((this.count-i)*Math.random());
					var change =this.$[i];
					o.push(this.$[k]);
					this.$[i] = this.$[k];
					this.$[k] = change;
					return o;
				},D(0))
			},
			join : function(){
				return this.$ && this.$.join.apply(this.$,arguments);
			},
			reverse : function(){
				return this.$ && D(this.do(x => x).$.reverse());
			},
			slice : function(){
				return this.$ && D(this.$.slice.apply(this.$,arguments));
			},
			splice : function(){
				return this.$ && D(this.$.splice.apply(this.$,arguments));
			},
			shift : function(){
				return this.$ && this.$.shift.apply(this.$,arguments);
			},
			unshift : function(){
				this.$ && this.$.unshift.apply(this.$,arguments);
				return this;
			},
			concat : function(){
				return this.$ && D(this.$.concat.apply(this.$,arguments));
			},
			$sort : function(f){
				var o = array(this);
				o.sort(f.bind(this));
				return this.$ && D(o.reduce((o,x,k) => (o[k] = x.val, o),this.$));
			}
		})
			.inherit(function HtmlCollection(){}).properties(D({
				
			}).assign(D(["hide","show","delete","into","class","on","attr","css","attach"]).return((o,x) => o[x] = function(){
				return this.do((y) => y[x] && y[x].apply(y, arguments))
			}, {}), D(events).do((x,key) => function(f){return this.on(x,f)})).$).proto(2)
		.inherit(D).properties(D({
			"get window" : () => D(window),
			"get doc" : () => D(document),
			"get body" : () => document.body && D(document.body),
			"get head" : () => document.head && D(document.head),
			modules : {},
			injected : [],
			module : (() => {
				var module = function(module){
					module = D(D.injected).match(module);
					return module && D.modules[module.val];
				}
				D(module).setter("exports", (module) => {
					D.modules[module.name] = module;
				})
				return module;
			})(),
			inject : (() => {
				var injected = {};
				return function(){
					D(arguments).do((module) => {
						if (!injected[module] && D.modules[module]){
							injected[module] = true;
							D.injected.push(module);
							D.modules[module].oninject && D.modules[module].oninject();
							return;
						}
						else if (injected[module])
							return;
						throw new Error("There is no such module!");
					})
					return this;
				};
			})(),
			storage : {
				get : (key) => localStorage[key] && JSON.parse(localStorage[key]),
				set : function(key, value){
					if (arguments.length == 2)
						return localStorage[key] = JSON.stringify(value), this;
					else if (arguments.length == 1)
						return D(key).do((val,key) => this.set(key,val)), this;
				},
				delete : function(key){
					return D(arguments).do((key) => {
						delete(localStorage[key]);
					}), this;
				}
			},
			all : (node, element) => D(document.querySelectorAll.call(element || document, node)),
			object : () => D({}),
			array : n => {
				if ((typeof n == "number" || typeof n == "string") && parseInt(n) == n && n >= 0){
					n = parseInt(n);
					var o = [];
					for (var i=0;i<n;i++)
						o[i] = null;
					return D(o);
				}
				return D([]);
			},
			reader : () => D(new FileReader()),
			htmlSet : x => create(x instanceof Array || x instanceof D.Array ? x : [],"htmlCollection"),
			switch : function(value,conds,mode,def){
				var s = create({
					default : null,
					conditions : [],
					value : null,
					mode : null,
					return : null
				},"switch");
				if (conds instanceof Object){
					s.$.value = value;
					D(conds).reduce((o,x,k) => (o.push({condition:k,then:x}), o),s.$.conditions);
					s.$.mode = mode || "equals";
					return s.otherwise(3 in arguments ? def : null);
				}
				else if (arguments.length == 2){
					s.$.value = value;
					s.$.mode = conds;
					return s;
				}
				else if (arguments.length == 1){
					s.$.value = value;
					s.$.mode = "equals";
					return s;
				}
				else if (!arguments.length){
					s.$.mode = "boolean";
					return s;
				}
			},
			extension : src => src.match(/\.[^\.]+$/) ? src.match(/\.[^\.]+$/g)[0].replace(/\./,"") : "",
			icon : function(){
				var icon = this.link("rel=`shortcut icon`");
				icon.attach.apply(icon, arguments);
				return icon.type("image/" + (D.extension(icon.src()) == "ico" ? "x-icon" : "png"));
			},
			stylesheet : function(){
				var link = this.link("type=text/css rel=stylesheet");
				return link.attach.apply(link, arguments);
			},
			js : function(){
				var js = this.script("type=text/javascript");
				return js.attach.apply(js, arguments);
			},
			anchor : function(){
				return this.a.apply(this,arguments).transformAnchor();
			},
			Sin : function(x){
				return x *= D.pi/180, D.sin.apply(Math,arguments);
			},
			Cos : function(x){
				return x *= D.pi/180, D.cos.apply(Math,arguments);
			},
			Tan : function(x){
				return x *= D.pi/180, D.tan.apply(Math,arguments);
			},
			Asin : function(){
				return D.asin.apply(Math,arguments)*180/D.pi;
			},
			Acos : function(){
				return D.acos.apply(Math,arguments)*180/D.pi;
			},
			Atan : function(){
				return D.atan.apply(Math,arguments)*180/D.pi;
			},
			textEncode : text => text
				.replace(/\$/g,"$$$$")
				.replace(/'/g,"$$'")
				.replace(/`/g,"$$`")
				.replace(/"/g,"$$\""),
			textDecode : text => D(text.split(/\$\$/)).do(x => x
				.replace(/\$'/g,"'")
				.replace(/\$`/g,"`")
				.replace(/\$"/g,"\"")
			).join("$"),
			random : (a, b) => a + D.floor((b - a + 1)*D.rand()),
			ajax : function(){
				return new Promise((resolve, reject) => {
					jQuery.ajax.apply(jQuery, arguments).then((data) => resolve(data), (err) => reject(err));
				})
			},
			propsChain : function(){
				var object = Array.prototype.shift.call(arguments);
				if (!arguments.length)
					return null;
				var prop = Array.prototype.shift.call(arguments);
				if (!object || !(prop in object))
					return null;
				if (!arguments.length)
					return { key: prop, val: object[prop] };
				Array.prototype.unshift.call(arguments, object[prop]);
				return D.propsChain.apply(D, arguments);
			},
			safe : function(f){
				try{ f(); }catch(e){};
			}
		}).assign(D(htmlTags).filter((x,key) => key!="document"&&key!="html"&&key!="body"&&key!="head").do((x,key) => function(){ return D.doc[key].apply(D.doc,arguments); }),D(math).do((x,key) => Math[x||key])).$).proto(1)
		.inherit(function Switch(){}).properties({
			when : function(cond,then){
				var cb = Array.prototype.pop.call(arguments);
				this.$ && D(arguments).do(x => this.$.conditions.push({condition:x,then:cb}));
				return this;
			},
			otherwise : function(f){
				var switcher = this.$;
				if (switcher){
					switcher.default = f;
					var m = D(switcher.conditions).match((x,k) => {
						var cb = x.then;
						x = x.condition;
						if (switcher.mode == "match"){
							var m = switcher.value.match(x);
							m && (switcher.return = typeof cb == "function" ? cb(m) : cb);
							return m;
						}
						else if (switcher.mode == "range"){
							var range = {
								left : {value:Number(x.split(";")[0].replace(/^(\[|\()/,"").replace(/Inf/,"Infinity")),includes:x.match(/^\(/) ? false : true},
								right : {value:Number(x.split(";")[1].replace(/(\]|\))$/,"").replace(/Inf/,"Infinity")),includes:x.match(/\)$/) ? false : true}
							}
							var left = range.left.includes ? switcher.value >= range.left.value : switcher.value > range.left.value;
							var right = range.right.includes ? switcher.value <= range.right.value : switcher.value < range.right.value;
							return left && right;
						}
						else if (switcher.mode == "equals")
							return switcher.value == x;
						else if (switcher.mode == "equalsStrict")
							return switcher.value === x;
						else if (switcher.mode == "starts")
							return switcher.value.indexOf(x) == 0;
						else if (switcher.mode == "ends")
							return switcher.value.indexOf(x) == switcher.value.length - x.length;
						else if (switcher.mode == "contains")
							return switcher.value.indexOf(x) != -1;
						else if (switcher.mode == "typeof")
							return typeof switcher.value == x;
						else if (switcher.mode == "instanceof")
							return switcher.value instanceof x;
						else if (switcher.mode == "boolean")
							return x;
						else
							return false;
					})
				}
				return switcher && switcher.return || (m ? 
					typeof m.val.then == "function" ? m.val.then(switcher.value) : m.val.then : 
					typeof switcher.default == "function" ? switcher.default(switcher.value) : switcher.default
				)
			}
		}).proto(1)
		.inherit(function EventTarget(){}).properties(D({
			on : function(action,f){
				if (arguments.length == 1){
					if (this.$ && typeof action == "string")
						return this.$["on" + action];
					else
						D(action).do((f,act) => this.on(act,f));
				}
				else if (arguments.length == 2)
					this.$ && (this.$["on"+action] = e => f.call(this,e||window.event));
				return this;
			},
			off : function(actions){
				if (arguments.length > 1){
					var node = this;
					D(arguments).do(act => node.off(act));
				}
				else if (arguments.length == 1){
					if (this.$ && typeof actions == "string")
						"on" + actions in this.$ && (this.$["on"+actions] = e => e.preventDefault());
					else
						this.off.apply(this,actions);
				}
				return this;
			},
			catch : function(action,f){
				if (arguments.length == 1)
					D(action).do((f,act) => this.catch(act,f));
				else if (arguments.length == 2)
					this.$ && this.$.addEventListener(action,e => f.call(D(this),e||window.event));
				return this;
			}
		}).assign(D(events).do((x,key) => {
			return function(){
				Array.prototype.unshift.call(arguments,x);
				return this.on.apply(this,arguments);
			}
		})).$)
			.inherit(function Window(){}).properties({
				"get doc" : function(){return this.$ && D.doc},
				"get body" : function(){return this.$ && D.body},
				"get head" : function(){return this.$ && D.head}
			}).proto(1)
			.inherit(function FileReader(){}).properties({
				as : function(s){
					this.method = D.switch(s,{
						text : "readAsText",
						binary : "readAsBinaryString",
						buffer : "readAsArrayBuffer"
					},"equals")
					return this;
				},
				read : function(f){
					if (this.$){
						if (this.method)
							this.$[this.method](f);
						else
							this.$.readAsDataURL(f);
					}
					return this;
				}
			}).proto(1)
			.inherit(function Socket(){}).properties({
				catch : function(action,f,bool){
					if (arguments.length == 1)
						D(action).do((f,act) => this.on(act,f,false));
					else if (arguments.length == 2){
						if (this.$ && typeof action == "string")
							this.on(action,f,false);
						else
							bool = f, D(action).do((f,act) => this.on(act,f,bool));
					}
					else if (arguments.length == 3)
						this.$ && this.$.on(action,data => {
							!bool && console.warn(
								"%csocket%c %c(%s)%c :",
								"background-color:blue;color:white;",
								"background-color:white;color:black;",
								"background-color:red;color:white;",
								action,
								"background-color:white;color:black;",
								data
							)
							D.Socket.events && action in D.Socket.events ? D.Socket.events[action].call(this,data) : f.call(this,data);
						})
					return this;
				},
				on : function(action,f,bool){
					if (arguments.length == 1)
						D(action).do((f,act) => this.on(act,f,false));
					else if (arguments.length == 2){
						if (this.$ && typeof action == "string")
							this.on(action,f,false);
						else
							bool = f, D(action).do((f,act) => this.on(act,f,bool));
					}
					else if (arguments.length == 3)
						this.$ && this.$.removeAllListeners(action) && this.$.on(action,data => {
							!bool && console.warn(
								"%csocket%c %c(%s)%c :",
								"background-color:blue;color:white;",
								"background-color:white;color:black;",
								"background-color:red;color:white;",
								action,
								"background-color:white;color:black;",
								data
							)
							D.Socket.events && action in D.Socket.events ? D.Socket.events[action].call(this,data) : f.call(this,data);
						})
					return this;
				},
				emit : function(key,value,bool){
					this.$ && this.$.emit(key,value);
					!bool && console.info(
						"%csocket%c %c(%s)%c :",
						"background-color:blue;color:white;",
						"background-color:white;color:black;",
						"background-color:green;color:white;",
						key,
						"background-color:white;color:black;",
						value
					)
					return this;
				}
			}).proto(1)
			.inherit(function HtmlElement(){}).properties(D({
				"get tagType" : function(){return this.objectName in svgTags ? "svg" : "html"},
				"get up" : function(){return this.$ && D(this.$.parentNode)},
				"get root" : function(){return D.doc},
				"get children" : function(){return this.$ && D(this.$.childNodes)},
				"get firstChild" : function(){return this.$ && (D(this.$.firstChild).$ ? D(this.$.firstChild) : null)},
				"get lastChild" : function(){return this.$ && (D(this.$.lastChild).$ ? D(this.$.lastChild) : null)},
				"get next" : function(){return this.$ && (D(this.$.nextElementSibling).$ ? D(this.$.nextElementSibling) : null)},
				"get prev" : function(){return this.$ && (D(this.$.previousElementSibling).$ ? D(this.$.previousElementSibling) : null)},
				"get innerWidth" : function(){return this.$ && this.$.innerWidth},
				"get innerHeight" : function(){return this.$ && this.$.innerHeight},
				"get offsetWidth" : function(){return this.$ && this.$.offsetWidth},
				"get offsetHeight" : function(){return this.$ && this.$.offsetHeight},
				"get offsetLeft" : function(){return this.$ && this.$.offsetLeft},
				"get offsetTop" : function(){return this.$ && this.$.offsetTop},
				attach : function(options){
					options = options ? options.toString() : "";
					return D(options.split(/(\s)+/)).reduce((o,x) => {
						if (!o.mode){
							if (x.match(/^\#/))
								this.id(x.replace(/^\#/,""));
							else if (x.match(/^\./))
								this.class(x.replace(/^\./,"+"));
							else if (x.match(/^\->/)){
								src = x.replace(/^\->/,"");
								if (this instanceof D.Source)
									this.src(src);
							}
							else if (x.match(/^('.*[^\$](\$\$)*'|`.*[^\$](\$\$)*`|".*[^\$](\$\$)*")$/))
								this.text(D.textDecode(x.replace(/^('|`|")|('|`|")$/g,"")));
							else if (x.match(/^('|`|")/)){
								o.separator = x[0];
								o.value = x.substring(1);
								o.mode = "text";
								return o;
							}
							else if (x.match(/^[^\:\s]+\:('.*[^\$](\$\$)*'|`.*[^\$](\$\$)*`|".*[^\$](\$\$)*")$/))
								this.css(x.match(/^[^\:\s]+(?=\:)/g)[0],D.textDecode(x.replace(/^[^\:\s]+\:('|`|")|('|`|")$/g,"")));
							else if (x.match(/^[^\:\s]+\:('|`|")/)){
								var value = x.match(/^[^\:\s]+(?=\:)/g)[0];
								x = x.replace(/^[^\:\s]+\:/,"");
								o.separator = x[0];
								o.value = x.substring(1);
								o.mode = "css/" + value;
								return o;
							}
							else if (x.match(/^[^\:\s]+\:/))
								this.css(x.match(/^[^\:\s]+(?=\:)/g)[0],D.textDecode(x.replace(/^[^\:\s]+\:/,"")));
							else if (x.match(/^[^\=\s]+$/))
								this.attr(x,"");
							else if (x.match(/^[^\=\s]+\=('.*[^\$](\$\$)*'|`.*[^\$](\$\$)*`|".*[^\$](\$\$)*")$/))
								this.attr(x.match(/^[^\=\s]+(?=\=)/g)[0],D.textDecode(x.replace(/^[^\=\s]+\=('|`|")|('|`|")$/g,"")));
							else if (x.match(/^[^\=\s]+\=('|`|")/)){
								var value = x.match(/^[^\=\s]+(?=\=)/g)[0];
								x = x.replace(/^[^\=\s]+\=/,"");
								o.separator = x[0];
								o.value = x.substring(1);
								o.mode = "attr/" + value;
								return o;
							}
							else if (x.match(/^[^\=\s]+\=/))
								this.attr(x.match(/^[^\=\s]+(?=\=)/g)[0],D.textDecode(x.replace(/^[^\=\s]+\=/,"")));
						}
						else{
							if (o.mode == "text" && x.match(new RegExp("(^|[^\\$])(\\$\\$)*" + o.separator + "$"))){
								o.value += x.substring(0,x.length - 1);
								this.text(D.textDecode(o.value));
								o.separator = o.value = o.mode = "";
							}
							else if (o.mode.match(/^attr\//) && x.match(new RegExp("(^|[^\\$])(\\$\\$)*" + o.separator + "$"))){
								o.value += x.substring(0,x.length - 1);
								this.attr(o.mode.replace(/^attr\//,""),D.textDecode(o.value));
								o.separator = o.value = o.mode = "";
							}
							else if (o.mode.match(/^css\//) && x.match(new RegExp("(^|[^\\$])(\\$\\$)*" + o.separator + "$"))){
								o.value += x.substring(0,x.length - 1);
								this.css(o.mode.replace(/^css\//,""),D.textDecode(o.value));
								o.separator = o.value = o.mode = "";
							}
							else
								o.value += x;
						}
						return o;
					},{
						value : "",
						mode : "",
						separator : ""
					}), this;
				},
				find : function(selector){
					return this.$ && D(this.$.querySelector(selector));
				},
				findAll : function(selector){
					return this.$ && D(this.$.querySelectorAll(selector));
				},
				attr : function(prop,value){
					if (this.$){
						if (typeof prop == "string" && prop.match(/^\-/))
							return this.$ && D(prop.split(/\s+/)).do(x => x.match && x.match(/^\-/) && this.$.removeAttribute(x.replace(/^\-/,""))), this;
						else if (arguments.length == 2){
							if (this.$){
								this.$.setAttribute(prop,value);
								D.module("$router") && (prop == "d-href" || prop == "d-state") && this.transformAnchor();
							}
							return this;
						}
						else if (arguments.length == 1)
							return this.$ && typeof prop == "string" ? this.$.getAttribute(prop) : (D(prop).do((val,key) => this.attr(key,val)), this);
					}
					else
						return this;
				},
				svgAttr : function(prop,value){
					if (this.$){
						if (typeof prop == "string" && prop.match(/^\-/))
							return this.$ && D(prop.split(/\s+/)).do(x => x.match && x.match(/^\-/) && this.$.removeAttributeNS(svgAttrNS,x.replace(/^\-/,""))), this;
						else if (arguments.length == 2)
							return this.$ && this.$.setAttributeNS(svgAttrNS,prop,value), this;
						else if (arguments.length == 1)
							return this.$ && typeof prop == "string" ? this.$.getAttributeNS(svgAttrNS,prop) : D(prop).do((val,key) => this.attr(key,val)), this;
					}
					else
						return this;
				},
				css : function(prop,value){
					if (this.$){
						if (typeof prop == "string" && prop.match(/^\-/))
							return this.$ && D(prop.split(/\s+/)).do(x => x.match && x.match(/^\-/) && this.css(x.replace(/^\-/,""),"")), this;
						if (arguments.length == 2)
							return this.$.style[prop] = typeof value == "function" ? value.call(this,this.css(prop)) : value, this;
						else if (arguments.length == 1)
							return typeof prop == "string" ? this.$.style[prop] : (D(prop).do((val,key) => this.css(key,val)), this);
					}
					else
						return this;
				},
				hide : function(){
					if (this.$ && this.css("display") != "none"){
						this[Symbol.for("D.HtmlElement.prototype/display")] = String(this.css("display"));
						this.css("display","none");
					}
					return this;
				},
				show : function(){
					if (this.$ && this.css("display") == "none"){
						this.css("display",Symbol.for("D.HtmlElement.prototype/display") in this ? String(this[Symbol.for("D.HtmlElement.prototype/display")]) || "" : "");
						delete(this[Symbol.for("D.HtmlElement.prototype/display")]);
					}
					return this;
				},
				disable : function(){return this.attr("disabled","")},
				enable : function(){return this.attr("-disabled")},
				width : function(width){
					return arguments.length ? (this.$ && (this instanceof D.Img || this instanceof D.Canvas ? 
						(this.$.width = typeof width == "function" ? width.call(this,this.width()) : width) :
						(this.$.style.width = typeof width == "function" ? width.call(this,this.$.style.width) : width)
					), this) : this.$ && (this.$.width || parseInt(this.$.style.width));
				},
				height : function(height){
					return arguments.length ? (this.$ && (this instanceof D.Img || this instanceof D.Canvas ? 
						(this.$.height = typeof height == "function" ? height.call(this,this.height()) : height) :
						(this.$.style.height = typeof height == "function" ? height.call(this,this.$.style.height) : height)
					), this) : this.$ && (this.$.width || parseInt(this.$.style.height));
				},
				id : function(id){
					return arguments.length ? (this.$ && (
						this.$.id = typeof id != "function" || id instanceof D.Object ? 
						id : id.call(this,this.$.id)
					), this) : this.$ && this.$.id;
				},
				html : function(html){
					return arguments.length ? (this.$ && (
						typeof html != "function" || html instanceof D.Object ? 
						(this.$.innerHTML = html) : (this.$.innerHTML = html.call(this,this.html()))
					), this) : this.$ && this.$.innerHTML;
				},
				text : function(text){
					return arguments.length ? (this.$ && this.html("") && (
						typeof text != "function" || text instanceof D.Object ? 
						this.$.appendChild(document.createTextNode(text)) : this.$.appendChild(document.createTextNode(text.call(this,this.text())))
					), this) : this.$ && ("innerText" in this.$ ? this.$.innerText : this.$.textContent);
				},
				addHtml : function(html){return this.$ && (this.$.innerHTML += html) ,this},
				addText : function(text){return this.$ && this.$.appendChild(document.createTextNode(text)), this},
				class : function(cls){
					var node = this.$;
					if (arguments.length){
						if (node){
							if (typeof cls == "string"){
								if (cls.match(/^\?/))
									return cls.replace(/^\?/,"") && node.classList.contains(cls.replace(/^\?/,""));
								else if (cls.match(/^\+|^\-/)){
									return D(cls.split(/[\s]+/)).do(function(x){
										if (x.match(/^\+/))
											cls.replace(/^\+/,"") && node.classList.add(x.replace(/^\+/,""));
										else if (x.match(/^\-/))
											cls.replace(/^\-/,"") && node.classList.remove(x.replace(/^\-/,""));
									}), this;
								}
								else
									return node.className = cls, this;
							}
						}
						else
							return this;
					}
					else
						return node && node.className;
				},
				throw : function(n){
					if (!n || n != Number(n) || n < 0)
						return this;
					else
						return this.$ && this.up.throw(n-1);
				},
				to : function(tag){
					var parent = this;
					while(parent){
						parent = parent.up;
						if (parent.objectName.toLowerCase() == tag)
							return parent;
					}
					return null;
				},
				into : function(parent){
					return D(parent).child(this);
				},
				child : function(child){
					return this.$ && this.$.appendChild(D(child).$) && D(child);
				},
				insertAfter : function(inserted,reference){
					if (this.$){
						if (!reference)
							this.insertBefore.call(inserted,this.$.firstChild);
						else if (this.$.lastChild == D(reference).$)
							this.$.appendChild(D(inserted).$);
						else
							this.insertBefore.call(inserted,D(reference).next);
					}
					return this.$ && D(inserted);
				},
				insertBefore : function(inserted,reference){
					return this.$ && D(Node.prototype.insertBefore.call(this.$,D(inserted).$,D(reference).$));
				},
				putBefore : function(reference){
					return this.$ && D(reference).up.insertBefore(this,reference);
				},
				putAfter : function(reference){
					return this.$ && D(reference).up.insertAfter(this,reference);
				},
				toStart : function(){
					return this.$ && this.putBefore(this.up.firstChild);
				},
				toEnd : function(){
					return this.$ && this.putAfter(this.up.lastChild);
				},
				contains : function(node){
					return this.$ && D(node).up == this;
				},
				clone : function(){
					return this.$ && D(this.$.cloneNode());
				},
				delete : function(){
					var parent = this.$ && this.up;
					this.$ && parent.$.removeChild(this.$);
					return this;
				},
				new : function(type){
					if (this.$){
						var elem = type in svgTags ? D(document.createElementNS("http://www.w3.org/2000/svg",type)) : D(document.createElement(type));
						!(this instanceof D.Document) && this != D && this.child(elem);
						if (arguments.length > 1){
							Array.prototype.shift.call(arguments);
							elem.attach.apply(elem,arguments);
						}
						return elem;
					}
				},
				icon : function(){
					var icon = this.link("rel=`shortcut icon`");
					icon.attach.apply(icon, arguments);
					return icon.type("image/" + (D.extension(icon.src()) == "ico" ? "x-icon" : "png"));
				},
				stylesheet : function(){
					var link = this.link("type=text/css rel=stylesheet");
					return link.attach.apply(link, arguments);
				},
				js : function(){
					var js = this.script("type=text/javascript");
					return js.attach.apply(js, arguments);
				},
				anchor : function(){
					return this.a.apply(this,arguments).transformAnchor();
				},
				svg : function(){
					Array.prototype.unshift.call(arguments,"svg");
					return this.new.apply(this,arguments);
				},
				transformAnchor : function(){
					if (D.module("$router")){
						!this.attr("d-href") && this.src && this.src() && this.attr("d-href", this.src());
						this.src && this.src("javascript:void(0);");
						return this instanceof D.A ? this.click(function(e){
							e.preventDefault();
							this.attr("d-state") ? D.module("$router").directByName(this.attr("d-state")) : D.module("$router").direct(this.attr("d-href"));
						}) : this.catch("click", function(e){
							this.attr("d-state") ? D.module("$router").directByName(this.attr("d-state")) : D.module("$router").direct(this.attr("d-href"));
						})
					}
					return this;
				},
				setOf : function(options,array,cb){
					var type = options.match(/^[\-\w]+/)[0];
					options = options.match(/^[\-\w]+\(.*\)$/) ? options.replace(/^[\-\w]+\(|\)$/g,"") : null;
					array = D(array);
					array.do((x,key) => {
						var elem = options ? this[type](options) : this[type]();
						cb ? cb.call(array,elem,x,key) : array instanceof D.Object && elem.text(x);
					})
					return this;
				}
			}).assign(D(htmlTags).filter((x,key) => key!="document"&&key!="html"&&key!="body"&&key!="head").do((x,key) => {
				return function(){
					Array.prototype.unshift.call(arguments,key);
					return this.new.apply(this,arguments);
				}
			}),D(css).do((x,key) => {
				return function(){
					Array.prototype.unshift.call(arguments,key);
					return this.css.apply(this,arguments);
				}
			})).$)
				.inherit(function SvgElement(){}).properties(D({
					group : function(){
						return this.g.apply(this,arguments);
					}
				}).assign(D(svgTags).do((x,key) => {
					return function(){
						Array.prototype.unshift.call(arguments,key);
						return this.new.apply(this,arguments);
					}
				})).$)
					.inherit(function Circle(){}).proto(1)
					.inherit(function G(){}).proto(1)
					.inherit(function Path(){}).properties({
						moveTo : function(x,y){
							var p = `\n\tm ${ x },${ y }\n`;
							return this.attr("d",this.attr("d") && this.attr("d").match(/\n$/) ? this.attr("d").replace(/\n$/,p) : p);
						},
						MoveTo : function(x,y){
							var p = `\n\tM ${ x },${ y }\n`;
							return this.attr("d",this.attr("d") && this.attr("d").match(/\n$/) ? this.attr("d").replace(/\n$/,p) : p);
						},
						lineTo : function(x,y){
							var p = `\n\tl ${ x },${ y }\n`;
							return this.attr("d",this.attr("d") && this.attr("d").match(/\n$/) ? this.attr("d").replace(/\n$/,p) : p);
						},
						LineTo : function(x,y){
							var p = `\n\tL ${ x },${ y }\n`;
							return this.attr("d",this.attr("d") && this.attr("d").match(/\n$/) ? this.attr("d").replace(/\n$/,p) : p);
						},
						arcTo : function(r,f1,f2,x,y){
							var p = `\n\ta ${ r },${ r } 0 ${ f1 } ${ f2 } ${ x },${ y }\n`;
							return this.attr("d",this.attr("d") && this.attr("d").match(/\n$/) ? this.attr("d").replace(/\n$/,p) : p);
						},
						ArcTo : function(r,f1,f2,x,y){
							var p = `\n\tA ${ r },${ r } 0 ${ f1 } ${ f2 } ${ x },${ y }\n`;
							return this.attr("d",this.attr("d") && this.attr("d").match(/\n$/) ? this.attr("d").replace(/\n$/,p) : p);
						},
						vTo : function(y){
							var p = `\n\tv ${ y }\n`;
							return this.attr("d",this.attr("d") && this.attr("d").match(/\n$/) ? this.attr("d").replace(/\n$/,p) : p);
						},
						VTo : function(y){
							var p = `\n\tV ${ y }\n`;
							return this.attr("d",this.attr("d") && this.attr("d").match(/\n$/) ? this.attr("d").replace(/\n$/,p) : p);
						},
						hTo : function(x){
							var p = `\n\th ${ x }\n`;
							return this.attr("d",this.attr("d") && this.attr("d").match(/\n$/) ? this.attr("d").replace(/\n$/,p) : p);
						},
						HTo : function(x){
							var p = `\n\tH ${ x }\n`;
							return this.attr("d",this.attr("d") && this.attr("d").match(/\n$/) ? this.attr("d").replace(/\n$/,p) : p);
						},
						close : function(x,y){
							var p = "\n\tz\n";
							return this.attr("d",this.attr("d") && this.attr("d").match(/\n$/) ? this.attr("d").replace(/\n$/,p) : p);
						},
						clear : function(){
							return this.attr("-d");
						}
					}).proto(1)
					.inherit(function Polygon(){}).proto(1)
					.inherit(function Rect(){}).proto(1)
					.inherit(function Svg(){}).properties({
						viewBox : function(x,y,w,h){
							return arguments.length ? this.attr("viewBox",[x,y,w,h].join(" ")) : this.$.viewBox.animVal;
						}
					}).proto(1)
					.inherit(function Text(){}).proto(2)
				.inherit(function DataElement(){}).properties({
					val : function(value){
						return arguments.length ? (this.$ && (
							typeof value == "function" ? (this.$.value = value.call(this,this.val())) : (this.$.value = value)
						), this) : this.$ && this.$.value;
					},
					"get numVal" : function(){return this.$ && Number(this.$.value)},
					default : function(value){
						return arguments.length ? (this.$ && (
							typeof value == "function" ? (this.$.defaultValue = value.call(this,this.val())) : (this.$.defaultValue = value)
						), this) : this.$ && this.$.defaultValue;
					}
				})
					.inherit(function Input(){}).properties({
						req : function(){
							return this.attr("required","");
						},
						type : function(){
							Array.prototype.unshift.call(arguments,"type");
							return this.attr.apply(this,arguments);
						}
					}).proto(1)
					.inherit(function Meter(){}).proto(1)
					.inherit(function Option(){}).properties({
						sel : function(){
							return this.attr("selected","");
						}
					}).proto(1)
					.inherit(function Progress(){}).proto(1)
					.inherit(function Select(){}).properties({
						options : function(options){
							if (arguments.length){
								var arrBool = options instanceof Array;
								return D(options).do((x,k) => this.option().val(x).text(arrBool ? x : k).up);
							}
							else
								return this.$ && D(this.$.options);
						},
						selected : function(value,type){
							if (arguments.length){
								if (type == "text"){
									var match = value instanceof RegExp ? this.options().match(x => D(x).text().match(value)) : this.options().match(x => D(x).text() == value);
									this.$.selectedIndex = match ? match.key : this.$.selectedIndex;
								}
								else if (type == "index"){
									this.$.selectedIndex = index;
								}
								else{
									var match = value instanceof RegExp ? this.options().match(x => D(x).val().match(value)) : this.options().match(x => D(x).val() == value);
									this.$.selectedIndex = match ? match.key : this.$.selectedIndex;
								}
								return this;
							}
							else
								return this.$ && D(this.$.options[this.$.selectedIndex]);
						}
					}).proto(1)
					.inherit(function TextArea(){}).properties({
						cols : function(value){
							return arguments.length ? (this.$ && (
								typeof value == "function" ? (this.$.cols = value.call(this,this.cols())) : (this.$.cols = value)
							), this) : this.$ && this.$.cols;
						},
						rows : function(value){
							return arguments.length ? (this.$ && (
								typeof value == "function" ? (this.$.rows = value.call(this,this.rows())) : (this.$.rows = value)
							), this) : this.$ && this.$.rows;
						}
					}).proto(2)
				.inherit(function Source(){}).properties({
					src : function(src){
						return arguments.length ? (
							D.switch(this.objectName,"equals")
								.when("img","audio","video","iframe","script",() => this.$.src = src)
								.when("a","link",() => this.attr("href",src))
								.when("form",() => this.attr("action",src))
								.otherwise(null)
							, this) : D.switch(this.objectName,"equals")
								.when("img","audio","video","iframe","script",this.$.src)
								.when("a","link",this.attr("href"))
								.when("form",this.attr("action"))
								.otherwise(null)
					},
					type : function(){
						Array.prototype.unshift.call(arguments,"type");
						return this.attr.apply(this,arguments);
					}
				})
					.inherit(function Media(){}).properties({
						loop : function(){
							return this.attr("loop","");
						},
						auto : function(){
							return this.attr("autoplay","");
						},
						controls : function(){
							return this.attr("controls","");
						}
					})
						.inherit(function Audio(){}).proto(1)
						.inherit(function Video(){}).proto(2)
					.inherit(function A(){}).proto(1)
					.inherit(function Form(){}).proto(1)
					.inherit(function IFrame(){}).properties({
						"get window" : function(){return this.$ && D(this.$.contentWindow)},
						"get doc" : function(){return this.$ && D(this.$.contentDocument)},
						"get body" : function(){return this.$ && D(this.$.contentDocument.body)},
						"get head" : function(){return this.$ && D(this.$.contentDocument.head)}
					}).proto(1)
					.inherit(function Img(){}).proto(1)
					.inherit(function Link(){}).properties({
						rel : function(rel){
							Array.prototype.unshift.call(arguments,"rel");
							return this.attr.apply(this,arguments);
						}
					}).proto(1)
					.inherit(function Script(){}).proto(2)
				.inherit(function B(){}).proto(1)
				.inherit(function Body(){}).properties({
					"get window" : function(){return this.$ && D.window},
					"get doc" : function(){return this.$ && D.doc}
				}).proto(1)
				.inherit(function Br(){}).proto(1)
				.inherit(function Button(){}).proto(1)
				.inherit(function Canvas(){}).properties({
					"get ctx" : function(){return this.$.getContext("2d")},
					fillStyle : function(style){
						if (arguments.length){
							this.ctx.fillStyle = style;
							return this;
						}
						else
							return this.ctx.fillStyle;
					},
					strokeStyle : function(style){
						if (arguments.length){
							this.ctx.strokeStyle = style;
							return this;
						}
						else
							return this.ctx.strokeStyle;
					},
					alpha : function(alpha){
						if (arguments.length){
							this.ctx.globalAlpha = alpha;
							return this;
						}
						else
							return this.ctx.globalAlpha;
					},
					lineWidth : function(width){
						if (arguments.length){
							this.ctx.lineWidth = width;
							return this;
						}
						else
							return this.ctx.lineWidth;
					},
					lineCap : function(cap){
						if (arguments.length){
							this.ctx.lineCap = cap;
							return this;
						}
						else
							return this.ctx.lineCap;
					},
					lineJoin : function(join){
						if (arguments.length){
							this.ctx.lineJoin = join;
							return this;
						}
						else
							return this.ctx.lineJoin;
					},
					font : function(font){
						if (arguments.length){
							this.ctx.font = font;
							return this;
						}
						else
							return this.ctx.font;
					},
					textAlign : function(align){
						if (arguments.length){
							this.ctx.textAlign = align;
							return this;
						}
						else
							return this.ctx.textAlign;
					},
					textBaseline : function(baseline){
						if (arguments.length){
							this.ctx.textBaseline = baseline;
							return this;
						}
						else
							return this.ctx.textBaseline;
					},
					fill : function(style){
						if (style){
							var s = this.fillStyle();
							this.fillStyle(style);
							this.ctx.fill();
							this.fillStyle(s);
						}
						else
							this.ctx.fill();
						return this;
					},
					stroke : function(style){
						if (style){
							var s = this.strokeStyle();
							this.strokeStyle(style);
							this.ctx.stroke();
							this.strokeStyle(s);
						}
						else
							this.ctx.stroke();
						return this;
					},
					rect : function(x,y,w,h){
						this.ctx.rect(x,y,w,h);
						return this;
					},
					fillRect : function(style,x,y,w,h){
						if (Number(style) == style)
							h = w, w = y, y = x, x = style, style = this.fillStyle();
						x = x || 0, y = y || 0, w = w || this.width(), h = h || this.height();
						var s = this.fillStyle();
						this.fillStyle(style);
						this.ctx.fillRect(x,y,w,h);
						this.fillStyle(s);
						return this;
					},
					clearRect : function(){
						this.ctx.clearRect.apply(this.ctx,arguments);
						return this;
					},
					clear : function(){
						this.width(this.width());
						return this;
					},
					fillText : function(){
						this.ctx.fillText.apply(this.ctx,arguments);
						return this;
					},
					strokeText : function(){
						this.ctx.strokeText.apply(this.ctx,arguments);
						return this;
					},
					begin : function(){
						this.ctx.beginPath();
						return this;
					},
					moveTo : function(x,y){
						this.ctx.moveTo(x,y);
						return this;
					},
					MoveTo : function(x,y){
						return this.close().begin().moveTo(x,y);
					},
					lineTo : function(x,y){
						this.ctx.lineTo(x,y);
						return this;
					},
					LineTo : function(x,y){
						this.close().begin().lineTo(x,y);
					},
					close : function(){
						this.ctx.closePath();
						return this;
					},
					figure : function(set,closure){
						var ctx = this;
						ctx.begin();
						ctx.moveTo(set[0].x,set[0].y);
						D(set).do(p => ctx.lineTo(p.x,p.y));
						if (closure)
							ctx.lineTo(set[0].x,set[0].y);
						return this;
					},
					arc : function(x,y,r,start,end,clock){
						start = start || 0;
						end = end == undefined ? 360 : end;
						this.ctx.arc(x,y,r,-start*Math.PI/180,-end*Math.PI/180,!clock);
						return this;
					},
					Arc : function(x,y,r,start,end,clock){
						return this.close().begin().arc(x,y,r,start,end,clock);
					},
					arcTo : function(){
						this.ctx.arcTo.apply(this.ctx,arguments);
						return this;
					},
					ArcTo : function(){
						return this.close().begin().arcTo.apply(this.ctx,arguments);
					},
					ellipse : function(x,y,a,b,rotation,start,end,clock){
						rotation = rotation || 0;
						start = start || 0;
						end = end == undefined ? 360 : end;
						this.ctx.ellipse(x,y,a,b,rotation,-start*Math.PI/180,-end*Math.PI/180,!clock);
						return this;
					},
					Ellipse : function(x,y,a,b,rotation,start,end,clock){
						return this.close().begin().ellipse(x,y,a,b,rotation,start,end,clock);
					},
					image : function(image,x,y){
						var f = D(arguments).match(x => typeof x == "function");
						f = f && f.val;
						x = x || 0, y = y || 0;
						image = typeof image == "string" ? D.img().src(image) : D(image);
						var canvas = this,
							args = arguments;
						(function(){
							if (!image.$.complete)
								setTimeout(arguments.callee,0);
							else{
								image = image.$;
								canvas.ctx.drawImage.apply(canvas.ctx,args), typeof f == "function" && f(canvas);
							}
						})()
						return this;
					},
					data : function(){
						if (arguments.length == 4){
							var data = this.ctx.getImageData.apply(this.ctx,arguments);
							return D(data.data).reduce((o,x,k) => {
								if (k%(4*data.width) == 0)
									o.push([]);
								D.switch(i%4,{
									1 : () => D(D(o).last).last.g = x,
									2 : () => D(D(o).last).last.b = x,
									3 : () => D(D(o).last).last.a = x
								},"equals",() => D(o).last.push({r:x}))
								return o;
							},[])
						}
						else if (arguments.length == 3){
							var height = arguments[0].length;
							var width = arguments[0][0].length;
							this.ctx.putImageData(D(arguments[0]).reduce((o,row,i) => {
								o.data = D(row).reduce((o,v,j) => {
									var index = 4*(i*width+j);
									o[index] = v.r;
									o[index+1] = v.g;
									o[index+2] = v.b;
									o[index+3] = v.a;
									return o;
								},o.data);
								return o;
							},this.ctx.createImageData(width,height)),arguments[1],arguments[2]);
							return this;
						}
					}
				}).proto(1)
				.inherit(function Div(){}).proto(1)
				.inherit(function Document(){}).properties({
					"get window" : function(){return this.$ && D.window},
					"get body" : function(){return this.$ && D.body},
					"get head" : function(){return this.$ && D.head}
				}).proto(1)
				.inherit(function FieldSet(){}).proto(1)
				.inherit(function Head(){}).properties({
					"get window" : function(){return this.$ && D.window},
					"get doc" : function(){return this.$ && D.doc}
				}).proto(1)
				.inherit(function HTML(){}).proto(1)
				.inherit(function I(){}).proto(1)
				.inherit( function Legend(){}).proto(1)
				.inherit(function Meta(){}).proto(1)
				.inherit(function Null(){}).proto(1)
				.inherit(function Ol(){}).proto(1)
				.inherit(function P(){}).proto(1)
				.inherit(function Pre(){}).proto(1)
				.inherit(function Span(){}).proto(1)
				.inherit(function Style(){}).properties({
					type : function(){
						Array.prototype.unshift.call(arguments,"type");
						return this.attr.apply(this,arguments);
					}
				}).proto(1)
				.inherit(function Table(){}).properties({
					rows : function(array,cb){
						return this.setOf("tr",array,cb);
					}
				}).proto(1)
				.inherit(function TBody(){}).properties({
					rows : function(array,cb){
						return this.setOf("tr",array,cb);
					}
				}).proto(1)
				.inherit(function Td(){}).proto(1)
				.inherit(function Th(){}).proto(1)
				.inherit(function THead(){}).properties({
					rows : function(array,cb){
						return this.setOf("tr",array,cb);
					}
				}).proto(1)
				.inherit(function Title(){}).proto(1)
				.inherit(function Tr(){}).properties({
					cols : function(array,cb){
						return this.setOf(this.up instanceof D.THead ? "th" : "td",array,cb);
					}
				}).proto(1)
				.inherit(function Ul(){}).proto(1)
})()