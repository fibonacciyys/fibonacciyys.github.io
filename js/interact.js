'use strict';

//交互
// function AddImgClickEvent()
// {
//     var objs = document.getElementsByTagName("img");
//     for(var i=0;i<objs.length;i++)
//     {
//         objs[i].onclick=function()
//         {
//             // window.open(this.src);
//             if (this.style.width !== 'auto') {
//                 this.style.width='auto';
//             }else {this.style.width='30%'}
//         }
//         objs[i].style.cursor = "pointer";
//     }
// }
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function AddBigButtonEvent () {
    var bigb_d = document.getElementsByClassName('big_b_div')[0];
    var bigb = document.getElementById('big_b');
    bigb_d.onclick = function () {
        if (bigb.innerText == '全部查看原图') {
            var small_div = document.getElementsByClassName('bechange');
            for (var i = 0; i < small_div.length; i++) {
                // if (small_div[i].style.width !== 'fit-content') {
                //     var im = small_div[i].getElementsByTagName('img')[0];
                //     im.style.position = 'static';
                //     small_div[i].style.width = 'fit-content';
                //     small_div[i].style.height = 'auto';
                // }
                if (hasClass(small_div[i],'small') || hasClass(small_div[i],'big')) {
                    small_div[i].classList.add('origin');
                    small_div[i].classList.remove('small');
                    small_div[i].classList.remove('big');
                }
            }
            this.classList.add('is_small_button');
            this.classList.remove('is_big_button');
            bigb.innerText = '全部查看小图';
        } else {
            var small_div = document.getElementsByClassName('bechange');
            for (var i = 0; i < small_div.length; i++) {
                // if (small_div[i].style.width == 'fit-content') {
                //     var im = small_div[i].getElementsByTagName('img')[0];
                //     im.style.position = 'absolute';
                //     small_div[i].style.width = '500px';
                //     small_div[i].style.height = '500px';
                // }
                if (hasClass(small_div[i],'big') || hasClass(small_div[i],'origin')) {
                    small_div[i].classList.add('small');
                    small_div[i].classList.remove('big');
                    small_div[i].classList.remove('origin');
                }
            }
            this.classList.add('is_big_button');
            this.classList.remove('is_small_button');
            bigb.innerText = '全部查看原图';
        }
    }
}
function AddBigButton() {
    var pparent = document.getElementById('change-part2');
    var sself = document.getElementById('big_b');
    if (!sself) {
        // removed=parent.removeChild(self);
        var big_div = document.createElement('div');
        var bigbutton = document.createElement('p');
        var spann = document.createElement('span');
        spann.classList.add('tiptop');
        big_div.classList.add('big_b_div');
        bigbutton.innerText='全部查看原图';
        bigbutton.id='big_b';
        big_div.style.cursor='pointer';
        big_div.appendChild(bigbutton);
        big_div.appendChild(spann);
        pparent.appendChild(big_div);
        AddBigButtonEvent();
    }
}
function AddDivClickEvent() {
    var objs = document.getElementsByClassName("bechange");
    for(var i=0;i<objs.length;i++)
    {
        objs[i].onclick=function()
        {
            // window.open(this.src);
            // if (this.style.width !== 'fit-content') {
            //     var im=this.getElementsByTagName('img')[0];
            //     im.style.position='static';
            //     this.style.width='fit-content';
            //     this.style.height='auto';
            // }else {
            //     var im=this.getElementsByTagName('img')[0];
            //     im.style.position='absolute';
            //     this.style.width='500px';
            //     this.style.height='500px';
            // }
            if (hasClass(this,'small')) {
                this.classList.add('big');
                this.classList.remove('small');
            }else if (hasClass(this,'big') || hasClass(this,'origin')){
                this.classList.add('small');
                this.classList.remove('big');
                this.classList.remove('origin');
            }
        }
        objs[i].style.cursor = "pointer";
    }
}

