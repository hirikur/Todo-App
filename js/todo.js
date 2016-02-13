
//Model层
//Task Model
var Task = function (id,name,date,content) {
	this.id = id;
	this.name = name;
	this.date = date;
	this.content = content;
	this.isFinish = false; 
}

Task.prototype = {
	constructor : Task,

	getId : function() {
		return this.id;
	},

	setId : function(id) {
		this.id = id;
		return this;
	},

	getName : function() {
		return this.name;
	},

	setName : function(name) {
		this.name = name;
		return this;
	},

	getDate : function() {
		return this.date;
	},

	setDate : function(date) {
		this.date = date;
		return this;
	},

	getContent : function() {
		return this.conetnt;
	},

	setContent : function(content) {
		this.content = content;
		return this;
	},

	getIsFinish : function() {
		return this.isFinish;
	},

	setIsFinish : function(isFinish) {
		this.isFinish = isFinish;
		return this;
	}
}

//TaskList Model
var TaskList = function() {
	this.tasks = [];
	this.selectId = -1;
	this.filter = "all";
}

TaskList.prototype = {
	constructor : TaskList,

	setTasks : function(tasks){
		this.tasks = tasks;
		EventListener.publish("TaskListChange");
		return this;
	},

	addTask : function(task) {
		this.tasks.push(task);
		EventListener.publish("TaskListChange");		
		return this;
	},

	removeTask : function(id){
		for (var i = this.tasks.length - 1; i >= 0; i--) {
			if (this.tasks[i].getId === id) {
				this.tasks.splice(i,1);
				return this;
			}
		};
	},

	getSelectId : function() {
		return this.selectId;
	},

	setSelectId : function(id) {
		this.selectId = id;
		EventListener.publish("SelectTaskChange");
		EventListener.publish("TaskListChange");
		return this;
	},

	setFilter : function(filter) {
		this.filter = filter;
		EventListener.publish("TaskListChange");
		return this;
	},

	findTask : function(id) {
		for (var i = this.tasks.length - 1; i >= 0; i--) {
			if (this.tasks[i],id === id) {
				return this.tasks[i];
			}
		};
		return null;
	}
}

//taskDetail model

var TaskDetail = function(task) {
	this.task = task;
}

TaskDetail.prototype = {
	constructor : TaskDetail,

	setTask : function(task) {
		this.task = task;
		EventListener.publish("TaskDetailChange");
	},

	edit : function (id,name,date,content) {
		this.task.setId(id).setName(name).setDate(date).setContent(content);
	},

	setTaskFinish : function() {
		this.task.setIsFinish(!this.task.getIsFinish());
	},
}

//Category Model
var Category = function(id,name,parent) {
	this.id = id;
	this.name = name;
	this.parent = parent;
	this.tasks = [];
	this.subCategories = [];
};

Category.prototype = {
	constructor : Category,

	getId : function() {
		return this.id;
	},

	setId : function(id) {
		this.id = id;
		return this;
	},

	getName : function() {
		return this.name;
	},

	setName : function(name) {
		this.name = name;
		return this;
	},

	getParent : function() {
		return this.parent;
	},

	setParent : function(parent) {
		this.parent = parent;
		return this;
	},

	getTasks : function() {
		return this.tasks;
	},

	setTasks : function(tasks) {
		this.tasks = tasks;
		return this;
	},

	getSubcategories : function() {
		return this.subCategories;
	},

	setSubcategories : function(subCategories) {
		this.subCategories = subCategories;
		return this;
	},

	getTaskLength : function() {
		var length = this.tasks.length;
		if (this.subCategories.length !== 0) {
			for (var i = this.subCategories.length - 1; i >= 0; i--) {
				length += this.subCategories[i].getTaskLength();
			};
		}
		return length;
	},

	getSubcateLength : function() {
		var length = this.subCategories.length;
		if (this.subCategories.length !== 0) {
			for (var i = this.subCategories.length - 1; i >= 0; i--) {
				length += this.subCategories[i].getSubcateLength();
			};
		}
		return length;
	},

	removeCategory : function(id) {
		var idnex = 0;
		if (this.id === id) {
			for (var i = this.parent.subCategories.length - 1; i >= 0; i--,index++) {
				if (this.parent.subCategories[i].id = id) {
					break;
				}
			};
			this.parent.subCategories.splice(idnex,1);
			return this;
		} else {
			for (var i = this.getSubcategories().length - 1; i >= 0; i--) {
				this.getSubcategories()[i].remove(id);
			};
		}
		return this;
	}, 

	removeSubCategory : function(id) {
		var oldCate = this.findCategory(id);
		var parent = oldCate.parent;
		var index;
		for (var i = parent.subCategories.length - 1; i >= 0; i--) {
			if (parent.subCategories[i].id === id) {
				index = i;
				break;
			}
		};
		parent.subCategories.splice(index,1);
	}, 

	findCategory : function(id) {
		if(this.id == id) {
			return this;
		} else {
			for (var i = this.subCategories.length - 1; i >= 0; i--) {
					var temp = this.subCategories[i].findCategory(id);
					if (temp) {
						return temp;
					}
			};
			return null;
		} 
	}
}

