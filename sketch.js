var singlePrime;
var randomIndex;
var thimble;
var uniqueOn;
var markUniqueStudent;
var currentGrade;
var formData;
var ipad;
var eventUse;
var inputWholeValue;
var inputHundredValue;
var inputThousandValue;
var shotputIsSetup;
var buttonIsSetup;
var currentStudentIndex;
var eventID;
var httpSendRequestArray = [[]];
var medalSendRequestArray = [[]];
var previousTime;
var previousEvent;
var previousGrade;
var boyOrGirl;

function setup(){
	//create a drawing service 500px wide, 500px tall
	createCanvas(1053,1505);

	shotputIsSetup = false;
	buttonIsSetup = false;
	previousTime = second();

	boyOrGirl = "Boys";
	thimble = false;
	testing = true;
	dataSubmitted = false;
	uniqueOn = false;
	singlePrime = false;
	reset = false;
	first = true;
	once = true;
	currentGrade = 6;
	lock = false;
//	eventUse = "housedata";
	eventUse = "ribbons";
	previousEvent = "ribbons";
	previousGrade = 6;
	currentStudentIndex = 0;
	eventID = 0;
	httpSendRequestArray = new Array(0);
	medalSendRequestArray = new Array(0);

	var textboxH = 23;
	var textboxHGap = 2;
	
	
	// setup selection boxes for input
	inputWholeValue = createSelect();
	inputWholeValue.position(10,10);
	inputWholeValue.hide();

	for (var j = 0; j <= 101; j++)
	{
		inputWholeValue.option(j);
	}
	

	inputHundredValue = createSelect();
	inputHundredValue.position(10,10);
	inputHundredValue.hide();
	
	for (var j = 0; j < 10; j++)
	{
		for (var k = 0; k < 10; k++)
		{
			inputHundredValue.option(""+j+k);
		}
	}
		

	inputThousandValue = createSelect();
	inputThousandValue.position(10,10);
	inputThousandValue.hide();
	
	for (var j = 0; j < 10; j++)
	{
		for (var k = 0; k < 10; k++)
		{
			for (var l = 0; l < 10; l++)
			{
				inputThousandValue.option(""+j+k+l);
			}
		}
	}


	// load up all textboxes and buttons in the interface
	urlinp = createInput();
	urlinp.position(10,40);
	urlinp.size(300,25);
	urlinp.hide();  
	submitbutton = createButton('submit');
	submitbutton.position(400, 105);
	submitbutton.mousePressed(pullData);
	submitbutton.hide();
	
	if (testing == true)
	{
		wholehyperlink = "https://docs.google.com/spreadsheets/d/1w91u_8WrA5H9lMTeS-UN19wvd8SAbHjXgbhIW4XrDWU/edit#gid=282760394";
		
		
		startID = wholehyperlink.search("spreadsheets/d/");
		spreadsheetID = wholehyperlink.substring(startID+15,startID+65);
		spreadsheetID = spreadsheetID.substring(0,spreadsheetID.indexOf("/"));
	
		startID = wholehyperlink.search("gid=");
		sheetID = wholehyperlink.substring(startID+4,wholehyperlink.length);


		// update notes: https://docs.google.com/spreadsheets/d/{SHEETID}/gviz/tq?sheet={SHEET NAME}&tq=SELECT*
//		var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1CGxETFmlqy4lYYhtWcIMd7COtW9MR11EN0YI47XcvCk/gviz/tq?sheet=Grade6&tq=SELECT*');
		var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade6'+'&tq=SELECT*');

		query.send(handleQueryResponse);
	}
}

function draw(){

	if (testing == true && dataSubmitted == true)
	{
		urlinp.hide();
		submitbutton.hide();
	}
	
	if (dataSubmitted == true)
	{
		if (eventUse == "ribbons")
		{
			showRibbonData();
		}
		else if (eventUse == "shotput")
		{
			showEventData(0);
		}
		else if (eventUse == "input")
		{
			showInputDataInterface();
		}
		else if (eventUse == "long jump")
		{
			showEventData(1);
		}
		else if (eventUse == "discus")
		{
			showEventData(2);
		}
		else if (eventUse == "100m")
		{
			showEventData(3);
		}
		else if (eventUse == "200m")
		{
			showEventData(4);
		}
		else if (eventUse == "400m")
		{
			showEventData(5);
		}
		else if (eventUse == "event menu")
		{
			background(0,0,0);
			showEventMenu();
		}
		else if (eventUse == "housedata")
		{
			showHouseData();
		}
		else if (eventUse == "warning")
		{
			warnDataLoss();
		}
		else if (eventUse == "gradeChamp")
		{
			showGradeChamp();
		}


		if (httpSendRequestArray.length > 0)
			handleAcknowledgement();
			
		if (medalSendRequestArray.length > 0)
			handleMedalAcknowledgement();

//			fill(255,255,255);
//			text(eventRows[showEvent],800,10);
	}
	else
	{
		background(0,0,0);
		fill(0,0,0);
	}
}

function showGradeChamp()
{
	background(0,0,0);
	
	drawGradeChampButtons();
	
		// show data
	col1 = 25;
	col2 = 160;
	col3 = 230;
	col4 = 300;
	col5 = 390;
	col6 = 460;

	fill(255,255,255);
	moreH = 125;
	var addHeight = 50;

	text("Name",col1+moreH,startGapSize);
	text("Points",col2+moreH+3,startGapSize);
	text("Student ID",col3+moreH,startGapSize);
	text("House",col4+moreH,startGapSize);
	text("Gender",col5+moreH,startGapSize);
//	text("Place",col6+moreH,startGapSize);	

	textSize(25);

	text("Grade Champions - Grade "+currentGrade,300,40);

	textSize(12);
	
	
	for (var i = 0; i < uniquenames.length; i++)
	{
			// unique arrays 0 - grade 9
		text(uniquenames[i],col1+moreH,(i+1)*continuousGapSize+startGapSize);
		text(uniquepoints[i],col2+moreH+5,(i+1)*continuousGapSize+startGapSize);
		text(uniqueid[i],col3+moreH,(i+1)*continuousGapSize+startGapSize);
		text(uniquehouse[i],col4+moreH,(i+1)*continuousGapSize+startGapSize);
		text(uniquegender[i],col5+moreH,(i+1)*continuousGapSize+startGapSize);
	}
}

