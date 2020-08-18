window.onload = function(){
    // 获取启动按钮
    oStart = document.getElementById("start");
    // 获取暂停按钮
    //oPause = document.getElementById("stop");
    // 获取再来一个按钮
    oAndOne = document.getElementById("and1");
    // 剩余时间, 参与到后面的运算
    var timeleft = 0;
    // 定时器, 用来关掉定时任务, 另外一个,判断如果已经开启, 点击启动按钮, 就不在执行
    var timer = null;

    oAndOne.onclick = function (){
        document.getElementById("min").innerHTML = "25"
        document.getElementById("sed").innerHTML = "00"
    }

    // 点击启动, 判断, 如果定时任务已经启动, 就不再执行
    oStart.onclick = function(){
        if(!timer){
            // 获取剩余时间
            getTimeLeft();
            // 开启是一个定时任务, 每秒执行一次
            timer = setInterval(updateTime,1000);
        }
    }

    // // 点击暂停
    // oPause.onclick = function(){
    //     // 清除当前定时任务
    //     clearInterval(timer);
    //     // 清除原来的值, 还原计时器的初始值. 恢复默认的null
    //     timer = null;
    // }


    // 定时任务的逻辑, 每秒, 剩余时间减一
    function updateTime(){
        timeleft--;
        // 如果剩余时间, 小于0, 执行暂停按钮的逻辑, 停止定时任务
        if(timeleft<0) {
            clearInterval(timer);
            timer = null;
            alert('倒计时结束!'); // 输出弹框
            return; // 终止函数
        }
        // 每一秒, 总的剩余时间变化的时候, 都会执行
        showTime();
    }

    // 计算剩余时间
    function getTimeLeft(){
        // 获取分钟数 "01"
        var iMin = document.getElementById("min").innerHTML
        // 获取秒数
        var iSec = document.getElementById("sed").innerHTML

        // 计算剩余时间并返回
        timeleft = parseInt(iMin)*60+parseInt(iSec);
    }

    // 显示时间, 把剩余时间拆分成, 分钟数和秒数, 分别写入到span里面
    function showTime(){
        var iMin = parseInt(timeleft/60); // 计算分钟数
        var iSec = parseInt(timeleft%60); // 计算秒数
        // 如果数字小于10, 前补零
        if(iMin<10){
            iMin = "0"+iMin;
        }
        if(iSec<10){
            iSec = "0"+iSec;
        }
        // 把分钟数写入到标签中
        document.getElementById("min").innerHTML = iMin;
        // 把秒数写入到标签中
        document.getElementById("sed").innerHTML = iSec;
    }
}