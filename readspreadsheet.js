google.load("visualization", "1", {packages:["corechart"]});

var alldata = [[]];
var ribbondata = [[]];
var housedata = [[]];
var eventData = [[[]]];
var localEventData = [[[]]];
var gradeChampData = [[]];
var maxRows;
var maxCols;
var ribbonRows;
var houseRows;
var eventRows = [];
var inp;
var startGapSize = 75;
var continuousGapSize = 25;
var spreadsheetID;
var sheetID;
var wholehyperlink;
var testing;
var dataSubmitted;


// grade champion variables
// uniquedata[grade][individual student][name,points,gender,house,id];
var uniquenames = [[]];
var uniquepoints = [[]];
var uniquegender = [[]];
var uniquehouse = [[]];
var uniqueid = [[]];


function showData()
{

      background(0,0,0);
	  fill(255,255,255);
	  
	  moreH = 125;
	  
      text("Student ID",25+moreH,25);
      text("Last Name",100+moreH,25);
      text("First Name",200+moreH,25);

      for (var r = 0; r < maxRows; r++)
      {
        text(r,370+moreH,(r+1)*continuousGapSize+startGapSize);
        for (var c = 0; c < maxCols; c++)
        {
          if (c == 0)
          {
            text(alldata[r][c],25+moreH,(r+1)*continuousGapSize+startGapSize);
          }
          if (c == 1)
          {
            text(alldata[r][c],100+moreH,(r+1)*continuousGapSize+startGapSize);
          }
          if (c == 2)
          {
            text(alldata[r][c],200+moreH,(r+1)*continuousGapSize+startGapSize);
          }
        }
      }

}


function pullGradeChampionData()
{
	// parse sheet ID and tab ID
	wholehyperlink = "https://docs.google.com/spreadsheets/d/1w91u_8WrA5H9lMTeS-UN19wvd8SAbHjXgbhIW4XrDWU/edit#gid=1021250630";

	startID = wholehyperlink.search("spreadsheets/d/");
	spreadsheetID = wholehyperlink.substring(startID+15,startID+65);
	spreadsheetID = spreadsheetID.substring(0,spreadsheetID.indexOf("/"));
	
	startID = wholehyperlink.search("gid=");
	sheetID = wholehyperlink.substring(startID+4,wholehyperlink.length);

	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade'+currentGrade+'&tq=SELECT*');

    query.send(handleGradeChampionQueryResponse);
}