// Create buttons from grades 6 - 12
// handle what happens when you click on buttons
function drawGradeChampButtons()
{
	var buttonGap = 60;
	strokeWeight(0);
	// ---------------------- IF Grade level button is pressed --------------------
	for (var b = 0; b < 7; b++)
	{
		if (currentGrade-6 == b)
		{
			fill(0,255,0);		
		}
		else
		{
			fill(255,255,255);
		}
		rect(10,10+buttonGap*(b+1),100,50);
		fill(0,0,0);
		text("Grade "+(b+6),34,39+buttonGap*(b+1));
		

		if ((touchIsDown || mouseIsPressed) && !lock && mouseX > 10 && mouseX < 10+100 &&
			mouseY > 10+buttonGap*(b+1) && mouseY < 10+buttonGap*(b+1)+50)
		{	
			// check if they really want to leave as data sent has not been updated yet
			// WARNING POSSIBLE DATA LOSS
			if (httpSendRequestArray.length > 0 || medalSendRequestArray.length > 0)
			{
				previousEvent = eventUse;
				previousGrade = currentGrade;
				currentGrade = b+6;
				eventUse = "warning";	
				lock = true;		
			}
			else
			{
				currentGrade = b+6;
				var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade'+currentGrade+'&tq=SELECT*');
console.log("Requestion Grade Champ data");
				query.send(handleGradeChampionQueryResponse);
				buttonIsSetup = false;
				lock = true;
			}
		}
	}
	
	
	// ---------------------- IF Other event level button is pressed --------------------
	fill(141,252,255);
	rect(10,10,100,50);
	fill(0,0,0);
	text("Other Events",26,39);
	
	if ((mouseIsPressed || touchIsDown) && !lock && mouseX > 10 && mouseX < 10+100 &&
		mouseY > 10 && mouseY < 10+50)
	{
		// check if they really want to leave as data sent has not been updated yet
		// WARNING POSSIBLE DATA LOSS
		if (httpSendRequestArray.length > 0 || medalSendRequestArray.length > 0)
		{
			previousEvent = eventUse;
			previousGrade = currentGrade;
			currentGrade = b+6;
			eventUse = "warning";	
			lock = true;		
		}
		else
		{
			eventUse = "event menu";
			lock = true;
		}
	}

	// ---------------------- IF Other event level button is pressed --------------------
	if (eventUse == "shotput" || eventUse == "long jump" || eventUse == "discus" ||
		eventUse == "100m" || eventUse == "200m" || eventUse == "400m")
	{	

		fill(118,247,235);
		rect(470,15,70,30);
		fill(0,0,0);
		text("Boys",492,35);
		
		fill(246,141,236);
		rect(470+70,15,70,30);
		fill(0,0,0);
		text("Girls",492+70,35);
		
		if (boyOrGirl == "Boys")
		{
			// Boys ring
			noFill();
			strokeWeight(5);
			stroke(43,78,220);
			rect(470,15,70,30);
			strokeWeight(0);
		}
		else if (boyOrGirl == "Girls")
		{
			// Girls ring
			noFill();
			strokeWeight(5);
			stroke(175,35,203);
			rect(470+70,15,70,30);
			strokeWeight(0);
		}

					
		
		if ((mouseIsPressed || touchIsDown) && !lock && mouseX > 470 && mouseX < 470+70 && 
		    mouseY > 15 && mouseY < 15+30)
		{
			// check if they really want to leave as data sent has not been updated yet
			// WARNING POSSIBLE DATA LOSS
			if (httpSendRequestArray.length > 0)
			{
				previousEvent = eventUse;
				previousGrade = currentGrade;
				eventUse = "warning";	
				lock = true;		
			}
			else
			{
				var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade'+currentGrade+'&tq=SELECT*');

				query.send(handleQueryResponse);
				buttonIsSetup = false;
				lock = true;
				boyOrGirl = "Boys";

			}


		}
		if ((mouseIsPressed || touchIsDown) && !lock && mouseX > 540 && mouseX < 540+70 && 
		    mouseY > 15 && mouseY < 15+30)
		{
			// check if they really want to leave as data sent has not been updated yet
			// WARNING POSSIBLE DATA LOSS
			if (httpSendRequestArray.length > 0)
			{
				previousEvent = eventUse;
				previousGrade = currentGrade;
				eventUse = "warning";	
				lock = true;		
			}
			else
			{
				var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade'+currentGrade+'&tq=SELECT*');

				query.send(handleQueryResponse);
				buttonIsSetup = false;
				lock = true;
				boyOrGirl = "Girls";

			}
		}

		

	}
	strokeWeight(0);

}

function findGradeChampion(gradelevel)
{
	// bubblesort ID first
	i = 0;
	

	while (i < sheetdata[gradelevel].length)
	{
		j = 0;
		while (j < sheetdata[gradelevel].length-1)
		{
			if (isNaN(parseInt(sheetdata[gradelevel][j+1][1])) || 
				parseInt(sheetdata[gradelevel][j][1]) < parseInt(sheetdata[gradelevel][j+1][1])
			    )
			    
			{
				temp = sheetdata[gradelevel][j];
				sheetdata[gradelevel][j] = sheetdata[gradelevel][j+1];
				sheetdata[gradelevel][j+1] = temp;
			}
			j++;
		}
		i++;
	}	
	

//	text("The following are the grade level champions",25,50);

	// add all unique names into point total
	
	
	i = 0;
	count = 0;
	total = 0;

	while(i < sheetdata[gradelevel].length-1)
	{
		previous = sheetdata[gradelevel][i][1];
		current = sheetdata[gradelevel][i+1][1];


		if (isNaN(parseInt(sheetdata[gradelevel][i][7])) == false)
		{
			total = total + parseInt(sheetdata[gradelevel][i][7]);
		}
		if(parseInt(current) != parseInt(previous))
		{
			// unique arrays 0 - grade 9
			uniquenames[gradelevel][count] = sheetdata[gradelevel][i][0];
			uniquepoints[gradelevel][count] = total;
			uniquegender[gradelevel][count] = sheetdata[gradelevel][i][4];
			uniquehouse[gradelevel][count] = sheetdata[gradelevel][i][2];
			uniqueid[gradelevel][count] = sheetdata[gradelevel][i][1];


			total = 0;
			count++;
		}
		i = i + 1;
	}
	
	// bubblesort
	

	i = 0;
	while (i < uniquepoints[gradelevel].length)
	{
		j = 0;
		while (j < uniquepoints[gradelevel].length-1)
		{
			if (uniquepoints[gradelevel][j] < uniquepoints[gradelevel][j+1])
			{
				temp = uniquepoints[gradelevel][j];
				uniquepoints[gradelevel][j] = uniquepoints[gradelevel][j+1];
				uniquepoints[gradelevel][j+1] = temp;

				temp = uniquenames[gradelevel][j];
				uniquenames[gradelevel][j] = uniquenames[gradelevel][j+1];
				uniquenames[gradelevel][j+1] = temp;

				temp = uniquegender[gradelevel][j];
				uniquegender[gradelevel][j] = uniquegender[gradelevel][j+1];
				uniquegender[gradelevel][j+1] = temp;

				temp = uniquehouse[gradelevel][j];
				uniquehouse[gradelevel][j] = uniquehouse[gradelevel][j+1];
				uniquehouse[gradelevel][j+1] = temp;

				temp = uniqueid[gradelevel][j];
				uniqueid[gradelevel][j] = uniqueid[gradelevel][j+1];
				uniqueid[gradelevel][j+1] = temp;
			}
			j=j+1;
		}
		i=i+1;
	}

}


function warnDataLoss()
{
//	background(0,0,0);
	fill(0,0,0,50);
	rect(-1,-1,1053,1505);
	
	textSize(25);
	fill(255,255,255);
	text("WARNING - not all data has been successfully submitted. ",100,50);
	text("Do you wish to continue?",100,80);
	textSize(15);

	fill(255,50,50);	
	rect(100,100,100,50);
	fill(0,0,0);
	text("YES",135,130);

	fill(25,255,25);	
	rect(220,100,100,50);
	fill(0,0,0);
	text("CANCEL",242,130);

	if ((mouseIsPressed || touchIsDown) && !lock && mouseX > 100 && mouseX < 100+100 &&
		mouseY > 100 && mouseY < 100+50)
	{
		// remove all requests
		while (httpSendRequestArray.length > 0)
			httpSendRequestArray.pop();
	
		var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade'+currentGrade+'&tq=SELECT*');


		query.send(handleQueryResponse);
		eventUse = previousEvent;
		buttonIsSetup = false;
		lock = true;

	}
	if ((mouseIsPressed || touchIsDown) && !lock && mouseX > 220 && mouseX < 220+100 &&
		mouseY > 100 && mouseY < 100+50)
	{
		currentGrade = previousGrade;
		eventUse = previousEvent;	
		lock = true;	
	}
}

