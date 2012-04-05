$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof js=='undefined') js = {}
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__unhtml(js.Boot.__string_rec(v,"")) + "<br/>";
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("No haxe:trace element defined\n" + msg); else d.innerHTML += msg;
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.__closure = function(o,f) {
	var m = o[f];
	if(m == null) return null;
	var f1 = function() {
		return m.apply(o,arguments);
	};
	f1.scope = o;
	f1.method = m;
	return f1;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		return o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
	js.Lib.isOpera = typeof window!='undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	};
	Array.prototype.remove = Array.prototype.indexOf?function(obj) {
		var idx = this.indexOf(obj);
		if(idx == -1) return false;
		this.splice(idx,1);
		return true;
	}:function(obj) {
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				return true;
			}
			i++;
		}
		return false;
	};
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}};
	};
	if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function(i) {
		var x = this.cca(i);
		if(x != x) return null;
		return x;
	};
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		} else if(len < 0) len = this.length + len - pos;
		return oldsub.apply(this,[pos,len]);
	};
	$closure = js.Boot.__closure;
}
js.Boot.prototype.__class__ = js.Boot;
if(typeof haxe=='undefined') haxe = {}
haxe.Firebug = function() { }
haxe.Firebug.__name__ = ["haxe","Firebug"];
haxe.Firebug.detect = function() {
	try {
		return console != null && console.error != null;
	} catch( e ) {
		return false;
	}
}
haxe.Firebug.redirectTraces = function() {
	haxe.Log.trace = haxe.Firebug.trace;
	js.Lib.setErrorHandler(haxe.Firebug.onError);
}
haxe.Firebug.onError = function(err,stack) {
	var buf = err + "\n";
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		buf += "Called from " + s + "\n";
	}
	haxe.Firebug.trace(buf,null);
	return true;
}
haxe.Firebug.trace = function(v,inf) {
	var type = inf != null && inf.customParams != null?inf.customParams[0]:null;
	if(type != "warn" && type != "info" && type != "debug" && type != "error") type = inf == null?"error":"log";
	console[type]((inf == null?"":inf.fileName + ":" + inf.lineNumber + " : ") + Std.string(v));
}
haxe.Firebug.prototype.__class__ = haxe.Firebug;
EReg = function(r,opt) {
	if( r === $_ ) return;
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
}
EReg.__name__ = ["EReg"];
EReg.prototype.r = null;
EReg.prototype.match = function(s) {
	this.r.m = this.r.exec(s);
	this.r.s = s;
	this.r.l = RegExp.leftContext;
	this.r.r = RegExp.rightContext;
	return this.r.m != null;
}
EReg.prototype.matched = function(n) {
	return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
		var $r;
		throw "EReg::matched";
		return $r;
	}(this));
}
EReg.prototype.matchedLeft = function() {
	if(this.r.m == null) throw "No string matched";
	if(this.r.l == null) return this.r.s.substr(0,this.r.m.index);
	return this.r.l;
}
EReg.prototype.matchedRight = function() {
	if(this.r.m == null) throw "No string matched";
	if(this.r.r == null) {
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	return this.r.r;
}
EReg.prototype.matchedPos = function() {
	if(this.r.m == null) throw "No string matched";
	return { pos : this.r.m.index, len : this.r.m[0].length};
}
EReg.prototype.split = function(s) {
	var d = "#__delim__#";
	return s.replace(this.r,d).split(d);
}
EReg.prototype.replace = function(s,by) {
	return s.replace(this.r,by);
}
EReg.prototype.customReplace = function(s,f) {
	var buf = new StringBuf();
	while(true) {
		if(!this.match(s)) break;
		buf.add(this.matchedLeft());
		buf.add(f(this));
		s = this.matchedRight();
	}
	buf.b[buf.b.length] = s == null?"null":s;
	return buf.b.join("");
}
EReg.prototype.__class__ = EReg;
Xml = function(p) {
}
Xml.__name__ = ["Xml"];
Xml.Element = null;
Xml.PCData = null;
Xml.CData = null;
Xml.Comment = null;
Xml.DocType = null;
Xml.Prolog = null;
Xml.Document = null;
Xml.parse = function(str) {
	var rules = [Xml.enode,Xml.epcdata,Xml.eend,Xml.ecdata,Xml.edoctype,Xml.ecomment,Xml.eprolog];
	var nrules = rules.length;
	var current = Xml.createDocument();
	var stack = new List();
	while(str.length > 0) {
		var i = 0;
		try {
			while(i < nrules) {
				var r = rules[i];
				if(r.match(str)) {
					switch(i) {
					case 0:
						var x = Xml.createElement(r.matched(1));
						current.addChild(x);
						str = r.matchedRight();
						while(Xml.eattribute.match(str)) {
							x.set(Xml.eattribute.matched(1),Xml.eattribute.matched(3));
							str = Xml.eattribute.matchedRight();
						}
						if(!Xml.eclose.match(str)) {
							i = nrules;
							throw "__break__";
						}
						if(Xml.eclose.matched(1) == ">") {
							stack.push(current);
							current = x;
						}
						str = Xml.eclose.matchedRight();
						break;
					case 1:
						var x = Xml.createPCData(r.matched(0));
						current.addChild(x);
						str = r.matchedRight();
						break;
					case 2:
						if(current._children != null && current._children.length == 0) {
							var e = Xml.createPCData("");
							current.addChild(e);
						}
						if(r.matched(1) != current._nodeName || stack.isEmpty()) {
							i = nrules;
							throw "__break__";
						}
						current = stack.pop();
						str = r.matchedRight();
						break;
					case 3:
						str = r.matchedRight();
						if(!Xml.ecdata_end.match(str)) throw "End of CDATA section not found";
						var x = Xml.createCData(Xml.ecdata_end.matchedLeft());
						current.addChild(x);
						str = Xml.ecdata_end.matchedRight();
						break;
					case 4:
						var pos = 0;
						var count = 0;
						var old = str;
						try {
							while(true) {
								if(!Xml.edoctype_elt.match(str)) throw "End of DOCTYPE section not found";
								var p = Xml.edoctype_elt.matchedPos();
								pos += p.pos + p.len;
								str = Xml.edoctype_elt.matchedRight();
								switch(Xml.edoctype_elt.matched(0)) {
								case "[":
									count++;
									break;
								case "]":
									count--;
									if(count < 0) throw "Invalid ] found in DOCTYPE declaration";
									break;
								default:
									if(count == 0) throw "__break__";
								}
							}
						} catch( e ) { if( e != "__break__" ) throw e; }
						var x = Xml.createDocType(old.substr(10,pos - 11));
						current.addChild(x);
						break;
					case 5:
						if(!Xml.ecomment_end.match(str)) throw "Unclosed Comment";
						var p = Xml.ecomment_end.matchedPos();
						var x = Xml.createComment(str.substr(4,p.pos + p.len - 7));
						current.addChild(x);
						str = Xml.ecomment_end.matchedRight();
						break;
					case 6:
						var prolog = r.matched(0);
						var x = Xml.createProlog(prolog.substr(2,prolog.length - 4));
						current.addChild(x);
						str = r.matchedRight();
						break;
					}
					throw "__break__";
				}
				i += 1;
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		if(i == nrules) {
			if(str.length > 10) throw "Xml parse error : Unexpected " + str.substr(0,10) + "..."; else throw "Xml parse error : Unexpected " + str;
		}
	}
	if(!stack.isEmpty()) throw "Xml parse error : Unclosed " + stack.last().getNodeName();
	return current;
}
Xml.createElement = function(name) {
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new Hash();
	r.setNodeName(name);
	return r;
}
Xml.createPCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.setNodeValue(data);
	return r;
}
Xml.createCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.setNodeValue(data);
	return r;
}
Xml.createComment = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.setNodeValue(data);
	return r;
}
Xml.createDocType = function(data) {
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.setNodeValue(data);
	return r;
}
Xml.createProlog = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Prolog;
	r.setNodeValue(data);
	return r;
}
Xml.createDocument = function() {
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	return r;
}
Xml.prototype.nodeType = null;
Xml.prototype.nodeName = null;
Xml.prototype.nodeValue = null;
Xml.prototype.parent = null;
Xml.prototype._nodeName = null;
Xml.prototype._nodeValue = null;
Xml.prototype._attributes = null;
Xml.prototype._children = null;
Xml.prototype._parent = null;
Xml.prototype.getNodeName = function() {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._nodeName;
}
Xml.prototype.setNodeName = function(n) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._nodeName = n;
}
Xml.prototype.getNodeValue = function() {
	if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	return this._nodeValue;
}
Xml.prototype.setNodeValue = function(v) {
	if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	return this._nodeValue = v;
}
Xml.prototype.getParent = function() {
	return this._parent;
}
Xml.prototype.get = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.get(att);
}
Xml.prototype.set = function(att,value) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	this._attributes.set(att,value);
}
Xml.prototype.remove = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	this._attributes.remove(att);
}
Xml.prototype.exists = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.exists(att);
}
Xml.prototype.attributes = function() {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.keys();
}
Xml.prototype.iterator = function() {
	if(this._children == null) throw "bad nodetype";
	return { cur : 0, x : this._children, hasNext : function() {
		return this.cur < this.x.length;
	}, next : function() {
		return this.x[this.cur++];
	}};
}
Xml.prototype.elements = function() {
	if(this._children == null) throw "bad nodetype";
	return { cur : 0, x : this._children, hasNext : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			if(this.x[k].nodeType == Xml.Element) break;
			k += 1;
		}
		this.cur = k;
		return k < l;
	}, next : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			k += 1;
			if(n.nodeType == Xml.Element) {
				this.cur = k;
				return n;
			}
		}
		return null;
	}};
}
Xml.prototype.elementsNamed = function(name) {
	if(this._children == null) throw "bad nodetype";
	return { cur : 0, x : this._children, hasNext : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			if(n.nodeType == Xml.Element && n._nodeName == name) break;
			k++;
		}
		this.cur = k;
		return k < l;
	}, next : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			k++;
			if(n.nodeType == Xml.Element && n._nodeName == name) {
				this.cur = k;
				return n;
			}
		}
		return null;
	}};
}
Xml.prototype.firstChild = function() {
	if(this._children == null) throw "bad nodetype";
	return this._children[0];
}
Xml.prototype.firstElement = function() {
	if(this._children == null) throw "bad nodetype";
	var cur = 0;
	var l = this._children.length;
	while(cur < l) {
		var n = this._children[cur];
		if(n.nodeType == Xml.Element) return n;
		cur++;
	}
	return null;
}
Xml.prototype.addChild = function(x) {
	if(this._children == null) throw "bad nodetype";
	if(x._parent != null) x._parent._children.remove(x);
	x._parent = this;
	this._children.push(x);
}
Xml.prototype.removeChild = function(x) {
	if(this._children == null) throw "bad nodetype";
	var b = this._children.remove(x);
	if(b) x._parent = null;
	return b;
}
Xml.prototype.insertChild = function(x,pos) {
	if(this._children == null) throw "bad nodetype";
	if(x._parent != null) x._parent._children.remove(x);
	x._parent = this;
	this._children.insert(pos,x);
}
Xml.prototype.toString = function() {
	if(this.nodeType == Xml.PCData) return this._nodeValue;
	if(this.nodeType == Xml.CData) return "<![CDATA[" + this._nodeValue + "]]>";
	if(this.nodeType == Xml.Comment) return "<!--" + this._nodeValue + "-->";
	if(this.nodeType == Xml.DocType) return "<!DOCTYPE " + this._nodeValue + ">";
	if(this.nodeType == Xml.Prolog) return "<?" + this._nodeValue + "?>";
	var s = new StringBuf();
	if(this.nodeType == Xml.Element) {
		s.b[s.b.length] = "<" == null?"null":"<";
		s.add(this._nodeName);
		var $it0 = this._attributes.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			s.b[s.b.length] = " " == null?"null":" ";
			s.b[s.b.length] = k == null?"null":k;
			s.b[s.b.length] = "=\"" == null?"null":"=\"";
			s.add(this._attributes.get(k));
			s.b[s.b.length] = "\"" == null?"null":"\"";
		}
		if(this._children.length == 0) {
			s.b[s.b.length] = "/>" == null?"null":"/>";
			return s.b.join("");
		}
		s.b[s.b.length] = ">" == null?"null":">";
	}
	var $it1 = this.iterator();
	while( $it1.hasNext() ) {
		var x = $it1.next();
		s.add(x.toString());
	}
	if(this.nodeType == Xml.Element) {
		s.b[s.b.length] = "</" == null?"null":"</";
		s.add(this._nodeName);
		s.b[s.b.length] = ">" == null?"null":">";
	}
	return s.b.join("");
}
Xml.prototype.__class__ = Xml;
haxe.Http = function(url) {
	if( url === $_ ) return;
	this.url = url;
	this.headers = new Hash();
	this.params = new Hash();
	this.async = true;
}
haxe.Http.__name__ = ["haxe","Http"];
haxe.Http.requestUrl = function(url) {
	var h = new haxe.Http(url);
	h.async = false;
	var r = null;
	h.onData = function(d) {
		r = d;
	};
	h.onError = function(e) {
		throw e;
	};
	h.request(false);
	return r;
}
haxe.Http.prototype.url = null;
haxe.Http.prototype.async = null;
haxe.Http.prototype.postData = null;
haxe.Http.prototype.headers = null;
haxe.Http.prototype.params = null;
haxe.Http.prototype.setHeader = function(header,value) {
	this.headers.set(header,value);
}
haxe.Http.prototype.setParameter = function(param,value) {
	this.params.set(param,value);
}
haxe.Http.prototype.setPostData = function(data) {
	this.postData = data;
}
haxe.Http.prototype.request = function(post) {
	var me = this;
	var r = new js.XMLHttpRequest();
	var onreadystatechange = function() {
		if(r.readyState != 4) return;
		var s = (function($this) {
			var $r;
			try {
				$r = r.status;
			} catch( e ) {
				$r = null;
			}
			return $r;
		}(this));
		if(s == undefined) s = null;
		if(s != null) me.onStatus(s);
		if(s != null && s >= 200 && s < 400) me.onData(r.responseText); else switch(s) {
		case null: case undefined:
			me.onError("Failed to connect or resolve host");
			break;
		case 12029:
			me.onError("Failed to connect to host");
			break;
		case 12007:
			me.onError("Unknown host");
			break;
		default:
			me.onError("Http Error #" + r.status);
		}
	};
	if(this.async) r.onreadystatechange = onreadystatechange;
	var uri = this.postData;
	if(uri != null) post = true; else {
		var $it0 = this.params.keys();
		while( $it0.hasNext() ) {
			var p = $it0.next();
			if(uri == null) uri = ""; else uri += "&";
			uri += StringTools.urlDecode(p) + "=" + StringTools.urlEncode(this.params.get(p));
		}
	}
	try {
		if(post) r.open("POST",this.url,this.async); else if(uri != null) {
			var question = this.url.split("?").length <= 1;
			r.open("GET",this.url + (question?"?":"&") + uri,this.async);
			uri = null;
		} else r.open("GET",this.url,this.async);
	} catch( e ) {
		this.onError(e.toString());
		return;
	}
	if(this.headers.get("Content-Type") == null && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	var $it1 = this.headers.keys();
	while( $it1.hasNext() ) {
		var h = $it1.next();
		r.setRequestHeader(h,this.headers.get(h));
	}
	r.send(uri);
	if(!this.async) onreadystatechange();
}
haxe.Http.prototype.onData = function(data) {
}
haxe.Http.prototype.onError = function(msg) {
}
haxe.Http.prototype.onStatus = function(status) {
}
haxe.Http.prototype.__class__ = haxe.Http;
js.Lib = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype.__class__ = js.Lib;
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
Std = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	if(x < 0) return Math.ceil(x);
	return Math.floor(x);
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && x.charCodeAt(1) == 120) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
Std.prototype.__class__ = Std;
if(typeof hxtml=='undefined') hxtml = {}
hxtml.IStyleProxy = function() { }
hxtml.IStyleProxy.__name__ = ["hxtml","IStyleProxy"];
hxtml.IStyleProxy.prototype.setDisplay = null;
hxtml.IStyleProxy.prototype.setPosition = null;
hxtml.IStyleProxy.prototype.setMarginLeft = null;
hxtml.IStyleProxy.prototype.setMarginTop = null;
hxtml.IStyleProxy.prototype.setMarginRight = null;
hxtml.IStyleProxy.prototype.setMarginBottom = null;
hxtml.IStyleProxy.prototype.setPaddingLeft = null;
hxtml.IStyleProxy.prototype.setPaddingTop = null;
hxtml.IStyleProxy.prototype.setPaddingRight = null;
hxtml.IStyleProxy.prototype.setPaddingBottom = null;
hxtml.IStyleProxy.prototype.setWidth = null;
hxtml.IStyleProxy.prototype.setHeight = null;
hxtml.IStyleProxy.prototype.setTop = null;
hxtml.IStyleProxy.prototype.setLeft = null;
hxtml.IStyleProxy.prototype.setBottom = null;
hxtml.IStyleProxy.prototype.setRight = null;
hxtml.IStyleProxy.prototype.setTopKey = null;
hxtml.IStyleProxy.prototype.setLeftKey = null;
hxtml.IStyleProxy.prototype.setBottomKey = null;
hxtml.IStyleProxy.prototype.setRightKey = null;
hxtml.IStyleProxy.prototype.setBgColorNum = null;
hxtml.IStyleProxy.prototype.setBgColorKey = null;
hxtml.IStyleProxy.prototype.setBgImage = null;
hxtml.IStyleProxy.prototype.setBgAttachment = null;
hxtml.IStyleProxy.prototype.setBgRepeat = null;
hxtml.IStyleProxy.prototype.setBgPosXKey = null;
hxtml.IStyleProxy.prototype.setBgPosXNum = null;
hxtml.IStyleProxy.prototype.setBgPosYKey = null;
hxtml.IStyleProxy.prototype.setBgPosYNum = null;
hxtml.IStyleProxy.prototype.setFontSizeNum = null;
hxtml.IStyleProxy.prototype.setFontSizeKey = null;
hxtml.IStyleProxy.prototype.setFontWeightKey = null;
hxtml.IStyleProxy.prototype.setFontWeightNum = null;
hxtml.IStyleProxy.prototype.setFontStyle = null;
hxtml.IStyleProxy.prototype.setFontFamily = null;
hxtml.IStyleProxy.prototype.setFontVariant = null;
hxtml.IStyleProxy.prototype.setTextColorKey = null;
hxtml.IStyleProxy.prototype.setTextColorNum = null;
hxtml.IStyleProxy.prototype.setTextDecoration = null;
hxtml.IStyleProxy.prototype.setLineHeightNum = null;
hxtml.IStyleProxy.prototype.setLineHeightKey = null;
hxtml.IStyleProxy.prototype.setTextTransform = null;
hxtml.IStyleProxy.prototype.__class__ = hxtml.IStyleProxy;
hxtml.Token = { __ename__ : ["hxtml","Token"], __constructs__ : ["TIdent","TString","TInt","TFloat","TDblDot","TSharp","TPOpen","TPClose","TExclam","TComma","TEof","TPercent","TSemicolon","TBrOpen","TBrClose","TDot","TSpaces","TSlash"] }
hxtml.Token.TIdent = function(i) { var $x = ["TIdent",0,i]; $x.__enum__ = hxtml.Token; $x.toString = $estr; return $x; }
hxtml.Token.TString = function(s) { var $x = ["TString",1,s]; $x.__enum__ = hxtml.Token; $x.toString = $estr; return $x; }
hxtml.Token.TInt = function(i) { var $x = ["TInt",2,i]; $x.__enum__ = hxtml.Token; $x.toString = $estr; return $x; }
hxtml.Token.TFloat = function(f) { var $x = ["TFloat",3,f]; $x.__enum__ = hxtml.Token; $x.toString = $estr; return $x; }
hxtml.Token.TDblDot = ["TDblDot",4];
hxtml.Token.TDblDot.toString = $estr;
hxtml.Token.TDblDot.__enum__ = hxtml.Token;
hxtml.Token.TSharp = ["TSharp",5];
hxtml.Token.TSharp.toString = $estr;
hxtml.Token.TSharp.__enum__ = hxtml.Token;
hxtml.Token.TPOpen = ["TPOpen",6];
hxtml.Token.TPOpen.toString = $estr;
hxtml.Token.TPOpen.__enum__ = hxtml.Token;
hxtml.Token.TPClose = ["TPClose",7];
hxtml.Token.TPClose.toString = $estr;
hxtml.Token.TPClose.__enum__ = hxtml.Token;
hxtml.Token.TExclam = ["TExclam",8];
hxtml.Token.TExclam.toString = $estr;
hxtml.Token.TExclam.__enum__ = hxtml.Token;
hxtml.Token.TComma = ["TComma",9];
hxtml.Token.TComma.toString = $estr;
hxtml.Token.TComma.__enum__ = hxtml.Token;
hxtml.Token.TEof = ["TEof",10];
hxtml.Token.TEof.toString = $estr;
hxtml.Token.TEof.__enum__ = hxtml.Token;
hxtml.Token.TPercent = ["TPercent",11];
hxtml.Token.TPercent.toString = $estr;
hxtml.Token.TPercent.__enum__ = hxtml.Token;
hxtml.Token.TSemicolon = ["TSemicolon",12];
hxtml.Token.TSemicolon.toString = $estr;
hxtml.Token.TSemicolon.__enum__ = hxtml.Token;
hxtml.Token.TBrOpen = ["TBrOpen",13];
hxtml.Token.TBrOpen.toString = $estr;
hxtml.Token.TBrOpen.__enum__ = hxtml.Token;
hxtml.Token.TBrClose = ["TBrClose",14];
hxtml.Token.TBrClose.toString = $estr;
hxtml.Token.TBrClose.__enum__ = hxtml.Token;
hxtml.Token.TDot = ["TDot",15];
hxtml.Token.TDot.toString = $estr;
hxtml.Token.TDot.__enum__ = hxtml.Token;
hxtml.Token.TSpaces = ["TSpaces",16];
hxtml.Token.TSpaces.toString = $estr;
hxtml.Token.TSpaces.__enum__ = hxtml.Token;
hxtml.Token.TSlash = ["TSlash",17];
hxtml.Token.TSlash.toString = $estr;
hxtml.Token.TSlash.__enum__ = hxtml.Token;
hxtml.Value = { __ename__ : ["hxtml","Value"], __constructs__ : ["VIdent","VString","VUnit","VFloat","VInt","VHex","VList","VGroup","VUrl","VLabel","VSlash"] }
hxtml.Value.VIdent = function(i) { var $x = ["VIdent",0,i]; $x.__enum__ = hxtml.Value; $x.toString = $estr; return $x; }
hxtml.Value.VString = function(s) { var $x = ["VString",1,s]; $x.__enum__ = hxtml.Value; $x.toString = $estr; return $x; }
hxtml.Value.VUnit = function(v,unit) { var $x = ["VUnit",2,v,unit]; $x.__enum__ = hxtml.Value; $x.toString = $estr; return $x; }
hxtml.Value.VFloat = function(v) { var $x = ["VFloat",3,v]; $x.__enum__ = hxtml.Value; $x.toString = $estr; return $x; }
hxtml.Value.VInt = function(v) { var $x = ["VInt",4,v]; $x.__enum__ = hxtml.Value; $x.toString = $estr; return $x; }
hxtml.Value.VHex = function(v) { var $x = ["VHex",5,v]; $x.__enum__ = hxtml.Value; $x.toString = $estr; return $x; }
hxtml.Value.VList = function(l) { var $x = ["VList",6,l]; $x.__enum__ = hxtml.Value; $x.toString = $estr; return $x; }
hxtml.Value.VGroup = function(l) { var $x = ["VGroup",7,l]; $x.__enum__ = hxtml.Value; $x.toString = $estr; return $x; }
hxtml.Value.VUrl = function(v) { var $x = ["VUrl",8,v]; $x.__enum__ = hxtml.Value; $x.toString = $estr; return $x; }
hxtml.Value.VLabel = function(v,val) { var $x = ["VLabel",9,v,val]; $x.__enum__ = hxtml.Value; $x.toString = $estr; return $x; }
hxtml.Value.VSlash = ["VSlash",10];
hxtml.Value.VSlash.toString = $estr;
hxtml.Value.VSlash.__enum__ = hxtml.Value;
hxtml.CssParser = function(p) {
}
hxtml.CssParser.__name__ = ["hxtml","CssParser"];
hxtml.CssParser.prototype.css = null;
hxtml.CssParser.prototype.s = null;
hxtml.CssParser.prototype.d = null;
hxtml.CssParser.prototype.pos = null;
hxtml.CssParser.prototype.spacesTokens = null;
hxtml.CssParser.prototype.tokens = null;
hxtml.CssParser.prototype.notImplemented = function() {
}
hxtml.CssParser.prototype.applyStyle = function(r,v,s) {
	switch(r) {
	case "margin":
		var vl = (function($this) {
			var $r;
			var $e = (v);
			switch( $e[1] ) {
			case 7:
				var l = $e[2];
				$r = l;
				break;
			default:
				$r = [v];
			}
			return $r;
		}(this));
		var vUnits = new Array();
		var _g = 0;
		while(_g < vl.length) {
			var i = vl[_g];
			++_g;
			var vo = this.getValueObject(i);
			if(vo != null) vUnits.push(vo);
		}
		switch(vUnits.length) {
		case 1:
			s.setMarginTop(this.d,vUnits[0].value,vUnits[0].unit);
			s.setMarginRight(this.d,vUnits[0].value,vUnits[0].unit);
			s.setMarginBottom(this.d,vUnits[0].value,vUnits[0].unit);
			s.setMarginLeft(this.d,vUnits[0].value,vUnits[0].unit);
			return true;
		case 2:
			s.setMarginTop(this.d,vUnits[0].value,vUnits[0].unit);
			s.setMarginRight(this.d,vUnits[1].value,vUnits[1].unit);
			s.setMarginBottom(this.d,vUnits[0].value,vUnits[0].unit);
			s.setMarginLeft(this.d,vUnits[1].value,vUnits[1].unit);
			return true;
		case 3:
			s.setMarginTop(this.d,vUnits[0].value,vUnits[0].unit);
			s.setMarginRight(this.d,vUnits[1].value,vUnits[1].unit);
			s.setMarginBottom(this.d,vUnits[2].value,vUnits[2].unit);
			s.setMarginLeft(this.d,vUnits[1].value,vUnits[1].unit);
			return true;
		case 4:
			s.setMarginTop(this.d,vUnits[0].value,vUnits[0].unit);
			s.setMarginRight(this.d,vUnits[1].value,vUnits[1].unit);
			s.setMarginBottom(this.d,vUnits[2].value,vUnits[2].unit);
			s.setMarginLeft(this.d,vUnits[3].value,vUnits[3].unit);
			return true;
		}
		break;
	case "margin-left":
		var i = this.getValueObject(v);
		if(i != null) {
			s.setMarginLeft(this.d,i.value,i.unit);
			return true;
		}
		break;
	case "margin-right":
		var i = this.getValueObject(v);
		if(i != null) {
			s.setMarginRight(this.d,i.value,i.unit);
			return true;
		}
		break;
	case "margin-top":
		var i = this.getValueObject(v);
		if(i != null) {
			s.setMarginTop(this.d,i.value,i.unit);
			return true;
		}
		break;
	case "margin-bottom":
		var i = this.getValueObject(v);
		if(i != null) {
			s.setMarginBottom(this.d,i.value,i.unit);
			return true;
		}
		break;
	case "padding":
		var vl = (function($this) {
			var $r;
			var $e = (v);
			switch( $e[1] ) {
			case 7:
				var l = $e[2];
				$r = l;
				break;
			default:
				$r = [v];
			}
			return $r;
		}(this));
		var vUnits = new Array();
		var _g = 0;
		while(_g < vl.length) {
			var i = vl[_g];
			++_g;
			var vo = this.getValueObject(i);
			if(vo != null) vUnits.push(vo);
		}
		switch(vUnits.length) {
		case 1:
			s.setPaddingTop(this.d,vUnits[0].value,vUnits[0].unit);
			s.setPaddingRight(this.d,vUnits[0].value,vUnits[0].unit);
			s.setPaddingBottom(this.d,vUnits[0].value,vUnits[0].unit);
			s.setPaddingLeft(this.d,vUnits[0].value,vUnits[0].unit);
			return true;
		case 2:
			s.setPaddingTop(this.d,vUnits[0].value,vUnits[0].unit);
			s.setPaddingRight(this.d,vUnits[1].value,vUnits[1].unit);
			s.setPaddingBottom(this.d,vUnits[0].value,vUnits[0].unit);
			s.setPaddingLeft(this.d,vUnits[1].value,vUnits[1].unit);
			return true;
		case 3:
			s.setPaddingTop(this.d,vUnits[0].value,vUnits[0].unit);
			s.setPaddingRight(this.d,vUnits[1].value,vUnits[1].unit);
			s.setPaddingBottom(this.d,vUnits[2].value,vUnits[2].unit);
			s.setPaddingLeft(this.d,vUnits[1].value,vUnits[1].unit);
			return true;
		case 4:
			s.setPaddingTop(this.d,vUnits[0].value,vUnits[0].unit);
			s.setPaddingRight(this.d,vUnits[1].value,vUnits[1].unit);
			s.setPaddingBottom(this.d,vUnits[2].value,vUnits[2].unit);
			s.setPaddingLeft(this.d,vUnits[3].value,vUnits[3].unit);
			return true;
		}
		break;
	case "padding-left":
		var i = this.getValueObject(v);
		if(i != null) {
			s.setPaddingLeft(this.d,i.value,i.unit);
			return true;
		}
		break;
	case "padding-right":
		var i = this.getValueObject(v);
		if(i != null) {
			s.setPaddingRight(this.d,i.value,i.unit);
			return true;
		}
		break;
	case "padding-top":
		var i = this.getValueObject(v);
		if(i != null) {
			s.setPaddingTop(this.d,i.value,i.unit);
			return true;
		}
		break;
	case "padding-bottom":
		var i = this.getValueObject(v);
		if(i != null) {
			s.setPaddingBottom(this.d,i.value,i.unit);
			return true;
		}
		break;
	case "width":
		var i = this.getValueObject(v);
		if(i != null) {
			s.setWidth(this.d,i.value,i.unit);
			return true;
		}
		break;
	case "height":
		var i = this.getValueObject(v);
		if(i != null) {
			s.setHeight(this.d,i.value,i.unit);
			return true;
		}
		break;
	case "background-color":
		var $e = (v);
		switch( $e[1] ) {
		case 5:
			var v1 = $e[2];
			var val = v1.length == 6?Std.parseInt("0x" + v1):v1.length == 3?Std.parseInt("0x" + v1.charAt(0) + v1.charAt(0) + v1.charAt(1) + v1.charAt(1) + v1.charAt(2) + v1.charAt(2)):null;
			s.setBgColorNum(this.d,val);
			return true;
		case 0:
			var i = $e[2];
			s.setBgColorKey(this.d,i);
			return true;
		default:
		}
		break;
	case "background-repeat":
		s.setBgRepeat(this.d,[this.getIdent(v)]);
		return true;
	case "background-image":
		var $e = (v);
		switch( $e[1] ) {
		case 8:
			var url = $e[2];
			s.setBgImage(this.d,[url]);
			return true;
		case 0:
			var i = $e[2];
			s.setBgImage(this.d,[i]);
			return true;
		default:
		}
		break;
	case "background-attachment":
		s.setBgAttachment(this.d,this.getIdent(v));
		return true;
	case "background-position":
		s.setBgPosXNum(this.d,50,"%");
		s.setBgPosYNum(this.d,50,"%");
		return this.applyComposite(["-inner-bgpos-left","-inner-bgpos-top"],v,s);
	case "-inner-bgpos-top":
		var l = this.getValueObject(v);
		if(l != null) {
			s.setBgPosYNum(this.d,l.value,l.unit);
			return true;
		}
		s.setBgPosYKey(this.d,this.getIdent(v));
		return true;
	case "-inner-bgpos-left":
		var l = this.getValueObject(v);
		if(l != null) {
			s.setBgPosXNum(this.d,l.value,l.unit);
			return true;
		}
		s.setBgPosXKey(this.d,this.getIdent(v));
		return true;
	case "background":
		return this.applyComposite(["background-color","background-image","background-repeat","background-attachment","background-position"],v,s);
	case "font-family":
		var l = this.getList(v,$closure(this,"getFontName"));
		if(l != null) {
			s.setFontFamily(this.d,l);
			return true;
		}
		break;
	case "font-style":
		s.setFontStyle(this.d,this.getIdent(v));
		return true;
	case "font-variant":
		s.setFontVariant(this.d,this.getIdent(v));
		return true;
	case "font-weight":
		var val = this.getIdent(v);
		if(val != null) {
			s.setFontWeightKey(this.d,val);
			return true;
		}
		var $e = (v);
		switch( $e[1] ) {
		case 4:
			var i = $e[2];
			s.setFontWeightNum(this.d,i);
			return true;
		default:
		}
		break;
	case "font-size":
		var val = this.getIdent(v);
		if(val != null) {
			s.setFontSizeKey(this.d,val);
			return true;
		}
		var l = this.getValueObject(v);
		if(l != null) {
			s.setFontSizeNum(this.d,l.value,l.unit);
			return true;
		}
		break;
	case "font":
		var vl = (function($this) {
			var $r;
			var $e = (v);
			switch( $e[1] ) {
			case 7:
				var l = $e[2];
				$r = l;
				break;
			default:
				$r = [v];
			}
			return $r;
		}(this));
		var v1 = hxtml.Value.VGroup(vl);
		this.applyComposite(["font-style","font-variant","font-weight"],v1,s);
		this.applyComposite(["font-size"],v1,s);
		if(vl.length > 0) {
			switch( (vl[0])[1] ) {
			case 10:
				vl.shift();
				break;
			default:
			}
		}
		this.applyComposite(["line-height"],v1,s);
		this.applyComposite(["font-family"],v1,s);
		if(vl.length == 0) return true;
		break;
	case "color":
		var $e = (v);
		switch( $e[1] ) {
		case 5:
			var v1 = $e[2];
			var val = v1.length == 6?Std.parseInt("0x" + v1):v1.length == 3?Std.parseInt("0x" + v1.charAt(0) + v1.charAt(0) + v1.charAt(1) + v1.charAt(1) + v1.charAt(2) + v1.charAt(2)):null;
			s.setTextColorNum(this.d,val);
			return true;
		case 0:
			var i = $e[2];
			s.setTextColorKey(this.d,i);
			return true;
		default:
		}
		break;
	case "text-decoration":
		var idents = this.getGroup(v,$closure(this,"getIdent"));
		var _g = 0;
		while(_g < idents.length) {
			var i = idents[_g];
			++_g;
			s.setTextDecoration(this.d,i);
		}
		return true;
	case "text-transform":
		var val = this.getIdent(v);
		if(val != null) {
			s.setTextTransform(this.d,val);
			return true;
		}
		break;
	case "line-height":
		var val = this.getIdent(v);
		if(val != null) {
			s.setLineHeightKey(this.d,val);
			return true;
		}
		var l = this.getValueObject(v);
		if(l != null) {
			s.setLineHeightNum(this.d,l.value,l.unit);
			return true;
		}
		break;
	case "top":
		var val = this.getIdent(v);
		if(val != null) {
			s.setTopKey(this.d,val);
			return true;
		}
		var l = this.getValueObject(v);
		if(l != null) {
			s.setTop(this.d,l.value,l.unit);
			return true;
		}
		return true;
	case "left":
		var val = this.getIdent(v);
		if(val != null) {
			s.setLeftKey(this.d,val);
			return true;
		}
		var l = this.getValueObject(v);
		if(l != null) {
			s.setLeft(this.d,l.value,l.unit);
			return true;
		}
		return true;
	case "right":
		var val = this.getIdent(v);
		if(val != null) {
			s.setRightKey(this.d,val);
			return true;
		}
		var l = this.getValueObject(v);
		if(l != null) {
			s.setRight(this.d,l.value,l.unit);
			return true;
		}
		return true;
	case "bottom":
		var val = this.getIdent(v);
		if(val != null) {
			s.setBottomKey(this.d,val);
			return true;
		}
		var l = this.getValueObject(v);
		if(l != null) {
			s.setBottom(this.d,l.value,l.unit);
			return true;
		}
		return true;
	case "display":
		s.setDisplay(this.d,this.getIdent(v));
		return true;
	case "position":
		s.setPosition(this.d,this.getIdent(v));
		return true;
	default:
		throw "Not implemented '" + r + "' = " + Std.string(v);
	}
	return false;
}
hxtml.CssParser.prototype.applyComposite = function(names,v,s) {
	var vl = (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 7:
			var l = $e[2];
			$r = l;
			break;
		default:
			$r = [v];
		}
		return $r;
	}(this));
	while(vl.length > 0) {
		var found = false;
		var _g = 0;
		while(_g < names.length) {
			var n = names[_g];
			++_g;
			var count = (function($this) {
				var $r;
				switch(n) {
				case "background-position":
					$r = 2;
					break;
				default:
					$r = 1;
				}
				return $r;
			}(this));
			if(count > vl.length) count = vl.length;
			while(count > 0) {
				var v1 = count == 1?vl[0]:hxtml.Value.VGroup(vl.slice(0,count));
				if(this.applyStyle(n,v1,s)) {
					found = true;
					names.remove(n);
					var _g1 = 0;
					while(_g1 < count) {
						var i = _g1++;
						vl.shift();
					}
					break;
				}
				count--;
			}
			if(found) break;
		}
		if(!found) return false;
	}
	return true;
}
hxtml.CssParser.prototype.getValueObject = function(i) {
	return (function($this) {
		var $r;
		var $e = (i);
		switch( $e[1] ) {
		case 2:
			var u = $e[3], v = $e[2];
			$r = { value : v, unit : u};
			break;
		default:
			$r = null;
		}
		return $r;
	}(this));
}
hxtml.CssParser.prototype.getGroup = function(v,f) {
	var $e = (v);
	switch( $e[1] ) {
	case 7:
		var l = $e[2];
		var a = [];
		var _g = 0;
		while(_g < l.length) {
			var v1 = l[_g];
			++_g;
			var v2 = f(v1);
			if(v2 == null) return null;
			a.push(v2);
		}
		return a;
	default:
		var v1 = f(v);
		return v1 == null?null:[v1];
	}
}
hxtml.CssParser.prototype.getList = function(v,f) {
	var $e = (v);
	switch( $e[1] ) {
	case 6:
		var l = $e[2];
		var a = [];
		var _g = 0;
		while(_g < l.length) {
			var v1 = l[_g];
			++_g;
			var v2 = f(v1);
			if(v2 == null) return null;
			a.push(v2);
		}
		return a;
	default:
		var v1 = f(v);
		return v1 == null?null:[v1];
	}
}
hxtml.CssParser.prototype.getPix = function(v) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 2:
			var u = $e[3], f = $e[2];
			$r = (function($this) {
				var $r;
				switch(u) {
				case "px":
					$r = Std["int"](f);
					break;
				case "pt":
					$r = Std["int"](f * 4 / 3);
					break;
				default:
					$r = null;
				}
				return $r;
			}($this));
			break;
		case 4:
			var v1 = $e[2];
			$r = v1;
			break;
		default:
			$r = null;
		}
		return $r;
	}(this));
}
hxtml.CssParser.prototype.getIdent = function(v) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 0:
			var v1 = $e[2];
			$r = v1;
			break;
		default:
			$r = null;
		}
		return $r;
	}(this));
}
hxtml.CssParser.prototype.getCol = function(v) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 5:
			var v1 = $e[2];
			$r = v1.length == 6?Std.parseInt("0x" + v1):v1.length == 3?Std.parseInt("0x" + v1.charAt(0) + v1.charAt(0) + v1.charAt(1) + v1.charAt(1) + v1.charAt(2) + v1.charAt(2)):null;
			break;
		case 0:
			var i = $e[2];
			$r = (function($this) {
				var $r;
				switch(i) {
				case "black":
					$r = 0;
					break;
				case "red":
					$r = 16711680;
					break;
				case "lime":
					$r = 65280;
					break;
				case "blue":
					$r = 255;
					break;
				case "white":
					$r = 16777215;
					break;
				case "aqua":
					$r = 65535;
					break;
				case "fuchsia":
					$r = 16711935;
					break;
				case "yellow":
					$r = 16776960;
					break;
				case "maroon":
					$r = 8388608;
					break;
				case "green":
					$r = 32768;
					break;
				case "navy":
					$r = 128;
					break;
				case "olive":
					$r = 8421376;
					break;
				case "purple":
					$r = 8388736;
					break;
				case "teal":
					$r = 32896;
					break;
				case "silver":
					$r = 12632256;
					break;
				case "gray":case "grey":
					$r = 8421504;
					break;
				default:
					$r = null;
				}
				return $r;
			}($this));
			break;
		default:
			$r = null;
		}
		return $r;
	}(this));
}
hxtml.CssParser.prototype.getFontName = function(v) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 1:
			var s = $e[2];
			$r = s;
			break;
		case 7:
			$r = (function($this) {
				var $r;
				var g = $this.getGroup(v,$closure($this,"getIdent"));
				$r = g == null?null:g.join(" ");
				return $r;
			}($this));
			break;
		case 0:
			var i = $e[2];
			$r = i;
			break;
		default:
			$r = null;
		}
		return $r;
	}(this));
}
hxtml.CssParser.prototype.unexpected = function(t) {
	throw "Unexpected " + Std.string(t);
	return null;
}
hxtml.CssParser.prototype.expect = function(t) {
	var tk = this.readToken();
	if(tk != t) this.unexpected(tk);
}
hxtml.CssParser.prototype.push = function(t) {
	this.tokens.push(t);
}
hxtml.CssParser.prototype.isToken = function(t) {
	var tk = this.readToken();
	if(tk == t) return true;
	this.tokens.push(tk);
	return false;
}
hxtml.CssParser.prototype.parse = function(css,d,s) {
	this.css = css;
	this.s = s;
	this.d = d;
	this.pos = 0;
	this.tokens = [];
	this.parseStyle(hxtml.Token.TEof);
}
hxtml.CssParser.prototype.parseStyle = function(eof) {
	while(true) {
		if(this.isToken(eof)) break;
		var r = this.readIdent();
		this.expect(hxtml.Token.TDblDot);
		var v = this.readValue();
		var s = this.s;
		var $e = (v);
		switch( $e[1] ) {
		case 9:
			var val = $e[3], label = $e[2];
			if(label == "important") v = val;
			break;
		default:
		}
		if(!this.applyStyle(r,v,s)) throw "Invalid value " + Std.string(v) + " for css " + r;
		if(this.isToken(eof)) break;
		this.expect(hxtml.Token.TSemicolon);
	}
}
hxtml.CssParser.prototype.readIdent = function() {
	var t = this.readToken();
	return (function($this) {
		var $r;
		var $e = (t);
		switch( $e[1] ) {
		case 0:
			var i = $e[2];
			$r = i;
			break;
		default:
			$r = $this.unexpected(t);
		}
		return $r;
	}(this));
}
hxtml.CssParser.prototype.readValue = function(opt) {
	var t = this.readToken();
	var v = (function($this) {
		var $r;
		var $e = (t);
		switch( $e[1] ) {
		case 5:
			$r = hxtml.Value.VHex($this.readHex());
			break;
		case 0:
			var i = $e[2];
			$r = hxtml.Value.VIdent(i);
			break;
		case 1:
			var s = $e[2];
			$r = hxtml.Value.VString(s);
			break;
		case 2:
			var i = $e[2];
			$r = $this.readValueUnit(i,i);
			break;
		case 3:
			var f = $e[2];
			$r = $this.readValueUnit(f,null);
			break;
		case 17:
			$r = hxtml.Value.VSlash;
			break;
		default:
			$r = (function($this) {
				var $r;
				if(!opt) $this.unexpected(t);
				$this.tokens.push(t);
				$r = null;
				return $r;
			}($this));
		}
		return $r;
	}(this));
	if(v != null) v = this.readValueNext(v);
	return v;
}
hxtml.CssParser.prototype.readHex = function() {
	var start = this.pos;
	while(true) {
		var c = this.css.cca(this.pos++);
		if(c >= 65 && c <= 70 || c >= 97 && c <= 102 || c >= 48 && c <= 57) continue;
		this.pos--;
		break;
	}
	return this.css.substr(start,this.pos - start);
}
hxtml.CssParser.prototype.readValueUnit = function(f,i) {
	var t = this.readToken();
	return (function($this) {
		var $r;
		var $e = (t);
		switch( $e[1] ) {
		case 0:
			var i1 = $e[2];
			$r = hxtml.Value.VUnit(f,i1);
			break;
		case 11:
			$r = hxtml.Value.VUnit(f,"%");
			break;
		default:
			$r = (function($this) {
				var $r;
				$this.tokens.push(t);
				$r = i != null?hxtml.Value.VInt(i):hxtml.Value.VFloat(f);
				return $r;
			}($this));
		}
		return $r;
	}(this));
}
hxtml.CssParser.prototype.readValueNext = function(v) {
	var t = this.readToken();
	return (function($this) {
		var $r;
		switch( (t)[1] ) {
		case 6:
			$r = (function($this) {
				var $r;
				var $e = (v);
				switch( $e[1] ) {
				case 0:
					var i = $e[2];
					$r = (function($this) {
						var $r;
						switch(i) {
						case "url":
							$r = $this.readValueNext(hxtml.Value.VUrl($this.readUrl()));
							break;
						default:
							$r = (function($this) {
								var $r;
								$this.tokens.push(t);
								$r = v;
								return $r;
							}($this));
						}
						return $r;
					}($this));
					break;
				default:
					$r = (function($this) {
						var $r;
						$this.tokens.push(t);
						$r = v;
						return $r;
					}($this));
				}
				return $r;
			}($this));
			break;
		case 8:
			$r = (function($this) {
				var $r;
				var t1 = $this.readToken();
				$r = (function($this) {
					var $r;
					var $e = (t1);
					switch( $e[1] ) {
					case 0:
						var i = $e[2];
						$r = hxtml.Value.VLabel(i,v);
						break;
					default:
						$r = $this.unexpected(t1);
					}
					return $r;
				}($this));
				return $r;
			}($this));
			break;
		case 9:
			$r = $this.loopComma(v,$this.readValue());
			break;
		default:
			$r = (function($this) {
				var $r;
				$this.tokens.push(t);
				var v2 = $this.readValue(true);
				$r = v2 == null?v:$this.loopNext(v,v2);
				return $r;
			}($this));
		}
		return $r;
	}(this));
}
hxtml.CssParser.prototype.loopNext = function(v,v2) {
	return (function($this) {
		var $r;
		var $e = (v2);
		switch( $e[1] ) {
		case 7:
			var l = $e[2];
			$r = (function($this) {
				var $r;
				l.unshift(v);
				$r = v2;
				return $r;
			}($this));
			break;
		case 6:
			var l = $e[2];
			$r = (function($this) {
				var $r;
				l[0] = $this.loopNext(v,l[0]);
				$r = v2;
				return $r;
			}($this));
			break;
		case 9:
			var v21 = $e[3], lab = $e[2];
			$r = hxtml.Value.VLabel(lab,$this.loopNext(v,v21));
			break;
		default:
			$r = hxtml.Value.VGroup([v,v2]);
		}
		return $r;
	}(this));
}
hxtml.CssParser.prototype.loopComma = function(v,v2) {
	return (function($this) {
		var $r;
		var $e = (v2);
		switch( $e[1] ) {
		case 6:
			var l = $e[2];
			$r = (function($this) {
				var $r;
				l.unshift(v);
				$r = v2;
				return $r;
			}($this));
			break;
		case 9:
			var v21 = $e[3], lab = $e[2];
			$r = hxtml.Value.VLabel(lab,$this.loopComma(v,v21));
			break;
		default:
			$r = hxtml.Value.VList([v,v2]);
		}
		return $r;
	}(this));
}
hxtml.CssParser.prototype.isSpace = function(c) {
	return c == 32 || c == 10 || c == 13 || c == 9;
}
hxtml.CssParser.prototype.isIdentChar = function(c) {
	return c >= 97 && c <= 122 || c >= 65 && c <= 90 || c == 45;
}
hxtml.CssParser.prototype.isNum = function(c) {
	return c >= 48 && c <= 57;
}
hxtml.CssParser.prototype.next = function() {
	return this.css.cca(this.pos++);
}
hxtml.CssParser.prototype.readUrl = function() {
	var c0 = this.css.cca(this.pos++);
	while(c0 == 32 || c0 == 10 || c0 == 13 || c0 == 9) c0 = this.css.cca(this.pos++);
	var quote = c0;
	if(quote == 39 || quote == 34) {
		this.pos--;
		var $e = (this.readToken());
		switch( $e[1] ) {
		case 1:
			var s = $e[2];
			var c01 = this.css.cca(this.pos++);
			while(c01 == 32 || c01 == 10 || c01 == 13 || c01 == 9) c01 = this.css.cca(this.pos++);
			if(c01 != 41) throw "Invalid char " + String.fromCharCode(c01);
			return s;
		default:
			throw "assert";
		}
	}
	var start = this.pos - 1;
	while(true) {
		if(c0 != c0) break;
		c0 = this.css.cca(this.pos++);
		if(c0 == 41) break;
	}
	return StringTools.trim(this.css.substr(start,this.pos - start - 1));
}
hxtml.CssParser.prototype.readToken = function() {
	var t = this.tokens.pop();
	if(t != null) return t;
	while(true) {
		var c = this.css.cca(this.pos++);
		if(c != c) return hxtml.Token.TEof;
		if(c == 32 || c == 10 || c == 13 || c == 9) {
			if(this.spacesTokens) {
				while(this.isSpace(this.css.cca(this.pos++))) {
				}
				this.pos--;
				return hxtml.Token.TSpaces;
			}
			continue;
		}
		if(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c == 45) {
			var pos = this.pos - 1;
			do c = this.css.cca(this.pos++); while(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c == 45);
			this.pos--;
			return hxtml.Token.TIdent(this.css.substr(pos,this.pos - pos).toLowerCase());
		}
		if(c >= 48 && c <= 57) {
			var i = 0;
			do {
				i = i * 10 + (c - 48);
				c = this.css.cca(this.pos++);
			} while(c >= 48 && c <= 57);
			if(c == 46) {
				var f = i;
				var k = 0.1;
				while(this.isNum(c = this.css.cca(this.pos++))) {
					f += (c - 48) * k;
					k *= 0.1;
				}
				this.pos--;
				return hxtml.Token.TFloat(f);
			}
			this.pos--;
			return hxtml.Token.TInt(i);
		}
		switch(c) {
		case 58:
			return hxtml.Token.TDblDot;
		case 35:
			return hxtml.Token.TSharp;
		case 40:
			return hxtml.Token.TPOpen;
		case 41:
			return hxtml.Token.TPClose;
		case 33:
			return hxtml.Token.TExclam;
		case 37:
			return hxtml.Token.TPercent;
		case 59:
			return hxtml.Token.TSemicolon;
		case 46:
			return hxtml.Token.TDot;
		case 123:
			return hxtml.Token.TBrOpen;
		case 125:
			return hxtml.Token.TBrClose;
		case 44:
			return hxtml.Token.TComma;
		case 47:
			if((c = this.css.cca(this.pos++)) != 42) {
				this.pos--;
				return hxtml.Token.TSlash;
			}
			while(true) {
				while((c = this.css.cca(this.pos++)) != 42) if(c != c) throw "Unclosed comment";
				c = this.css.cca(this.pos++);
				if(c == 47) break;
				if(c != c) throw "Unclosed comment";
			}
			return this.readToken();
		case 39:case 34:
			var pos = this.pos;
			var k;
			while((k = this.css.cca(this.pos++)) != c) {
				if(k != k) throw "Unclosed string constant";
				if(k == 92) {
					throw "todo";
					continue;
				}
			}
			return hxtml.Token.TString(this.css.substr(pos,this.pos - pos - 1));
		default:
		}
		this.pos--;
		throw "Invalid char " + this.css.charAt(this.pos);
	}
	return null;
}
hxtml.CssParser.prototype.__class__ = hxtml.CssParser;
StringTools = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && s.substr(0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && s.substr(slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = s.charCodeAt(pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return s.substr(r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return s.substr(0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += c.substr(0,l - sl);
		sl = l;
	} else {
		s += c;
		sl += cl;
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		ns += c.substr(0,l - sl);
		sl = l;
	} else {
		ns += c;
		sl += cl;
	}
	return ns + s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
StringTools.fastCodeAt = function(s,index) {
	return s.cca(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
StringTools.prototype.__class__ = StringTools;
Hash = function(p) {
	if( p === $_ ) return;
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
}
Hash.__name__ = ["Hash"];
Hash.prototype.h = null;
Hash.prototype.set = function(key,value) {
	this.h["$" + key] = value;
}
Hash.prototype.get = function(key) {
	return this.h["$" + key];
}
Hash.prototype.exists = function(key) {
	try {
		key = "$" + key;
		return this.hasOwnProperty.call(this.h,key);
	} catch( e ) {
		for(var i in this.h) if( i == key ) return true;
		return false;
	}
}
Hash.prototype.remove = function(key) {
	if(!this.exists(key)) return false;
	delete(this.h["$" + key]);
	return true;
}
Hash.prototype.keys = function() {
	var a = new Array();
	for(var i in this.h) a.push(i.substr(1));
	return a.iterator();
}
Hash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref["$" + i];
	}};
}
Hash.prototype.toString = function() {
	var s = new StringBuf();
	s.b[s.b.length] = "{" == null?"null":"{";
	var it = this.keys();
	while( it.hasNext() ) {
		var i = it.next();
		s.b[s.b.length] = i == null?"null":i;
		s.b[s.b.length] = " => " == null?"null":" => ";
		s.add(Std.string(this.get(i)));
		if(it.hasNext()) s.b[s.b.length] = ", " == null?"null":", ";
	}
	s.b[s.b.length] = "}" == null?"null":"}";
	return s.b.join("");
}
Hash.prototype.__class__ = Hash;
List = function(p) {
	if( p === $_ ) return;
	this.length = 0;
}
List.__name__ = ["List"];
List.prototype.h = null;
List.prototype.q = null;
List.prototype.length = null;
List.prototype.add = function(item) {
	var x = [item];
	if(this.h == null) this.h = x; else this.q[1] = x;
	this.q = x;
	this.length++;
}
List.prototype.push = function(item) {
	var x = [item,this.h];
	this.h = x;
	if(this.q == null) this.q = x;
	this.length++;
}
List.prototype.first = function() {
	return this.h == null?null:this.h[0];
}
List.prototype.last = function() {
	return this.q == null?null:this.q[0];
}
List.prototype.pop = function() {
	if(this.h == null) return null;
	var x = this.h[0];
	this.h = this.h[1];
	if(this.h == null) this.q = null;
	this.length--;
	return x;
}
List.prototype.isEmpty = function() {
	return this.h == null;
}
List.prototype.clear = function() {
	this.h = null;
	this.q = null;
	this.length = 0;
}
List.prototype.remove = function(v) {
	var prev = null;
	var l = this.h;
	while(l != null) {
		if(l[0] == v) {
			if(prev == null) this.h = l[1]; else prev[1] = l[1];
			if(this.q == l) this.q = prev;
			this.length--;
			return true;
		}
		prev = l;
		l = l[1];
	}
	return false;
}
List.prototype.iterator = function() {
	return { h : this.h, hasNext : function() {
		return this.h != null;
	}, next : function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		return x;
	}};
}
List.prototype.toString = function() {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	s.b[s.b.length] = "{" == null?"null":"{";
	while(l != null) {
		if(first) first = false; else s.b[s.b.length] = ", " == null?"null":", ";
		s.add(Std.string(l[0]));
		l = l[1];
	}
	s.b[s.b.length] = "}" == null?"null":"}";
	return s.b.join("");
}
List.prototype.join = function(sep) {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	while(l != null) {
		if(first) first = false; else s.b[s.b.length] = sep == null?"null":sep;
		s.add(l[0]);
		l = l[1];
	}
	return s.b.join("");
}
List.prototype.filter = function(f) {
	var l2 = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		if(f(v)) l2.add(v);
	}
	return l2;
}
List.prototype.map = function(f) {
	var b = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		b.add(f(v));
	}
	return b;
}
List.prototype.__class__ = List;
hxtml.Browser = function(createElement,createTextNode,appendChild,setAttribute,invalidate,styleProxy) {
	if( createElement === $_ ) return;
	this.createElement = createElement;
	this.createTextNode = createTextNode;
	this.appendChild = appendChild;
	this.setAttribute = setAttribute;
	this.invalidate = invalidate;
	this.styleProxy = styleProxy;
}
hxtml.Browser.__name__ = ["hxtml","Browser"];
hxtml.Browser.prototype.html = null;
hxtml.Browser.prototype.domRoot = null;
hxtml.Browser.prototype.ids = null;
hxtml.Browser.prototype.invalid = null;
hxtml.Browser.prototype.createElement = null;
hxtml.Browser.prototype.createTextNode = null;
hxtml.Browser.prototype.appendChild = null;
hxtml.Browser.prototype.setAttribute = null;
hxtml.Browser.prototype.invalidate = null;
hxtml.Browser.prototype.styleProxy = null;
hxtml.Browser.prototype.register = function(id,d) {
	this.ids.set(id,d);
}
hxtml.Browser.prototype.setHtml = function(data) {
	var x = Xml.parse(data).firstElement();
	this.ids = new Hash();
	this.domRoot = this.make(x);
	this.refresh();
}
hxtml.Browser.prototype.refresh = function() {
	this.invalid = false;
	if(this.invalidate != null) this.invalidate();
}
hxtml.Browser.prototype.getById = function(id) {
	return this.ids.get(id);
}
hxtml.Browser.prototype.make = function(x) {
	switch(x.nodeType) {
	case Xml.CData:
		throw "assert";
		break;
	case Xml.PCData:case Xml.Comment:
		return this.createTextNode(x.getNodeValue());
	}
	var d;
	var name = x.getNodeName().toLowerCase();
	d = this.createElement(name);
	var allowSpaces = !(name == "head" || name == "link" || name == "meta" || name == "title" || name == "html");
	var allowComments = name == "style";
	var prev = null;
	var $it0 = x.iterator();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		switch(c.nodeType) {
		case Xml.PCData:
			if(new EReg("^[ \n\r\t]*$","").match(c.getNodeValue())) {
				if(!allowSpaces || prev == null) continue;
			}
			break;
		case Xml.Comment:
			if(!allowComments) continue;
			break;
		default:
		}
		prev = this.make(c);
		this.appendChild(d,prev);
	}
	var $it1 = x.attributes();
	while( $it1.hasNext() ) {
		var a = $it1.next();
		a = a.toLowerCase();
		var v = x.get(a);
		switch(a) {
		case "id":
			this.register(v,d);
			break;
		case "style":
			new hxtml.CssParser().parse(v,d,this.styleProxy);
			break;
		case "class":
			throw "'class' attribute not implemented yet";
			break;
		default:
			this.setAttribute(d,a,v);
		}
	}
	return d;
}
hxtml.Browser.prototype.__class__ = hxtml.Browser;
TestJS = function() { }
TestJS.__name__ = ["TestJS"];
TestJS.body = null;
TestJS.browser = null;
TestJS.main = function() {
	haxe.Firebug.redirectTraces();
	var s = new StyleProxy();
	TestJS.browser = new hxtml.Browser($closure(js.Lib.document,"createElement"),$closure(js.Lib.document,"createTextNode"),TestJS.appendChild,TestJS.setAttribute,TestJS.invalidate,s);
	var r = new haxe.Http("test.html");
	r.onData = function(data) {
		TestJS.onLoaded(data);
	};
	r.request(false);
}
TestJS.onLoaded = function(htmlData) {
	try {
		TestJS.browser.setHtml(htmlData);
		haxe.Log.trace("Parsing ok " + TestJS.browser.domRoot,{ fileName : "TestJS.hx", lineNumber : 54, className : "TestJS", methodName : "onLoaded"});
		js.Lib.document.getElementById("render").appendChild(TestJS.browser.domRoot);
	} catch( e ) {
		if( js.Boot.__instanceof(e,String) ) {
			haxe.Log.trace("Error: " + e,{ fileName : "TestJS.hx", lineNumber : 57, className : "TestJS", methodName : "onLoaded"});
		} else throw(e);
	}
}
TestJS.appendChild = function(parent,element) {
	parent.appendChild(element);
}
TestJS.invalidate = function() {
}
TestJS.setAttribute = function(element,a,v) {
	haxe.Log.trace("setAttribute " + a + ", " + v,{ fileName : "TestJS.hx", lineNumber : 75, className : "TestJS", methodName : "setAttribute"});
	element.setAttribute(a,v);
}
TestJS.prototype.__class__ = TestJS;
StyleProxy = function(p) {
}
StyleProxy.__name__ = ["StyleProxy"];
StyleProxy.prototype.setDisplay = function(element,value) {
	haxe.Log.trace("display " + value,{ fileName : "TestJS.hx", lineNumber : 88, className : "StyleProxy", methodName : "setDisplay"});
	element.style.display = value;
}
StyleProxy.prototype.setPosition = function(element,value) {
	haxe.Log.trace("position " + value,{ fileName : "TestJS.hx", lineNumber : 92, className : "StyleProxy", methodName : "setPosition"});
	element.style.position = value;
}
StyleProxy.prototype.setMarginLeft = function(element,value,unit) {
	haxe.Log.trace("setMarginLeft " + value + unit,{ fileName : "TestJS.hx", lineNumber : 115, className : "StyleProxy", methodName : "setMarginLeft"});
	element.style.marginLeft = value + unit;
}
StyleProxy.prototype.setMarginTop = function(element,value,unit) {
	haxe.Log.trace("setMarginTop " + value + unit,{ fileName : "TestJS.hx", lineNumber : 121, className : "StyleProxy", methodName : "setMarginTop"});
	element.style.marginTop = value + unit;
}
StyleProxy.prototype.setMarginRight = function(element,value,unit) {
	haxe.Log.trace("setMarginRight " + value + unit,{ fileName : "TestJS.hx", lineNumber : 126, className : "StyleProxy", methodName : "setMarginRight"});
	element.style.marginRight = value + unit;
}
StyleProxy.prototype.setMarginBottom = function(element,value,unit) {
	haxe.Log.trace("setMarginBottom " + value + unit,{ fileName : "TestJS.hx", lineNumber : 131, className : "StyleProxy", methodName : "setMarginBottom"});
	element.style.marginBottom = value + unit;
}
StyleProxy.prototype.setPaddingLeft = function(element,value,unit) {
	haxe.Log.trace("setPaddingLeft " + value + unit,{ fileName : "TestJS.hx", lineNumber : 137, className : "StyleProxy", methodName : "setPaddingLeft"});
	element.style.paddingLeft = value + unit;
}
StyleProxy.prototype.setPaddingTop = function(element,value,unit) {
	haxe.Log.trace("setPaddingTop " + value + unit,{ fileName : "TestJS.hx", lineNumber : 142, className : "StyleProxy", methodName : "setPaddingTop"});
	element.style.paddingTop = value + unit;
}
StyleProxy.prototype.setPaddingRight = function(element,value,unit) {
	haxe.Log.trace("setPaddingRight " + value + unit,{ fileName : "TestJS.hx", lineNumber : 147, className : "StyleProxy", methodName : "setPaddingRight"});
	element.style.paddingRight = value + unit;
}
StyleProxy.prototype.setPaddingBottom = function(element,value,unit) {
	haxe.Log.trace("setPaddingBottom " + value + unit,{ fileName : "TestJS.hx", lineNumber : 152, className : "StyleProxy", methodName : "setPaddingBottom"});
	element.style.paddingBottom = value + unit;
}
StyleProxy.prototype.setWidth = function(element,value,unit) {
	element.style.width = value + unit;
}
StyleProxy.prototype.setHeight = function(element,value,unit) {
	element.style.height = value + unit;
}
StyleProxy.prototype.setTop = function(element,value,unit) {
	element.style.top = value + unit;
}
StyleProxy.prototype.setLeft = function(element,value,unit) {
	element.style.left = value + unit;
}
StyleProxy.prototype.setBottom = function(element,value,unit) {
	element.style.bottom = value + unit;
}
StyleProxy.prototype.setRight = function(element,value,unit) {
	element.style.right = value + unit;
}
StyleProxy.prototype.setTopKey = function(element,value) {
	element.style.top = value;
}
StyleProxy.prototype.setLeftKey = function(element,value) {
	element.style.left = value;
}
StyleProxy.prototype.setBottomKey = function(element,value) {
	element.style.bottom = value;
}
StyleProxy.prototype.setRightKey = function(element,value) {
	element.style.right = value;
}
StyleProxy.prototype.setBgColorNum = function(element,value) {
	element.style.backgroundColor = value;
}
StyleProxy.prototype.setBgColorKey = function(element,value) {
	element.style.backgroundColor = value;
}
StyleProxy.prototype.setBgImage = function(element,value) {
	element.style.backgroundImage = value;
}
StyleProxy.prototype.setBgAttachment = function(element,value) {
}
StyleProxy.prototype.setBgRepeat = function(element,value) {
	element.style.backgroundRepeat = value;
}
StyleProxy.prototype.setBgPosXKey = function(element,value) {
}
StyleProxy.prototype.setBgPosYKey = function(element,value) {
}
StyleProxy.prototype.setBgPosYNum = function(element,value,unit) {
}
StyleProxy.prototype.setBgPosXNum = function(element,value,unit) {
}
StyleProxy.prototype.setFontSizeNum = function(element,value,unit) {
	element.style.fontSize = value + unit;
}
StyleProxy.prototype.setFontSizeKey = function(element,value) {
	element.style.fontSize = value;
}
StyleProxy.prototype.setFontWeightNum = function(element,value) {
	element.style.fontWeight = Std.string(value);
}
StyleProxy.prototype.setFontWeightKey = function(element,value) {
	element.style.fontWeight = value;
}
StyleProxy.prototype.setFontStyle = function(element,value) {
	element.style.fontStyle = value;
}
StyleProxy.prototype.setFontFamily = function(element,value) {
	if(value.length > 0) element.style.fontFamily = "url(" + value.join("), url("); else element.style.fontFamily = "";
}
StyleProxy.prototype.setFontVariant = function(element,value) {
	element.style.fontVariant = value;
}
StyleProxy.prototype.setTextColorKey = function(element,value) {
	element.style.color = value;
}
StyleProxy.prototype.setTextColorNum = function(element,value) {
	element.style.color = Std.string(value);
}
StyleProxy.prototype.setTextDecoration = function(element,value) {
}
StyleProxy.prototype.setLineHeightKey = function(element,value) {
	element.style.lineHeight = value;
}
StyleProxy.prototype.setLineHeightNum = function(element,value,unit) {
	element.style.lineHeight = value + unit;
}
StyleProxy.prototype.setTextTransform = function(element,value) {
	element.style.textTransform = value;
}
StyleProxy.prototype.__class__ = StyleProxy;
StyleProxy.__interfaces__ = [hxtml.IStyleProxy];
StringBuf = function(p) {
	if( p === $_ ) return;
	this.b = new Array();
}
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function(x) {
	this.b[this.b.length] = x == null?"null":x;
}
StringBuf.prototype.addSub = function(s,pos,len) {
	this.b[this.b.length] = s.substr(pos,len);
}
StringBuf.prototype.addChar = function(c) {
	this.b[this.b.length] = String.fromCharCode(c);
}
StringBuf.prototype.toString = function() {
	return this.b.join("");
}
StringBuf.prototype.b = null;
StringBuf.prototype.__class__ = StringBuf;
IntIter = function(min,max) {
	if( min === $_ ) return;
	this.min = min;
	this.max = max;
}
IntIter.__name__ = ["IntIter"];
IntIter.prototype.min = null;
IntIter.prototype.max = null;
IntIter.prototype.hasNext = function() {
	return this.min < this.max;
}
IntIter.prototype.next = function() {
	return this.min++;
}
IntIter.prototype.__class__ = IntIter;
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
{
	Xml.Element = "element";
	Xml.PCData = "pcdata";
	Xml.CData = "cdata";
	Xml.Comment = "comment";
	Xml.DocType = "doctype";
	Xml.Prolog = "prolog";
	Xml.Document = "document";
}
{
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if( f == null )
			return false;
		return f(msg,[url+":"+line]);
	}
}
{
	String.prototype.__class__ = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = Array;
	Array.__name__ = ["Array"];
	Int = { __name__ : ["Int"]};
	Dynamic = { __name__ : ["Dynamic"]};
	Float = Number;
	Float.__name__ = ["Float"];
	Bool = { __ename__ : ["Bool"]};
	Class = { __name__ : ["Class"]};
	Enum = { };
	Void = { __ename__ : ["Void"]};
}
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	Math.isFinite = function(i) {
		return isFinite(i);
	};
	Math.isNaN = function(i) {
		return isNaN(i);
	};
}
js["XMLHttpRequest"] = window.XMLHttpRequest?XMLHttpRequest:window.ActiveXObject?function() {
	try {
		return new ActiveXObject("Msxml2.XMLHTTP");
	} catch( e ) {
		try {
			return new ActiveXObject("Microsoft.XMLHTTP");
		} catch( e1 ) {
			throw "Unable to create XMLHttpRequest object.";
		}
	}
}:(function($this) {
	var $r;
	throw "Unable to create XMLHttpRequest object.";
	return $r;
}(this));
Xml.enode = new EReg("^<([a-zA-Z0-9:_-]+)","");
Xml.ecdata = new EReg("^<!\\[CDATA\\[","i");
Xml.edoctype = new EReg("^<!DOCTYPE ","i");
Xml.eend = new EReg("^</([a-zA-Z0-9:_-]+)>","");
Xml.epcdata = new EReg("^[^<]+","");
Xml.ecomment = new EReg("^<!--","");
Xml.eprolog = new EReg("^<\\?[^\\?]+\\?>","");
Xml.eattribute = new EReg("^\\s*([a-zA-Z0-9:_-]+)\\s*=\\s*([\"'])([^\\2]*?)\\2","");
Xml.eclose = new EReg("^[ \r\n\t]*(>|(/>))","");
Xml.ecdata_end = new EReg("\\]\\]>","");
Xml.edoctype_elt = new EReg("[\\[|\\]>]","");
Xml.ecomment_end = new EReg("-->","");
js.Lib.onerror = null;
TestJS.url = "test.html";
TestJS.main()