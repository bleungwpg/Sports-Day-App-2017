var singlePrime;
var randomIndex;
var thimble;
var uniqueOn;
var markUniqueStudent;
var currentGrade;
var formData;
var ipad;
var eventUse;
var shotputWholeValue;
var shotputDecimalValue;
//var shotputSubmitData = [];
var maxShotputTextbox;
var shotputIsSetup;
var currentStudentIndex;
var lock = [];
var maxLock;
// lock definition: 0-7: gradebutton, 10-11: event, 30 - ribbon toggle
//                  40 - shotputt interfaceA, 51 - shotputt interfaceB


function setup(){
	//create a drawing service 500px wide, 500px tall
	createCanvas(1053,1505);

	shotputIsSetup = false;
	thimble = false;
	testing = true;
	dataSubmitted = false;
	uniqueOn = false;
	singlePrime = false;
	reset = false;
	first = true;
	once = true;
	currentGrade = 6;
	maxLock = 40;

	
	lock = new Array(maxLock);
	
	for (var j = 0; j < maxLock; j++)
	{
		lock[i] = 0;
	}
	
	eventUse = "ribbons";
	maxShotputTextbox = 200;
	currentStudentIndex = 0;

	var textboxH = 23;
	var textboxHGap = 2;

//	shotputSubmitData = new Array(maxShotputTextbox);
	
	
	// setup selection boxes for input
	shotputWholeValue = createSelect();
	shotputWholeValue.position(10,10);
	shotputWholeValue.hide();

	for (var j = 0; j <= 101; j++)
	{
		shotputWholeValue.option(j);
	}
	

	shotputDecimalValue = createSelect();
	shotputDecimalValue.position(10,10);
	shotputDecimalValue.hide();
	
	for (var j = 0; j < 10; j++)
	{
		for (var k = 0; k < 10; k++)
		{
			shotputDecimalValue.option(""+j+k);
		}
	}
		




	// load up all textboxes and buttons in the interface
	urlinp = createInput();
	urlinp.position(10,40);
	urlinp.size(300,25);  
	submitbutton = createButton('submit');
	submitbutton.position(400, 105);
	submitbutton.mousePressed(pullData);
	
	/*
	checkbox = createCheckbox();
	if (thimble == true)
	{
		checkbox.position(18,92);
	}
	else
	{
		checkbox.position(15,490);
	}
	checkbox.changed(checkUniqueMode);
	checkbox.hide();
	*/

	
	if (testing == true)
	{
		wholehyperlink = "https://docs.google.com/spreadsheets/d/1CGxETFmlqy4lYYhtWcIMd7COtW9MR11EN0YI47XcvCk/edit#gid=1021250630";
		
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
			showShotputData();
		}
		else if (eventUse == "shotputinput")
		{
			showShotputInput();
		}
//			fill(255,255,255);
//			text(shotputRows,800,10);
	}
	else
	{
		background(255,255,255);
		// Prompt to enter your spreadsheet URL
		fill(0,0,0);
		if (thimble == true)
		{
			text("Enter your spreadsheet URL",10,13);
		}
		else
		{
			text("Enter your spreadsheet URL",10,33);
		}

		if (testing == true)
		{
			text("URL: "+wholehyperlink,10,300);
			text("spreadsheetID: "+spreadsheetID,10,325);
			text("sheetID: "+sheetID,10,350);
		}
	}
}

