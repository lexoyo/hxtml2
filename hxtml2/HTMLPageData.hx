package hxtml2;

//import cocktail.domElement.BodyDOMElement;
import cocktail.domElement.ContainerDOMElement;
import cocktail.domElement.ImageDOMElement;
import cocktail.nativeElement.NativeElementManager;
import cocktail.nativeElement.NativeElementData;


enum ElementTypeValue 
{
	img;
	body;
	div;
	style;
	text;
	link;
	unknown;
	html; head; meta; title;
}

/**
 * This class is used to store an HTML Page data, i.e. the model for a page. 
 * It is based on Cocktail library, it has a ContainerDOMElement as a root for the DOM, and a hierarchy of DOMElement and TextElement.
 * There are also attributes to store hxscript, and CSS styles.
 */
class HTMLPageData
{
	/**
	 * The body dom element which is the root of all the dom elements hierarchy
	 */
	public var containerDOMElement:ContainerDOMElement;
	/**
	 * hash table used to store IDs of the dome lements
	 */
	private var _ids : Hash<String>;
	/**
	 * The css parser used to set styles on an element (inline styles)
	 */
	public var _cssParser : CSSParser;
	/**
	 * constructor
	 */
	public function new(cssParser : CSSParser)
	{
		// store the CSS parser
		_cssParser = cssParser;
		// init the ids
		_ids = new Hash();
		// init the body dom element
		containerDOMElement = new ContainerDOMElement();
	}
	/**
	 * register a DOMElement with its ID
	 */
	public function registerId(id:String, element:Dynamic) 
	{
		_ids.set(id, element);
	}
	/**
	 * get a DOMElement by its ID
	 */
	public function getById(id):String
	{
		return _ids.get(id);
	}
	/**
	 * Creates an element in the page, specifying its type, ID and parent.
	 * If parent is null, the element will be added as a child of the body. 
	 * @return	the element created or null. The element can be a TextElement, or a class derived from DOMElement
	 * Part of the code is taken from http://code.google.com/p/hxtml/source/browse/trunk/hxtml/Browser.hx
	 */
	public function createElement(elementType:ElementTypeValue, attributes:Hash<String>, parent:ContainerDOMElement = null, semantic:String = ""):Dynamic
	{
//		trace("createElement "+elementType+ ", "+parent+", "+attributes);
		// default value for parent
		if (elementType != body && parent == null)
			parent = containerDOMElement;
		
		// the element to return
		var element:Dynamic = null;

		// create the element depending on the desired type
		switch(elementType)
		{
//			case a:
//				...
//			case video:
//				...
//			case sound:
//				...
//			case object:
//				...

			case img:
				element = new ImageDOMElement();
				if (attributes.exists("src"))
					element.load(attributes.get("src"));
					
			case body:
				// body element is created by defaut
				// still it may take style data
				element = containerDOMElement;
			default:
				// span, div, p, ...
				if (semantic != "")
					element = new ContainerDOMElement(NativeElementManager.createNativeElement(NativeElementTypeValue.custom(semantic)));
				else
					element = new ContainerDOMElement();
//				element.setSemantic(elementType);
		}
		// add to the dom
		if (parent != null)
			parent.addChild(element);
		// set attributes
		setAttributes(elementType, attributes);
		// return the new element
		return element;
	}
	public function setAttributes(element:Dynamic, attributes:Hash<String>)
	{
		// get the id
		var id:String="";
		if (attributes.exists("id"))
			id = attributes.get("id");
		
		// register the id if needed
		if (id != "")
			registerId(id, element);
	
		// set styles
		if (attributes.exists("style"))
		{
			var styles:String = attributes.get("style");
			_cssParser.setStyleFromString(element, styles);
		}
	}
}