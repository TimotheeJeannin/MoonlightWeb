///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/jquery.color/jquery.color.d.ts"/>

var transformColor = function (color:JQueryColor):JQueryColor {
    return color.lightness(1 - color.lightness())
};

var colorAttributes = [
    'backgroundColor',
    'color',
    'borderColor',
    'borderTopColor',
    'borderRightColor',
    'borderLeftColor',
    'borderBottomColor'
];

$.each(document.styleSheets, function (index, styleSheet) {
    if (styleSheet.cssRules && styleSheet.cssRules.length > 0) {
        $.each(styleSheet.cssRules, function (index, rule) {
            if (rule.style) {
                $.each(colorAttributes, function (index, attribute) {
                    if (rule.style[attribute]) {
                        rule.style[attribute] = transformColor($.Color(rule.style[attribute]));
                    }
                });
                if (rule.style.backgroundImage && (
                        rule.style.backgroundImage.startsWith('linear-gradient') ||
                        rule.style.backgroundImage.startsWith('radial-gradient') ||
                        rule.style.backgroundImage.startsWith('repeating-linear-gradient') ||
                        rule.style.backgroundImage.startsWith('repeating-radial-gradient')
                    )) {
                    console.log(rule.style.backgroundImage, rule);
                }
            }
        });
    }
});
