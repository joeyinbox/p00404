/**
 * Constructor of the Question class
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change				Reason
 * 0.6.0	Joey		03-24-2014	First release		Requirements
 */
function Question() {
	this.title = '';
	
	this.answerList = [];
	this.answer = null;
}


/**
 * Add an eventual answer to the list
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change				Reason
 * 0.6.0	Joey		03-24-2014	First release		Requirements
 */
Question.prototype.addAnswer = function(text) {
	this.answerList.push(text);
}


/**
 * Indicate which answer is the good one
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change				Reason
 * 0.6.0	Joey		03-24-2014	First release		Requirements
 */
Question.prototype.setCorrectAnswer = function(text) {
	this.answer = this.answerList.indexOf(text);
}


/**
 * Return a pool of answers including the good one and limited to a maximum number
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change				Reason
 * 0.6.0	Joey		03-24-2014	First release		Requirements
 */
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


/**
 * Shuffles the answers with an implementation of the Fisher-Yates algorithm
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change								Reason
 * 0.6.0	Joey		03-24-2014	First release						Requirements
 * 0.6.5	Joey		03-24-2014	Keep index j in proper boundaries	Bugfix Issue #6
 */
Question.prototype.shuffleAnswers = function(array) {
	var j;
	var tmp;
	
	// The following loop will swap random pairs of value
	for(var i=0; i<array.length; i++) {
		j = Math.round(Math.random()*(i+1))%array.length;
		tmp = array[i];
		array[i] = array[j];
		array[j] = tmp;
	}
	
	return array;
}