function pushup() {
    var will_delete = document.getElementsByClassName('py_right_div');
    for (var i=0;i<will_delete.length;i++) {
        will_delete[i].classList.add('py_right_delete');
        will_delete[i].classList.remove('py_right_made');
    }
    setTimeout(function () {
        for (var i=will_delete.length-1;i>=0;i--) {
            var ppare = will_delete[i].parentElement;
            ppare.removeChild(will_delete[i]);
        }
    },600);
    var other_div = document.getElementsByClassName('py_left_div');
    for (var i=0;i<other_div.length;i++) {
        if (hasClass(other_div[i],'py_selected_div')) {
            other_div[i].classList.add('py_select_div');
            other_div[i].classList.remove('py_selected_div');
        }
    }
}
function yysin(element) {
    var cp = document.getElementById('change-part');
    cp.innerText = '';
    element.classList.add('py_selected_div');
    element.classList.remove('py_select_div');
    var py_list = ['./static/py/yys.txt', './static/py/interactt.txt', './static/py/radd.txt'];
    for (var i = 0; i < py_list.length; i++) {
        var a_text = document.createElement('iframe');
        var a_div = document.createElement('div');
        var a_div_title = document.createElement('div');
        var a_div_iframe = document.createElement('div');
        var txtt = py_list[i];
        a_text.src = txtt;
        a_text.classList.add('longtext')
        a_div_title.innerText = txtt;
        a_div_title.classList.add('high_light')
        a_div_iframe.appendChild(a_text);
        a_div.appendChild(a_div_title);
        a_div.appendChild(a_div_iframe);
        a_div.classList.add('py_right_div');
        a_div.classList.add('py_right_made');
        cp.appendChild(a_div);
    }
}
function AddYYSscriptevent() {
    var yys_s = document.getElementById('yys_script');
    yys_s.onclick = function () {
        var that = this;
        var timee;
        // var py_right_item = document.getElementsByClassName('py_right_div')[0];
        var cp=document.getElementById('change-part');
        if (cp.innerText ==='') {
            timee=0;
        }else {
            pushup();
            timee=800;
        }
        setTimeout(function () {
            return yysin(that);
        },timee);
        // yysin(that);
    }
}
function pigin(element) {
    var cp = document.getElementById('change-part');
    cp.innerText = '';
    // var other_div = document.getElementsByClassName('py_left_div');
    // for (var i=0;i<other_div.length;i++) {
    //     other_div[i].classList.add('py_select_div');
    //     other_div[i].classList.remove('py_selected_div');
    // }
    element.classList.add('py_selected_div');
    element.classList.remove('py_select_div');
    var pig_list=['./static/py/pig.txt']
    for (var i=0;i<pig_list.length;i++) {
        var a_text = document.createElement('iframe');
        var a_div = document.createElement('div');
        var a_div_title = document.createElement('div');
        var a_div_iframe = document.createElement('div');
        var txtt = pig_list[i];
        a_text.src = txtt;
        a_text.classList.add('longtext')
        a_div_title.innerText = txtt;
        a_div_title.classList.add('high_light')
        a_div_iframe.appendChild(a_text);
        a_div.appendChild(a_div_title);
        a_div.appendChild(a_div_iframe);
        a_div.classList.add('py_right_div');
        a_div.classList.add('py_right_made');
        cp.appendChild(a_div);
    }
}
function AddPIGscriptevent() {
    var pig_s = document.getElementById('pig_script');
    pig_s.onclick = function () {
        var that = this;
        // var py_right_item = document.getElementsByClassName('py_right_div')[0];
        var timee;
        var cp=document.getElementById('change-part');
        if (cp.innerText === '') {
            timee=0;
        }else {
            pushup();
            timee=800;
        }
        setTimeout(function () {
            return pigin(that);
        },timee);
    }
}

function AddYelEvent() {
    var yell_div = document.getElementById('yellow-site');
    yell_div.onclick = function () {
        return toMonkey();
    }
}
function toMonkey() {
    alert('悟空,你又调皮了!');
    var wind_yel = window.open('_blank');
    setTimeout(function () {
        return wind_yel.location='./static/yellow.html';
    },250);
    // window.open('./static/yellow.html');
}

