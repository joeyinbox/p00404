/**
 * Constructor of the Quiz class
 * Declare all variables and set the quiz interface ready
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change									Reason
 * 0.6.0	Joey		03-24-2014	First release							Requirements
 */
function Quiz() {
	this.score = 0;
	this.questionDoneCount = 0;
	this.maxQuestion = 10;
	this.maxAnswer = 4;
	
	// Notify the dom that users would need to answer X questions
	$('#maxQuestion').text(this.maxQuestion);
	
	this.questionList = [];
	
	// Retrieve dom elements to manipulate them later without querying the DOM again
	this.dom = {};
	this.dom.preAndPost = $('#pre, #post');
	this.dom.pre = $('#pre');
	this.dom.post = $('#post');
	this.dom.during = $('#during');
	this.dom.question = $('#during h1');
	this.dom.answers = $('#during ul');
	this.dom.validation = $('#validation');
	this.dom.state = $('#state');
	this.dom.score = $('#score');
	this.dom.progress = $('#remaining');
	this.dom.result = $('#result');
	
	// Attach an event listener when the user start or restart the quiz
	$('#content').on('click', '.start a', (function() {
		this.start();
		return false;
	}).bind(this));
	$('#content').on('click', '.restart a', (function() {
		this.restart();
		return false;
	}).bind(this));
	
	// Attach an event listener when the user select an answer
	$('#content').on('click', 'ul.unanswered li', function() {
		$(this).parent().find('.selected').removeClass('selected');
		$(this).addClass('selected');
		
		return false;
	});
	
	// Attach an event listener when the user submit an answer or wants to reach the next one
	$('#content #during').on('click', 'a.validate', (function() {
		if(this.dom.answers.hasClass('unanswered')) {
			this.validateAnswer();
		}
		else {
			this.nextQuestion();
		}
		return false;
	}).bind(this));
	
	// Attach an event listener when the user aborts the quiz
	$('#content #during').on('click', 'a.cancel', (function() {
		if(confirm('Are you sure you want to abort the whole quiz?')) {
			this.showFinalScore();
		}
		return false;
	}).bind(this));
	
	this.createQuestions();
	this.shuffleQuestions();
}


/**
 * Create all questions
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.6.2	Joey		03-24-2014	First release	Requirements
 */
Quiz.prototype.createQuestions = function() {
	var question = new Question();
	question.title = 'Lorem ipsum dolor sit amet?';
	question.addAnswer('Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris lorem');
	question.addAnswer('Duis aute irure dolor in reprehenderit in voluptate');
	question.addAnswer('Excepteur sint occaecat cupidatat non proident, sunt in');
	question.addAnswer('Culpa qui officia deserunt mollit anim id est laborum');
	question.addAnswer('Melit esse cillum dolore eu fugiat');
	question.addAnswer('Edeserunt mollit anim');
	question.addAnswer('Creprehenderit nostrud mollit irure');
	question.setCorrectAnswer('Excepteur sint occaecat cupidatat non proident, sunt in');
	this.questionList.push(question);
	
	var question = new Question();
	question.title = 'How are you?';
	question.addAnswer('I am not sure');
	question.addAnswer('Maybe');
	question.addAnswer('Yes');
	question.addAnswer('No');
	question.addAnswer('Why not');
	question.addAnswer('Hell yeah');
	question.addAnswer('Probably');
	question.setCorrectAnswer('I am not sure');
	this.questionList.push(question);
};


/**
 * Display a question in the interface
 * 
 * @param	question(Question)		The question that will be asked
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.6.3	Joey		03-24-2014	First release	Requirements
 */
