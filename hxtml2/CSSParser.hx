package hxtml2;

/**
 * This class is used to apply styles to an element (inline styles), to apply styles to a dom element hierarchy (css tag in a page)
 * It is based on Cocktail library, it has a BodyDOMElement, and a hierarchy of DOMElement and TextElement.
 * There are also attributes to store hxscript, and CSS styles.
 */
class CSSParser
{
	/**
	 * constructor
	 */
	public function new()
	{
	}
	/**
	 * Apply style to an element from a String of styles
	 * @param	element can be a DOMElement, or a TextElement
	 * @param	style is a string of styles, with styleName: styleValue pairs, separated by ";", also handle units
	 */
	public function setStyleFromString(element:Dynamic, styles:String):Void
	{
//		throw "to be implmented";
		trace("to be implmented");
	}
}