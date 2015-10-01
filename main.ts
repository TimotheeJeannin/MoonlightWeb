///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/jquery.color/jquery.color.d.ts"/>

var backgroundColorCounts = {};
var colorCounts = {};

$.each(document.styleSheets, function (index, styleSheet) {
    if (styleSheet.cssRules && styleSheet.cssRules.length > 0) {
        $.each(styleSheet.cssRules, function (index, rule) {
            if (rule.style && rule.style.backgroundColor) {
                if (rule.style.backgroundColor in backgroundColorCounts) {
                    backgroundColorCounts[rule.style.backgroundColor]++;
                } else {
                    backgroundColorCounts[rule.style.backgroundColor] = 1;
                }
            } else if (rule.style && rule.style.color) {
                if (rule.style.color in colorCounts) {
                    colorCounts[rule.style.color]++;
                } else {
                    colorCounts[rule.style.color] = 1;
                }
            }
        });
    }
});

console.log(backgroundColorCounts);
console.log(colorCounts);