function showHouseData()
{
	background(0,0,0);
	
	showEventMenu();
	
	textSize(25);
	fill(255,255,255);
	text("House Data",300,40);

	textSize(12);
	// show data
	col1 = 120;
	col2 = 220;
	col3 = 320;


	fill(255,255,255);
	moreH = 155;
	
	textSize(16);
	text("Dragons",col1+moreH,startGapSize);
	text("Phoenix",col2+moreH,startGapSize);
	text("Tigers",col3+moreH,startGapSize);


	// show data
	for (var r = 0; r < houseRows-1; r++)
	{
		hoverOverGapSize = 7;
		// highlight where the mouse hovering over with a green background
		if (mouseY > (r)*continuousGapSize+startGapSize+hoverOverGapSize && 
		    mouseY < (r+1)*continuousGapSize+startGapSize+hoverOverGapSize && mouseX > 160 && mouseX < 160+370)
		{
			fill(0,255,50);
			rect(160,(r)*continuousGapSize+startGapSize+hoverOverGapSize,370,25);
			fill(0,0,0);
		}
		else
		{
			fill(255,255,255);
		}

		// populate data
		for (var c = 0; c < 3; c++)
		{
			text(housedata[r][c],c*100+moreH+130,(r+1)*continuousGapSize+startGapSize);
		}
		if (r < houseRows-2)
			text("Grade"+(r+6),col3-150,(r+1)*continuousGapSize+startGapSize);
		if (r == houseRows-2)
			text("Total",col3-150,(r+1)*continuousGapSize+startGapSize);
	}
	textSize(12);
}

function showEventMenu()
{
	buttonGap = 60;
	strokeWeight(0);

	// ------------- IF ribbon button is pressed setup -------------	
	if (eventUse == "ribbons")
	{
		fill(255,255,0);
	}
	else
	{
		fill(255,255,255);	
	}
	
	rect(10,10+buttonGap*1,100,50);
	fill(0,0,0);
	text("Medalists",34,39+buttonGap*1);


	if ((mouseIsPressed || touchIsDown) && !lock && mouseX > 10 && mouseX < 10+100 &&
		mouseY > 10+buttonGap*1 && mouseY < 10+buttonGap*1+50)
	{
		eventUse = "ribbons";
		var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade'+currentGrade+'&tq=SELECT*');
		query.send(handleQueryResponse);
		lock = true;
	}


	// ------------- IF shotput button is pressed setup -------------	
	if (eventUse == "shotput")
	{
		fill(255,255,0);
	}
	else
	{
		fill(255,255,255);	
	}
	
	rect(10,10+buttonGap*2,100,50);
	fill(0,0,0);
	text("Shot Putt",34,39+buttonGap*2);


	if ((mouseIsPressed || touchIsDown) && !lock && mouseX > 10 && mouseX < 10+100 &&
		mouseY > 10+buttonGap*2 && mouseY < 10+buttonGap*2+50)
	{
		eventUse = "shotput";
		eventID = 0;
		var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade'+currentGrade+'&tq=SELECT*');
		query.send(handleQueryResponse);
		lock = true;
	}


	// ------------- IF long jump button is pressed setup -------------	
	if (eventUse == "long jump")
	{
		fill(255,255,0);
	}
	else
	{
		fill(255,255,255);	
	}
	
	rect(10,10+buttonGap*3,100,50);
	fill(0,0,0);
	text("Long Jump",34,39+buttonGap*3);


	if ((mouseIsPressed || touchIsDown) && !lock && mouseX > 10 && mouseX < 10+100 &&
		mouseY > 10+buttonGap*3 && mouseY < 10+buttonGap*3+50)
	{
		eventUse = "long jump";
		eventID = 1;
		var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade'+currentGrade+'&tq=SELECT*');
		query.send(handleQueryResponse);
		lock = true;
	}


	// ------------- IF discus button is pressed setup -------------	
	
	if (eventUse == "discus")
	{
		fill(255,255,0);
	}
	else
	{
		fill(255,255,255);	
	}
	
	rect(10,10+buttonGap*4,100,50);
	fill(0,0,0);
	text("Discus",34,39+buttonGap*4);


	if ((mouseIsPressed || touchIsDown) && !lock && mouseX > 10 && mouseX < 10+100 &&
		mouseY > 10+buttonGap*4 && mouseY < 10+buttonGap*4+50)
	{
		eventUse = "discus";
		eventID = 2;
		var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade'+currentGrade+'&tq=SELECT*');
		query.send(handleQueryResponse);
		lock = true;
	}


	// ------------- IF 100m button is pressed setup -------------	
	
	if (eventUse == "100m")
	{
		fill(255,255,0);
	}
	else
	{
		fill(255,255,255);	
	}
	
	rect(10,10+buttonGap*5,100,50);
	fill(0,0,0);
	text("100m",34,39+buttonGap*5);


	if ((mouseIsPressed || touchIsDown) && !lock && mouseX > 10 && mouseX < 10+100 &&
		mouseY > 10+buttonGap*5 && mouseY < 10+buttonGap*5+50)
	{
		eventUse = "100m";
		eventID = 3;
		var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade'+currentGrade+'&tq=SELECT*');
		query.send(handleQueryResponse);
		
		lock = true;
	}


	// ------------- IF 200m button is pressed setup -------------	
	
	if (eventUse == "200m")
	{
		fill(255,255,0);
	}
	else
	{
		fill(255,255,255);	
	}
	
	rect(10,10+buttonGap*6,100,50);
	fill(0,0,0);
	text("200m",34,39+buttonGap*6);


	if ((mouseIsPressed || touchIsDown) && !lock && mouseX > 10 && mouseX < 10+100 &&
		mouseY > 10+buttonGap*6 && mouseY < 10+buttonGap*6+50)
	{
		eventUse = "200m";
		eventID = 4;
		var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade'+currentGrade+'&tq=SELECT*');
		query.send(handleQueryResponse);
		lock = true;
	}


	// ------------- IF 400m button is pressed setup -------------	
	
	if (eventUse == "400m")
	{
		fill(255,255,0);
	}
	else
	{
		fill(255,255,255);	
	}
	
	rect(10,10+buttonGap*7,100,50);
	fill(0,0,0);
	text("400m",34,39+buttonGap*7);


	if ((mouseIsPressed || touchIsDown) && !lock && mouseX > 10 && mouseX < 10+100 &&
		mouseY > 10+buttonGap*7 && mouseY < 10+buttonGap*7+50)
	{
		eventUse = "400m";
		eventID = 5;
		var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade'+currentGrade+'&tq=SELECT*');
		query.send(handleQueryResponse);
		lock = true;
	}
	
	// ------------- IF house data button is pressed setup -------------	
	
	if (eventUse == "housedata")
	{
		fill(255,255,0);
	}
	else
	{
		fill(255,255,255);	
	}
	
	rect(10,10+buttonGap*8,100,50);
	fill(0,0,0);
	text("House Points",25,39+buttonGap*8);


	if ((mouseIsPressed || touchIsDown) && !lock && mouseX > 10 && mouseX < 10+100 &&
		mouseY > 10+buttonGap*8 && mouseY < 10+buttonGap*8+50)
	{
		eventUse = "housedata";
		pullHouseData();
		lock = true;
	}


	// ------------- IF grade champion button is pressed setup -------------	
	
	if (eventUse == "gradeChamp")
	{
		fill(255,255,0);
	}
	else
	{
		fill(255,255,255);	
	}
	
	rect(10,10+buttonGap*9,100,50);
	fill(0,0,0);
	text("Grade Champion",25-10,39+buttonGap*9);


	if ((mouseIsPressed || touchIsDown) && !lock && mouseX > 10 && mouseX < 10+100 &&
		mouseY > 10+buttonGap*9 && mouseY < 10+buttonGap*9+50)
	{
		eventUse = "gradeChamp";
		pullGradeChampionData();
		lock = true;
	}

	// ------------- IF Other Event button is pressed setup -------------	
	fill(141,252,255);
	rect(10,10,100,50);
	fill(0,0,0);
	text("Other Events",26,39);
	
	if ((mouseIsPressed || touchIsDown) && !lock && mouseX > 10 && mouseX < 10+100 &&
		mouseY > 10 && mouseY < 10+50)
	{
		eventUse = "event menu";
		lock = true;
	}
}

