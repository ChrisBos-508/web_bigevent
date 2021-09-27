$(function () {
    getUserInfo();
    var layer = layui.layer;
    $("#btnLogout").on('click', function () {
        layer.confirm('你真的想退出吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            localStorage.removeItem("token");
            location.href = "http://127.0.0.1:5500/%E9%98%B6%E6%AE%B5%E5%9B%9B/%E7%AC%AC%E5%85%AB%E7%AB%A0%E5%A4%A7%E4%BA%8B%E4%BB%B6%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E9%A1%B9%E7%9B%AE/background/login.html";
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // headers 就是请求头配置对象
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // console.log(res);
            renderAvatar(res.data);
        },
        /*         complete: function (res) {
                    if (res.responseJSON.status === 1 && res.responseJSON.message == "身份认证失败！") {
                        localStorage.removeItem('token');
                        location.href = "http://127.0.0.1:5500/%E9%98%B6%E6%AE%B5%E5%9B%9B/%E7%AC%AC%E5%85%AB%E7%AB%A0%E5%A4%A7%E4%BA%8B%E4%BB%B6%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E9%A1%B9%E7%9B%AE/background/login.html";

                    }
                } */

    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username;
    $("#welcome").html("你好&nbsp;&nbsp;" + name);

    if (user.user_pic !== null) {
        $('.layui-nav-img').attr("src", user.user_pic).show();
        $('.text-avatar').hide();
    } else {

        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first)
            .show();
    }
}