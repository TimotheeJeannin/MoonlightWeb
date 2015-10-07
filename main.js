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
                    if (rule.style.backgroundImage && (rule.style.backgroundImage.indexOf('linear-gradient') > -1 || rule.style.backgroundImage.indexOf('radial-gradient') > -1 || rule.style.backgroundImage.indexOf('repeating-linear-gradient') > -1 || rule.style.backgroundImage.indexOf('repeating-radial-gradient') > -1)) {
                        var gradient = rule.style.backgroundImage;
                        var colors = gradient.match(/rgba?\(.*?\)/g);
                        $.each(colors, function (index, color) {
                            gradient = gradient.replace(color, transformColor($.Color(color), 0.15));
                        });
                        console.log(rule.style.backgroundImage + ' - > ' + gradient);
                        rule.style.backgroundImage = gradient;
                    }
                }
            });
        }
    });
});
//# sourceMappingURL=main.js.map