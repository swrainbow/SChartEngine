import { BaseStyle } from "../shape/style";

export class TextStyle extends BaseStyle {
    

    static mergeStyle(style?: Partial<TextStyle>): TextStyle {
        return Object.assign(new TextStyle(), style);
    }

    x: number = 0;

    y: number = 0;

    align: 'left' | 'right' | 'center' = 'left';

    baseline: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom' = 'alphabetic';

    fontSize: number | string = 10;

    fontFamily: string = 'sans-serif';

    fontStyle: 'normal' | 'italic' | 'oblique'  = 'normal';

    fontWeight: 'normal' | 'bold' | 'bolder' | 'lighter' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' = 'normal';

    fontVariant: 'normal' | 'small-caps' = 'normal';
}