//CategoryList Model
var CategoryList = function() {
	this.categories = [];
	this.selectId = -1;
}

CategoryList.prototype = {
	constructor : CategoryList,

	setCategories : function(cates) {
		this.categories = cates;
	},

	addCategory : function(cate,parent) {
		if (!parent) {
			this.categories.push(cate);
		} else {
			parent.subCategories.push(cate);
		}
		EventListener.publish("CategoryListChange");
	},

	removeCategory : function(id) {
		var index;
		for (var i = this.model.categories.length - 1; i >= 0; i--) {
			if (this.model.categories[i].id == id) {
				index = i;
				this.model.categories.splice(index,1);
			}
		};
		for (var i = this.model.categories.length - 1; i >= 0; i--) {
			var temp = this.model.categories[i].removeSubCategory(id);
		};
		EventListener.publish("CategoryListChange");
	},


	getSelectId : function() {
		return this.selectId;
	},

	setSelectId : function(id) {
		this.selectId = id;
		EventListener.publish("SelectCategoryChange");
		EventListener.publish("CategoryListChange");
		return this;
	},

	getAllTaskLength : function() {
		var length = 0;
		for (var i = this.categories.length - 1; i >= 0; i--) {
			length += this.categories[i].getTaskLength();
		};
		return length;
	},

	getAllSubcateLength : function() {
		var length = this.categories.length;
		for (var i = this.categories.length - 1; i >= 0; i--) {
			length += this.categories[i].getSubcateLength();
		};
		return length;
	},

	findCategory : function(id) {
		for (var i = this.categories.length - 1; i >= 0; i--) {
			var temp = this.categories[i].findCategory(id);
			if (temp) {
				return temp;
			}
		};
		return null;
	}
}

//view层
var CategoryListView = function(model,controller){
	this.model = model;
	this.controller = controller;
}

CategoryListView.prototype = {
	constructor : CategoryListView,

	showCategoryList : function(cates,element) {
		var ul = null,
		li = null,
		textNode1 = null,
		textNode2 = null,
		number = null,
		i1 = null,
		i2 = null,
		span = null;
		ul = document.createElement("ul");
		for (var a = 0 ; a < cates.length ; a++) {
			li = document.createElement("li");
			li.setAttribute("data-id",cates[a].id);
			i1 = document.createElement("i");
			i1.className = "fa fa-folder-o";
			i2 = document.createElement("i");
			i2.className = "fa fa-times";
			span = document.createElement("span");
			textNode = document.createTextNode(cates[a].getName() + '(');
			textNode2 = document.createTextNode(')');
			number = document.createTextNode(cates[a].getTaskLength());
			span.appendChild(number);
			li.appendChild(i1);
			li.appendChild(textNode);
			li.appendChild(span);
			li.appendChild(textNode2);
			li.appendChild(i2);
			if (cates[a].subCategories.length !== 0){
				this.showCategoryList(cates[a].subCategories,li);
			}
			ul.appendChild(li);
		}
		element.appendChild(ul);
	},

	showTaskLength : function(num,element){
		element.innerHTML = "";
		var text = document.createTextNode(num);
		element.appendChild(text);
	},

	update : function(){
		document.getElementById("category-list-wrapper").innerHTML = "";
		this.showCategoryList(this.model.categories,document.getElementById("category-list-wrapper"));
		this.showTaskLength(this.model.getAllTaskLength(),document.getElementById("all-task-num"));
	},

	init : function(){
		this.update();
		//todo 监听模型变化
		EventListener.subscribe("CategoryListChange",this.update,this);
		EventListener.subscribe("TaskListChange",this.update,this);
	}
}

