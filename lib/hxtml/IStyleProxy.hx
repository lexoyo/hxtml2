package hxtml;

interface IStyleProxy<DisplayObjectType>
{
	public function setMarginLeft (element:DisplayObjectType, value:Int, unit:String):Void;
	public function setMarginTop (element:DisplayObjectType, value:Int, unit:String):Void;
	public function setMarginRight (element:DisplayObjectType, value:Int, unit:String):Void;
	public function setMarginBottom (element:DisplayObjectType, value:Int, unit:String):Void;

	public function setPaddingLeft (element:DisplayObjectType, value:Int, unit:String):Void;
	public function setPaddingTop (element:DisplayObjectType, value:Int, unit:String):Void;
	public function setPaddingRight (element:DisplayObjectType, value:Int, unit:String):Void;
	public function setPaddingBottom (element:DisplayObjectType, value:Int, unit:String):Void;

	public function setBorderLeft (element:DisplayObjectType, value:Int, unit:String):Void;
	public function setBorderTop (element:DisplayObjectType, value:Int, unit:String):Void;
	public function setBorderRight (element:DisplayObjectType, value:Int, unit:String):Void;
	public function setBorderBottom (element:DisplayObjectType, value:Int, unit:String):Void;

	public function setBorderLeftColor (element:DisplayObjectType, value:String):Void;
	public function setBorderTopColor (element:DisplayObjectType, value:String):Void;
	public function setBorderRightColor (element:DisplayObjectType, value:String):Void;
	public function setBorderBottomColor (element:DisplayObjectType, value:String):Void;
	
	// inherited
//	public function font : Context.Font; // family + style
	public function setFontFamily (element:DisplayObjectType, value:Array<String>):Void;
	public function setFontWeightKeyword (element:DisplayObjectType, value:String):Void;
	public function setFontWeightNum (element:DisplayObjectType, value:Int):Void;
	public function setFontVariant (element:DisplayObjectType, value:String):Void;
	public function setFontStyle (element:DisplayObjectType, value:String):Void;
	public function setFontSizeKeyword (element:DisplayObjectType, value:String):Void;
	public function setFontSizeNum (element:DisplayObjectType, value:Float, unit:String):Void;
	public function setTextColorKeyword (element:DisplayObjectType, value:String):Void;
	public function setTextColorNum (element:DisplayObjectType, value:Int):Void;
	public function setTextDecoration (element:DisplayObjectType, value:String):Void;
	public function setTextTransform (element:DisplayObjectType, value:String):Void;
	public function setLineHeightNum (element:DisplayObjectType, value:Float, unit:String):Void;
	public function setLineHeightKeyword (element:DisplayObjectType, value:String):Void;
	
	public function setBgColorKeyword (element:DisplayObjectType, value:String):Void;
	public function setBgColorNum (element:DisplayObjectType, value:Int):Void;
	public function setBgImage (element:DisplayObjectType, value:String):Void;
	public function setBgAttachment (element:DisplayObjectType, value:String):Void;
	public function setBgRepeat (element:DisplayObjectType, value:String):Void;
	public function setBgPosXKeyword (element:DisplayObjectType, value:String):Void;
	public function setBgPosXNum (element:DisplayObjectType, value:Int, unit:String):Void;
	public function setBgPosYKeyword (element:DisplayObjectType, value:String):Void;
	public function setBgPosYNum (element:DisplayObjectType, value:Int, unit:String):Void;
	
	public function setWidth (element:DisplayObjectType, value:Int, unit:String):Void;
	public function setHeight (element:DisplayObjectType, value:Int, unit:String):Void;
	
	public function setDisplay (element:DisplayObjectType, value:String):Void;
	public function setPosition (element:DisplayObjectType, value:String):Void;
}