function hf_push_div(element,classname) {
    var will_push = document.getElementsByClassName(classname);
    for (var i=0;i<will_push.length;i++) {
        will_push[i].classList.add('game_push');
        will_push[i].classList.remove('game_pull');
    }
    element.classList.add('close');
    element.classList.remove('open');
    setTimeout(function () {
        for (var i=will_push.length-1;i>=0;i--) {
            var ppare = will_push[i].parentElement;
            ppare.removeChild(will_push[i]);
        }
    },1000);
}
function game_div_in(element) {
    var game_div1 = document.createElement('div');
    var game_div2 = document.createElement('div');
    var ppare = element.parentElement;
    element.classList.add('open');
    element.classList.remove('close');
    game_div1.id = 'game1';
    game_div1.classList.add('game');
    game_div1.classList.add('game_pull');

    game_div2.id = 'game2';
    game_div2.classList.add('game');
    game_div2.classList.add('game_pull');

    ppare.appendChild(game_div1);
    ppare.appendChild(game_div2);
    Addgame1Event();
    Addgame2Event();
}
function AddGameButtonEvent() {
    var game_div = document.getElementById('hf_left_div1');
    // var hf_left1 = document.getElementById('hf_left1');

    game_div.onclick = function () {
        var that = this;
        if (hasClass(that,'close')) {
            game_div_in(that);
        }else {
            hf_push_div(that,'game');
        }
    }
    // game_div.onclick = function () {
    //     var game1_div = document.createElement('div');
    //     game1_div.classList.add('game');
    //     game1_div.id = 'game1';
    //
    //     var game2_div = document.createElement('div');
    //     game2_div.classList.add('game');
    //     game2_div.id = 'game2';
    //     var that = this;
    //     function removecg(element) {
    //         var game1 = document.getElementById('game1');
    //         var game2 = document.getElementById('game2');
    //         var ppare = element.parentElement;
    //         ppare.removeChild(game1);
    //         ppare.removeChild(game2);
    //     }
    //     if (hasClass(game_div,'close')) {
    //         game1_div.classList.add('game_pull');
    //         game1_div.classList.remove('game_push');
    //         hf_left1.appendChild(game1_div);
    //         Addgame1Event();
    //         game2_div.classList.add('game_pull');
    //         game2_div.classList.remove('game_push');
    //         hf_left1.appendChild(game2_div);
    //         Addgame2Event();
    //         game_div.classList.add('open');
    //         game_div.classList.remove('close');
    //         // game_div.classList.remove('hf_left_div1');
    //     }else {
    //         game1_div.classList.add('game_push');
    //         game1_div.classList.remove('game_pull');
    //         game2_div.classList.add('game_push');
    //         game2_div.classList.remove('game_pull');
    //         setTimeout(function () {
    //             return removecg(that);
    //         },1000);
    //         game_div.classList.add('close');
    //         game_div.classList.remove('open');
    //     }
    // }
}
function AddMVButtonEvent() {
    var mv_div = document.getElementById('hf_left_div2');
    var hf_left2 = document.getElementById('hf_left2');
    var mv1_div = document.createElement('div');
    mv1_div.classList.add('mv');
    mv1_div.id = 'mv1';

    var mv2_div = document.createElement('div');
    mv2_div.classList.add('mv');
    mv2_div.id = 'mv2';

    function removecm() {
        hf_left2.removeChild(mv1_div);
        hf_left2.removeChild(mv2_div);
    }

    mv_div.onclick = function () {
        if (hasClass(mv_div,'close')) {
            mv1_div.classList.add('game_pull');
            mv1_div.classList.remove('game_push');
            hf_left2.appendChild(mv1_div);
            Addmv1Event();
            mv2_div.classList.add('game_pull');
            mv2_div.classList.remove('game_push');
            hf_left2.appendChild(mv2_div);
            Addmv2Event();
            mv_div.classList.add('open');
            mv_div.classList.remove('close');
            // mv_div.classList.remove('hf_left_div2');
        }else {
            mv1_div.classList.add('game_push');
            mv1_div.classList.remove('game_pull');
            mv2_div.classList.add('game_push');
            mv2_div.classList.remove('game_pull');
            setTimeout(function () {
                removecm();
            },1000);
            mv_div.classList.add('close');
            mv_div.classList.remove('open');
        }
    }
}
function Addgame1Event() {
    var game1 = document.getElementById('game1');
    game1.onclick = function () {
        alert('come soon...');
    }
}
function Addgame2Event() {
    var game2 = document.getElementById('game2');
    game2.onclick = function () {
        alert('come soon...');
    }
}
function Addmv1Event() {
    var mv1 = document.getElementById('mv1');
    mv1.onclick = function () {
        alert('come soon...');
    }
}
function Addmv2Event() {
    var mv2 = document.getElementById('mv2');
    mv2.onclick = function () {
        alert('come soon...');
    }
}