var TaskListView = function(model,controller) {
	this.model = model;
	this.controller = controller;
}

TaskListView.prototype = {
	constructor : TaskListView,

	showTaskList : function(tasks,element) {
		var taskArray = new Array();
		var dateArray = new Array();
		var p = null,
			date = null,
			title = null;
			ul = null,
			li = null;
		for (var i = tasks.length - 1; i >= 0; i--) {
			taskArray.push(tasks[i]);
		};
		taskArray.sort(function(bef,aft) {
            bef = bef.date.split('-'); aft = aft.date.split('-');
            var befDate=new Date(bef[0],bef[1],bef[2]),
                aftDate=new Date(aft[0],aft[1],aft[2]);

            return (aftDate - befDate);
        });
        for (var i = taskArray.length - 1; i >= 0; i--) {
        	if(dateArray.indexOf(taskArray[i].date) === -1){
        		p = document.createElement("p");
        		date = document.createTextNode(taskArray[i].date);
        		dateArray.push(taskArray[i].date);
        		p.appendChild(date);
        		ul = document.createElement("ul");
        		li = document.createElement("li");
        		li.setAttribute("data-id",taskArray[i].id);
        		if (taskArray[i].getIsFinish() === true) {
        			li.className = "finished";
        		} else {
        			li.className = "unfinished";
        		}
        		title = document.createTextNode(taskArray[i].name);
        		li.appendChild(title);
        		ul.appendChild(li);
        		element.appendChild(p);
        		element.appendChild(ul);
        	} else {
        		li = document.createElement("li");
        		li.setAttribute("data-id",taskArray[i].id);
        		if (taskArray[i].getIsFinish() === true) {
        			li.className = "finished";
        		} else {
        			li.className = "unfinished";
        		}
        		title = document.createTextNode(taskArray[i].name);
        		li.appendChild(title);
        		ul.appendChild(li);
        	}
        };
	},

	filterByFinish : function(type){
		var arr = new Array();
		var temp;
		switch(type){
            case "all":
                for(var i=0; i<this.model.tasks.length; i++){
                    arr.push(this.model.tasks[i]);
                }
                break;
            case "finished":
		        for(var i=0; i<this.model.tasks.length; i++){
		            if(this.model.tasks[i].getIsFinish() === true){
		                arr.push(this.model.tasks[i]);
		            }
		        }
		        break;
            case "unfinished":
		        for(var i=0; i<this.model.tasks.length; i++){
		            if(this.model.tasks[i].getIsFinish() === false){
		                arr.push(this.model.tasks[i]);
		            }
		        }
		        break;
        }
        return arr;
	},

	update : function() {
		document.getElementById("task-list-wrapper").innerHTML = "";
		this.showTaskList(this.filterByFinish(this.model.filter),document.getElementById("task-list-wrapper"));
	},

	init : function(){
		this.update();
		EventListener.subscribe("TaskListChange",this.update,this);
		EventListener.subscribe("SelectCategoryChange",this.update,this);
	}
}

var TaskDetailView = function(model,controller) {
	this.model = model;
	this.controller = controller;
}

TaskDetailView.prototype = {
	constructor : TaskDetailView,

	showTaskDetail : function() {
		var taskTitle = document.querySelector("#task-detail .task-detail-title span");
		var taskDate = document.querySelector("#task-detail .task-detail-date span");
		var taskContent = document.querySelector("#task-detail .task-detail-content p");
		taskTitle.innerHTML = this.model.task.name;
		taskDate.innerHTML = this.model.task.date;
		taskContent.innerHTML = this.model.task.content;
	},

	update : function(){
		this.showTaskDetail();
	},

	init : function() {
		this.showTaskDetail();
		EventListener.subscribe("SelectTaskChange",this.update,this);
		EventListener.subscribe("TaskDetailChange",this.update,this);
	}
}

var TaskEditView = function(model,controller) {
	this.model = model;
	this.controller = controller;
}

