///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/jquery.color/jquery.color.d.ts"/>

$('*').each(function () {
    var color = jQuery.Color($(this).css('background-color'));
    var reduction = 50;
    if (color.alpha() > 0) {
        var newColor = color
            .red(color.red() > reduction ? color.red() - reduction : color.red())
            .green(color.green() > reduction ? color.green() - reduction : color.green())
            .blue(color.blue() > reduction ? color.blue() - reduction : color.blue());
        console.log(this, newColor.toRgbaString());
        $(this).css('background-color', newColor.toRgbaString());
    }
});

