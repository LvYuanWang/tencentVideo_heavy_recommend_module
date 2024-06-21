(function () {
    var container_right = document.querySelector(".container-right"), container_img = document.querySelector('.container-img');
    // 记录图片和导航栏的元素节点
    var imgaArr = [], tagaArr = [];
    // 记录当前显示的图片和导航栏
    var imgaActive = null, tagaActive = null;
    // 程序入口函数
    var init = function () {
        // 根据数据生成节点
        createElements();
    }
    var createElements = function () {
        for (let i = 0; i < data.length; i++) {
            var item = data[i];
            // 创建节点: container-img-a
            var imga = document.createElement('a');
            imga.setAttribute('href', '#');
            imga.style.backgroundColor = item.bg;
            imga.style.backgroundImage = 'url(' + item.img + ')';
            container_img.appendChild(imga);
            imgaArr.push(imga);
            // 创建节点: container-right-a
            var taga = document.createElement('a');
            taga.setAttribute('href', '#');
            taga.setAttribute('class', 'nav');
            taga.setAttribute('title', item.title + ':' + item.desc);
            taga.innerHTML = '<span>' + item.title + '</span> ' + item.desc;
            container_right.appendChild(taga);
            tagaArr.push(taga);
            // 初始化显示第一个
            if (i === 0) {
                imga.setAttribute('class', 'active');
                taga.setAttribute('class', 'active');
                imgaActive = imga;
                tagaActive = taga;
            }
            // 给导航栏绑定鼠标移入事件
            taga.addEventListener('mouseenter', (function (imga, taga) {
                return function () {
                    // 当鼠标移入导航栏清除计时器
                    clearInterval(t);
                    imgaActive.setAttribute('class', '');
                    tagaActive.setAttribute('class', 'nav');
                    imga.setAttribute('class', 'active');
                    taga.setAttribute('class', 'active');
                    imgaActive = imga;
                    tagaActive = taga;
                }
            })(imga, taga))
            // 当鼠标移出后重新开启计时器
            taga.addEventListener('mouseleave', function () {
                t = setInterval(move, 3000);
            })
        }
    }
    var move = function () {
        var index = imgaArr.indexOf(imgaActive);
        imgaActive.setAttribute('class', '');
        tagaActive.setAttribute('class', 'nav');
        if (index === data.length - 1) {
            imgaActive = imgaArr[0];
            tagaActive = tagaArr[0];
        } else {
            imgaActive = imgaArr[index + 1];
            tagaActive = tagaArr[index + 1];
        }
        imgaActive.setAttribute('class', 'active');
        tagaActive.setAttribute('class', 'active');
    }
    // 让图片和导航栏自动轮播
    var t = setInterval(move, 3000);
    init();
})()