function showInputDataInterface()
{
	background(0,0,0);
	strokeWeight(0);
	var y = 50;
	
	// show name
	textSize(25);
	fill(255,255,255);
	text(eventData[eventID][currentStudentIndex][0],300,(currentStudentIndex+1)*continuousGapSize+startGapSize-50+y);
	
	
	// show dropdown data interface
	fill(255,255,255);
	if (eventID >= 0 && eventID <= 2)
	{
		text("m",370,(currentStudentIndex+1)*continuousGapSize+startGapSize+2+y);
		text("cm",475,(currentStudentIndex+1)*continuousGapSize+startGapSize+2+y);
	}
	else if (eventID >= 3 && eventID <= 5)
	{
		text("s",370,(currentStudentIndex+1)*continuousGapSize+startGapSize+2+y);
		text("ms",475,(currentStudentIndex+1)*continuousGapSize+startGapSize+2+y);	
	}
	
	
	
	
	if (shotputIsSetup == false)
	{

		var d = "00";
		var dt = "000";
		var w = 0;
		if (eventData[eventID][currentStudentIndex][10] != 0)
		{
			if (eventData[eventID][currentStudentIndex][10].toString().indexOf('.') == -1)
			{
				w = eventData[eventID][currentStudentIndex][10].toString();
				d = "00";
				dt = "000";
			}
			else
			{
				w = eventData[eventID][currentStudentIndex][10].toString().substr(0,eventData[eventID][currentStudentIndex][10].toString().indexOf('.'));			
				d = eventData[eventID][currentStudentIndex][10].toString().substr(eventData[eventID][currentStudentIndex][10].toString().indexOf('.')+1,eventData[eventID][currentStudentIndex][10].toString().length);
				dt = eventData[eventID][currentStudentIndex][10].toString().substr(eventData[eventID][currentStudentIndex][10].toString().indexOf('.')+1,eventData[eventID][currentStudentIndex][10].toString().length);
				
				if (eventData[eventID][currentStudentIndex][10].toString().substr(eventData[eventID][currentStudentIndex][10].toString().indexOf('.')+1,eventData[eventID][currentStudentIndex][10].toString().length).length == 1)
				{
					d += "0";
					dt += "00";
				}
				if (eventData[eventID][currentStudentIndex][10].toString().substr(eventData[eventID][currentStudentIndex][10].toString().indexOf('.')+1,eventData[eventID][currentStudentIndex][10].toString().length).length == 2)
				{
					dt += "0";
				}
			}
		}

	
	
		inputWholeValue.value(w);
		inputHundredValue.value(d);
		inputThousandValue.value(dt);
		

	
//		text("m value: "+w,475,(currentStudentIndex+1)*continuousGapSize+startGapSize+2+50+y);
//		text("mm value: "+d,475,(currentStudentIndex+1)*continuousGapSize+startGapSize+2+100+y);

	
		inputWholeValue.position(305,(currentStudentIndex+1)*continuousGapSize+startGapSize-20+y);
		inputWholeValue.show();
		inputWholeValue.style("font-size", "14px");
		inputWholeValue.size(60,30);
		
		if (eventID >= 0 && eventID <= 2)
		{
			inputHundredValue.position(410,(currentStudentIndex+1)*continuousGapSize+startGapSize-20+y);
			inputHundredValue.show();
			inputHundredValue.style("font-size", "14px");
			inputHundredValue.size(60,30);
		}
		else if (eventID >= 3 && eventID <= 5)
		{
			inputThousandValue.position(410,(currentStudentIndex+1)*continuousGapSize+startGapSize-20+y);
			inputThousandValue.show();
			inputThousandValue.style("font-size", "14px");
			inputThousandValue.size(60,30);
		}		
		shotputIsSetup = true;
	}
	
	var f;

	
	if (eventID >= 0 && eventID <= 2)
		f = inputWholeValue.value()+"."+inputHundredValue.value();
	else if (eventID >= 3 && eventID <= 5)
		f = inputWholeValue.value()+"."+inputThousandValue.value();

//	console.log("f"+f);
	
//	text("final value: "+f,475,(currentStudentIndex+1)*continuousGapSize+startGapSize+2+150+y);
	
	// show done button
	textSize(14);
	fill(255,255,0);
	rect(545,(currentStudentIndex+1)*continuousGapSize+startGapSize-20+y,100,30);
	fill(0,0,0);
	text("Done",575,(currentStudentIndex+1)*continuousGapSize+startGapSize+y);
	

	if ((mouseIsPressed || touchIsDown) && !lock && mouseX > 545 && mouseX < 545+100 && mouseY > (currentStudentIndex+1)*continuousGapSize+startGapSize-20+y && mouseY < (currentStudentIndex+1)*continuousGapSize+startGapSize-20+50+y)
	{
		if (eventID == 0)
			eventUse = "shotput";
		else if (eventID == 1)
			eventUse = "long jump";
		else if (eventID == 2)
			eventUse = "discus";
		else if (eventID == 3)
			eventUse = "100m";
		else if (eventID == 4)
			eventUse = "200m";
		else if (eventID == 5)
			eventUse = "400m";


			
		lock = true;
		inputWholeValue.hide();
		inputHundredValue.hide();
		inputThousandValue.hide();
		eventData[eventID][currentStudentIndex][10] = f;
		shotputIsSetup = false;
		updateFinishingPlacement();
		sendShotputData(f);
	}
}

