$(function () {
    //轮播图
    banner();
    //移动端页签
    initMobileTab();
    //提示工具
    $('[data-toggle="tooltip"]').tooltip();
    $('#myAffix').affix({
        offset: {
            top: 100,
            bottom: function () {
                return (this.bottom = $('.footer').outerHeight(true))
            }
        }
    })
});
//获取数据
var getData = function (callback) {
    if (window.data) {
        callback && callback();
    } else {
        $.ajax({
            type: 'get',
            url: 'js/data.json',
            dataType: 'json',
            data: '',
            success: function (data) {
                window.data = data;
                reader();
            }
        });
    }
};
//渲染模板
var reader = function () {
    getData(function () {
        var isMobile = $(window).width() < 768 ? true : false;
        var pintHtml = template('pointTemplate', {list: window.data});
        var imageHtml = template('imageTemplate', {list: window.data, isM: isMobile});
        $('.carousel-indicators').html(pintHtml);
        $('.carousel-inner').html(imageHtml);
    });
};
var banner = function () {
//初始化
    reader();
//页面尺寸发生改变时，触发
    $(window).on('resize', function () {
        reader();
    }).trigger('resize');
//轮播手势切换
    var carouselInner = $('.wjs_banner');
    var startDistanceX = 0;
    var distanceX = 0;
    var isMove = false;
    carouselInner.on('touchstart', function (e) {
        startDistanceX = e.originalEvent.touches[0].clientX;
    }).on('touchmove', function (e) {
        var moveDistance = e.originalEvent.touches[0].clientX;
        distanceX = moveDistance - startDistanceX;
        isMove = true;

    }).on('touchend', function () {
        if (isMove && Math.abs(distanceX) > 50) {
            if (distanceX > 0) {
                //右滑
                $(this).carousel('next')
            } else {
                //左滑
                $(this).carousel('prev')
            }
        }
    });
};
var initMobileTab = function () {
    var $navTabs = $('.wjs_product .nav-tabs');
    var width = 0;
    var s = 0;
    $navTabs.find('li').each(function (i, item) {
        width += $(this).outerWidth(true);
    });
    $navTabs.width(width);
    new IScroll('.nav_tabs_parent', {
        eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false, click: true
    });
};