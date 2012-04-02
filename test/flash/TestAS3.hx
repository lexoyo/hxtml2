package ;
import hxtml.Browser;
import flash.display.Sprite;
import flash.text.TextField;
import dom.Dom;
import dom.Context;

/**
 * This class shows an implementation of an HTML renderer in Flash
 * It loads the page test.html and display it in Flash 
 */
class TestAS3 {
	/**
	 * a container for the generated dom
	 */
	static var body:Dom;
	/**
	 * the browser is the class used to parse the HTML/CSS with our custom methods
	 */
	static var browser:Browser<Dom>;
	/**
	 * URL of the page to load 
	 */
	static inline var url:String = "test.html";
	static var ctx : Context;
	static var invalid : Bool;
	/**
	 * entry point for our test application
	 */
	static function main() {
		
		// debug in firebug
		haxe.Firebug.redirectTraces();
		
		// create an instance of our class to manage css styles
		var s = new StyleProxy();
		
		// context
		var mc = new flash.display.Sprite();
		flash.Lib.current.addChild(mc);
		mc.alpha = 0.5;
		ctx = new dom.Context(mc, flash.Lib.current.stage.stageWidth);
		
		
		// init the browser with our custom methods
		browser = new Browser<Dom>(createElement, createTextNode, appendChild, setAttribute, invalidate, s);

		// load the html
		var l = new flash.net.URLLoader();
		l.addEventListener(flash.events.Event.COMPLETE, function(_) {
			onLoaded(l.data);
		});
		l.load(new flash.net.URLRequest(url));
	}
	/**
	 * callback method called when the html is loaded
	 * parse the html and display it in flash
	 */
	static public function onLoaded(htmlData:String):Void{
		// parse the html data
		try{
			browser.setHtml(htmlData);
			trace("Parsing ok");
		}catch(e:String){ 
			trace("Error: "+e);
		}
	}
	/**
	 * This method is called by the browser class during the parsing of the HTML 
	 */
	public static function createElement(type:String):Dom
	{
		trace("createElement("+type+")");
		var d:Dom;
		switch( type ) {
		case "head", "link", "meta", "title":
			d = new DomHidden(browser, type);
		case "html":
			d = new Dom(browser, type);
			
		case "body":
			d = getBody();
		case "div", "span", "br", "p":
			d = new Dom(browser, type);
		case "a":
			d = new DomLink(browser, type);
		case "img":
			d = new DomImage(browser, type);
		case "style":
			d = new DomStyle(browser, type);
		default: 
			throw "Unsupported html node : " + type;
		}
		d.ctx = ctx;
		applyDefaultStyle(d);
		return d;
	}
	/**
	 * This method is called by the browser class during the parsing of the HTML 
	 */
	public static function createTextNode(text:String):Dom
	{
		trace("createTextNode ("+text+")");
		var d:DomText = new DomText(browser, text);
		d.ctx = ctx;
		applyDefaultStyle(d);
		return d;
	}
	public static function applyDefaultStyle(element:Dom):Void
	{
		trace("applyDefaultStyle");
		element.style.display = Inline;
		element.style.font = Context.resolveFont(["Times New Roman"]);
		
		switch( element.name ) {
		case "body":
			element.style.margin(8, 8, 8, 8);
			element.style.fontFamily = ["Times New Roman"];
			element.style.fontWeight = true;
			element.style.fontStyle = FSNormal;
			element.style.fontSize = 16;
		case "html":
			element.style.bgColor = 0xFFFFFF;
			element.style.width = element.ctx.pageWidth;
		case "a":
			element.style.textDecoration = TDUnderline;
			element.style.textColor = 0x0000CC;
		case "div":
			element.style.display = Block;
		case "br":
			element.style.display = Block;
		case "style":
			element.style.display = None;
		}
	}		
	/**
	 * This method is called by the browser class during the parsing of the HTML 
	 */
	public static function appendChild(parent:Dom, element:Dom):Void
	{
		cast(parent, Dom).addChild(element);
	}
	/**
	 * This method is called by the browser class during the parsing of the HTML 
	 */
	public static function getBody():Dom
	{
		trace("getBody");
		if (body == null){
			trace("new body");
			body = new Dom(browser, "body");
		}
		return body;
	}
	/**
	 * This method is called by the browser class during the parsing of the HTML 
	 */
	public static function invalidate():Void
	{
		if( invalid ) return;
		invalid = true;
		haxe.Timer.delay(refresh, 1);
	}
	public static function refresh(){
		// TODO: METHODS OF DOM.HX
		trace("Invalidate");
		
		invalid = false;
		ctx.clear();
		browser.domRoot.updateStyle();
		browser.domRoot.updateSize(ctx.pageWidth,null);
		browser.domRoot.updatePos(0, 0);
		browser.domRoot.render();
		
		
		
		// display it in flash, with a .5% opacity
/*		var b = new flash.display.BitmapData(flash.Lib.current.stage.stageWidth, flash.Lib.current.stage.stageHeight, true, 0);
		b.draw(ctx.s);
		var bmp = new flash.display.Bitmap(b);
		bmp.alpha = 0.5;
		flash.Lib.current.addChild(bmp);
*/	} 
	public static function setAttribute(element:Dom, a : String, v : String ):Void
	{
		trace("setAttribute "+a+", "+v);
		element.setAttribute(a, v);
	}
}
/**
 * Implementation of a IStyleProxy
 * This is where we apply the CSS Styles to our custom DOM 
 */