function cpy() {
    var cp=document.getElementById('change-part');
    cp.innerText='';
    var cp2=document.getElementById('change-part2');
    cp2.innerText='';
    var slide = document.getElementsByClassName('sideline')[0];
    slide.style.marginLeft = '100px';

    var yys_script = document.createElement('div');
    var yys_img = document.createElement('img');
    var spann = document.createElement('span');
    spann.classList.add('tiptop');
    yys_img.src = './static/py_img/yys.jpg';
    yys_img.classList.add('middle_img');
    yys_script.appendChild(spann);
    yys_script.appendChild(yys_img);
    yys_script.id='yys_script';
    yys_script.style.cursor='pointer';
    // yys_script.innerText='YYS_SCRIPT';
    yys_script.classList.add('py_left_div');
    // yys_script.classList.add('py_select_div');
    cp2.appendChild(yys_script);
    AddYYSscriptevent();

    var pig_script = document.createElement('div');
    var pig_img = document.createElement('img');
    pig_img.src = './static/py_img/pig.jpg';
    pig_img.classList.add('middle_img');
    pig_script.appendChild(spann);
    pig_script.appendChild(pig_img);
    pig_script.id='pig_script';
    pig_script.style.cursor = 'pointer';
    // pig_script.innerText='PIG_SCRIPT';
    pig_script.classList.add('py_left_div');
    // pig_script.classList.add('py_select_div');
    cp2.appendChild(pig_script);
    AddPIGscriptevent();

}
function chf() {
    var cp=document.getElementById('change-part');
    cp.innerText='';
    var cp2=document.getElementById('change-part2');
    cp2.innerText='';
    var slide = document.getElementsByClassName('sideline')[0];
    slide.style.marginLeft = '200px';

    var game_div = document.createElement('div');
    var mv_div = document.createElement('div');
    var left_div1 = document.createElement('div');
    var left_div2 = document.createElement('div');
    game_div.id = 'hf_left_div1';
    game_div.classList.add('hf_left_div1');
    mv_div.id = 'hf_left_div2';
    mv_div.classList.add('hf_left_div2');

    left_div1.classList.add('hf_left');
    left_div1.id = 'hf_left1';
    left_div2.classList.add('hf_left');
    left_div2.id = 'hf_left2';
    left_div1.appendChild(game_div);
    left_div2.appendChild(mv_div);
    cp2.appendChild(left_div1);
    cp2.appendChild(left_div2);
    setTimeout(function () {
        var game_div = document.getElementById('hf_left_div1');
        game_div.classList.add('close');
        // game_div.classList.remove('hf_left_div1');
        var mv_div = document.getElementById('hf_left_div2');
        mv_div.classList.add('close');
        // mv_div.classList.remove('hf_left_div2');
    },1300);
    AddGameButtonEvent();
    AddMVButtonEvent();
}
function cai() {
    var cp=document.getElementById('change-part');
    cp.innerText='';
    var cp2=document.getElementById('change-part2');
    cp2.innerText='';
    var slide = document.getElementsByClassName('sideline')[0];
    slide.style.marginLeft = '300px';

    var ai_list=['./static/aimer/aimer1.jpg','./static/aimer/aimer2.jpg','./static/aimer/aimer3.jpg']
    for (var i = 0;i<ai_list.length;i++) {
        var ai_div = document.createElement('div');
        var ai_p = document.createElement('img');
        ai_p.src=ai_list[i];
        ai_div.appendChild(ai_p);
        ai_div.classList.add('small');
        ai_div.classList.add('bechange');
        cp.appendChild(ai_div);
    }
    AddDivClickEvent();
    //加全图按钮
    AddBigButton();
}
function cyy() {
    var cp=document.getElementById('change-part');
    cp.innerText='';
    var cp2=document.getElementById('change-part2');
    cp2.innerText='';
    var slide = document.getElementsByClassName('sideline')[0];
    slide.style.marginLeft = '400px';

    // var yy1=document.createElement('img');
    // yy1.src='./static/YYlu.jpg';
    // yy1.classList.add('small');
    // cp.appendChild(yy1);
    // var yy2=document.createElement('img');
    // yy2.src='./static/YYm.jpg';
    // yy2.classList.add('small');
    // cp.appendChild(yy2);
    var yy_list=['./static/yy/YYlu.jpg','./static/yy/YYm.jpg']
    for (var i=0;i<yy_list.length;i++) {
        var yy_div = document.createElement('div');
        var yy_p = document.createElement('img');
        yy_p.src=yy_list[i];
        yy_div.appendChild(yy_p);
        yy_div.classList.add('small');
        yy_div.classList.add('bechange');
        cp.appendChild(yy_div);
    }
    AddDivClickEvent();
    AddBigButton();
}
function home() {
    // var is_home=confirm('将回到主界面');
    // if (is_home) {
        var cp=document.getElementById('change-part');
        var cp2=document.getElementById('change-part2');
        var slide = document.getElementsByClassName('sideline')[0];
        slide.style.marginLeft = '0px';
        // document.getElementById('change-part').innerText = '';
        // document.getElementById('change-part2').innerText = '';
        cp.innerText = '';
        cp2.innerText = '';
        var yell_div = document.createElement('div');
        yell_div.classList.add('hm_left_div');
        yell_div.id = 'yellow-site';
        yell_div.innerText = '黄网';
        cp2.appendChild(yell_div);
        AddYelEvent();
        // var bigbutton = document.getElementById('big_b');
        // var big_b_par = bigbutton.parentElement;
        // big_b_par.removeChild(bigbutton);
    // }
}

