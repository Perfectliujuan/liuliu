//入口函数
$(function () {
    //按下回车键，把完整的数据存到本地存储里面去
    //页面一刷新就渲染一下数据
    load();
    $('#title').on('keydown', function (event) {
        //判断是否按的回车键
        if (event.keyCode == 13) {
            //alert(666)
            if ($(this).val() == '') {
                alert('请输入')
            } else {
                //获取本子存储的数据
                var local = getDate();
                // 把新的数据添加到local数组里面
                local.push({ title: $(this).val(), done: false });
                //把local数组存到本地存储
                saveDate(local);
                //渲染数据
                load();
                $(this).val('');
            }
        }
    });
    //删除操作
    $('ol,ul').on('click', 'a', function () {
        //先获取存储的数据
        var data = getDate();
        // 获取对应的索引
        var index = $(this).prop('id');
        //console.log(index);
        //修改(删除)数据
        data.splice(index, 1);
        //保存数据
        saveDate(data);
        //渲染数据
        load();
    });
    //复选框操作  用事件委托
    $('ol,ul').on('click', 'input', function () {
        //先获取存储的数据
        var data = getDate();
        // 获取input兄弟a标签的索引
        var index = $(this).siblings('a').prop('id');
        //console.log(index);
        //把done属性的值修改为当前inout的checked属性值
        data[index].done = $(this).prop('checked');
        //保存数据
        saveDate(data);
        //渲染数据
        load();

    })
    //封装函数，获取本地存储的数据
    function getDate() {
        var data = localStorage.getItem('todolist');
        //判断有没有获取到数据
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    };
    //封装函数，存储数据
    function saveDate(data) {
        localStorage.setItem('todolist', JSON.stringify(data))
    };
    //封装函数，渲染数据
    function load() {
        //先清除原先存储的数据
        $('ol,ul').empty();
        //获取本地存储的数据，获取的是一个数组
        var arr = getDate();
        //变量数组
        $.each(arr, function (i, el) {
            if (el.done) {
                $('ul').prepend(`<li>
          <input type="checkbox" name="" id="" checked="checked">
          <p>${el.title}</p>
          <a href="javascript:;" id="${i}"></a>
                             </li>`)
            } else {
                $('ol').prepend(`<li>
                <input type="checkbox" name="" id="">
                <p>${el.title}</p>
                <a href="javascript:;" id="${i}"></a>
                                   </li>`)
            }

        });
        $('#todocount').html($('ol li').length);  //未完成的
        $('#donecount').html($('ul li').length);  //未完成的
    }
})
