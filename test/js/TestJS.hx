package ;
import hxtml.Browser;
import js.Lib;
import js.Dom;
import cocktail.Cocktail;

/**
 * This class shows an implementation of an HTML renderer in Flash
 * It loads the page test.html and display it in Flash 
 */
class TestJS {
	/**
	 * a container for the generated dom
	 */
	static var body:HTMLElement;
	/**
	 * the browser is the class used to parse the HTML/CSS with our custom methods
	 */
	static var browser:Browser<HTMLElement>;
	/**
	 * URL of the page to load 
	 */
	static inline var url:String = "test.html";
	/**
	 * entry point for our test application
	 */
	static function main() {
		
		// debug in firebug
		haxe.Firebug.redirectTraces();
		
		// create an instance of our class to manage css styles
		var s = new StyleProxy();
		
		// init the browser with our custom methods
		browser = new Browser<HTMLElement>(Lib.document.createElement, Lib.document.createTextNode, appendChild, setAttribute, invalidate, s);

		// load the html
	    var r = new haxe.Http(url);
		r.onData = function(data) {
			onLoaded(data);
		};
//	    r.onError = js.Lib.alert;
	    r.request(false);

	}
	/**
	 * callback method called when the html is loaded
	 * parse the html and display it in flash
	 */
	static public function onLoaded(htmlData:String):Void{
		// parse the html data
		try{
			browser.setHtml(htmlData);
			trace("Parsing ok "+browser.domRoot);
			Lib.document.getElementById("render").appendChild(browser.domRoot);
		}catch(e:String){ 
			trace("Error: "+e);
		}
	}
	/**
	 * This method is called by the browser class during the parsing of the HTML 
	 */
	public static function appendChild(parent:HTMLElement, element:HTMLElement):Void
	{
		parent.appendChild(element);
	}
	/**
	 * This method is called by the browser class during the parsing of the HTML 
	 */
	public static function invalidate():Void
	{
	}
	public static function setAttribute(element:HTMLElement, a : String, v : String ):Void
	{
		trace("setAttribute "+a+", "+v);
		element.setAttribute(a, v);
	}
}
/**
 * Implementation of a IStyleProxy
 * This is where we apply the CSS Styles to our custom DOM 
 */
class StyleProxy implements hxtml.IStyleProxy<HTMLElement>
{
	public function new(){}
	public function setMarginLeft (element:HTMLElement, value:Int, unit:String):Void{
		trace("setMarginLeft "+value+unit);
		// TODO: take unit into account
//		element.style.marginLeft = CocktailCSSConverter.getMarginStyleValue(value);
		element.style.marginLeft = value + unit;
	}
	public function setMarginTop (element:HTMLElement, value:Int, unit:String):Void{
		trace("setMarginTop "+value+unit);
		// TODO: take unit into account
		element.style.marginTop = value + unit;
	}
	public function setMarginRight (element:HTMLElement, value:Int, unit:String):Void{
		trace("setMarginRight "+value+unit);
		// TODO: take unit into account
		element.style.marginRight = value + unit;
	}
	public function setMarginBottom (element:HTMLElement, value:Int, unit:String):Void{
		trace("setMarginBottom "+value+unit);
		// TODO: take unit into account
		element.style.marginBottom = value + unit;
	}

	public function setPaddingLeft (element:HTMLElement, value:Int, unit:String):Void{
		trace("setPaddingLeft "+value+unit);
		// TODO: take unit into account
		element.style.paddingLeft = value + unit;
	}
	public function setPaddingTop (element:HTMLElement, value:Int, unit:String):Void{
		trace("setPaddingTop "+value+unit);
		// TODO: take unit into account
		element.style.paddingTop = value + unit;
	}
	public function setPaddingRight (element:HTMLElement, value:Int, unit:String):Void{
		trace("setPaddingRight "+value+unit);
		// TODO: take unit into account
		element.style.paddingRight = value + unit;
	}
	public function setPaddingBottom (element:HTMLElement, value:Int, unit:String):Void{
		trace("setPaddingBottom "+value+unit);
		// TODO: take unit into account
		element.style.paddingBottom = value + unit;
	}

