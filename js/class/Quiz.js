/**
 * Constructor of the Quiz class
 * Declare all variables and set the quiz interface ready
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change											Reason
 * 0.6.0	Joey		03-24-2014	First release									Requirements
 * 0.6.1	Joey		03-24-2014	Gather DOM elements	related to stage 1			Requirements
 * 0.6.1	Joey		03-24-2014	Start event listener 							Requirements
 * 0.6.2	Joey		03-24-2014	Create question pool							Requirements
 * 0.6.3	Joey		03-24-2014	Select and submit answer event listeners		Requirements
 * 0.6.3	Joey		03-24-2014	Gather more DOM elements related to stage 2		Requirements
 * 0.6.4	Joey		03-24-2014	Shuffle questions								Requirements
 * 0.6.5	Joey		03-24-2014	Restart event listener							Requirements
 * 0.6.5	Joey		03-24-2014	Gather more DOM elements related to stage 3		Requirements
 * 0.6.6	Joey		03-24-2014	Abort event listener							Requirements
 */
function Quiz() {
	this.score = 0;
	this.questionDoneCount = 0;
	this.maxQuestion = 10;
	this.maxAnswer = 4;
	
	this.questionList = [];
	
	// Retrieve dom elements to manipulate them during the 3 stages without querying the DOM again
	this.dom = {};
	this.dom.pre = $('#pre');
	
	this.dom.during = $('#during');
	this.dom.question = $('#during h1');
	this.dom.answers = $('#during ul');
	this.dom.validation = $('#validation');
	this.dom.state = $('#state');
	this.dom.score = $('#score');
	this.dom.progress = $('#remaining');
	this.dom.result = $('#result');
	
	this.dom.post = $('#post');
	this.dom.greatings = $('#post h1');
	this.dom.count = $('#post #count');
	this.dom.hint = $('#post #hint');
	
	
	// Attach an event listener when the user start the quiz
	$('#content').on('click', '.start a', (function() {
		this.start();
		return false;
	}).bind(this));
	
	// Attach an event listener when the user restart the quiz
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
	
	// Populate the question list and shuffle it
	this.createQuestions();
	this.shuffleQuestions();
	
	// Notify the dom that users would need to answer X questions
	$('#maxQuestion').text(this.getRemainingCount());
}


/**
 * Create all questions
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change				Reason
 * 0.6.2	Joey		03-24-2014	First release		Requirements
 * 0.6.4	Joey		03-24-2014	Add more questions	Requirements
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
 * 0.6.6	Joey		03-24-2014	Abort button	Requirements
 */
Quiz.prototype.displayQuestion = function(question) {
	// Manipulate the dom to insert the question informations
	this.dom.question.text(question.title);
	this.updateStats();
	
	// Construct the answer pool list to choose among and insert it in the DOM
	var answers = '';
	var answerList = question.getAnswerPool(this.maxAnswer);
	for(var i=0; i<answerList.length; i++) {
		answers += '<li data-id="'+answerList[i].id+'"><a href="#">'+answerList[i].text+'</a></li>';
	}
	
	// Initialise the status of the list and insert proper buttons
	this.dom.answers.addClass('unanswered').html(answers);
	this.dom.validation.html('<a href="#" class="button cancel">Abort</a> <a href="#" class="button validate">Validate</a>');
	
	// Reveal the question
	this.dom.during.fadeIn(200);
};


/**
 * Update the statistics of the user
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.6.3	Joey		03-24-2014	First release	Requirements
 */