function handleGradeChampionQueryResponse(response)
{


	if (testing == true)
	{
		console.log("Pulling Grade Champion Data");
	}

	if (response.isError()) {
		console.log('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}

	var data = response.getDataTable();
	maxRows = data.getNumberOfRows();
	maxCols = data.getNumberOfColumns();


	if (testing == true)
	{
		console.log('There are '+maxRows+' rows');
		console.log('There are '+maxCols+' cols');	
	}
	
	gradeChampData = new Array(maxRows);

	for (var r = 0; r < maxRows; r++)
	{
		gradeChampData[r] = new Array(maxCols);
		for (var c = 0; c < maxCols; c++)
		{
			var info = data.getValue(r,c);
			
			if (info == null)
			{
				gradeChampData[r][c] = "";
			}
			else
			{
				gradeChampData[r][c] = info;	
			}
		}
	}
	
	// bubblesort ID first
	i = 0;
	

	while (i < gradeChampData.length)
	{
		j = 0;
		while (j < gradeChampData.length-1)
		{
			if (  (isNaN(parseInt(gradeChampData[j+1][1])) || parseInt(gradeChampData[j][1]) < parseInt(gradeChampData[j+1][1]) ) &&
			      (gradeChampData[j][1] != "")
			    )
			{
//console.log(gradeChampData[j][1]);		
				temp = new Array(maxCols);
				temp = gradeChampData[j];
				gradeChampData[j] = gradeChampData[j+1];
				gradeChampData[j+1] = temp;
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
console.log("Adding unique values ");
	while(i < gradeChampData.length-1)
	{
		previous = gradeChampData[i][1];
		current = gradeChampData[i+1][1];


		if (isNaN(parseInt(gradeChampData[i][7])) == false)
		{
			total = total + parseInt(gradeChampData[i][7]);
		}
		if(parseInt(current) != parseInt(previous) && gradeChampData[j][1] != "" && total > 0)
		{
			// unique arrays 0 - grade 9
			uniquenames[count] = gradeChampData[i][0];
			uniquepoints[count] = total;
			uniquegender[count] = gradeChampData[i][4];
			uniquehouse[count] = gradeChampData[i][2];
			uniqueid[count] = gradeChampData[i][1];
//console.log("Inputting value "+count);

			total = 0;
			count++;
		}
		i = i + 1;
	}
	
	
	// bubblesort unique values
	i = 0;
	while (i < uniquenames.length)
	{
		j = 0;
		while (j < uniquepoints.length-1)
		{
			if (uniquepoints[j] < uniquepoints[j+1])
			{
				temp = uniquepoints[j];
				uniquepoints[j] = uniquepoints[j+1];
				uniquepoints[j+1] = temp;

				temp = uniquenames[j];
				uniquenames[j] = uniquenames[j+1];
				uniquenames[j+1] = temp;

				temp = uniquegender[j];
				uniquegender[j] = uniquegender[j+1];
				uniquegender[j+1] = temp;

				temp = uniquehouse[j];
				uniquehouse[j] = uniquehouse[j+1];
				uniquehouse[j+1] = temp;

				temp = uniqueid[j];
				uniqueid[j] = uniqueid[j+1];
				uniqueid[j+1] = temp;
			}
			j=j+1;
		}
		i=i+1;
	}
}

function pullHouseData()
{
	// parse sheet ID and tab ID
	wholehyperlink = "https://docs.google.com/spreadsheets/d/1w91u_8WrA5H9lMTeS-UN19wvd8SAbHjXgbhIW4XrDWU/edit#gid=1021250630";

	startID = wholehyperlink.search("spreadsheets/d/");
	spreadsheetID = wholehyperlink.substring(startID+15,startID+65);
	spreadsheetID = spreadsheetID.substring(0,spreadsheetID.indexOf("/"));
	
	startID = wholehyperlink.search("gid=");
	sheetID = wholehyperlink.substring(startID+4,wholehyperlink.length);

	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=HousePoints'+'&tq=SELECT*');
//	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1CGxETFmlqy4lYYhtWcIMd7COtW9MR11EN0YI47XcvCk/gviz/tq?sheet=Grade6&tq=SELECT*');


    query.send(handleHouseQueryResponse);
}

// Called when the query response is returned.
function handleHouseQueryResponse(response) {

	if (testing == true)
	{
		console.log("Pulling House Data");
	}
	
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}


	var data = response.getDataTable();

	maxRows = data.getNumberOfRows();
	maxCols = data.getNumberOfColumns();


	if (testing == true)
	{
		console.log('There are '+maxRows+' rows');
		console.log('There are '+maxCols+' cols');	
	}

	houseRows = maxRows;
	


	for (var r = 0; r < maxRows; r++)
	{
		alldata[r] = new Array(maxCols);
		for (var c = 0; c < maxCols; c++)
		{
			var info = data.getValue(r,c);
			
			if (info == null)
			{
				alldata[r][c] = "";
			}
			else
			{
				alldata[r][c] = info;	
			}
		}
	}
	
	housedata = new Array(houseRows);
	
	// copy house data
	for (var r = 0; r < maxRows; r++)
	{
		housedata[r] = new Array(3);
	
		for (var c = 0; c < 3; c++)
		{
			housedata[r][c] = alldata[r][c+7];	
		}
	}

}


function pullData()
{
	// parse sheet ID and tab ID
	wholehyperlink = "https://docs.google.com/spreadsheets/d/1w91u_8WrA5H9lMTeS-UN19wvd8SAbHjXgbhIW4XrDWU/edit#gid=1021250630";

	startID = wholehyperlink.search("spreadsheets/d/");
	spreadsheetID = wholehyperlink.substring(startID+15,startID+65);
	spreadsheetID = spreadsheetID.substring(0,spreadsheetID.indexOf("/"));
	
	startID = wholehyperlink.search("gid=");
	sheetID = wholehyperlink.substring(startID+4,wholehyperlink.length);

	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade6'+'&tq=SELECT*');
//	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1CGxETFmlqy4lYYhtWcIMd7COtW9MR11EN0YI47XcvCk/gviz/tq?sheet=Grade6&tq=SELECT*');


    query.send(handleQueryResponse);
}

// called after we transfer data
function handleUpdateQueryResponse(response) {

	if (testing == true)
	{
		console.log("Running Update Query");
	}
	
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}


	var data = response.getDataTable();

	maxRows = data.getNumberOfRows();
	maxCols = data.getNumberOfColumns();


	if (testing == true)
	{
//		console.log('There are '+maxRows+' rows');
//		console.log('There are '+maxCols+' cols');	
	}
	
	
	var xalldata = new Array(maxRows);
	
	var aevent = "";
	if (eventUse == "shotput")
		aevent = "Shot Putt";
	else if (eventUse == "long jump")
		aevent = "Long Jump";
	else if (eventUse == "discus")
		aevent = "Discus";
	else if (eventUse == "100m")
		aevent = "100m";
	else if (eventUse == "200m")
		aevent = "200m";
	else if (eventUse == "400m")
		aevent = "400m";

	var yalldata = [[]];
	yalldata = new Array(0);
	var nmaxRows = 0;
	
	for (var r = 0; r < maxRows; r++)
	{
	


			xalldata[r] = new Array(maxCols);
			
			for (var c = 0; c < maxCols; c++)
			{
				var info = data.getValue(r,c);
		
				if (info == null)
				{
					xalldata[r][c] = "";
				}
				else
				{
					xalldata[r][c] = info;	
				}
			}
			if (xalldata[r][3] == aevent && xalldata[r][4] == boyOrGirl)		
			{
				yalldata.push(xalldata[r]);
			}

		
	}
console.log(httpSendRequestArray.length+" more updates to make");	
	for (var r = 0; r < yalldata.length; r++)
	{
		for (var i = 0; i < httpSendRequestArray.length; i++)
		{
//console.log("Test1: "+(parseFloat(yalldata[r][10].toString()) == parseFloat(localEventData[eventID][r][2].toString())));
//console.log("Test2: "+(parseInt(yalldata[r][5].toString()) == parseInt(localEventData[eventID][r][3].toString())));
//console.log("Test3: "+(yalldata[r][5].toString() ==  localEventData[eventID][r][3].toString()));

//console.log("Test1: r"+r+"  "+httpSendRequestArray[i][1]);
//console.log("Test2: "+(yalldata[r][3] == aevent));
			if (r == httpSendRequestArray[i][1] && yalldata[r][3] == aevent)
			{
			console.log("Test1: r"+r+"  "+httpSendRequestArray[i][1]);
//console.log("Looking for match");
				if (parseFloat(yalldata[r][10].toString()) == parseFloat(localEventData[eventID][r][2].toString()) &&
				    (parseInt(yalldata[r][5].toString()) == parseInt(localEventData[eventID][r][3].toString()) || 
				    (yalldata[r][5].toString() ==  localEventData[eventID][r][3].toString()) ) )
				{
					localEventData[eventID][r][5] = 2;
					console.log(r+"  "+yalldata[r][10]+"=="+localEventData[eventID][r][2]+" Successful Update!");
					httpSendRequestArray.splice(i,1);
					i--;
					
					// remove any duplicate (earlier) send requests from the same row
					for (var j = 0; j < httpSendRequestArray.length; j++)
					{
						if (r == httpSendRequestArray[j][1])
						{
							httpSendRequestArray.splice(j,1);
							j--;
						}
					}
						 
				}
				else
				{
					// resend the request if it has not been updated
					formData = new FormData();

					formData.append("Sheet Name","Grade"+httpSendRequestArray[i][7]);
					formData.append("Student ID",httpSendRequestArray[i][6]);
					formData.append("Event",httpSendRequestArray[i][5]);
					formData.append("Data",httpSendRequestArray[i][4]);
					formData.append("UpdateEvent",httpSendRequestArray[i][3]);
					formData.append("Finish Position",httpSendRequestArray[i][2]);
					
					
					var request = new XMLHttpRequest();
					request.open("POST", "https://script.google.com/macros/s/AKfycbw86AFSeNjWCBn6tTmU5OFZn1eA-OGxuW1o7LyVImbL7ehfAL0/exec");
					request.send(formData);
					
					
					console.log(r+"  "+(parseFloat(yalldata[r][10].toString()) == parseFloat(localEventData[eventID][r][2].toString()))+"  "+parseFloat(yalldata[r][10].toString())+"!="+parseFloat(localEventData[eventID][r][2].toString())+" Sending Data - Not Updated");
					console.log(r+"  "+(yalldata[r][5].toString() == localEventData[eventID][r][3].toString())+"  "+parseInt(yalldata[r][5].toString())+"!="+parseInt(localEventData[eventID][r][3].toString())+" Sending Data - Not Updated");
				}
			}
		}
	}
}



// called after we transfer data
function handleMedalUpdateQueryResponse(response) {

	if (testing == true)
	{
		console.log("Running Medal Update Query");
	}
	
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}


	var data = response.getDataTable();

	maxRows = data.getNumberOfRows();
	maxCols = data.getNumberOfColumns();


	if (testing == true)
	{
//		console.log('There are '+maxRows+' rows');
//		console.log('There are '+maxCols+' cols');	
	}
	
	
	var xalldata = new Array(maxRows);

	var nmaxRows = 0;
	
	for (var r = 0; r < maxRows; r++)
	{
		xalldata[r] = new Array(maxCols);
		
		for (var c = 0; c < maxCols; c++)
		{
			var info = data.getValue(r,c);
	
			if (info == null)
			{
				xalldata[r][c] = "";
			}
			else
			{
				xalldata[r][c] = info;	
			}
		}
		
	}
//console.log(medalSendRequestArray.length+" more updates to make");	
	for (var r = 0; r < xalldata.length; r++)
	{
		for (var i = 0; i < medalSendRequestArray.length; i++)
		{
//console.log("Test1: "+(parseFloat(yalldata[r][10].toString()) == parseFloat(localEventData[eventID][r][2].toString())));

			if (medalSendRequestArray[i][1] == xalldata[r][1] && medalSendRequestArray[i][2] == xalldata[r][3])
			{
				if (medalSendRequestArray[i][3] == xalldata[r][8] && ribbondata[r][8] == medalSendRequestArray[i][3])
				{
console.log("Match found"+r+"  "+medalSendRequestArray[i][1]+"  "+medalSendRequestArray[i][2]+"  "+medalSendRequestArray[i][3]);
console.log("Match found"+r+"  "+xalldata[r][1]+"  "+xalldata[r][3]+"  "+xalldata[r][8]);
					
					for (var j = 0; j < medalSendRequestArray.length; j++)
					{
						if (medalSendRequestArray[j][1] == xalldata[r][1] && medalSendRequestArray[j][2] == xalldata[r][3])
							medalSendRequestArray.splice(j,1);
					}

						 
				}
				else
				{
					// start - submit the data back to the spreadsheet
					formData = new FormData();
					formData.append("Sheet Name",medalSendRequestArray[i][0]);
					formData.append("Student ID",medalSendRequestArray[i][1]);
					formData.append("Event",medalSendRequestArray[i][2]);
					formData.append("Data",ribbondata[r][8]);
					formData.append("UpdateEvent","ribbon");
				
					medalSendRequestArray[i][3] = ribbondata[r][8];
				
					var request = new XMLHttpRequest();
					request.open("POST", "https://script.google.com/macros/s/AKfycbw86AFSeNjWCBn6tTmU5OFZn1eA-OGxuW1o7LyVImbL7ehfAL0/exec");
					request.send(formData);
				
				
					console.log(ribbondata[r][8]+" "+medalSendRequestArray[i][3]+" "+xalldata[r][8]+"  Sending Data - Not Updated");
					
				}
			}
		}
	}
}


// Called when the query response is returned.
function handleQueryResponse(response) {

	if (testing == true)
	{
		console.log("2 - Hello World!");
	}
	
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}


	var data = response.getDataTable();

	maxRows = data.getNumberOfRows();
	maxCols = data.getNumberOfColumns();


	if (testing == true)
	{
		console.log('There are '+maxRows+' rows');
		console.log('There are '+maxCols+' cols');	
	}

	var maxEvent = 6;

	var rowdata = new Array(maxCols);
	alldata = new Array(maxRows);
	
	eventRows = new Array(maxEvent);
	ribbonRows = 0;
	
	for (var q = 0; q < maxEvent; q++)
	{
		eventRows[q] = 0;
	}


	for (var r = 0; r < maxRows; r++)
	{
		alldata[r] = new Array(maxCols);
		for (var c = 0; c < maxCols; c++)
		{
			var info = data.getValue(r,c);
			
			if (info == null)
			{
				alldata[r][c] = "";
			}
			else
			{
				alldata[r][c] = info;	
			}
			
			if (alldata[r][3] == "Shot Putt")
			{
				eventRows[0]++;
			}
			if (alldata[r][3] == "Long Jump")
			{
				eventRows[1]++;
			}
			if (alldata[r][3] == "Discus")
			{
				eventRows[2]++;
			}
			if (alldata[r][3] == "100m")
			{
				eventRows[3]++;
			}
			if (alldata[r][3] == "200m")
			{
				eventRows[4]++;
			}
			if (alldata[r][3] == "400m")
			{
				eventRows[5]++;
			}

			
			// if they are ribbon winners add one to count
			if (alldata[r][8] == 1 || alldata[r][8] == 2)
			{
				ribbonRows++;
			}
		}
	}
	

	ribbondata = new Array(ribbonRows);
	
	ribbonRows = 0;
	// copy only the ribbon winner data
	for (var r = 0; r < maxRows; r++)
	{
		if (alldata[r][8] == 1 || alldata[r][8] == 2)
		{
			ribbondata[ribbonRows] = new Array(maxCols);
		
			for (var c = 0; c < maxCols; c++)
			{
				ribbondata[ribbonRows][c] = alldata[r][c];	
			}
			ribbonRows++;
		}
	}
	
	eventData = new Array(maxEvent);
	localEventData = new Array(maxEvent);
	
	for (var x = 0; x < eventData.length; x++)
	{
		eventData[x] = new Array(eventRows[x]);
		localEventData[x] = new Array(eventRows[x].length);
		eventRows[x] = 0;
	}
	
	
	// copy shotputt data
	// copy discus data
	// copy longjump data
	var eventMark = 0;
	
	for (var x = 0; x < eventData.length; x++)
	{

		for (var r = 0; r < maxRows; r++)
		{
		
			localEventData[x][eventRows[x]] = new Array(6);
			localEventData[x][eventRows[x]][0] = alldata[r][1];
			localEventData[x][eventRows[x]][1] = alldata[r][3];
			localEventData[x][eventRows[x]][2] = alldata[r][10];
			localEventData[x][eventRows[x]][3] = alldata[r][5];
			localEventData[x][eventRows[x]][4] = false;
			localEventData[x][eventRows[x]][5] = 0;
		
			if (alldata[r][4] == boyOrGirl)
			{
				if (x == 0 && alldata[r][3] == "Shot Putt")
				{
					eventMark = x;
					eventData[x][eventRows[x]] = new Array(maxCols);
		
					for (var c = 0; c < maxCols; c++)
					{
						if (c == 10 && alldata[r][c] == "")
						{
							eventData[x][eventRows[x]][c] = "0.00";			
						}
						else 
						{
							if (c == 10)
							{
								var d = "00";
								var w = 0;
								if (alldata[r][10] != 0)
								{
									if (alldata[r][10].toString().indexOf('.') == -1)
									{
										w = alldata[r][10].toString();
										d = "00";
									}
									else
									{
										w = alldata[r][10].toString().substr(0,alldata[r][10].toString().indexOf('.'));			
										d = alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length);
										if (alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length).length == 1)
										{
											d += "0";				
										}
				
									}
								}
								eventData[x][eventRows[x]][c] = w+"."+d;	
							}
							else
								eventData[x][eventRows[x]][c] = alldata[r][c];	
						}
					}
					eventRows[x]++;
				} // shotput if

				if (x == 1 && alldata[r][3] == "Long Jump")
				{
					eventMark = x;
					eventData[x][eventRows[x]] = new Array(maxCols);
		
					for (var c = 0; c < maxCols; c++)
					{
						if (c == 10 && alldata[r][c] == "")
						{
							eventData[x][eventRows[x]][c] = "0.00";			
						}
						else 
						{
							if (c == 10)
							{
								var d = "00";
								var w = 0;
								if (alldata[r][10] != 0)
								{
									if (alldata[r][10].toString().indexOf('.') == -1)
									{
										w = alldata[r][10].toString();
										d = "00";
									}
									else
									{
										w = alldata[r][10].toString().substr(0,alldata[r][10].toString().indexOf('.'));			
										d = alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length);
										if (alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length).length == 1)
										{
											d += "0";				
										}
				
									}
								}
								eventData[x][eventRows[x]][c] = w+"."+d;	
							}
							else
								eventData[x][eventRows[x]][c] = alldata[r][c];	
						}
					}
					eventRows[x]++;
				} // long jump if

				if (x == 2 && alldata[r][3] == "Discus")
				{
					eventMark = x;
					eventData[x][eventRows[x]] = new Array(maxCols);
		
					for (var c = 0; c < maxCols; c++)
					{
						if (c == 10 && alldata[r][c] == "")
						{
							eventData[x][eventRows[x]][c] = "0.00";			
						}
						else 
						{
							if (c == 10)
							{
								var d = "00";
								var w = 0;
								if (alldata[r][10] != 0)
								{
									if (alldata[r][10].toString().indexOf('.') == -1)
									{
										w = alldata[r][10].toString();
										d = "00";
									}
									else
									{
										w = alldata[r][10].toString().substr(0,alldata[r][10].toString().indexOf('.'));			
										d = alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length);
										if (alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length).length == 1)
										{
											d += "0";				
										}
				
									}
								}
								eventData[x][eventRows[x]][c] = w+"."+d;	
							}
							else
								eventData[x][eventRows[x]][c] = alldata[r][c];	
						}
					}
					eventRows[x]++;
				} // if discus

				if (x == 3 && alldata[r][3] == "100m")
				{
					eventMark = x;
					eventData[x][eventRows[x]] = new Array(maxCols);
		
					for (var c = 0; c < maxCols; c++)
					{
						if (c == 10 && alldata[r][c] == "")
						{
							eventData[x][eventRows[x]][c] = "0.000";			
						}
						else 
						{
							if (c == 10)
							{
								var d = "000";
								var w = 0;
								if (alldata[r][10] != 0)
								{
									if (alldata[r][10].toString().indexOf('.') == -1)
									{
										w = alldata[r][10].toString();
										d = "000";
									}
									else
									{
										w = alldata[r][10].toString().substr(0,alldata[r][10].toString().indexOf('.'));			
										d = alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length);
										if (alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length).length == 1)
										{
											d += "00";				
										}
										if (alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length).length == 2)
										{
											d += "0";
										}
									}
								}
								eventData[x][eventRows[x]][c] = w+"."+d;	
							}
							else
								eventData[x][eventRows[x]][c] = alldata[r][c];	
						}
					}
					eventRows[x]++;
				} // 100m
			
				if (x == 4 && alldata[r][3] == "200m")
				{
					eventData[x][eventRows[x]] = new Array(maxCols);
		
					for (var c = 0; c < maxCols; c++)
					{
						if (c == 10 && alldata[r][c] == "")
						{
							eventData[x][eventRows[x]][c] = "0.000";			
						}
						else 
						{
							if (c == 10)
							{
								var d = "000";
								var w = 0;
								if (alldata[r][10] != 0)
								{
									if (alldata[r][10].toString().indexOf('.') == -1)
									{
										w = alldata[r][10].toString();
										d = "000";
									}
									else
									{
										w = alldata[r][10].toString().substr(0,alldata[r][10].toString().indexOf('.'));			
										d = alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length);
										if (alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length).length == 1)
										{
											d += "00";				
										}
										if (alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length).length == 2)
										{
											d += "0";
										}
									}
								}
								eventData[x][eventRows[x]][c] = w+"."+d;	
							}
							else
								eventData[x][eventRows[x]][c] = alldata[r][c];	
						}
					}
					eventRows[x]++;
				} // if 200m
			
				if (x == 5 && alldata[r][3] == "400m")
				{
					eventData[x][eventRows[x]] = new Array(maxCols);
		
					for (var c = 0; c < maxCols; c++)
					{
						if (c == 10 && alldata[r][c] == "")
						{
							eventData[x][eventRows[x]][c] = "0.000";			
						}
						else 
						{
							if (c == 10)
							{
								var d = "000";
								var w = 0;
								if (alldata[r][10] != 0)
								{
									if (alldata[r][10].toString().indexOf('.') == -1)
									{
										w = alldata[r][10].toString();
										d = "000";
									}
									else
									{
										w = alldata[r][10].toString().substr(0,alldata[r][10].toString().indexOf('.'));			
										d = alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length);
										if (alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length).length == 1)
										{
											d += "00";				
										}
										if (alldata[r][10].toString().substr(alldata[r][10].toString().indexOf('.')+1,alldata[r][10].toString().length).length == 2)
										{
											d += "0";
										}				
									}
								}
								eventData[x][eventRows[x]][c] = w+"."+d;	
							}
							else
								eventData[x][eventRows[x]][c] = alldata[r][c];	
						}
					}
					eventRows[x]++;
				} // if 400m
			} // Filter boys or girls
		} // for each row in the event
		


	} // for all events
	
	


	// allow data to be shown after it has been submitted
	dataSubmitted = true;

	// hide textbox and button
	urlinp.hide();
	submitbutton.hide();
	
//	updateFinishingPlacement();

}