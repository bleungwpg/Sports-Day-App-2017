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
var shotputIsSetup;
var discusIsSetup;
var longjumpIsSetup;
var currentStudentIndex;


function setup(){
	//create a drawing service 500px wide, 500px tall
	createCanvas(1053,1505);

	shotputIsSetup = false;
	discusIsSetup = false;
	longjumpIsSetup = false;
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
	currentStudentIndex = 0;

	var textboxH = 23;
	var textboxHGap = 2;
	
	
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
		else if (eventUse == "input")
		{
			showInputDataInterface();
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

function showInputDataInterface()
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


	if ((mouseIsPressed || touchIsDown) && !lock && mouseX > 10 && mouseX < 10+100 &&
		mouseY > 10+buttonGap*8 && mouseY < 10+buttonGap*8+50)
	{
		eventUse = "ribbons";
//			closeShotput();
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


	if ((mouseIsPressed || touchIsDown) && !lock && mouseX > 10 && mouseX < 10+100 &&
		mouseY > 10+buttonGap*9 && mouseY < 10+buttonGap*9+50)
	{
		eventUse = "shotput";
//			setupShotput();
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
		

		if ((touchIsDown || mouseIsPressed) && !lock && mouseX > 10 && mouseX < 10+100 &&
			mouseY > 10+buttonGap*b && mouseY < 10+buttonGap*b+50)
		{	
			currentGrade = b+6;
			var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade'+currentGrade+'&tq=SELECT*');

			query.send(handleQueryResponse);
			lock = true;
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
	col3 = 230;
	col4 = 300;
	col5 = 390;
	col6 = 460;

	fill(255,255,255);
	moreH = 125;

	text("Name",col1+moreH,25);
	text("Shotputt",col2+moreH,25);
	text("Student ID",col3+moreH,25);
	text("House",col4+moreH,25);
	text("Event",col5+moreH,25);
	text("Gender",col6+moreH,25);


	var gold = [];
	var silver = [];
	var bronze = [];
	var medalFloat = new Array(shotputRows);


	for (var r = 0; r < shotputRows; r++)
	{
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
				// place the shotput data appropriately			
				if (shotputdata[r][c].toString().length == 4)
					text(shotputdata[r][c],col2+moreH+6,(r+1)*continuousGapSize+startGapSize);
				else
					text(shotputdata[r][c],col2+moreH,(r+1)*continuousGapSize+startGapSize);

				// create an array of floating point numbers
				medalFloat[r] = shotputdata[r][c].toString();



				if (medalFloat[r] > 0)
				{

					// is gold empty?
					if (gold.length == 0)
						gold.push(r);
						
					// are you equal to gold?
					else if (gold.length > 0 && medalFloat[r] == parseFloat(shotputdata[gold[0]][c].toString()))
					{
						gold.push(r);					
					}
					// are you greater than gold?  shift everything
					else if (gold.length > 0 && medalFloat[r] > parseFloat(shotputdata[gold[0]][c].toString()))
					{
						while (bronze.length > 0)
							bronze.pop();
					
						while (silver.length > 0)
							bronze.push(silver.pop());
							
						while (gold.length > 0)
							silver.push(gold.pop());
							
						gold.push(r);
					}
					// otherwise you must be less than gold
					else
					{
						// is silver empty?
						if (silver.length == 0)
							silver.push(r);
							
						// are you equal to silver?
						else if (silver.length > 0 && medalFloat[r] == parseFloat(shotputdata[silver[0]][c].toString()))
						{
							silver.push(r);
						}
						
						// are you greater than silver?
						else if (silver.length > 0 && medalFloat[r] > parseFloat(shotputdata[silver[0]][c].toString()))
						{
							while (bronze.length > 0)
								bronze.pop();
					
							while (silver.length > 0)
								bronze.push(silver.pop());
							
							silver.push(r);
						}
						
						// otherwise you must be less than silver
						else
						{
							// is bronze empty?
							if (bronze.length == 0)
								bronze.push(r);
							
							// are you equal to bronze?
							else if (bronze.length > 0 && medalFloat[r] == parseFloat(shotputdata[bronze[0]][c].toString()))
							{
								bronze.push(r);
							}
						
							// are you greater than bronze?
							else if (bronze.length > 0 && medalFloat[r] > parseFloat(shotputdata[bronze[0]][c].toString()))
							{
								while (bronze.length > 0)
									bronze.pop();
												
								bronze.push(r);
							}
						
						} // else less than silver
					} // else less than gold
				} // if medal value > 0
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

					// MARK - MUST CHANGE 2
					request.open("POST", "https://script.google.com/macros/s/AKfycbwoePIQmE3KMtgAlzcyh93OHSDZhJPlyvl_4T7jAp2Zfb-qmmY/exec");
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

function touchEnded()
{
	lock = false;
}