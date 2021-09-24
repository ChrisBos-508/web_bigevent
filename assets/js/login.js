$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    var form = layui.form;
    var layer = layui.layer;
    $('#form-login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("登录失败")
                }
                layer.msg("登录成功");
                console.log(res.token);
                localStorage.setItem('token', res.token);
                location.href = 'http://127.0.0.1:5500/%E9%98%B6%E6%AE%B5%E5%9B%9B/%E7%AC%AC%E5%85%AB%E7%AB%A0%E5%A4%A7%E4%BA%8B%E4%BB%B6%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E9%A1%B9%E7%9B%AE/background/index.html';
            }
        })
    })
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        $.post('/api/reguser', {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val()
        }, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg("注册成功");
            //注册完成后跳转到登录界面 模拟人点击
            $('#link_login').click();
        })
    })

    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        },
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                console.log(pwd);
                console.log(value);

                return '两次密码不相同，请重新输入！'

            }
        }
    })
})