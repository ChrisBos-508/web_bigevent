$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return "新密码和旧密码不能相同！"
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return "两次的新密码得相同喔！"
            }
        }

    })

    $('.layui-form').on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("重置密码失败！")
                }
                // 这里是把表单清空  【0】是把jQuery对象变回js对象 用js的方法
                $(".layui-form")[0].reset();

                return layer.msg("重置密码成功！")
            }
        })
    })

})