	public function setBorderLeft (element:HTMLElement, value:Int, unit:String):Void{
		trace("setBorderLeft "+value+unit);
		// TODO: take unit into account
		element.style.borderLeft = value + unit;
	}
	public function setBorderTop (element:HTMLElement, value:Int, unit:String):Void{
		trace("setBorderTop "+value+unit);
		// TODO: take unit into account
		element.style.borderTop = value + unit;
	}
	public function setBorderRight (element:HTMLElement, value:Int, unit:String):Void{
		trace("setBorderRight "+value+unit);
		// TODO: take unit into account
		element.style.borderRight = value + unit;
	}
	public function setBorderBottom (element:HTMLElement, value:Int, unit:String):Void{
		trace("setBorderBottom "+value+unit);
		// TODO: take unit into account
		element.style.borderBottom = value + unit;
	}

	public function setBorderLeftColor (element:HTMLElement, value:String):Void{
	}
	public function setBorderTopColor (element:HTMLElement, value:String):Void{
	}
	public function setBorderRightColor (element:HTMLElement, value:String):Void{
	}
	public function setBorderBottomColor (element:HTMLElement, value:String):Void{
	}
	
	// inherited
	public function setFontFamily (element:HTMLElement, value:Array<String>):Void{
		//element.style.fontFamily = value.concat(", ");
	}
	public function setFontWeightNum (element:HTMLElement, value:Int):Void{
		element.style.fontWeight = value > 700;
	}
	public function setFontWeightKeyword (element:HTMLElement, value:String):Void{
	}
	public function setFontStyle (element:HTMLElement, value:String):Void{
	}
	public function setFontSizeNum (element:HTMLElement, value:Float, unit:String):Void{
	}
	public function setFontSizeKeyword (element:HTMLElement, value:String):Void{
	}
	public function setFontVariant (element:HTMLElement, value:String):Void{
	}
	public function setTextColorKeyword (element:HTMLElement, value:String):Void{
	}
	public function setTextColorNum (element:HTMLElement, value:Int):Void{
	}
	public function setTextDecoration (element:HTMLElement, value:String):Void{
	}
	public function setTextTransform (element:HTMLElement, value:String):Void{
	}
	public function setLineHeightKeyword (element:HTMLElement, value:String):Void{
	}
	public function setLineHeightNum (element:HTMLElement, value:Float, unit:String):Void{
	}
	
	public function setBgColorKeyword (element:HTMLElement, value:String):Void{
		// TODO: handle transparent case
	}
	public function setBgColorNum (element:HTMLElement, value:Int):Void{
		element.style.backgroundColor = value; 
	}
	public function setBgImage (element:HTMLElement, value:String):Void{
		element.style.backgroundImage = value; 
	}
	public function setBgAttachment (element:HTMLElement, value:String):Void{
	}
	public function setBgRepeat (element:HTMLElement, value:String):Void{
	}
	public function setBgPosXKeyword (element:HTMLElement, value:String):Void{
	}
	public function setBgPosYKeyword (element:HTMLElement, value:String):Void{
	}
	public function setBgPosYNum (element:HTMLElement, value:Int, unit:String):Void{
	}
	public function setBgPosXNum (element:HTMLElement, value:Int, unit:String):Void{
	}
	
	public function setWidth (element:HTMLElement, value:Int, unit:String):Void{
	}
	public function setHeight (element:HTMLElement, value:Int, unit:String):Void{
	}
	
	public function setDisplay (element:HTMLElement, value:String):Void{
		element.style.display = value;
	}
	public function setPosition (element:HTMLElement, value:String):Void{
		element.style.position = value;
	}
}