function updateFinishingPlacement()
{

	
	// this is an array of the top 8
	// a 2D array is required [finishing position][all occurrences]
	// finishing position 0 is 1, 7 is 8
	// all occurrences in case there are duplicate winners 
	var topEight = [[]];
	
	topEight = new Array(8);
	
//console.log("Finding Top 8");
	// find all the top 8 
	// 
	var nextHighestValue = -1;
	for (var g = 0; g < topEight.length; g++)
	{
		topEight[g] = new Array(0);

		if (eventID >= 0 && eventID <= 2)
		{		
			// look for higher values
			for (var h = 0; h < eventRows[eventID]; h++)
			{
	//		console.log(""+eventData[eventID][h][4]+"vs"+boyOrGirl+"="+(eventData[eventID][h][4] == boyOrGirl));
				if (g > 0 && topEight[g-1][0] > 0 && eventData[eventID][h][4] == boyOrGirl)
				{
					nextHighestValue = topEight[g-1][0];
					if (parseFloat(eventData[eventID][h][10]) > 0 && topEight[g].length == 0 && parseFloat(eventData[eventID][h][10]) < nextHighestValue)
					{
						topEight[g].push(eventData[eventID][h][10]);
					}
					else if (topEight[g].length > 0 && parseFloat(eventData[eventID][h][10]) > parseFloat(topEight[g][0])  && parseFloat(eventData[eventID][h][10]) < nextHighestValue)
					{
						while (topEight[g].length > 0)
							topEight[g].pop();
				
						topEight[g].push(eventData[eventID][h][10]);
					}
					else if (topEight[g].length > 0 && parseFloat(eventData[eventID][h][10]) == parseFloat(topEight[g][0]) && parseFloat(eventData[eventID][h][10]) < nextHighestValue)
					{
						topEight[g].push(eventData[eventID][h][10]);
					}
				} // if g > 0
				else if (g == 0 && eventData[eventID][h][4] == boyOrGirl)
				{
					if (parseFloat(eventData[eventID][h][10]) > 0 && topEight[0].length == 0)
					{
						topEight[0].push(eventData[eventID][h][10]);
					}
					else if (topEight[0].length > 0 && parseFloat(eventData[eventID][h][10]) > parseFloat(topEight[0][0]))
					{
						while (topEight[0].length > 0)
							topEight[0].pop();
				
						topEight[0].push(eventData[eventID][h][10]);
					}
					else if (topEight[0].length > 0 && parseFloat(eventData[eventID][h][10]) == parseFloat(topEight[0][0]))
					{
						topEight[0].push(eventData[eventID][h][10]);
					}
				}

			} // for look for higher values
		} // if looking for lowest values
		if (eventID >= 3 && eventID <= 5)
		{		
			// look for higher values
			for (var h = 0; h < eventRows[eventID]; h++)
			{
				// filter for non-zero values only
				if (parseFloat(eventData[eventID][h][10]) > 0)
				{
		//		console.log(""+eventData[eventID][h][4]+"vs"+boyOrGirl+"="+(eventData[eventID][h][4] == boyOrGirl));
					if (g > 0 && topEight[g-1][0] > 0 && eventData[eventID][h][4] == boyOrGirl)
					{
						nextHighestValue = topEight[g-1][0];
						if (parseFloat(eventData[eventID][h][10]) > 0 && topEight[g].length == 0 && parseFloat(eventData[eventID][h][10]) > nextHighestValue)
						{
							topEight[g].push(eventData[eventID][h][10]);
						}
						else if (topEight[g].length > 0 && parseFloat(eventData[eventID][h][10]) < parseFloat(topEight[g][0])  && parseFloat(eventData[eventID][h][10]) > nextHighestValue)
						{
							while (topEight[g].length > 0)
								topEight[g].pop();
				
							topEight[g].push(eventData[eventID][h][10]);
						}
						else if (topEight[g].length > 0 && parseFloat(eventData[eventID][h][10]) == parseFloat(topEight[g][0]) && parseFloat(eventData[eventID][h][10]) > nextHighestValue)
						{
							topEight[g].push(eventData[eventID][h][10]);
						}
					} // if g > 0
					else if (g == 0 && eventData[eventID][h][4] == boyOrGirl)
					{
						if (parseFloat(eventData[eventID][h][10]) > 0 && topEight[0].length == 0)
						{
							topEight[0].push(eventData[eventID][h][10]);
//	console.log("Storing first value");
						}
						else if (topEight[0].length > 0 && parseFloat(eventData[eventID][h][10]) < parseFloat(topEight[0][0]))
						{
							while (topEight[0].length > 0)
								topEight[0].pop();
				
							topEight[0].push(eventData[eventID][h][10]);
//	console.log("next smallest value found! "+eventData[eventID][h][10]);
						}
						else if (topEight[0].length > 0 && parseFloat(eventData[eventID][h][10]) == parseFloat(topEight[0][0]))
						{
							topEight[0].push(eventData[eventID][h][10]);
						}
					}
				} // if not zero values
			} // for look for lower values
		} // if looking for lowest values
	}
	
	
	for (var h = 0; h < eventRows[eventID]; h++)
	{
		localEventData[eventID][h][3] = "";
	}	

	// if looking for highest values from 1 - 8
	if (eventID >= 0 && eventID <= 2)
	{
		for (var g = 0; g < topEight.length; g++)
		{
			if (topEight[g][0] != null && topEight[g][0] > 0)
			{
				for (var h = 0; h < eventRows[eventID]; h++)
				{


					if (topEight[g][0] == eventData[eventID][h][10])
					{
	//console.log("Storing into localEventData "+topEight[g][0]+"   "+(g+1));
						fill(255,255,255);
						localEventData[eventID][h][2] = topEight[g][0];
						localEventData[eventID][h][3] = (g+1);
						localEventData[eventID][h][4] = true;
					}
					fill(255,255,255);
				}		
			}
		}
	} // if looking for highest place value

//console.log("topEight length "+topEight.length);
//console.log("eventID "+eventID);

	
		// if looking for highest values from 1 - 8
	if (eventID >= 3 && eventID <= 5)
	{
		for (var g = 0; g < topEight.length; g++)
		{
		
//console.log("topEight data "+topEight[g][0]+"   "+(g+1));
		
			if (topEight[g][0] != null && topEight[g][0] > 0)
			{
				for (var h = 0; h < eventRows[eventID]; h++)
				{


					if (topEight[g][0] == eventData[eventID][h][10])
					{

						fill(255,255,255);
						localEventData[eventID][h][2] = topEight[g][0];
						localEventData[eventID][h][3] = (g+1);
						localEventData[eventID][h][4] = true;
					}
					fill(255,255,255);
				}		
			}
		}
	}

	
	
	
	// show place
//		if (localEventData[showEvent][r][0] != null)
//			text(localEventData[showEvent][r][3],col6+moreH,(r+1)*continuousGapSize+startGapSize);

}