Quiz.prototype.displayQuestion = function(question) {
	this.dom.question.text(question.title);
	this.dom.score.html(this.score+' <span>point'+((this.score>1)?'s':'')+'</span>');
	
	var answers = '';
	var answerList = question.getAnswerPool(this.maxAnswer);
	for(var i=0; i<answerList.length; i++) {
		answers += '<li data-id="'+answerList[i].id+'"><a href="#">'+answerList[i].text+'</a></li>';
	}
	this.dom.answers.addClass('unanswered').html(answers);
	
	var left = this.maxQuestion-this.questionDoneCount;
	this.dom.progress.html(left+' left');
	this.dom.validation.html('<a href="#" class="button cancel">Abort</a> <a href="#" class="button validate">Validate</a>');
	
	this.dom.during.fadeIn(200);
};


/**
 * Starts the quiz
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.6.1	Joey		03-24-2014	First release	Requirements
 */
Quiz.prototype.start = function() {
	this.dom.pre.fadeOut(500, (function() {
		this.nextQuestion();
	}).bind(this));
};


/**
 * Restarts the quiz
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.6.1	Joey		03-24-2014	First release	Requirements
 */
Quiz.prototype.restart = function() {
	this.dom.post.fadeOut(500, (function() {
		this.resetQuiz();
		this.nextQuestion();
	}).bind(this));
};


/**
 * Select and launch the next question if possible
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.6.1	Joey		03-24-2014	First release	Requirements
 */
Quiz.prototype.nextQuestion = function() {
	if(this.hasNextQuestion()) {
		this.displayQuestion(this.questionList[this.questionDoneCount]);
	}
	else {
		// There is no more question left
		// It is time to show the final score
		this.showFinalScore();
	}
};


/**
 * Show the final score
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.6.1	Joey		03-24-2014	First release	Requirements
 */
Quiz.prototype.showFinalScore = function() {
	this.dom.during.fadeOut(500, (function() {
		
		console.log('finished');
		
		this.dom.post.fadeIn(500);
	}).bind(this));
};


// Implementation of the Fisher-Yates algorithm
Quiz.prototype.shuffleQuestions = function() {
	var i = this.questionList.length;
	var j;
	var tmp;
	
	if(i===0) {
		return this.questionList;
	}
	
	while(--i) {
		j = Math.round(Math.random()*(i+1))%this.questionList.length;
		tmp = this.questionList[i];
		this.questionList[i] = this.questionList[j];
		this.questionList[j] = tmp;
	}
}


Quiz.prototype.validateAnswer = function() {
	var selected = this.dom.answers.find('.selected:first');
	
	// Make sure the user selected an answer
	if(selected.data('id')===undefined) {
		alert('You need to select an answer');
	}
	else {
		// Get the selected answer id and check if it is correct
		this.showResult(selected.data('id')===this.questionList[this.questionDoneCount].answer, selected);
	}
}


Quiz.prototype.showResult = function(success, choice) {
	this.dom.answers.removeClass();
	
	choice.removeClass();
	this.dom.answers.find('li[data-id="'+this.questionList[this.questionDoneCount].answer+'"]').addClass('success');
	
	if(success===true) {
		this.dom.result.removeClass().addClass('success');
		this.dom.score.html(++this.score+' <span>point'+((this.score>1)?'s':'')+'</span>');
	}
	else {
		this.dom.result.removeClass().addClass('error');
		choice.addClass('error');
	}
	
	this.questionDoneCount++;
	
	var that = this;
	this.dom.result.fadeIn(500, function() {
		var it = $(this);
		setTimeout(function() {
			it.fadeOut(500);
			
			if(that.hasNextQuestion()) {
				that.dom.validation.html('<a href="#" class="button validate">Next</a>');
			}
			else {
				that.dom.validation.html('<a href="#" class="button validate">Show final score</a>');
			}
		}, 2000);
	});
}


Quiz.prototype.resetQuiz = function() {
	this.score = 0;
	this.questionDoneCount = 0;
	
	this.shuffleQuestions();
}


Quiz.prototype.hasNextQuestion = function() {
	return this.questionDoneCount<this.questionList.length && this.questionDoneCount<this.maxQuestion;
}