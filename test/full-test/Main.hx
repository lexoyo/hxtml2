package;

//import cocktail.domElement.GraphicDOMElement;
import cocktail.domElement.ContainerDOMElement;
import cocktail.domElement.ImageDOMElement;
import cocktail.domElement.DOMElement;
import cocktailCore.domElement.DOMElementData;
import cocktail.domElement.BodyDOMElement;

import cocktail.textElement.TextElement;

import cocktail.nativeElement.NativeElementData;
import cocktail.nativeElement.NativeElementManager;
import cocktail.style.StyleData;
import cocktail.unit.UnitData;

import hxtml2.HTMLPageData;
import hxtml2.HTMLParser;

/**
 * 
 */
class Main 
{
    static function main():Void
    {
		new Main();
    }
	public function new()
	{
		var htmlPageData:HTMLPageData = null;

		htmlPageData = (new HTMLParser()).parse(xml.firstElement());
		(new BodyDOMElement()).addChild(htmlPageData.containerDOMElement);
		

	}
}