Quiz.prototype.updateStats = function() {
	// Manipulate the dom to insert the progress informations
	this.dom.score.html(this.score+' <span>point'+((this.score>1)?'s':'')+'</span>');
	this.dom.progress.html(this.getRemainingCount()+' left');
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
	// Hides the pre text and call the next question afterwards
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
 * 0.6.5	Joey		03-24-2014	First release	Requirements
 */
Quiz.prototype.restart = function() {
	// Hides the pre text and call the next question afterwards
	this.dom.post.fadeOut(500, (function() {
		this.nextQuestion();
	}).bind(this));
};


/**
 * Assert if a next question is available to select and launch it
 * Otherwise, launch call the final score display
 * 
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change						Reason
 * 0.6.1	Joey		03-24-2014	First release				Requirements
 * 0.6.5	Joey		03-24-2014	Call final score display	Requirements
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
 * Asserts if the quiz has a next question
 * 
 * @param	none
 * @return	boolean		Returns true if another question is available, otherwise, false
 *
 * Modification history
 * Version	Modifier	Date		Change								Reason
 * 0.6.5	Joey		03-24-2014	First release						Requirements
 */
Quiz.prototype.hasNextQuestion = function() {
	return this.questionDoneCount<this.questionList.length && this.questionDoneCount<this.maxQuestion;
}


/**
 * Returns the number of questions left
 * 
 * @param	none
 * @return	int
 *
 * Modification history
 * Version	Modifier	Date		Change								Reason
 * 0.6.5	Joey		03-24-2014	First release						Requirements
 */
Quiz.prototype.getRemainingCount = function() {
	return this.maxQuestion>this.questionList.length?this.questionList.length-this.questionDoneCount:this.maxQuestion-this.questionDoneCount;
}


/**
 * Show the final score
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change			Reason
 * 0.6.5	Joey		03-24-2014	First release	Requirements
 */
Quiz.prototype.showFinalScore = function() {
	// Hides the question
	this.dom.during.fadeOut(500, (function() {
		
		// Manipulates the DOM it insert results informations
		this.dom.count.text(this.score);
		
		// Reset the quiz to be able to retrieve the maximum number of questions
		var score = this.score;
		this.resetQuiz();
		
		// Deliver a message based on the completion rate
		var result = Math.round((score/this.getRemainingCount())*100);
		
		if(result===100) {
			this.dom.greatings.text('Perfect!');
			this.dom.hint.html('Logic gates and boolean algebra have no secret for you.<br />You are the best. Congratulations!');
		}
		else if(score===this.getRemainingCount()-1) {
			this.dom.greatings.text('Almost perfect!');
			this.dom.hint.html('You were so close to complete this quiz perfectly. Your knowledge is quite impressive.<br />Next time will be the one!');
		}
		else if(result>=75) {
			this.dom.greatings.text('Great job!');
			this.dom.hint.html('You know what logic gates and boolean algebra are for sure..<br />We are impressed.');
		}
		else if(result>=50) {
			this.dom.greatings.text('Good');
			this.dom.hint.html('Your knowledge about Boolean algebra and Logic gates is good.<br />More practice might get you an even higher score.');
		}
		else if(result>=25) {
			this.dom.greatings.text('Hum..');
			this.dom.hint.html('Everyone needs to start at some point..<br />Do not lose hope. You can still improve yourself!');
		}
		else if(result>0) {
			this.dom.greatings.text('Ouch..');
			this.dom.hint.html('Maybe you should have a look at the Tutorials and practice a little bit more before attempting again this quiz.<br />But we are sure that you can make it!');
		}
		else {
			this.dom.greatings.text('Oh my..');
			this.dom.hint.html('Well, this is embarassing.. Not even a single point.<br />Unless you did it on purpose, you really need to go through the tutorials and practice for a few. Nobody is perfect at first glance.');
		}
		
		// Reveals the final score page
		this.dom.post.fadeIn(500);
	}).bind(this));
};


/**
 * Shuffles all questions with an implementation of the Fisher-Yates algorithm
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change								Reason
 * 0.6.4	Joey		03-24-2014	First release						Requirements
 * 0.6.5	Joey		03-24-2014	Keep index j in proper boundaries	Bugfix Issue #6
 */
Quiz.prototype.shuffleQuestions = function() {
	var j;
	var tmp;
	
	// The following loop will swap random pairs of value
	for(var i=0; i<this.questionList.length; i++) {
		j = Math.round(Math.random()*(i+1))%this.questionList.length;
		tmp = this.questionList[i];
		this.questionList[i] = this.questionList[j];
		this.questionList[j] = tmp;
	}
	
	return this.questionList;
}


/**
 * Assert if an answer has been chosen and validate the answer of the user to show it
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change				Reason
 * 0.6.3	Joey		03-24-2014	First release		Requirements
 */
Quiz.prototype.validateAnswer = function() {
	// Get an eventual answer
	var selected = this.dom.answers.find('.selected:first');
	
	// Make sure the user selected an actual answer
	if(selected.data('id')===undefined) {
		alert('You need to select an answer');
	}
	else {
		// Get the selected answer id and check if it is correct
		this.showResult(selected.data('id')===this.questionList[this.questionDoneCount].answer, selected);
	}
}


/**
 * Show the result of a question to a user
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change								Reason
 * 0.6.3	Joey		03-24-2014	First release						Requirements
 * 0.6.5	Joey		03-24-2014	Use a proper text for the button	Requirements
 */
Quiz.prototype.showResult = function(success, choice) {
	// Notify the UI that the current question is answered
	this.dom.answers.removeClass();
	
	// Visually unselect the answer chosen by the user and highlight the good one
	choice.removeClass();
	this.dom.answers.find('li[data-id="'+this.questionList[this.questionDoneCount].answer+'"]').addClass('success');
	
	// Assert whereas the user got it right
	if(success===true) {
		this.dom.result.removeClass().addClass('success');
		this.score++;
	}
	else {
		this.dom.result.removeClass().addClass('error');
		choice.addClass('error');
	}
	
	this.questionDoneCount++;
	this.updateStats();
	
	// Display the result in fullscreen for 2 seconds
	var that = this;
	this.dom.result.fadeIn(500, function() {
		var it = $(this);
		setTimeout(function() {
			it.fadeOut(500);
			
			// Changes the button to suit the available actions
			if(that.hasNextQuestion()) {
				that.dom.validation.html('<a href="#" class="button validate">Next</a>');
			}
			else {
				that.dom.validation.html('<a href="#" class="button validate">Show final score</a>');
			}
		}, 2000);
	});
}


/**
 * Reset the state of the quiz so that the user can do it again with new questions
 * 
 * @param	none
 * @return	void
 *
 * Modification history
 * Version	Modifier	Date		Change								Reason
 * 0.6.5	Joey		03-24-2014	First release						Requirements
 */
Quiz.prototype.resetQuiz = function() {
	this.score = 0;
	this.questionDoneCount = 0;
	
	this.shuffleQuestions();
}