function showShotputInput()
{
	background(0,0,0);
	var y = 50;
	
	// show name
	textSize(25);
	fill(255,255,255);
	text(shotputdata[currentStudentIndex][0],300,(currentStudentIndex+1)*continuousGapSize+startGapSize-50+y);
	
	
	// show dropdown data interface
	fill(255,255,255);
	text("m",370,(currentStudentIndex+1)*continuousGapSize+startGapSize+2+y);
	text("mm",475,(currentStudentIndex+1)*continuousGapSize+startGapSize+2+y);
	
	
	
	
	if (shotputIsSetup == false)
	{
		var d = "00";
		var w = 0;
		if (shotputdata[currentStudentIndex][10] != 0)
		{
			if (shotputdata[currentStudentIndex][10].toString().indexOf('.') == -1)
			{
				w = shotputdata[currentStudentIndex][10].toString();
				d = "00";
			}
			else
			{
				w = shotputdata[currentStudentIndex][10].toString().substr(0,shotputdata[currentStudentIndex][10].toString().indexOf('.'));			
				d = shotputdata[currentStudentIndex][10].toString().substr(shotputdata[currentStudentIndex][10].toString().indexOf('.')+1,shotputdata[currentStudentIndex][10].toString().length);
				if (shotputdata[currentStudentIndex][10].toString().substr(shotputdata[currentStudentIndex][10].toString().indexOf('.')+1,shotputdata[currentStudentIndex][10].toString().length).length == 1)
				{
					d += "0";				
				}
				
			}
		}

	
	
		shotputWholeValue.value(w);
		shotputDecimalValue.value(d);

	
//		text("m value: "+w,475,(currentStudentIndex+1)*continuousGapSize+startGapSize+2+50+y);
//		text("mm value: "+d,475,(currentStudentIndex+1)*continuousGapSize+startGapSize+2+100+y);

	
		shotputWholeValue.position(305,(currentStudentIndex+1)*continuousGapSize+startGapSize-20+y);
		shotputWholeValue.show();
		shotputWholeValue.style("font-size", "14px");
		shotputWholeValue.size(60,30);
		shotputDecimalValue.position(410,(currentStudentIndex+1)*continuousGapSize+startGapSize-20+y);
		shotputDecimalValue.show();
		shotputDecimalValue.style("font-size", "14px");
		shotputDecimalValue.size(60,30);
		
		shotputIsSetup = true;
	}
	
	var f = shotputWholeValue.value()+"."+shotputDecimalValue.value();
	
//	text("final value: "+f,475,(currentStudentIndex+1)*continuousGapSize+startGapSize+2+150+y);
	
	// show done button
	textSize(14);
	fill(255,255,0);
	rect(545,(currentStudentIndex+1)*continuousGapSize+startGapSize-20+y,100,30);
	fill(0,0,0);
	text("Done",575,(currentStudentIndex+1)*continuousGapSize+startGapSize+y);
	

	if ((mouseIsPressed || touchIsDown) && !lock && mouseX > 545 && mouseX < 545+100 && mouseY > (currentStudentIndex+1)*continuousGapSize+startGapSize-20+y && mouseY < (currentStudentIndex+1)*continuousGapSize+startGapSize-20+50+y)
	{
		eventUse = "shotput";
		lock = true;
		shotputWholeValue.hide();
		shotputDecimalValue.hide();
		shotputdata[currentStudentIndex][10] = f;
		shotputIsSetup = false;
		sendShotputData(f);
	}
	

}

function sendShotputData(newShotputtData)
{
	// start - submit the data back to the spreadsheet
	formData = new FormData();
	formData.append("Sheet Name","Grade"+currentGrade);
	formData.append("Student ID",shotputdata[currentStudentIndex][1]);
	formData.append("Event",shotputdata[currentStudentIndex][3]);
//	formData.append("Data",shotputdata[currentStudentIndex][10]);
	formData.append("Data",newShotputtData);
	formData.append("UpdateEvent","shotputt");

	var request = new XMLHttpRequest();

	// MARK - MUST CHANGE 2
	request.open("POST", "https://script.google.com/macros/s/AKfycbwoePIQmE3KMtgAlzcyh93OHSDZhJPlyvl_4T7jAp2Zfb-qmmY/exec");
	request.send(formData);
	// end - submit data back to the spreadsheet	
}

