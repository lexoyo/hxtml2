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

import utest.Assert;
import utest.Runner;
import utest.ui.Report;


import hxtml2.HTMLPageData;
import hxtml2.HTMLParser;

/**
 * 
 */
class Main 
{

    static function main():Void
    {
		var runner = new Runner();
		runner.addCase(new Main());
		Report.create(runner);
		runner.run();
    }
	public function new()
	{
    }
    
	public function testHTMLParser()
	{
		trace("testHTMLParser START");
		var htmlData:String = "<html>
			<head>
			</head>
			<body>
				<div id='main'>
					<H1>Test of an HTML page</H1>
					Some random text with an image here <img src='./test.png' style='width: 100%; height: 50px' />. And a dot at the end.
					<p>
						and here is a paragraph
					</p>
				</div>
			</body>
		</html>";
		
		
		var xml:Xml = Xml.parse(htmlData);
		
		trace(xml);
		
		var htmlPageData:HTMLPageData = null;
		
/*		try
		{
			htmlPageData = (new HTMLParser()).parse(xml.firstElement());
		}catch(msg : String){
			trace("Error, parsing XML tag "+xml.firstElement()+"\n"+msg);
		} catch( unknown : Dynamic ) {
			trace("Error, parsing XML tag "+xml.firstElement()+"\n"+Std.string(unknown));
		}
*/			htmlPageData = (new HTMLParser()).parse(xml.firstElement());
		(new BodyDOMElement()).addChild(htmlPageData.containerDOMElement);
		
		Assert.notEquals(htmlPageData, null);

//		trace(htmlPageData);
		
		var childData:ContainerDOMElementChildData;
		var domElementDivMain:ContainerDOMElement;
		var domElement:DOMElement;
		var str:Dynamic;
		
		// <div id='main'> is a ContainerDOMElement with 5 children
		childData = htmlPageData.containerDOMElement.children[0]; 
		domElementDivMain = childData.child;
		Assert.is(domElementDivMain, ContainerDOMElement);
		Assert.equals(domElementDivMain.children.length, 5);

		// <H1> is a ContainerDOMElement with one child which is a TextElement
		childData = domElementDivMain.children[0]; 
		
		domElement = childData.child; // the container
		Assert.is(domElement, ContainerDOMElement);
		
		childData = cast(domElement, ContainerDOMElement).children[0];
		domElement = childData.child; // the TextElement
		Assert.is(domElement, TextElement);
		str = cast(domElement, TextElement).text; if (str.nodeValue != null) str = str.nodeValue;
		Assert.equals(str, "Test of an HTML page");

		// The text node which contains "Some random text with an image here "
		childData = domElementDivMain.children[1]; 
		domElement = childData.child; // the TextElement
		Assert.is(domElement, TextElement);
		str = cast(domElement, TextElement).text; if (str.nodeValue != null) str = str.nodeValue;
		Assert.equals(str, "\n\t\t\t\t\tSome random text with an image here ");

		// The <img> tag
		childData = domElementDivMain.children[2]; 
		domElement = childData.child; // the ImageDOMElement
		Assert.is(domElement, ImageDOMElement);
		Assert.equals(cast(domElement, ImageDOMElement).src, "./test.png");

		// The text node which contains ". And a dot at the end.\n"
		childData = domElementDivMain.children[3]; 
		domElement = childData.child; // the TextElement
		Assert.is(domElement, TextElement);
		str = cast(domElement, TextElement).text; if (str.nodeValue != null) str = str.nodeValue;
		Assert.equals(str, ". And a dot at the end.\n\t\t\t\t\t");

		// The <p> tag containing "\n\t\t\t\t\t\tand here is a paragraph\n"
		childData = domElementDivMain.children[4]; 
		domElement = childData.child; // the ContainerDOMElement
		Assert.is(domElement, ContainerDOMElement);
		Assert.equals(cast(domElement, ContainerDOMElement).semantic, "p");

		childData = cast(domElement, ContainerDOMElement).children[0];
		domElement = childData.child; // the TextElement
		Assert.is(domElement, TextElement);
		str = cast(domElement, TextElement).text; if (str.nodeValue != null) str = str.nodeValue;
		Assert.equals(str, "\n\t\t\t\t\t\tand here is a paragraph\n");

		trace("testHTMLParser END");
	}
}
