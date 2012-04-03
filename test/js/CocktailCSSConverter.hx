class CocktailCSSConverter {
	
	public static function getMarginStyleValue(unit:String, value:Int):MarginStyleValue
	{
		return switch (unit)
		{
			case "%":
				MarginStyleValue.percent(value);
			default:
				MarginStyleValue.length(getLengthValue(unit, value));
		}
	}
	public static function getPaddingStyleValue(unit:String, value:Int):PaddingStyleValue
	{
		return switch (unit)
		{
			case "%":
				PaddingStyleValue.percent(value);
			default:
				PaddingStyleValue.length(getLengthValue(unit, value));
		}
	}
	public static function getDimensionStyleValue(unit:String, value:Int):DimensionStyleValue
	{
		return switch (unit)
		{
			case "%":
				DimensionStyleValue.percent(value);
			default:
				DimensionStyleValue.length(getLengthValue(unit, value));
		}
	}
	public static function getLengthValue(unit:String, value:Int):LengthValue
	{
		return switch (unit)
		{
			case "px":
				LengthValue.px(value);
			case "cm":
				LengthValue.cm(value);
			case "mm":
				LengthValue.mm(value);
			case "pt":
				LengthValue.pt(value);
			case "pc":
				LengthValue.pc(value);
			case "in":
				LengthValue._in(value);
			case "em":
				LengthValue.em(value);
			case "ex":
				LengthValue.ex(value);
			default:
				throw("unknown unit \""+unit+"\"");
		}
	}
	public static function getKeywordFromColor(value:String):ColorKeywordValue
	{
		return switch (value)
		{
			case "aqua":
				aqua;

			case "black":
				black;

			case "blue":
				blue;

			case "fuchsia":
				fuchsia;

			case "gray":
				gray;

			case "green":
				green;

			case "lime":
				lime;

			case "maroon":
				maroon;

			case "navy":
				navy;

			case "olive":
				olive;

			case "orange":
				orange;

			case "purple":
				purple;

			case "red":
				red;

			case "silver":
				silver;

			case "teal":
				teal;

			case "white":
				white;

			case "yellow":
				yellow;	
			default:
				throw "unknown color \""+value+"\"";
		}
	}
	/**
	 * CSS : font-size
	 */
	public static function getCSSFontSize(value:Value):Null<FontSizeStyleValue>
	{
		trace ("getCSSFontSize "+value);

		// absolute and relative cases
		var valueString:Null<String> = valueToString(value);
		if( valueString != null ) 
		{
			return switch (valueString)
			{
				case "xx-small":
					absoluteSize(xxSmall);

				case "x-small":
					absoluteSize(xSmall);

				case "small":
					absoluteSize(small);

				case "medium":
					absoluteSize(medium);

				case "large":
					absoluteSize(large);

				case "x-large":
					absoluteSize(xLarge);

				case "xx-large":	
					absoluteSize(xxLarge);
				case "larger":
					relativeSize(larger);

				case "smaller":
					relativeSize(smaller);
			}
		}
		else
		{
			//  percent and length cases
			var valueWithUnit:Null<ValueWithUnit> = valueToValueWithUnit(value);
			if( valueWithUnit != null ) 
			{
				return switch (valueWithUnit.unit)
				{
					case "%":
						FontSizeStyleValue.percentage(Math.round(valueWithUnit.value));
					default:
						FontSizeStyleValue.length(getLengthValue(valueWithUnit.unit, Math.round(valueWithUnit.value)));
				}
			}
			return null;
		}
	}

}
