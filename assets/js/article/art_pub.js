$(function () {
    var layer = layui.layer;
    var form = layui.form;
    initCate();
    // 初始化富文本编辑器
    initEditor()

    function initCate() {
        $.ajax({
            method: "GET",
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败！')
                }
                // 调用模板引擎，渲染分类的下拉菜单
                // layer.msg('初始化文章分类成功！')
                console.log(res);

                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                // 一定要记得调用 form.render() 方法
                form.render()
            }
        })
    }
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $("#btnChooseImage").on("click", function () {
        $("#coverFile").click();
    })


    $('#coverFile').on("change", function (e) {
        var file = e.target.files[0];
        if (file.length === 0) {
            return
        }
        // URL.createObjectURL(file)
        var newImgUrl = URL.createObjectURL(file);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgUrl) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    // 定义文章的发布状态
    var art_state = "已发布";
    // 为存为草稿按钮，绑定点击事件处理函数
    $('#btnSave2').on('click', function () {
        art_state = "草稿";
    })
    // 为表单绑定 submit 提交事件
    $('#art_form').on('submit', function (e) {
        // 1. 阻止表单的默认提交行为
        e.preventDefault();
        // 2. 基于 form 表单，快速创建一个 FormData 对象
        var data = new FormData($(this)[0]);
        // 3. 将文章的发布状态，存到 data 中
        data.append('state', art_state);
        // 4. 将封面裁剪过后的图片，输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                data.append('cover_img', blob);

                publishArticle(data);
            })
        // data.forEach(function (v, k) {
        //     console.log(k, v);

        // })

    })

    function publishArticle(data) {
        $.ajax({
            url: '/my/article/add',
            method: 'POST',
            data: data,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("发表文章失败！");

                }
                layer.msg("发表文章成功！");
                location.href = 'http://127.0.0.1:5500/%E9%98%B6%E6%AE%B5%E5%9B%9B/%E7%AC%AC%E5%85%AB%E7%AB%A0%E5%A4%A7%E4%BA%8B%E4%BB%B6%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E9%A1%B9%E7%9B%AE/background/article/art_list.html';
            }
        })
    }
})