function sendShotputData(newShotputtData)
{
	// submit current data regardless
	// start - submit the data back to the spreadsheet
	formData = new FormData();
	
	localEventData[eventID][currentStudentIndex][2]=newShotputtData;
	
	formData.append("Sheet Name","Grade"+currentGrade);
	formData.append("Student ID",eventData[eventID][currentStudentIndex][1]);
	formData.append("Event",eventData[eventID][currentStudentIndex][3]);
//	formData.append("Data",eventData[eventID][currentStudentIndex][10]);
	formData.append("Data",newShotputtData);

	if (eventID == 0)
		formData.append("UpdateEvent","shotputt");
	else if (eventID == 1)
		formData.append("UpdateEvent","long jump");
	else if (eventID == 2)
		formData.append("UpdateEvent","discus");
	else if (eventID == 3)
		formData.append("UpdateEvent","100m");
	else if (eventID == 4)
		formData.append("UpdateEvent","200m");
	else if (eventID == 5)
		formData.append("UpdateEvent","400m");
		
		
	formData.append("Finish Position",localEventData[eventID][currentStudentIndex][3]);


	var request = new XMLHttpRequest();
	
	var httpSendRequestArray2 = new Array(8);
	
	
	httpSendRequestArray.push(httpSendRequestArray2);
	
	httpSendRequestArray[httpSendRequestArray.length-1][0] = request;
	httpSendRequestArray[httpSendRequestArray.length-1][1] = currentStudentIndex;

	// append the rest of form data this was done in reverse order
	httpSendRequestArray[httpSendRequestArray.length-1][2] = localEventData[eventID][currentStudentIndex][3];
	
	if (eventID == 0)
		httpSendRequestArray[httpSendRequestArray.length-1][3] = "shotputt";
	else if (eventID == 1)
		httpSendRequestArray[httpSendRequestArray.length-1][3] = "long jump";
	else if (eventID == 2)
		httpSendRequestArray[httpSendRequestArray.length-1][3] = "discus";
	else if (eventID == 3)
		httpSendRequestArray[httpSendRequestArray.length-1][3] = "100m";
	else if (eventID == 4)
		httpSendRequestArray[httpSendRequestArray.length-1][3] = "200m";
	else if (eventID == 5)
		httpSendRequestArray[httpSendRequestArray.length-1][3] = "400m";
	
	
	httpSendRequestArray[httpSendRequestArray.length-1][4] = newShotputtData;
	httpSendRequestArray[httpSendRequestArray.length-1][5] = eventData[eventID][currentStudentIndex][3];
	httpSendRequestArray[httpSendRequestArray.length-1][6] = eventData[eventID][currentStudentIndex][1];
	httpSendRequestArray[httpSendRequestArray.length-1][7] = currentGrade;



/*
	request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                console.log( request.responseText );
            }
        }
        */

	// MARK - MUST CHANGE 2
	httpSendRequestArray[httpSendRequestArray.length-1][0].open("POST", "https://script.google.com/macros/s/AKfycbw86AFSeNjWCBn6tTmU5OFZn1eA-OGxuW1o7LyVImbL7ehfAL0/exec");
	
	localEventData[eventID][currentStudentIndex][5] = 1;
	

	httpSendRequestArray[httpSendRequestArray.length-1][0].send(formData);
//	request.send(formData);


	// end - submit data back to the spreadsheet	


	// update all other placements
	for (var q = 0; q < eventRows[eventID]; q++)
	{
		if (localEventData[eventID][q][4] == true)
		{
			// start - submit the data back to the spreadsheet
			formData = new FormData();
			formData.append("Sheet Name","Grade"+currentGrade);
			formData.append("Student ID",localEventData[eventID][q][0]);
			formData.append("Event",localEventData[eventID][q][1]);
			formData.append("Data",localEventData[eventID][q][2]);

			if (eventID == 0)
				formData.append("UpdateEvent","shotputt");
			else if (eventID == 1)
				formData.append("UpdateEvent","long jump");
			else if (eventID == 2)
				formData.append("UpdateEvent","discus");
			else if (eventID == 3)
				formData.append("UpdateEvent","100m");
			else if (eventID == 4)
				formData.append("UpdateEvent","200m");
			else if (eventID == 5)
				formData.append("UpdateEvent","400m");
				
				
			formData.append("Finish Position",localEventData[eventID][q][3]);


			var request2 = new XMLHttpRequest();
			
			
			// ---------------- push data onto the sendRequestArray --------------
			var httpSendRequestArray2 = new Array(8);


			httpSendRequestArray.push(httpSendRequestArray2);

			httpSendRequestArray[httpSendRequestArray.length-1][0] = request2;
			httpSendRequestArray[httpSendRequestArray.length-1][1] = q;

			// append the rest of form data this was done in reverse order
			httpSendRequestArray[httpSendRequestArray.length-1][2] = localEventData[eventID][q][3];

			if (eventID == 0)
				httpSendRequestArray[httpSendRequestArray.length-1][3] = "shotputt";
			else if (eventID == 1)
				httpSendRequestArray[httpSendRequestArray.length-1][3] = "long jump";
			else if (eventID == 2)
				httpSendRequestArray[httpSendRequestArray.length-1][3] = "discus";
			else if (eventID == 3)
				httpSendRequestArray[httpSendRequestArray.length-1][3] = "100m";
			else if (eventID == 4)
				httpSendRequestArray[httpSendRequestArray.length-1][3] = "200m";
			else if (eventID == 5)
				httpSendRequestArray[httpSendRequestArray.length-1][3] = "400m";


			httpSendRequestArray[httpSendRequestArray.length-1][4] = localEventData[eventID][q][2];
			httpSendRequestArray[httpSendRequestArray.length-1][5] = localEventData[eventID][q][1];
			httpSendRequestArray[httpSendRequestArray.length-1][6] = localEventData[eventID][q][0];
			httpSendRequestArray[httpSendRequestArray.length-1][7] = currentGrade;
			// ---------------- push data onto the sendRequestArray --------------
			

			// MARK - MUST CHANGE 2
			request2.open("POST", "https://script.google.com/macros/s/AKfycbw86AFSeNjWCBn6tTmU5OFZn1eA-OGxuW1o7LyVImbL7ehfAL0/exec");
			request2.send(formData);
			// end - submit data back to the spreadsheet	
		}
	}
}

function handleAcknowledgement() {
	currentTime = second();
	
	if (abs(previousTime - currentTime) > 3)
	{
		previousTime = currentTime;
		console.log(currentTime); // readyState will be 4

		var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade'+currentGrade+'&tq=SELECT*');
		query.send(handleUpdateQueryResponse);

	}
}

function handleMedalAcknowledgement() {
	currentTime = second();
	
	if (abs(previousTime - currentTime) > 3)
	{
		previousTime = currentTime;
		console.log(currentTime); // readyState will be 4

		var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade'+currentGrade+'&tq=SELECT*');
		query.send(handleMedalUpdateQueryResponse);

	}
}