/*
function closeShotput()
{
	for (var i = 0; i < maxShotputTextbox; i++)
	{
		shotputWholeValue[i].hide();
	}
	shotputIsSetup = false;
}

function setupShotput()
{

	for (var i = 0; i < maxShotputTextbox; i++)
	{
		if (i < shotputRows)
		{
			shotputWholeValue[i].value(shotputdata[i][10]);
			shotputWholeValue[i].show();
		}	
		else
			shotputWholeValue[i].hide();
	}
	shotputIsSetup = true;
}
*/
/*
function updateShotputData()
{

	for (var i = 0; i < shotputRows; i++)
	{
		fill(255,255,255);
//		text(shotputdata[i][10],700,70+i*23+i*2);
//		text(shotputWholeValue[i].value(),700,70+i*23+i*2);
		
		
		if (shotputdata[i][10] != shotputWholeValue[i].value())
		{
			shotputdata[i][10] = shotputWholeValue[i].value();
			shotputSubmitData[i] = 1;
//			fill(255,255,255);
//			rect(800,90,100,100);
		}
	
	}
}
*/

// Create buttons from grades 6 - 12
// handle what happens when you click on buttons
function drawButtons()
{
	buttonGap = 60;

	// ------------- IF ribbon button is pressed setup -------------	
	if (eventUse == "ribbons")
	{
		fill(255,255,0);
	}
	else
	{
		fill(255,255,255);	
	}
	
	rect(10,10+buttonGap*8,100,50);
	fill(0,0,0);
	text("Ribbons",34,39+buttonGap*8);


	if ((mouseIsPressed || touchIsDown) && lock[1] == 0 && mouseX > 10 && mouseX < 10+100 &&
		mouseY > 10+buttonGap*8 && mouseY < 10+buttonGap*8+50)
	{
		lock[1] = 1;
	}
	
	if (lock[1] == 2)
	{
		eventUse = "ribbons";
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
	
	rect(10,10+buttonGap*9,100,50);
	fill(0,0,0);
	text("Shotput",34,39+buttonGap*9);


	if ((mouseIsPressed || touchIsDown) && lock[1] == 0 && mouseX > 10 && mouseX < 10+100 &&
		mouseY > 10+buttonGap*9 && mouseY < 10+buttonGap*9+50)
	{
		eventUse = "shotput";
	}

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
		rect(10,10+buttonGap*b,100,50);
		fill(0,0,0);
		text("Grade "+(b+6),34,39+buttonGap*b);
		

		// initiate mouseclick or touch action
		if ((touchIsDown || mouseIsPressed) && lock[0] == 0 && mouseX > 10 && mouseX < 10+100 &&
			mouseY > 10+buttonGap*b && mouseY < 10+buttonGap*b+50)
		{	
			lock[0] = 1;
		}
		// when mouse or touch is up then we send for new data and change grades
		if (lock[0] == 2)
		{
			currentGrade = b+6;
			var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade'+currentGrade+'&tq=SELECT*');

			query.send(handleQueryResponse);
			lock[0] = 0;
		}

	}
}

