$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "你的昵称只能在1~6之间";
            }
        }
    })

    initUserInfo();

    function initUserInfo() {
        $.ajax({
            url: "/my/userinfo",
            method: "GET",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户信息错误喔！")
                }
                console.log(res);
                form.val("formUserInfo", res.data)

            }
        })
    }

    $('#btnReset').on("click", function (e) {
        e.preventDefault();
        initUserInfo();
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("更新基本信息失败！");
                }
                layer.msg("更新基本信息成功！");
                window.parent.getUserInfo();
            }
        })
    })
})