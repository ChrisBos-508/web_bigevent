// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        };
    }
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message == "身份认证失败！") {
            localStorage.removeItem('token');
            location.href = "http://127.0.0.1:5500/%E9%98%B6%E6%AE%B5%E5%9B%9B/%E7%AC%AC%E5%85%AB%E7%AB%A0%E5%A4%A7%E4%BA%8B%E4%BB%B6%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E9%A1%B9%E7%9B%AE/background/login.html";
        }
    }
})