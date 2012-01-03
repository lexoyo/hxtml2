package hxtml2;

import hxtml2.HTMLPageData;
import cocktail.textElement.TextElement;

/**
 * This class is in charge of parsing a whole HTML page. It can load CSS and fonts. (And store hxscript/javascript?).
 * It is based on Cocktail library, so the parse() method builds a hole model for the HTML page, with a BodyDOMElement, and a hierarchy of DOMElement and TextElement.
 * Part of the code is taken from http://code.google.com/p/hxtml/source/browse/trunk/hxtml/Browser.hx
 */
class HTMLParser 
{
	/**
	 * The css parser
	 */
	public var _cssParser : CSSParser;
	/**
	 * Constructor
	 */
	public function new()
	{
		// create the css parser
		_cssParser = new CSSParser();
	}
	/**
	 * 
	 */
	public function parse(htmlDOM:Xml):HTMLPageData
	{
		// init the page data
		var htmlPageData = new HTMLPageData(_cssParser);
		// create the DOM
		doParse(htmlDOM, htmlPageData);
		return htmlPageData;
	}
	/**
	 * 
	 */
	function doParse(htmlDOM:Xml, htmlPageData:HTMLPageData, parent:Dynamic = null)
	{
		trace("doParse " + htmlDOM);

		var element:Dynamic = null;

		// create element
		switch( htmlDOM.nodeType ) 
		{
			case Xml.CData:
				throw "assert";
			case Xml.PCData, Xml.Comment:
				trace("added text :"+htmlDOM.nodeValue);
				element = new TextElement(htmlDOM.nodeValue);
				if (parent != null)
					parent.addText(element);
				return ;
		}

		//trace("doParse " + htmlDOM.nodeName +"("+htmlDOM.nodeType+"), " + htmlPageData +" , "+ parent + ")");

		var allowSpaces = true, allowComments = false;
		var elementType:ElementTypeValue = unknown;
		try
		{
			elementType = Type.createEnum(ElementTypeValue, htmlDOM.nodeName.toLowerCase());
		}catch(msg : String)
		{
			trace("Error, unknown tag "+htmlDOM.nodeName.toLowerCase()+"\n"+msg);
			elementType = unknown;
		}

		// create the element depending on its type
		switch(elementType) 
		{
			case head, link, meta, title:
//				allowSpaces = false;
//				d = new DomHidden(this, name);
			case html:
//				allowSpaces = false;
//				d = new Dom(this, name);
			case style:
//				d = new DomStyle(this, name);
//				allowComments = true;
			default:
				// convert the attributes iterator in a hash table for ease of use
				var attributesHash:Hash<String> = new Hash();
				for(attr in htmlDOM.attributes())
				{
					attributesHash.set(attr, htmlDOM.get(attr));
				}
				element = htmlPageData.createElement(elementType, attributesHash, parent, htmlDOM.nodeName);
		}
		// build children
//		var prev:Dynamic = null;
		var hasText = false;
		for( child in htmlDOM ) 
		{
			// remove empty texts
			if(child.nodeType ==Xml.PCData && ~/^[ \n\r\t]*$/.match(child.nodeValue) ) 
					continue;

			doParse(child, htmlPageData, element);
		}
	}
}