// Create buttons from grades 6 - 12
// handle what happens when you click on buttons
function drawButtons()
{
	var buttonGap = 60;
	strokeWeight(0);
	// ---------------------- IF Grade level button is pressed --------------------
	for (var b = 0; b < 7; b++)
	{
		if (currentGrade-6 == b)
		{
			fill(0,255,0);		
		}
		else
		{
			fill(255,255,255);
		}
		rect(10,10+buttonGap*(b+1),100,50);
		fill(0,0,0);
		text("Grade "+(b+6),34,39+buttonGap*(b+1));
		

		if ((touchIsDown || mouseIsPressed) && !lock && mouseX > 10 && mouseX < 10+100 &&
			mouseY > 10+buttonGap*(b+1) && mouseY < 10+buttonGap*(b+1)+50)
		{	
			// check if they really want to leave as data sent has not been updated yet
			// WARNING POSSIBLE DATA LOSS
			if (httpSendRequestArray.length > 0 || medalSendRequestArray.length > 0)
			{
				previousEvent = eventUse;
				previousGrade = currentGrade;
				currentGrade = b+6;
				eventUse = "warning";	
				lock = true;		
			}
			else
			{
				currentGrade = b+6;
				var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade'+currentGrade+'&tq=SELECT*');

				query.send(handleQueryResponse);
				buttonIsSetup = false;
				lock = true;
			}
		}
	}
	
	
	// ---------------------- IF Other event level button is pressed --------------------
	fill(141,252,255);
	rect(10,10,100,50);
	fill(0,0,0);
	text("Other Events",26,39);
	
	if ((mouseIsPressed || touchIsDown) && !lock && mouseX > 10 && mouseX < 10+100 &&
		mouseY > 10 && mouseY < 10+50)
	{
		// check if they really want to leave as data sent has not been updated yet
		// WARNING POSSIBLE DATA LOSS
		if (httpSendRequestArray.length > 0 || medalSendRequestArray.length > 0)
		{
			previousEvent = eventUse;
			previousGrade = currentGrade;
			currentGrade = b+6;
			eventUse = "warning";	
			lock = true;		
		}
		else
		{
			eventUse = "event menu";
			lock = true;
		}
	}

	// ---------------------- IF Other event level button is pressed --------------------
	if (eventUse == "shotput" || eventUse == "long jump" || eventUse == "discus" ||
		eventUse == "100m" || eventUse == "200m" || eventUse == "400m")
	{	

		fill(118,247,235);
		rect(470,15,70,30);
		fill(0,0,0);
		text("Boys",492,35);
		
		fill(246,141,236);
		rect(470+70,15,70,30);
		fill(0,0,0);
		text("Girls",492+70,35);
		
		if (boyOrGirl == "Boys")
		{
			// Boys ring
			noFill();
			strokeWeight(5);
			stroke(43,78,220);
			rect(470,15,70,30);
			strokeWeight(0);
		}
		else if (boyOrGirl == "Girls")
		{
			// Girls ring
			noFill();
			strokeWeight(5);
			stroke(175,35,203);
			rect(470+70,15,70,30);
			strokeWeight(0);
		}

					
		
		if ((mouseIsPressed || touchIsDown) && !lock && mouseX > 470 && mouseX < 470+70 && 
		    mouseY > 15 && mouseY < 15+30)
		{
			// check if they really want to leave as data sent has not been updated yet
			// WARNING POSSIBLE DATA LOSS
			if (httpSendRequestArray.length > 0)
			{
				previousEvent = eventUse;
				previousGrade = currentGrade;
				eventUse = "warning";	
				lock = true;		
			}
			else
			{
				var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade'+currentGrade+'&tq=SELECT*');

				query.send(handleQueryResponse);
				buttonIsSetup = false;
				lock = true;
				boyOrGirl = "Boys";

			}


		}
		if ((mouseIsPressed || touchIsDown) && !lock && mouseX > 540 && mouseX < 540+70 && 
		    mouseY > 15 && mouseY < 15+30)
		{
			// check if they really want to leave as data sent has not been updated yet
			// WARNING POSSIBLE DATA LOSS
			if (httpSendRequestArray.length > 0)
			{
				previousEvent = eventUse;
				previousGrade = currentGrade;
				eventUse = "warning";	
				lock = true;		
			}
			else
			{
				var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade'+currentGrade+'&tq=SELECT*');

				query.send(handleQueryResponse);
				buttonIsSetup = false;
				lock = true;
				boyOrGirl = "Girls";

			}
		}

		

	}
	strokeWeight(0);

}