TaskEditView.prototype = {
	constructor : TaskEditView,

	showTaskEdit : function() {
		var taskTitle = document.querySelector("#task-edit .task-detail-title input");
		var taskDate = document.querySelector("#task-edit .task-detail-date input");
		var taskContent = document.querySelector("#task-edit .task-detail-content textarea");
		taskTitle.value = this.model.task.name;
		taskDate.value = this.model.task.date;
		taskContent.value = this.model.task.content;
	},

	save : function() {
		var taskTitle = document.querySelector("#task-edit .task-detail-title input");
		var taskDate = document.querySelector("#task-edit .task-detail-date input");
		var taskContent = document.querySelector("#task-edit .task-detail-content textarea");
		this.model.task.name = taskTitle.value;
		this.model.task.date = taskDate.value;
		this.model.task.content = taskContent.value;
		EventListener.publish("TaskDetailChange");
	},

	update : function(){
		this.showTaskEdit();
	},

	show : function() {
		var editView = document.getElementById("task-edit");
		editView.style.display = "block";
	},

	hide : function() {
		var editView = document.getElementById("task-edit");
		editView.style.display = "none";
	},

	init : function() {
		this.showTaskEdit();
		EventListener.subscribe("TaskDetailChange",this.update,this);
	}
}

//EventListener 实现观察者模式
var EventListener = {
	subscribe: function(ev, callback, listener) {
		// 创建 _callbacks 对象，除非它已经存在了
		var calls = this._callbacks || (this._callbacks = {});
		var listeners = this._listeners || (this._listeners = {});
		// 针对给定的事件 key 创建一个数组，除非这个数组已经存在
		// 然后将回调函数追加到这个数组中
		(this._callbacks[ev] || (this._callbacks[ev] = [])).push(callback);
		(this._listeners[ev] || (this._listeners[ev] = [])).push(listener);
		return this;
	},

	publish: function() {
		// 将 arguments 对象转换为真正的数组
		var args = Array.prototype.slice.call(arguments, 0);
		// 拿出第 1 个参数，即事件名称
		var ev = args.shift();
		// 如果不存在 _callbacks 对象，则返回
		// 或者如果不包含给定事件对应的数组
		var list, calls, listeners, i, l;
		if (!(calls = this._callbacks)) return this;
		if (!(list = this._callbacks[ev])) return this;
		listeners = this._listeners[ev];
		// 触发回调
		for (i = 0, l = list.length; i < l; i++)
			list[i].apply(listeners[i], args);
		return this;
	}
};

//EventUtil对象，尽可能保证兼容性
var EventUtil = {
	addHandler : function(element,type,handler) {
		if (element.addEventListener) {
			element.addEventListener(type,handler,false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type,handler);
		} else {
			element["on" + type] = handler;
		}
	},

	removeHandler : function(element,type,handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type,handler,false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type,handler);
		} else {
			element["on" + type] = null;
		}
	},

	getEvent : function(event) {
		return event ? event : window.event; 
	},

	getTarget : function(event) {
		return event.target || event.srcElement;
	},

	preventDefault : function(event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},

	stopPropagation : function(event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}
}


