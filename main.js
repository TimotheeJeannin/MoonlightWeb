///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/jquery.color/jquery.color.d.ts"/>
var transformTextColor = function (color) {
    return color.lightness(0.75 / (color.lightness() - 1.5) + 1.5);
};
var transformColor = function (color, threshold) {
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
                        if (rule.style[attribute] && rule.style[attribute] != 'inherit' && rule.style[attribute] != 'transparent' && rule.style[attribute] != 'currentColor') {
                            if (attribute == 'color') {
                                rule.style[attribute] = transformTextColor($.Color(rule.style[attribute]));
                            }
                            else {
                                rule.style[attribute] = transformColor($.Color(rule.style[attribute]), 0.15);
                            }
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