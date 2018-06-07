/**
 * by fcWang (wangfengchao@fang.com)
 */
define('yanzhengma/1.0.0/yanzhengma', ['jquery', 'verifycode/1.0.0/verifycode'], function (require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var verifycode = require('verifycode/1.0.0/verifycode');
    var vars = seajs.data.vars;
    $('input[type=hidden]').each(function (index, element) {
        vars[$(this).attr('data-id')] = element.value;
    });
    var phonestr, codestr;

    function (options) {
        // 如果已登录且绑定手机号，值为'1'；否则值为空
        var isvalid = options.isvalid;
        // 如果已登录且绑定手机号，值为手机号
        var loginInPhone = options.loginInPhone || vars.loginphone || '';
        // 手机号输入框
        var phoneInput = options.phoneInput;
        // 验证码输入框
        var codeInput = options.codeInput;
        // 发送验证码按钮
        var sendCodeBtn = options.sendCodeBtn;
        // 提交按钮
        var submitBtn = options.submitBtn;
        // 登录后修改手机号时需要显示或隐藏的元素
        var showOrHide = options.showOrHide;
        // 发送验证码按钮变为可点状态的样式
        var sendCodeBtnActive = options.sendCodeBtnActive;
        // 发送验证码按钮变为不可点状态的样式
        var sendCodeBtnUnActive = options.sendCodeBtnUnActive;
        // 其他自定义的检测项目
        var checkOthers = options.checkOthers || function () {
            return true;
        };
        // 自定义的勾选检测
        var checkRule = options.checkRule || function () {
            return true;
        };
        // 执行请求
        var postJsonData = options.postJsonData;
        // 手机号为空时的提示（可选）
        var noPhoneTip = options.noPhoneTip || '请输入手机号';
        // 手机号格式错误时的提示（可选）
        var wrongPhoneTip = options.wrongPhoneTip || '请输入正确的手机号';
        // 验证码为空时的提示（可选）
        var noCodeTip = options.noCodeTip || '请输入验证码';
        // 验证码格式错误时的提示（可选）
        var nonstandardCodeTip = options.nonstandardCodeTip || '请输入六位验证码';
        // 验证码与手机号不匹配时的提示（可选）
        var wrongCodeTip = options.wrongCodeTip || '验证码错误，请重新输入';
        // 倒计时样式（可为空,唯一参数值为's'）
        var countdown = options.countdown;
        // 信息提示方法（可选，默认为alert 参数为提示内容）
        var showMessage = options.showMessage || function (a) {
            alert(a);
        };

        // 限制手机号只能输入11位数字
        phoneInput.on('input change', function () {
            // 去除非数字
            $(this).val($(this).val().replace(/[^\d]/g, ''));
            if ($(this).val().length > 11) {
                // 取前11位
                $(this).val($(this).val().substr(0, 11));
            }
        });

        // 限制验证码只能输入4位数字
        codeInput.on('input change', function () {
            // 去除非数字
            $(this).val($(this).val().replace(/[^\d]/g, ''));
            if ($(this).val().length > 4) {
                // 取前4位
                $(this).val($(this).val().substr(0, 4));
            }
        });

        // 已登录情况修改手机号
        if (isvalid == '1') {
            // 修改手机号时执行
            phoneInput.on('input', function () {
                // 手机号未修改
                if ($(this).val() == loginInPhone) {
                    // 隐藏
                    showOrHide.hide();
                    // 设为登录状态
                    isvalid = '1';
                    // 手机号经过修改
                } else {
                    // 显示
                    showOrHide.show();
                    // 设为未登录状态
                    isvalid = '';
                }
            });
        }

        // 检测手机号格式(参数是手机号)
        var checkPhone = function (phone) {
            if (!phone) {
                // 手机号为空
                showMessage(noPhoneTip);
                return false;
                // 手机号格式状态为正确
            } else if (/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(phone)) {
                return true;
            }
            // 手机号格式状态为错误
            showMessage(wrongPhoneTip);
            return false;
        };

        // 检测验证码格式（参数是验证码）
        var checkCode = function (code) {
            if (!code) {
                // 验证码为空
                showMessage(noCodeTip);
                return false;
                // 验证码格式状态为正确
            } else if (/^[0-9]{4}$/.test(code)) {
                return true;
            }
            // 验证码格式状态为错误
            showMessage(nonstandardCodeTip);
            return false;
        };

        // 60秒倒计时
        var wait = 60;
        // 参数为发送验证码按钮
        function time(o) {
            if (wait == 0) {
                o.val('发送验证码').html('发送验证码').addClass('active');
                // 发送验证码按钮变为可点状态的样式
                sendCodeBtnActive();
                wait = 60;
            } else {
                // 验证码样式为 59s
                if (countdown == 's') {
                    o.val(wait + 's').html(wait + 's').removeClass('active');
                } else {
                    // 验证码样式为 重新发送（59）
                    o.val('重新发送(' + wait + ')').html('重新发送(' + wait + ')').removeClass('active');
                }
                // 发送验证码按钮变为不可点状态的样式
                sendCodeBtnUnActive();
                wait--;
                setTimeout(function () {
                    time(o);
                }, 1000);
            }
        }

        // 请求获取验证码
        var sendCode = function (btn) {
            phonestr = phoneInput.val();
            verifycode.getPhoneVerifyCode(phonestr,
                // 发送成功
                function () {
                    time(btn);
                },
                // 发送失败
                function () {});
        };

        // 发送验证码按钮添加事件
        sendCodeBtn.on('click', function () {
            var btn = $(this);
            // 如果手机号格式正确
            if (checkPhone(phoneInput.val()) && wait == 60) {
                // 如果是新房活动报名，先判断该手机号是否已经报过名
                if (vars.action == 'signUpIndex') {
                    // 新房活动报名专用（判断手机号是否已经报过名）
                    $.get('/xf.d?m=selectSignUp&Newcode=' + vars.newcode + '&ID=' + vars.id + '&PhoneNum=' + phoneInput.val(), function (data) {
                        if (data.root.result == '200' && data.root.code == '1') {
                            // 执行请求 请求获取验证码
                            sendCode(btn);
                        } else if (data.root.result == '200' && data.root.code == '0') {
                            // 该手机号已报名
                            showMessage('该手机号已报名');
                            return false;
                        } else {
                            // 提示其他信息
                            showMessage(data.root.message);
                            return false;
                        }
                    });
                } else {
                    // 请求获取验证码
                    sendCode(btn);
                }
            }
        });

        // 提交表单内容
        var postInput = function () {
            // 如果是新房活动报名，先判断该手机号是否已经报过名
            if (vars.action == 'signUpIndex') {
                // 新房活动报名专用（判断手机号是否已经报过名）
                $.get('/xf.d?m=selectSignUp&Newcode=' + vars.newcode + '&ID=' + vars.id + '&PhoneNum=' + phoneInput.val(), function (data) {
                    if (data.root.result == '200' && data.root.code == '1') {
                        // 执行请求
                        postJsonData();
                    } else if (data.root.result == '200' && data.root.code == '0') {
                        // 该手机号已报名
                        showMessage('该手机号已报名');
                        return false;
                    } else {
                        // 提示其他信息
                        showMessage(data.root.message);
                        return false;
                    }
                });
            } else {
                // 执行请求
                postJsonData();
            }
        };

        // 提交按钮条件事件
        var submit = function () {
            // 点击提交按钮
            submitBtn.on('click', function () {
                // 其他自定义的检测项目
                if (checkOthers()) {
                    // 如果没登录没绑定手机号
                    if (isvalid != '1') {
                        // 验证手机号验证码合法性
                        if (checkPhone(phoneInput.val()) && checkCode(codeInput.val()) && checkRule()) {
                            phonestr = phoneInput.val();
                            codestr = codeInput.val();
                            verifycode.sendVerifyCodeAnswer(phonestr, codestr,
                                // 验证码正确
                                function () {
                                    // 提交表单内容
                                    postInput();
                                },
                                // 验证码错误
                                function () {
                                    // 验证码错误
                                    showMessage(wrongCodeTip);
                                });
                        }
                        // 已登录并且绑定手机号的情况
                    } else if (checkRule()) {
                        // 提交表单内容
                        postInput();
                    }
                }
                // 防止连续快速点击
                $(this).off('click');
                setTimeout(function () {
                    submit();
                }, 1000);
            });
        };
        submit();
    }

    module.exports = yanzhengma;
});