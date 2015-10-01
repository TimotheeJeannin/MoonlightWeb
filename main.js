///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/jquery.color/jquery.color.d.ts"/>
var threshold = 0.15;
var transformColor = function (color) {
    if (color.saturation() > 0.5) {
        return color.lightness(threshold + (1 - color.lightness()) * (1 - threshold)).saturation(0);
    }
    else {
        return color.lightness(threshold + (1 - color.lightness()) * (1 - threshold));
    }
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
$(document).ready(function () {
    $.each(document.styleSheets, function (index, styleSheet) {
        if (styleSheet.cssRules && styleSheet.cssRules.length > 0) {
            $.each(styleSheet.cssRules, function (index, rule) {
                if (rule.style) {
                    $.each(colorAttributes, function (index, attribute) {
                        if (rule.style[attribute]) {
                            rule.style[attribute] = transformColor($.Color(rule.style[attribute]));
                        }
                    });
                    if (rule.style.backgroundImage && (rule.style.backgroundImage.startsWith('linear-gradient') || rule.style.backgroundImage.startsWith('radial-gradient') || rule.style.backgroundImage.startsWith('repeating-linear-gradient') || rule.style.backgroundImage.startsWith('repeating-radial-gradient'))) {
                        console.log(rule.style.backgroundImage, rule);
                    }
                }
            });
        }
    });
});
//# sourceMappingURL=main.js.map