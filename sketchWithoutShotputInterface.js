var singlePrime;
var randomIndex;
var thimble;
var uniqueOn;
var markUniqueStudent;
var currentGrade;
var formData;
var ipad;
var eventUse;
var shotputTextbox = [];
var shotputSubmitData = [];
var maxShotputTextbox;
var shotputIsSetup;


function setup(){
	//create a drawing service 500px wide, 500px tall
	createCanvas(1053,1505);

	shotputIsSetup = false;
	ipad = false;
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
	eventUse = "ribbons";
	maxShotputTextbox = 200;

	var textboxH = 23;
	var textboxHGap = 2;
	shotputTextbox = new Array(maxShotputTextbox);
	shotputSubmitData = new Array(maxShotputTextbox);
	
	

	for (var i = 0; i < maxShotputTextbox; i++)
	{
		shotputTextbox[i] = createSelect();
		shotputTextbox[i].position(600,i*textboxH+i*textboxHGap+34);
		//	 shotputTextbox[i].size(100,textboxH);
		shotputTextbox[i].hide();
		

//		shotputTextbox[i].option('0.0');
//		shotputTextbox[i].option('0.1');		


		var ones = 0;
		for (var ones = 0; ones <= 50; ones++)
		{

			var d1 = 0;
			for (var d1 = 0; d1 < 10; d1++)
			{
//				var d2 = 0;
//				for (var d2 = 0; d2 < 10; d2++)
//				{
					shotputTextbox[i].option(''+ones+'.'+d1);
//				}		
			}
		}
		
		shotputTextbox[i].changed(updateShotputData);


	/*
		shotputTextbox[i] = createInput();
  		shotputTextbox[i].position(600,i*textboxH+i*textboxHGap+34);
  		shotputTextbox[i].size(100,textboxH);
  		shotputTextbox[i].hide();
  		shotputTextbox[i].input(updateShotputData);
  		*/
  		shotputSubmitData[i] = 0;
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

function closeShotput()
{
	for (var i = 0; i < maxShotputTextbox; i++)
	{
		shotputTextbox[i].hide();
	}
	shotputIsSetup = false;
}

function setupShotput()
{

	for (var i = 0; i < maxShotputTextbox; i++)
	{
		if (i < shotputRows)
		{
			shotputTextbox[i].value(shotputdata[i][10]);
			shotputTextbox[i].show();
		}	
		else
			shotputTextbox[i].hide();
	}
	shotputIsSetup = true;
}

function updateShotputData()
{

	for (var i = 0; i < shotputRows; i++)
	{
		fill(255,255,255);
//		text(shotputdata[i][10],700,70+i*23+i*2);
//		text(shotputTextbox[i].value(),700,70+i*23+i*2);
		
		
		if (shotputdata[i][10] != shotputTextbox[i].value())
		{
			shotputdata[i][10] = shotputTextbox[i].value();
			shotputSubmitData[i] = 1;
//			fill(255,255,255);
//			rect(800,90,100,100);
		}
	
	}
}

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

	if (ipad == true)
	{
		if (mouseX > 10 && mouseX < 10+100 &&
			mouseY > 10+buttonGap*8 && mouseY < 10+buttonGap*8+50)
		{
			eventUse = "ribbons";
			closeShotput();
		}
	}
	else
	{
		if (mouseIsPressed && mouseX > 10 && mouseX < 10+100 &&
			mouseY > 10+buttonGap*8 && mouseY < 10+buttonGap*8+50)
		{
			eventUse = "ribbons";
			closeShotput();
		}
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

	if (ipad == true)
	{
		if (mouseX > 10 && mouseX < 10+100 &&
			mouseY > 10+buttonGap*9 && mouseY < 10+buttonGap*9+50)
		{
			eventUse = "shotput";
			setupShotput();
		}
	}
	else
	{
		if (mouseIsPressed && mouseX > 10 && mouseX < 10+100 &&
			mouseY > 10+buttonGap*9 && mouseY < 10+buttonGap*9+50)
		{
			eventUse = "shotput";
			setupShotput();
		}
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
		
		if (ipad == true)
		{
			if (mouseX > 10 && mouseX < 10+100 &&
			    mouseY > 10+buttonGap*b && mouseY < 10+buttonGap*b+50)
			{	
				currentGrade = b+6;
				var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade'+currentGrade+'&tq=SELECT*');

				query.send(handleQueryResponse);
			}
		}
		else
		{
			if (mouseIsPressed && mouseX > 10 && mouseX < 10+100 &&
			    mouseY > 10+buttonGap*b && mouseY < 10+buttonGap*b+50)
			{
				currentGrade = b+6;
				var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade'+currentGrade+'&tq=SELECT*');

				query.send(handleQueryResponse);
			}
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
	text("Student ID",col2+moreH,25);
	text("House",col3+moreH,25);
	text("Event",col4+moreH,25);
	text("Gender",col5+moreH,25);
	text("Shotputt",col6+moreH,25);

	if (eventUse == "shotput" && shotputIsSetup == false)
	{
		setupShotput();
	}
	for (var r = 0; r < shotputRows; r++)
	{
		hoverOverGapSize = 8;
		// highlight where the mouse hovering over with a green background
		if (mouseY > (r)*continuousGapSize+startGapSize+hoverOverGapSize && 
		    mouseY < (r+1)*continuousGapSize+startGapSize+hoverOverGapSize && mouseX > 140 && mouseX < 140+580)
		{
			fill(0,255,50);
			rect(140,(r)*continuousGapSize+startGapSize+hoverOverGapSize,680,25);
			fill(0,0,0);
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
				text(shotputdata[r][c],col2+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			if (c == 2)
			{
				text(shotputdata[r][c],col3+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			if (c == 3)
			{
				text(shotputdata[r][c],col4+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			if (c == 4)
			{
				text(shotputdata[r][c],col5+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			/*
			if (c == 10)
			{
				text(shotputdata[r][c],col6+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			*/
		}
		
//		shotputTextbox[r].value(shotputdata[r][10]);
		if (shotputSubmitData[r] == 1)
		{
//			fill(255,0,0);
//			rect(col6+moreH+50,(r+1)*continuousGapSize+startGapSize-15,30,21);
			
			// -- will get this working later -- need to send an extra parameter to define ribbon or shotputt
			// start - submit the data back to the spreadsheet
			formData = new FormData();
			formData.append("Sheet Name","Grade"+currentGrade);
			formData.append("Student ID",shotputdata[r][1]);
			formData.append("Event",shotputdata[r][3]);
			formData.append("Data",shotputdata[r][10]);
			formData.append("UpdateEvent","shotputt");

			var request = new XMLHttpRequest();

			// MARK - MUST CHANGE 2
			request.open("POST", "https://script.google.com/macros/s/AKfycbwoePIQmE3KMtgAlzcyh93OHSDZhJPlyvl_4T7jAp2Zfb-qmmY/exec");
			request.send(formData);
			// end - submit data back to the spreadsheet

//			shotputTextbox[r].value(shotputdata[r][10]);

			shotputSubmitData[r] = 0;
			
		}

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
	text("Student ID",col2+moreH,25);
	text("House",col3+moreH,25);
	text("Event",col4+moreH,25);
	text("Gender",col5+moreH,25);
	text("Place",col6+moreH,25);
	text("Ribbon",col7+moreH,25);


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
			
			// if mouse is pressed toggle the status
			if (ipad == true)
			{
				if (lock == false)
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

					// MARK - MUST CHANGE 2
					request.open("POST", "https://script.google.com/macros/s/AKfycbwoePIQmE3KMtgAlzcyh93OHSDZhJPlyvl_4T7jAp2Zfb-qmmY/exec");
					request.send(formData);
					// end - submit data back to the spreadsheet
				}			
			}
			else
			{
				if (mouseIsPressed && lock == false)
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

					// MARK - MUST CHANGE 2
					request.open("POST", "https://script.google.com/macros/s/AKfycbwoePIQmE3KMtgAlzcyh93OHSDZhJPlyvl_4T7jAp2Zfb-qmmY/exec");
					request.send(formData);
					// end - submit data back to the spreadsheet
				}			
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
				text(ribbondata[r][c],col1+moreH,(r+1)*continuousGapSize+startGapSize);
			}
			if (c == 1)
			{
				text(ribbondata[r][c],col2+moreH,(r+1)*continuousGapSize+startGapSize);
			}
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
					text("Earned",col7+moreH,(r+1)*continuousGapSize+startGapSize);
				}
				else if (ribbondata[r][c] == 2)
				{
					text("Given",col7+moreH,(r+1)*continuousGapSize+startGapSize);
				}
			}
		}
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
	lock = false;
}