//controller层
var controller = {
	init : function(){
		this.categoryListModel = new CategoryList();
		this.taskListModel = new TaskList();
		this.taskDetailModel = new TaskDetail();
		this.taskEditModel = new TaskDetail();

		this.categoryListView = new CategoryListView(this.categoryListModel,this);
		this.taskListView = new TaskListView(this.taskListModel,this);
		this.taskDetailView = new TaskDetailView(this.taskDetailModel,this);
		this.taskEditView = new TaskEditView(this.taskEditModel,this);

		var task1 = new Task(0,"haha","2014-01-01","hahaha");
		var task2 = new Task(1,"hehe","2015-01-02","hehehe");
		var task3 = new Task(2,"hihi","2015-06-08","hihihi");
		var category1 = new Category(0,"haha",null);
		var arr1 = [task1];	
		category1.setTasks(arr1);	
		var category2 = new Category(1,"hehe",category1);
		var arr2 = [task2,task3];	
		category2.setTasks(arr2);
		category1.subCategories.push(category2);

		var arr3 = [category1];

		this.categoryListModel.setCategories(arr3);
		this.taskListModel.setTasks(arr1);
		this.taskDetailModel.setTask(task1);
		this.taskEditModel.setTask(task1);

		this.categoryListView.init();
		this.taskListView.init();
		this.taskDetailView.init();
		this.taskEditView.init();
	},

	//关于CategoryList的controller
	handleAddCategory : function() {
		var cate = prompt("请输入新分类的名称","");
		var newCate;
		if (cate !== null && cate !== "") {
			var newId = this.categoryListModel.getAllSubcateLength();
			var parent = this.categoryListModel.findCategory(this.categoryListModel.selectId);
			var newCate = new Category(newId,cate,parent);
			this.categoryListModel.addCategory(newCate,parent);
		}
	},

	handleRemoveCategory : function(id) {
		var r = confirm("确认删除该分类吗？")
  		if (r === true) {
  			this.categoryListModel.removeCategory(id);
  		}
	},

	handleChangeSelectCate : function(id) {
		this.categoryListModel.setSelectId(id);
		if (id != -1){
			var cate = this.categoryListModel.findCategory(id);
			this.taskListModel.setTasks(cate.tasks);
		}
	},

	//关于TaskList的controller
	handleAddTask : function(task){
		this.taskListModel.addTask(task);
	},

	handleChangeTaskFilter : function(filter) {
		this.taskListModel.setFilter(filter);
	},

	handleChangeSelectTask : function(id) {
		this.taskListModel.setSelectId(id);
		this.taskDetailModel.setTask(this.taskListModel.findTask(id));
	},

	//关于TaskDetail的controller
	handleChangeTaskFinish : function() {
		this.taskDetailModel.setTaskFinish();
	},

	handleEditTask : function() {
		this.taskEditModel.setTask(this.taskDetailModel.task);
		this.taskEditView.show();
	},

	//关于TaskEdit的controller
	handleNewTaskEdit : function() {
		this.taskEditModel.setTask(new Task(this.categoryListModel.getAllTaskLength(),"","",""));
		this.taskEditView.show();	
	},

	handleNewTaskSave : function() {
		this.taskEditView.save();
		this.taskEditView.hide();
		if (this.taskEditModel !== this.taskDetailModel) {
			this.handleAddTask(this.taskEditModel.task);
		}
		this.taskDetailModel.setTask(this.taskEditModel.task);
		this.taskEditView.hide();
	},

	handleNewTaskQuit : function() {
		this.taskEditView.hide();
	}
};


EventUtil.addHandler(document.getElementById("category-list-wrapper"),"click",function(e) {
	var event = EventUtil.getEvent(e);
	var target = EventUtil.getTarget(event);
	var id;
	if (target.tagName === "LI") {
		id = target.getAttribute("data-id");
		controller.handleChangeSelectCate(id);
	} else if (target.tagName === "I" && target.className === "del") {
		id = target.parentNode.getAttribute("data-id");
		controller.handleRemoveCategory(id);
	} else {
		controller.handleChangeSelectCate(-1);
	}
});

EventUtil.addHandler(document.getElementById("category-list-btn"),"click",function(e) {
	controller.handleAddCategory();
});

EventUtil.addHandler(document.getElementById("task-list-wrapper"),"click",function(e) {
	var event = EventUtil.getEvent(e);
	var target = EventUtil.getTarget(event);
	var id;
	if (target.tagName === "LI") {
		id = target.getAttribute("data-id");
		id = parseInt(id);
		controller.handleChangeSelectTask(id);
	}
});

EventUtil.addHandler(document.getElementById("task-list-btn"),"click",function(e) {
	controller.handleNewTaskEdit();
});

EventUtil.addHandler(document.getElementById("task-list-header"),"click",function(e) {
	var event = EventUtil.getEvent(e);
	var target = EventUtil.getTarget(event);
	var wrapper = document.getElementById("task-list-header");
	var filters = wrapper.getElementsByTagName("li");
	for (var i = filters.length - 1; i >= 0; i--) {
		filters[i].className = "";
	};
	target.className = "filter-on";
	var name;
	name = target.getAttribute("data-fillter");
	controller.handleChangeTaskFilter(name);
});

EventUtil.addHandler(document.getElementById("task-detail-btn"),"click",function(e) {
	var event = EventUtil.getEvent(e);
	var target = EventUtil.getTarget(event);
	var id = target.id;
	if (id === "edit-task") {
		controller.handleEditTask();
	} else if (id === "task-change-finish") {
		controller.handleChangeTaskFinish();
	}
});

EventUtil.addHandler(document.getElementById("task-edit-btn"),"click",function(e) {
	var event = EventUtil.getEvent(e);
	var target = EventUtil.getTarget(event);
	var id = target.id;
	if (id === "new-task-save") {
		controller.handleNewTaskSave();
	} else if (id === "new-task-quit") {
		controller.handleNewTaskQuit();
	}
});

controller.init();