class StyleProxy implements hxtml.IStyleProxy<Dom>
{
	public function new(){}
	public function setMarginLeft (element:Dom, value:Int, unit:String):Void{
		trace("setMarginLeft "+value+unit);
		// TODO: take unit into account
		element.style.marginLeft = value;
	}
	public function setMarginTop (element:Dom, value:Int, unit:String):Void{
		trace("setMarginTop "+value+unit);
		// TODO: take unit into account
		element.style.marginTop = value;
	}
	public function setMarginRight (element:Dom, value:Int, unit:String):Void{
		trace("setMarginRight "+value+unit);
		// TODO: take unit into account
		element.style.marginRight = value;
	}
	public function setMarginBottom (element:Dom, value:Int, unit:String):Void{
		trace("setMarginBottom "+value+unit);
		// TODO: take unit into account
		element.style.marginBottom = value;
	}

	public function setPaddingLeft (element:Dom, value:Int, unit:String):Void{
		trace("setPaddingLeft "+value+unit);
		// TODO: take unit into account
		element.style.paddingLeft = value;
	}
	public function setPaddingTop (element:Dom, value:Int, unit:String):Void{
		trace("setPaddingTop "+value+unit);
		// TODO: take unit into account
		element.style.paddingTop = value;
	}
	public function setPaddingRight (element:Dom, value:Int, unit:String):Void{
		trace("setPaddingRight "+value+unit);
		// TODO: take unit into account
		element.style.paddingRight = value;
	}
	public function setPaddingBottom (element:Dom, value:Int, unit:String):Void{
		trace("setPaddingBottom "+value+unit);
		// TODO: take unit into account
		element.style.paddingBottom = value;
	}

	public function setBorderLeft (element:Dom, value:Int, unit:String):Void{
		trace("setBorderLeft "+value+unit);
		// TODO: take unit into account
		element.style.borderLeft = value;
	}
	public function setBorderTop (element:Dom, value:Int, unit:String):Void{
		trace("setBorderTop "+value+unit);
		// TODO: take unit into account
		element.style.borderTop = value;
	}
	public function setBorderRight (element:Dom, value:Int, unit:String):Void{
		trace("setBorderRight "+value+unit);
		// TODO: take unit into account
		element.style.borderRight = value;
	}
	public function setBorderBottom (element:Dom, value:Int, unit:String):Void{
		trace("setBorderBottom "+value+unit);
		// TODO: take unit into account
		element.style.borderBottom = value;
	}

	public function setBorderLeftColor (element:Dom, value:String):Void{
	}
	public function setBorderTopColor (element:Dom, value:String):Void{
	}
	public function setBorderRightColor (element:Dom, value:String):Void{
	}
	public function setBorderBottomColor (element:Dom, value:String):Void{
	}
	
	// inherited
	public function setFontFamily (element:Dom, value:Array<String>):Void{
		element.style.fontFamily = value;
	}
	public function setFontWeightNum (element:Dom, value:Int):Void{
		element.style.fontWeight = value > 700;
	}
	public function setFontWeightKeyword (element:Dom, value:String):Void{
	}
	public function setFontStyle (element:Dom, value:String):Void{
	}
	public function setFontSizeNum (element:Dom, value:Float, unit:String):Void{
	}
	public function setFontSizeKeyword (element:Dom, value:String):Void{
	}
	public function setFontVariant (element:Dom, value:String):Void{
	}
	public function setTextColorKeyword (element:Dom, value:String):Void{
	}
	public function setTextColorNum (element:Dom, value:Int):Void{
	}
	public function setTextDecoration (element:Dom, value:String):Void{
	}
	public function setTextTransform (element:Dom, value:String):Void{
	}
	public function setLineHeightKeyword (element:Dom, value:String):Void{
	}
	public function setLineHeightNum (element:Dom, value:Float, unit:String):Void{
	}
	
	public function setBgColorKeyword (element:Dom, value:String):Void{
		// TODO: handle transparent case
	}
	public function setBgColorNum (element:Dom, value:Int):Void{
		element.style.bgColor = value; 
	}
	public function setBgImage (element:Dom, value:String):Void{
		element.style.bgImage = value; 
	}
	public function setBgAttachment (element:Dom, value:String):Void{
	}
	public function setBgRepeat (element:Dom, value:String):Void{
	}
	public function setBgPosXKeyword (element:Dom, value:String):Void{
	}
	public function setBgPosYKeyword (element:Dom, value:String):Void{
	}
	public function setBgPosYNum (element:Dom, value:Int, unit:String):Void{
	}
	public function setBgPosXNum (element:Dom, value:Int, unit:String):Void{
	}
	
	public function setWidth (element:Dom, value:Int, unit:String):Void{
	}
	public function setHeight (element:Dom, value:Int, unit:String):Void{
	}
	
	public function setDisplay (element:Dom, value:String):Void{
		switch(value){
		case "none":
			element.style.display = None;
		case "block":
			element.style.display = Block;
		case "inline":
			element.style.display = Inline;
		}
	}
	public function setPosition (element:Dom, value:String):Void{
		//element.style.position = value;
	}
}
