
/** 左侧下拉菜单控制 **/

$(".leftsidebar_box dt img").attr("src", "images/left/select_xl01.png");
$(function () {
    var width = $(".leftsidebar_box").width() + 2;
    //初始化源码框和地图框的停靠范围
    $("#code_wrapper").css("margin-left", width);
    $(".iframe_wrapper").css("margin-left", width + $("#code_wrapper").width());

    $(".leftsidebar_box dd").hide(); //隐藏
    /**系统默认显示第一行菜单**/
    $(".first_dt").parent().find('dd').show(); // 默认显示第一行菜单
    $(".first_dt img").attr("src", "images/left/select_xl.png"); //当前焦点一级菜单项图标
    $(".first_dt").css("background-image", "url(images/left/MinusSign.png)");
    // $(".first_dt").css({ "background-color": "#1f6b75" }); // 焦点一级菜单项的样式
    /**一级菜单项单击事件**/
    $(".leftsidebar_box dt").click(function () {
        //判断当前一级菜单下的二级菜单项是否隐藏
        if ($(this).parent().find('dd').is(":hidden")) {
            //先隐藏所有的菜单（包括改变图标的状态）
            $(this).parent().parent().find("dd").slideUp();
            $(this).parent().parent().find('img').attr("src", "images/left/select_xl01.png"); //当前焦点一级菜单项图标
            $(this).parent().parent().find("dt").css("background-image", "url(images/left/AddSign.png)");
            //再打开当前的菜单
            $(this).parent().find('dd').slideToggle(); //滑动方式展开子菜单
            $(this).parent().find('img').attr("src", "images/left/select_xl.png"); //当前焦点一级菜单项图标
            $(this).css("background-image", "url(images/left/MinusSign.png)");
        }
        else {
            $(this).parent().find('dd').slideUp(); //滑动方式隐藏子菜单
            $(this).parent().find('img').attr("src", "images/left/select_xl01.png"); //非焦点一级菜单项图标
            $(this).css("background-image", "url(images/left/AddSign.png)");
        }
    });

    /**二级菜单项单击事件**/
    $(".leftsidebar_box dd").click(function () {
        //改变当前按钮的样式(选中状态)
        $(this).parent().parent().find('dl').find("dd").css("color", "");
        $(this).parent().parent().find('dl').find("dd").css("font-weight", "");
        $(this).css("color", "#0075C7");
        $(this).css("font-weight", "bold");
    });

    /*监听浏览器大小*/
    $(window).resize(function () {
        if ($(this).width() < 400) {
            $("#header span").css("font-size", 6);
            $("#header img").css("height", 24);
            $("#header img").css("width", 69);
        } else {
            $("#header span").css("font-size", 16);
            $("#header img").css("height", 37);
            $("#header img").css("width", 113);
        }
    });


    $(".leftsidebar_box").css("width", width);
})

/**系统初始默认页面源码显示 **/
$(function () {
  initMarkdown();
    //setCore("AutoPlay", "ViewControl", "E05TopAnalysistInter_help.htm"); //显示默认页面的源码
  setCore("EO1QuikeStart", "Offical", 'Offical/EO1QuikeStart.htm'); //显示默认页面的源码
})

/** 二级菜单项对应功能页面的源码显示 **/
function setCore(name, catalog, interFaceName) {

    if (!showCodeFlag) {
        showInstruction();
    } else {
        showCore();
    }
    var pageName = name;
    var htmlUrl = "demos/" + catalog + "/" + pageName + ".htm"; //请求的页面
    var htmlString = ""; //请求页面的代码（字符串形式）
    jQuery.ajax({
        async: false,
        url: htmlUrl,
        success: function (result) {
            htmlString = result;
            localStorage.code = htmlString;
        }
    });
    $('#codes').val(htmlString); //设置源码到源码容器的textarea控件中
    initEditor(); //源码高亮显示(源码样式显示)
    $('#container_iframe').attr("src", htmlUrl); //设置右侧容器的页面地址


    //根据当前选择的菜单项，显示接口说明
    var interFaceUrl = "demohelp/markdown/" + interFaceName; //接口说明页路径
    var mdString = ""; //接口页面的代码（字符串形式）
    var mdContent;
    jQuery.ajax({
        async: false,
        url: interFaceUrl,
        success: function (result) {
            mdString = result;
        }
    });

    mdContent = marked(mdString);
    //$('#interface_iframe').attr("srcdoc", mdContent); //设置源码到源码容器的textarea控件中
     $('#interface_iframe').html(mdContent);
     $('#interface_iframe pre code').each(function(i, block) {
      Prism.highlightElement(block);
    });
    initEditor(); //源码高亮显示(源码样式显示)
    $('#container_iframe').attr("src", htmlUrl); //设置右侧容器的页面地址
}


