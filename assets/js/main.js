(function () {
    /*
    * 首页
    * */
    var mySwiper = new Swiper('.swiperAd', {
        direction: 'horizontal',
        loop: true,

        autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
        },
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            //dynamicBullets: true
        }
    });

    function timer(opj) {
        jQuery(opj).find('ul').animate({
            marginTop: "-3rem"
        }, 500, function () {
            jQuery(this).css({marginTop: "0"}).find("li:first").appendTo(this);
        })
    }

    var num = jQuery('.notice_active').find('li').length;
    if (num > 1) {
        var time = setInterval(function () {
            timer(".notice_active")
        }, 3500);

        /*jQuery('.gg_more a').mousemove(function () {
            clearInterval(time);
        }).mouseout(function () {
            time = setInterval(function () {
                timer(".notice_active")
            }, 3500);
        });*/
    }

    jQuery('.news_ck').click(function () {
        location.href = jQuery(".notice_active .notice_active_ch").children(":input").val();
    });

    // footer切换
    $('footer .textAlignCenter').on('click', function () {
        var $this = $(this);
        if (!$this.hasClass('active')) {
            $('footer .textAlignCenter').removeClass('active');
            $('.tabDiv').hide();
            $this.addClass('active');
            $('.tabDiv').eq($this.index()).show();
        }
    });

    // 临时
    $('.wode').click();


    // /*
    // * 我的页面
    // * */
    // var yanzhengma = require('yanzhengma/1.0.0/yanzhengma');
    // new yanzhengma({
    //     // 如果已登录且绑定手机号，值为'1'；否则值为空
    //     isvalid : ,
    //     // 如果已登录且绑定手机号，值为手机号
    //     loginInPhone : ,
    //     // 手机号输入框（切图type为num）
    //     phoneInput: $('#kftphone'),
    //     // 验证码输入框（切图type为num）
    //     codeInput: $('#kftcodewrite'),
    //     // 发送验证码按钮
    //     sendCodeBtn: $('#kftcode'),
    //     // 提交按钮
    //     submitBtn: $('#kftsubmit'),
    //     // 登录后修改手机号时需要显示或隐藏的元素(可多个)
    //     showOrHide: $('#kftcode0, .ipt-list2 li:eq(3)'),
    //     // 发送验证码按钮变为可点状态的样式（需自定义，可设置css样式，也可addClass,也可不填）
    //     sendCodeBtnActive: function () {
    //
    //     },
    //     // 发送验证码按钮变为不可点状态的样式（需自定义，可设置css样式，也可addClass，也可不填）
    //     sendCodeBtnUnActive: function () {
    //
    //     },
    //     // 自定义的检测项目(请自定义，如果没有，请return true;)
    //     checkOthers: function () {
    //         return true;
    //     },
    //     // 执行请求(请自定义)
    //     postJsonData: function () {
    //
    //     },
    //     // 信息提示方法（可选，默认为alert 参数为提示内容）
    //     showMessage: function (message) {
    //         showMessage(message);
    //     },
    //
    //     // 手机号为空时的提示（可选）
    //     noPhoneTip: '手机号不能为空，请输入手机号',
    //     // 手机号格式错误时的提示（可选）
    //     wrongPhoneTip: '手机号格式不正确，请重新输入',
    //     // 验证码为空时的提示（可选）
    //     noCodeTip: '验证码不能为空，请输入验证码',
    //     // 验证码格式错误时的提示（可选）
    //     nonstandardCodeTip: '验证码格式不正确，请重新输入',
    //     // 验证码与手机号不匹配时的提示（可选）
    //     wrongCodeTip: '验证码错误，请重新输入',
    //     // 倒计时样式（可为空,唯一参数值为's'）
    //     countdown: 's'
    // });






})(jQuery);