function showShotputData()
{
	background(0,0,0);
	
	// draw button
	drawButtons();

	// show data
	col1 = 25;
	col2 = 170;
	col3 = 250;
	col4 = 340;
	col5 = 410;
	col6 = 480;

	fill(255,255,255);
	moreH = 125;
	text("Name",col1+moreH,25);
	text("Shotputt",col2+moreH,25);
	text("Student ID",col3+moreH,25);
	text("House",col4+moreH,25);
	text("Event",col5+moreH,25);
	text("Gender",col6+moreH,25);


//	text("Student ID",col2+moreH,25);
//	text("House",col3+moreH,25);
//	text("Event",col4+moreH,25);
//	text("Gender",col5+moreH,25);
//	text("Shotputt",col6+moreH,25);

/*
	if (eventUse == "shotput" && shotputIsSetup == false)
	{
		setupShotput();
	}
	*/
	for (var r = 0; r < shotputRows; r++)
	{
		hoverOverGapSize = 8;
		// highlight where the mouse hovering over with a green background
		if (mouseY > (r)*continuousGapSize+startGapSize+hoverOverGapSize && 
		    mouseY < (r+1)*continuousGapSize+startGapSize+hoverOverGapSize && mouseX > 140 && mouseX < 140+200)
		{
			fill(0,255,50);
			rect(140,(r)*continuousGapSize+startGapSize+hoverOverGapSize,680,25);
			fill(0,0,0);
			
			// if mouse is pressed pull up shotputinput interface
			// end the loop and setup currentStudentIndex
			if ((mouseIsPressed || touchIsDown) && lock[40] == 0)
			{
				eventUse = "shotputinput";
				currentStudentIndex = r;
				lock = true;
				break;
			}
			

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
				text(shotputdata[r][c],col1+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			if (c == 1)
			{
				text(shotputdata[r][c],col3+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			if (c == 2)
			{
				text(shotputdata[r][c],col4+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			if (c == 3)
			{
				text(shotputdata[r][c],col5+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			if (c == 4)
			{
				text(shotputdata[r][c],col6+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			
			if (c == 10)
			{
				if (shotputdata[r][c].toString().length == 4)
					text(shotputdata[r][c],col2+moreH+6,(r+1)*continuousGapSize+startGapSize);
				else
					text(shotputdata[r][c],col2+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			
		}
		
//		shotputWholeValue[r].value(shotputdata[r][10]);

	}


}

function showRibbonData()
{
	background(0,0,0);
	
	// draw button
	drawButtons();

	
	// show checkbox
	/*
	checkbox.show();
	fill(255,255,255);
	text("Unique mode",32,504);
	*/

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
	text("Name",col1+moreH,25);
	text("Ribbon",col2+moreH,25);
	text("House",col3+moreH,25);
	text("Event",col4+moreH,25);
	text("Gender",col5+moreH,25);
	text("Place",col6+moreH,25);
//	text("Ribbon",col7+moreH,25);


	// send data back to the spreadsheet
	for (var r = 0; r < ribbonRows; r++)
	{
		hoverOverGapSize = 8;
		// highlight where the mouse hovering over with a green background
		if (mouseY > (r)*continuousGapSize+startGapSize+hoverOverGapSize && 
		    mouseY < (r+1)*continuousGapSize+startGapSize+hoverOverGapSize && mouseX > 140 && mouseX < 140+580)
		{
			fill(0,255,50);
			rect(140,(r)*continuousGapSize+startGapSize+hoverOverGapSize,580,25);
			fill(0,0,0);
			
			
			// if you touch on the name then toggle Ribbon data
			if (mouseX > 140 && mouseX < 140+200)
			{
				// if mouse is pressed toggle the status
				if ((mouseIsPressed || touchIsDown) && lock[30] == 0)
				{
					if (ribbondata[r][8] == 1)
					{
						ribbondata[r][8] = 2;
						lock[30] = 1;
					}
					else
					{
						ribbondata[r][8] = 1;
						lock[30] = 1;
					}

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

	// send data after the lock has been released
	if (lock[30] == 2)
	{
		// start - submit the data back to the spreadsheet
		formData = new FormData();
		formData.append("Sheet Name","Grade"+currentGrade);
		formData.append("Student ID",ribbondata[r][1]);
		formData.append("Event",ribbondata[r][3]);
		formData.append("Data",ribbondata[r][8]);
		formData.append("UpdateEvent","ribbon");

		var request = new XMLHttpRequest();

		// MARK - MUST CHANGE 2
		request.open("POST", "https://script.google.com/macros/s/AKfycbwoePIQmE3KMtgAlzcyh93OHSDZhJPlyvl_4T7jAp2Zfb-qmmY/exec");
		request.send(formData);
		// end - submit data back to the spreadsheet
		
		lock[30] = 0;
	}

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
	for (var j = 0; j < maxLock; j++)
	{
		if (lock[i] == 1)
		{
			lock[i] = 2;
		}
	}
}

function touchEnded()
{
	for (var j = 0; j < maxLock; j++)
	{
		if (lock[i] == 1)
		{
			lock[i] = 2;
		}
	}
}