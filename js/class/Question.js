function Question() {
	this.title = '';
	
	this.answerList = [];
	this.answer = null;
}

Question.prototype.addAnswer = function(text) {
	this.answerList.push(text);
}

Question.prototype.setCorrectAnswer = function(text) {
	this.answer = this.answerList.indexOf(text);
}

Question.prototype.getAnswerPool = function(limit) {
	if(this.answer===null) {
		return [];
	}
	
	// Include the right answer
	var list = [];
	list.push({
		id: this.answer,
		text: this.answerList[this.answer]
	});
	
	// Shuffle all remainings answers by making a local copy of the array
	var tmp = this.answerList.slice(0);
	tmp.splice(this.answer, 1);
	tmp = this.shuffleAnswers(tmp);
	
	// Get some of it
	for(var i=0; i<tmp.length && i<limit-1; i++) {
		list.push({
			id: this.answerList.indexOf(tmp[i]),
			text: tmp[i]
		});
	}
	
	return this.shuffleAnswers(list);
}


// Implementation of the Fisher-Yates algorithm
Question.prototype.shuffleAnswers = function(array) {
	var i = array.length;
	var j;
	var tmp;
	
	if(i===0) {
		return array;
	}
	
	while(--i) {
		j = Math.round(Math.random()*(i+1))%array.length;
		tmp = array[i];
		array[i] = array[j];
		array[j] = tmp;
	}
	
	return array;
}