function showEventData(showEvent)
{
	background(0,0,0);
	
	// draw button
	drawButtons();

	// show data
	col1 = 25;
	col2 = 170;
	col3 = 230;
	col4 = 300;
	col5 = 390;
	col6 = 460;

	fill(255,255,255);
	moreH = 125;
	var addHeight = 50;

	text("Name",col1+moreH,startGapSize);
	text("Data",col2+moreH+3,startGapSize);
	text("Student ID",col3+moreH,startGapSize);
	text("House",col4+moreH,startGapSize);
	text("Gender",col5+moreH,startGapSize);
	text("Place",col6+moreH,startGapSize);
	
//	text("Event",col6+moreH,startGapSize);

	textSize(25);
	if (showEvent == 0)
		text("Shot Putt",300,40);
	else if (showEvent == 1)
		text("Long Jump",300,40);
	else if (showEvent == 2)
		text("Discus",300,40);
	else if (showEvent == 3)
		text("100m",300,40);
	else if (showEvent == 4)
		text("200m",300,40);
	else if (showEvent == 5)
		text("400m",300,40);

	textSize(12);


/*
	if (showEvent == 0)
		text("Shotputt",col2+moreH,startGapSize);
	else if (showEvent == 1)
		text("Long Jump",col2+moreH,startGapSize);
	else if (showEvent == 2)
		text("Discus",col2+moreH,startGapSize);
	else if (showEvent == 3)
		text("100m",col2+moreH,startGapSize);
	else if (showEvent == 4)
		text("200m",col2+moreH,startGapSize);
	else if (showEvent == 5)
		text("400m",col2+moreH,startGapSize);
*/



	var gold = [];
	var silver = [];
	var bronze = [];
	var medalFloat = new Array(eventRows[showEvent]);


	for (var r = 0; r < eventRows[showEvent]; r++)
	{
	
	
	
		fill(255,255,255);
	
	/*
		for (var sa = 0; sa < sendArray.length; sa++)
		{
			// show if data is being sent or done
			if (localEventData[eventID][r][5] == 1)
				text("Sending Data",col6+moreH+100,(sendArray[sa])*continuousGapSize+startGapSize);
			else if (localEventData[eventID][r][5] == 2)
				text("Successful",col6+moreH+100,(sendArray[sa])*continuousGapSize+startGapSize);
			else if (localEventData[eventID][r][5] == 3)
				text("Failed to send",col6+moreH+100,(sendArray[sa])*continuousGapSize+startGapSize);
		
		}
*/

		// show if data is being sent or done
		if (localEventData[eventID][r][5] == 1)
			text("Sending Data",col6+moreH+100,(r+1)*continuousGapSize+startGapSize);
		else if (localEventData[eventID][r][5] == 2)
			text("Successful Update",col6+moreH+100,(r+1)*continuousGapSize+startGapSize);
		else if (localEventData[eventID][r][5] == 3)
			text("Failed to send",col6+moreH+100,(r+1)*continuousGapSize+startGapSize);

	
		hoverOverGapSize = 8;
		// highlight where the mouse hovering over with a green background
		if (mouseY > (r)*continuousGapSize+startGapSize+hoverOverGapSize && 
		    mouseY < (r+1)*continuousGapSize+startGapSize+hoverOverGapSize && mouseX > 140 && mouseX < 140+470)
		{
			fill(0,255,50);
			rect(140,(r)*continuousGapSize+startGapSize+hoverOverGapSize,500,25);
			fill(0,0,0);
			
			// if mouse is pressed pull up shotputinput interface
			// end the loop and setup currentStudentIndex
			if ((mouseIsPressed || touchIsDown) && !lock && mouseX > 140 && mouseX < 140+200)
			{
				eventUse = "input";
				currentStudentIndex = r;
				lock = true;
				break;
			}
			

		}
		else
		{
			fill(255,255,255);
		}



//console.log("person "+localEventData[showEvent][r][0]);
		// show place
		if (localEventData[showEvent][r][0] != "")
		{
//console.log("r"+r+"    Place "+localEventData[showEvent][r][3]);
			text(localEventData[showEvent][r][3],col6+moreH,(r+1)*continuousGapSize+startGapSize);
			if (localEventData[showEvent][r][3] == 1)
			{
				gold.push(r);
			}
			else if (localEventData[showEvent][r][3] == 2)
			{
				silver.push(r);
//				console.log(eventData[showEvent][r][0]+"  "+localEventData[showEvent][r][3]+" Silver found");
			}
			else if (localEventData[showEvent][r][3] == 3)
			{
				bronze.push(r);
			}
		}

		// populate data
		for (var c = 0; c < maxCols; c++)
		{
			if (c == 0)
			{
				text(eventData[showEvent][r][c],col1+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			if (c == 1)
			{
				text(eventData[showEvent][r][c],col3+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			if (c == 2)
			{
				text(eventData[showEvent][r][c],col4+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			/*
			if (c == 3)
			{
				text(eventData[showEvent][r][c],col5+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			*/
			if (c == 4)
			{
				text(eventData[showEvent][r][c],col5+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			
			if (c == 10)
			{

				// if events are based on highest value being a winner
				if (showEvent >= 0 && showEvent <= 2)
				{
					// place the shot putt, long jump and discus data appropriately			
					if (eventData[showEvent][r][c].toString().length == 4)
						text(eventData[showEvent][r][c],col2+moreH+6,(r+1)*continuousGapSize+startGapSize);
					else
						text(eventData[showEvent][r][c],col2+moreH,(r+1)*continuousGapSize+startGapSize);

				} // if finding the highest value winner


				// if events are based on lowest value being a winner
				if (showEvent >= 3 && showEvent <= 5)
				{
					// place the shot putt, long jump and discus data appropriately			
					if (eventData[showEvent][r][c].toString().length == 4)
						text(eventData[showEvent][r][c],col2+moreH+6,(r+1)*continuousGapSize+startGapSize);
					else
						text(eventData[showEvent][r][c],col2+moreH,(r+1)*continuousGapSize+startGapSize);

				} // if finding the lowest value winner

				
			} // if c > 10
		} // for loop columns
	} // for loop rows


	
	// eliminate medalist when there are duplicates
	// if there are 3 or more gold medalists there should be no others
	if (gold.length >= 3)
	{
		while (silver.length > 0)
			silver.pop();
	
		while (bronze.length > 0)
			bronze.pop()
	}
	// if there are 2 gold medalists then silvers are demoted to bronze
	if (gold.length == 2)
	{
		while (bronze.length > 0)
			bronze.pop();
		while (silver.length > 0)
			bronze.push(silver.pop());
	}
	
	// if two or more silvers then no bronzes
	if (silver.length >= 2)
	{
		while (bronze.length > 0)
			bronze.pop()
	}
	
	
	// show the medalists
	if (bronze.length > 0)
	{
		for (var b = 0; b < bronze.length; b++)
		{
			fill(189,134,39);
			ellipse(333,(bronze[b]+1)*continuousGapSize+startGapSize-4,10,10);
		}
	}
	if (silver.length > 0)
	{
		for (var s = 0; s < silver.length; s++)
		{
			fill(255,255,255);
			ellipse(333,(silver[s]+1)*continuousGapSize+startGapSize-4,10,10);
		}
	}
	if (gold.length > 0)
	{
		for (var g = 0; g < gold.length; g++)
		{
			fill(255,255,1);
			ellipse(333,(gold[g]+1)*continuousGapSize+startGapSize-4,10,10);
		}
	}
//			console.log("***"+localEventData[showEvent][0][3],col6+moreH,(0+1)*continuousGapSize+startGapSize);
}

function showRibbonData()
{
	background(0,0,0);
	
	// draw button
	drawButtons();

	textSize(25);
	fill(255,255,255);
	text("Medalists - Grade "+currentGrade,300,40);

	textSize(12);
	// show data
	col1 = 25;
	col2 = 170;
	col3 = 250;
	col4 = 340;
	col5 = 410;
	col6 = 490;
	col7 = 550;

	fill(255,255,255);
	moreH = 125;
	text("Name",col1+moreH,startGapSize);
	text("Ribbon",col2+moreH,startGapSize);
	text("House",col3+moreH,startGapSize);
	text("Event",col4+moreH,startGapSize);
	text("Gender",col5+moreH,startGapSize);
	text("Place",col6+moreH,startGapSize);
//	text("Ribbon",col7+moreH,startGapSize);


	// send data back to the spreadsheet
	for (var r = 0; r < ribbonRows; r++)
	{
		hoverOverGapSize = 8;
		// highlight where the mouse hovering over with a green background
		if (mouseY > (r)*continuousGapSize+startGapSize+hoverOverGapSize && 
		    mouseY < (r+1)*continuousGapSize+startGapSize+hoverOverGapSize && mouseX > 140 && mouseX < 140+580)
		{
			fill(0,255,50);
			rect(140,(r)*continuousGapSize+startGapSize+hoverOverGapSize,520,25);
			fill(0,0,0);
			
			
			// if you touch on the name then toggle Ribbon data
			if (mouseX > 140 && mouseX < 140+200)
			{
				// if mouse is pressed toggle the status
				if ((mouseIsPressed || touchIsDown) && !lock)
				{
					if (ribbondata[r][8] == 1)
					{
						ribbondata[r][8] = 2;
						lock = true;
					}
					else
					{
						ribbondata[r][8] = 1;
						lock = true;
					}
			
					// start - submit the data back to the spreadsheet
					formData = new FormData();
					formData.append("Sheet Name","Grade"+currentGrade);
					formData.append("Student ID",ribbondata[r][1]);
					formData.append("Event",ribbondata[r][3]);
					formData.append("Data",ribbondata[r][8]);
					formData.append("UpdateEvent","ribbon");

					var request = new XMLHttpRequest();



					// ---------------- push data onto the sendRequestArray --------------
					var medalSendRequestArray2 = new Array(5);


					medalSendRequestArray.push(medalSendRequestArray2);

					medalSendRequestArray[medalSendRequestArray.length-1][0] = "Grade"+currentGrade;
					medalSendRequestArray[medalSendRequestArray.length-1][1] = ribbondata[r][1];
					medalSendRequestArray[medalSendRequestArray.length-1][2] = ribbondata[r][3];
					medalSendRequestArray[medalSendRequestArray.length-1][3] = ribbondata[r][8];
					medalSendRequestArray[medalSendRequestArray.length-1][4] = "ribbon";


					// MARK - MUST CHANGE 2
					request.open("POST", "https://script.google.com/macros/s/AKfycbw86AFSeNjWCBn6tTmU5OFZn1eA-OGxuW1o7LyVImbL7ehfAL0/exec");
					request.send(formData);
					// end - submit data back to the spreadsheet
				}			
				
			} // if you touched name
		}
		else
		{
			fill(255,255,255);
		}

		// populate data
		for (var c = 0; c < maxCols; c++)
		{
			if (c == 0)
			{
				text(ribbondata[r][c],col1+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			/*
			if (c == 1)
			{
				text(ribbondata[r][c],col2+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			*/
			if (c == 2)
			{
				text(ribbondata[r][c],col3+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			if (c == 3)
			{
				text(ribbondata[r][c],col4+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			if (c == 4)
			{
				text(ribbondata[r][c],col5+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			if (c == 5)
			{
				text(ribbondata[r][c],col6+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			if (c == 8)
			{
				if (ribbondata[r][c] == 1)
				{
					text("Earned",col2+moreH,(r+1)*continuousGapSize+startGapSize);
				}
				else if (ribbondata[r][c] == 2)
				{
					text("Given",col2+moreH,(r+1)*continuousGapSize+startGapSize);
				}
			}
		}
	}
	
	if (medalSendRequestArray.length > 0)
		text("Sending updates...",700,100);

}

function checkUniqueMode() {
	if (this.checked()) {
		markUniqueStudent = new Array(maxRows);
		for (var i = 0; i < maxRows; i++)
		{
			markUniqueStudent[i] = 0;
		}
		uniqueOn = true;
		first = true;
		console.log("Checking!");
	}
	else {
		uniqueOn = false;
		first = true;
		console.log("Unchecking!");
	}
}

function mouseReleased()
{
	if (lock == true)
	{
//		pullData();
		lock = false;
	}
}

function touchEnded()
{
	if (lock == true)
	{
//		pullData();
		lock = false;
	}
}