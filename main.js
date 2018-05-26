var elements = $('.ai-option');
var running = false;
var exam = false;
var chapter = false;
var questionid = false;
var run = false;
var questionDivId;
function isInt(value) 
{
	return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}
function getExam()
{
	//console.log("getExam start");
	$('#hdr').text().indexOf('IT Essentials')>-1 ? //ite
		exam = 0 :
	$('#hdr').text().indexOf('Introduction to Networks')>-1 ? //ccna1
		exam = 1 :
	$('#hdr').text().indexOf('Routing and Switching Essentials')>-1 ? //ccna2
		exam = 2 : exam = 2;//default exam
	
	$('#hdr').text().indexOf('Final Exam')>-1 ?
		chapter = 0 :
	$('#hdr').text().indexOf('Chapter 12')>-1 ?
		chapter = 12 :
	$('#hdr').text().indexOf('Chapter 11')>-1 ?
		chapter = 11 :
	$('#hdr').text().indexOf('Chapter 10')>-1 ?
		chapter = 10 :
	$('#hdr').text().indexOf('Chapter 9')>-1 ?
		chapter = 9 :
	$('#hdr').text().indexOf('Chapter 8')>-1 ?
		chapter = 8 :
	$('#hdr').text().indexOf('Chapter 7')>-1 ?
		chapter = 7 :
	$('#hdr').text().indexOf('Chapter 6')>-1 ?
		chapter = 6 :
	$('#hdr').text().indexOf('Chapter 5')>-1 ?
		chapter = 5 :
	$('#hdr').text().indexOf('Chapter 4')>-1 ?
		chapter = 4 :
	$('#hdr').text().indexOf('Chapter 3')>-1 ?
		chapter = 3 :
	$('#hdr').text().indexOf('Chapter 2')>-1 ?
		chapter = 2 : 
	$('#hdr').text().indexOf('Chapter 1')>-1 ?
		chapter = 1 : chapter = 9;//default chapter
	
	//console.log("exam: "+exam+", chapter: "+chapter);
	//console.log("getExam end");
}

function runner()
{
	if(run)
		getQuestion();
}

function getQuestion()
{
	//console.log("znajdzPytanie start");
	if(isInt(exam) && isInt(chapter)) //tylko jeśli exam i chapter jest ustalony
	{
		questionDivId = $("td.current").attr('data-ident');
		var questionTextDiv = $('#AI'+questionDivId+'TextDiv');
		var questionText = $('#AI'+questionDivId+'TextDiv .surveyHeader .coreContent').text();
		//console.log("pytanie w divie: "+questionText);
		questions[exam][chapter].forEach(function(question, i)
		{
			if(questionText.indexOf(question)>-1) //czy pytanie zawiera pytanie z bazy
				questionid = i; //ustaw questionid na id znalezionego pytania, żeby móc sprawdzić do niego odpowiedzi
		});
		//console.log("questionid: "+questionid);
		selectAnswer();
	}
	//console.log("znajdzPytanie stop");
}

function selectAnswer()
{
	//console.log("dopisz start");
	if(isInt(questionid) && run) //tylko jeśli mamy id pytania //i kiedy user nie zatrzymał
	{
		for (var i = 0; i < elements.length; i++) 
		{
			var element = elements.eq(i);
			answers[exam][chapter][questionid].forEach(function(answer)
			{
				var text = element.text();
				//console.log("|");
				//console.log("text: "+text);
				//console.log("answer: "+answer);
				
				if(text.includes(answer))
				{
					//console.log("Found!");
					//console.log("id: "+element.attr('for'));
					optionid = element.attr('for');
					$('#'+optionid).prop('checked', true);
					//console.log("checked");
				}
			});
		}
	}
	//console.log('czekamy');
	setTimeout(function(){goNext()}, 5000);
	//console.log("dopisz end");
}

function goNext()
{
	if(!$('.question[data-ident='+questionDivId+']').is(':last-child') && run)//jeśli aktualne pytanie nie jest ostatnie // i user nie zatrzymał
	{
		//console.log("lecimy dalej");
		$('next').click();
		//console.log("czekamy");
		setTimeout(function(){runner()}, 3000);
	}
	else
	{
		//console.log("ostatnie pytanie");
		run = false;
	}
}

document.onkeydown = function(e)
{
	if(e.which == 83 && e.shiftKey && e.ctrlKey && e.altKey)//s, shiht, ctrl, alt
		if(run == false)
		{
			//console.log('start! |||||||||||||||||||||||||||||||||||||||||||');
			if(!isInt(exam) && !isInt(chapter))
				getExam();
			run = true;
			runner();
		}
		else
		{
			run = false;
			//console.log('stop! |||||||||||||||||||||||||||||||||||||||||||');
		}
}
