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
var processCSSRule = function (index, rule) {
    if (rule.style) {
        $.each([
            'backgroundColor',
            'color',
            'borderColor',
            'borderTopColor',
            'borderRightColor',
            'borderLeftColor',
            'borderBottomColor'
        ], function (index, attribute) {
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
};
var processCSSStyleSheet = function (styleSheet) {
    if (styleSheet.cssRules && styleSheet.cssRules.length > 0) {
        $.each(styleSheet.cssRules, processCSSRule);
    }
    else if (styleSheet.rules && styleSheet.rules.length > 0) {
        $.each(styleSheet.rules, processCSSRule);
    }
};
new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        $.each(mutation.addedNodes, function (index, addedNode) {
            if (addedNode.sheet) {
                processCSSStyleSheet(addedNode.sheet);
            }
        });
    });
}).observe($('head')[0], { childList: true });
$(document).ready(function () {
    $.each(document.styleSheets, function (index, styleSheet) {
        processCSSStyleSheet(styleSheet);
    });
});
//# sourceMappingURL=main.js.map