window.onload = function () {
    //顶部搜索
    search();
    //轮播图
    //倒计时
    downTime();
};
var search = function () {
    var banner = document.querySelector('.jd_banner');
    var height = banner.offsetHeight;
    var opacity = 0;
    var search = document.querySelector('.jd_search_box');
    window.addEventListener('scroll', function () {
        var scroll = document.documentElement.scrollTop;
        if (scroll > height) {
            opacity = 0.85;
            console.log(123);
        } else {
            opacity = scroll / height * 0.85;
        }
        search.style.background = 'rgba(201,21,35,' + opacity + ')';
    });
};
var JdShuffling = function (banner, imageBox, index) {
    //轮播图
    this.banner = banner || document.querySelector('.jd_banner');
    //屏幕宽度
    this.width = this.banner.offsetWidth;
    //轮播图盒子
    this.imageBox = imageBox || this.banner.querySelector('ul:first-of-type');
    //当前轮播图索引
    this.index = index || 1;
    //点容器
    this.pointsBox = this.banner.querySelector('ul:last-of-type');
    //点
    this.points = this.pointsBox.querySelectorAll('li');
};
//初始化
JdShuffling.prototype.init = function () {
    this.seamless();
    this.setTouch();
};
//无缝轮播
JdShuffling.prototype.seamless = function () {
    var that = this;
    this.imageBox.timing = setInterval(function () {
        that.index++;
        that.addTransition();
        that.setTranslateX((-that.index * that.width));
        if (that.index > 9) {
            that.index = 1;
            that.removeTransition();
            that.setTranslateX((-that.index * that.width));
        } else if (that.index == 0) {
            that.index = 8;
            that.removeTransition();
            that.setTranslateX((-that.index * that.width));
        }
        that.setPoint();
    }, 1000);

};
//添加过渡
JdShuffling.prototype.addTransition = function () {
    this.imageBox.style.transition = 'all 1s';
    this.imageBox.style.webkitTransition = 'all 1s';
};
//添加位移
JdShuffling.prototype.setTranslateX = function (translateX) {
    this.imageBox.style.transform = 'translateX(' + +'px)';
    this.imageBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
};
//删除过渡
JdShuffling.prototype.removeTransition = function () {
    this.imageBox.style.transition = 'none';
    this.imageBox.style.webkitTransition = 'none';
};
//改变点的状态
JdShuffling.prototype.setPoint = function () {
    for (var i = 0; i < this.points.length; i++) {
        this.points[i].classList.remove('now');
    }
    this.points[this.index - 1].classList.add('now');
};
//触摸事件
JdShuffling.prototype.setTouch = function () {
    var that = this;
    this.imageBox.addEventListener('touchstart', function (e) {
        that.startDistance = e.targetTouches[0].pageX;
        clearInterval(that.imageBox.timing);
    });
    this.imageBox.addEventListener('touchmove', function (e) {
        that.moveDistance = e.targetTouches[0].pageX;
        that.endDistance = that.moveDistance - that.startDistance;
        that.setTranslateX(-that.index * that.width + that.endDistance);
        that.removeTransition();
    });
    this.imageBox.addEventListener('touchend', function () {
        that.seamless();
        if (Math.abs(that.endDistance) < that.width / 3) {
            that.setTranslateX(-that.index * that.width)
        }else {
            if(that.endDistance > 0){
                //向右滑
                that.index--;
            }else {
                //向左滑
                that.index++;
            }
            that.setTranslateX(-that.index * that.width);
            that.setPoint();
        }
    });
    that.startDistance = 0;
    that.moveDistance = 0;
};
var jdShuffling = new JdShuffling;
jdShuffling.init();
var downTime = function () {
    /*1.每一秒改变当前的时间*/
    /*2.倒数计时  假设 4小时*/
    var time = 4 * 60 * 60;
    var spans = document.querySelectorAll('.time span');

    var timer = setInterval(function () {
        time --;
        /*格式化  给不同的元素html内容*/
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = Math.floor(time%60);

        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;
        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;
        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;

        if(time <= 0){
            clearInterval(timer);
        }

    }, 1000)

}

