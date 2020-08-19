//获取节点
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

//加载所有事件监听
loadEventListeners();

function loadEventListeners(){
    //DOM内容加载完毕执行
    document.addEventListener('DOMContentLoaded',getTask);

    // 添加任务事件
    form.addEventListener('submit',addTask);
    //单个清除任务
    taskList.addEventListener('click',removeTask);

    //清除所有任务
    clearBtn.addEventListener('click',clearTaks);

    //过滤事件
    filter.addEventListener('keyup',filterTasks);
}

function addTask(e){
    if(taskInput.value === ''){
        alert('输入框中的内容不能为空!');
    }else{
        // 内容不为空，添加任务
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML='<i class="fa fa-times"></i>';
        li.appendChild(link);
        taskList.appendChild(li);

        //本地存储
        storeTaskInLocalStorage(taskInput.value);

        taskInput.value='';
    }
    e.preventDefault();

}

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('确定删除吗？')){
            e.target.parentElement.parentElement.remove();

            //本地存储删除
            removeTaskFromLoaclStorage( e.target.parentElement.parentElement);
        }
    }
}

function clearTaks(){
    // taskList.innerHTML="";
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    //本地存储清除所有
    clearTaskFromLocalStorage();
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach((task)=>{
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!=-1){
            task.style.display='block';
        }else{
            task.style.display='none';
        }
    });
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')==null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//获取本地存储
function getTask(){
    let tasks;
    if(localStorage.getItem('tasks')==null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach((task)=>{
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML='<i class="fa fa-times"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    });
}

function removeTaskFromLoaclStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')==null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach((task,index)=>{
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
        localStorage.setItem('tasks',JSON.stringify(tasks));
    });
}

function clearTaskFromLocalStorage(){
    localStorage.clear();
}