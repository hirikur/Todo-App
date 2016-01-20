//分类类
function Category(id,ame,parent,childs,tasks){
	this.id = id;
	this.name = name;
	this.parent = parent;
	this.childs = childs;
	this.tasks = tasks;
	this.layer = this.getLayer();
}

Category.prototype = {
	constructor : Category;

	getId : function() {
		return this.id;
	}

	setId : function(id) {
		this.id = id;
		return this;
	}

	getName : function() {
		return this.name;
	}

	setName : function(name) {
		this.name = name;
		return this;
	}

	getParent : function() {
		return this.parent;
	}

	setParent : function(parent) {
		this.parent = parent;
		return this;
	}

	getchilds : function() {
		return this.childs;
	}

	setchilds : function(childs) {
		this.childs = childs;
		return this;
	}

	hasChild : function(child) {
		return this.childs.indexOf(child) !== -1;
	}

	addChild : function(child) {
		this.childs.push(child);
		return this;
	}

	removeChild : function(child) {
		var index = this.childs.indexOf(child);
		if(index !== -1) {
			this.tasks.splice(index,1);
		}
		return this;
	}

	getTasks : function() {
		return this.tasks;
	}

	setTasks : function(tasks) {
		this.tasks = tasks;
		return this;
	}

	hasTask : function(task) {
		return this.tasks.indexOf(task) !== -1;
	}

	addTask : function(task) {
		this.tasks.push(task);
		return this;
	}

	removeTask : function(task) {
		var index = this.tasks.indexOf(task);
		if(index !== -1) {
			this.tasks.splice(index,1);
		}
		return this;
	}

	getLayer : function() {
		var parent;
		while (parent!=null) {
			this.layer++;
		}
		return this.layer;
	}
}

//任务类
function Task(id,name,date,content,isFinish){
	this.id = id;
	this.name = name;
	this.date = date;
	this.content = content;
	this.isFinish = isFinish;
}

Task.prototype = {
	constructor : Category;
	
	getId : function() {
		return this.id;
	}

	setId : function(id) {
		this.id = id;
		return this;
	}

	getName : function() {
		return this.name;
	}

	setName : function(name) {
		this.name = name;
		return this;
	}

	getDate : function() {
		return this.date;
	}

	setDate : function(date) {
		this.date = date;
		return this;
	}

	getContent : function() {
		return this.conetnt;
	}

	setContent : function(content) {
		this.content = content;
		return this;
	}

	getIsFinish : function() {
		return this.isFinish;
	}

	setIsFinish : function(isFninsh) {
		this.isFinish = isFinish;
		return this;
	}
}