/** 源码控制 **/
$(function () {
    initEditor(); //源码高亮显示
    initCopy(); //复制源码

    //源码域显示/隐藏控制
    var iCodeWidth = 468,
	        oArrow = $('#code_arrow'),
	        oCodeCore = $('#code_core'),
            oIframeWrapper = $('div.iframe_wrapper'),
	        iIframeMargin = parseInt(oIframeWrapper.css('margin-left'));
    oArrow.click(function () {
        if (oArrow.hasClass('go_back')) {
            oCodeCore.animate({ width: 0 });
            oIframeWrapper.animate({ marginLeft: parseInt($(".leftsidebar_box").css("width")) });
            oArrow.removeClass('go_back');
        } else {
            oCodeCore.animate({ width: iCodeWidth });
            oIframeWrapper.animate({ marginLeft: parseInt($(".leftsidebar_box").css("width")) + iCodeWidth });
            oArrow.addClass('go_back');
        }
    });
})

/** 源码读取显示 **/
var sCopyTarget = "#codes";
var showCodeFlag = true; //源码面板显示/隐藏标志位，用来辨别当前是显示源码还是显示接口说明
//localStorage.code = $(sCopyTarget).val();
//源码高亮显示
var editor = null;
function initEditor() {
    if (!editor) {
        editor = CodeMirror.fromTextArea(document.getElementById("codes"), {
            lineWrapping: true, //是否显示scroll
            lineNumbers: true, //是否显示number
            styleActiveLine: true,
            matchBrackets: true,
            mode: "htmlmixed", //样式类型
            viewportMargin: Infinity
        });
    } else {
        editor.setValue($(sCopyTarget).val());
    }
}
/** 代码复制功能 **/
function sCopy() {
    var iframeContent = $(sCopyTarget).val();
    if (editor) {
        iframeContent = editor.getValue();
    }
    return iframeContent;
}

/** 代码复制功能 **/
function initCopy() {
    $('a[rel]').zclip({
        path: 'libs/jqueryzclip/ZeroClipboard.swf',
        copy: function () {
            return $(this.getAttribute('rel')).val();
        },
        afterCopy: function () {
            alert("代码已成功复制到粘贴板！ ");
        }
    });
}

//显示源码
function showCore() {
    $("#code_copy,#code_run,#code_restore").show();
    $("#coreContent").show();
    $("#interfaceContent").hide();
    $("#coreHeader").removeClass("s1").addClass("s2");
    $("#interfaceHeader").removeClass("s2").addClass("s1");
    // initEditor();
    showCodeFlag = true;
}

//显示接口说明
function showInstruction() {
    $("#code_copy,#code_run,#code_restore").hide();
    $("#coreContent").hide();
    $("#interfaceContent").show();
    $("#coreHeader").removeClass("s2").addClass("s1");
    $("#interfaceHeader").removeClass("s1").addClass("s2");
    showCodeFlag = false;
}

//运行
function run() {
    var iframeContent = $("#codes").val();
    if (editor) {
        iframeContent = editor.getValue();
    }
    //获取站点地址
    var urlStr = window.location.href;
    //var nr = urlStr.indexOf("/Index.htm");
    var nr = urlStr.indexOf("/index.htm");
    urlStr = urlStr.slice(0, nr);
    //替换相对路径为绝对路径../..
    var req = /\.\.\/\.\./g;
    iframeContent = iframeContent.replace(req, urlStr);
    var iFrame = document.getElementById("container_iframe").contentWindow;
    iFrame.document.open();
    iFrame.document.write(iframeContent);
    iFrame.document.close();
}

//还原
function reStore() {
    debugger;
    $("#codes").val(localStorage.code);
    initEditor();
    run();
}

function initMarkdown(){
    var markedRender = new marked.Renderer();
    markedRender.table = function (header, body) {
      return '<table class="table table-striped">'+header+body+'</table>'
    }
    marked.setOptions({
      renderer: markedRender,
      gfm: true,
      tables: true,
      breaks: true,  // '>' 换行，回车换成 <br>
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false
    });
}
