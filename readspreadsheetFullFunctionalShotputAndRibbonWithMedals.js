google.load("visualization", "1", {packages:["corechart"]});

var alldata = [[]];
var ribbondata = [[]];
var shotputdata = [[]];
var discusdata = [[]];
var longjumpdata = [[]];
var maxRows;
var maxCols;
var ribbonRows;
var shotputRows;
var discusRows;
var longjumpRows;
var inp;
var startGapSize = 25;
var continuousGapSize = 25;
var spreadsheetID;
var sheetID;
var wholehyperlink;
var testing;
var dataSubmitted;




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


function pullData()
{
	// parse sheet ID and tab ID
	wholehyperlink = urlinp.value();
	startID = wholehyperlink.search("spreadsheets/d/");
	spreadsheetID = wholehyperlink.substring(startID+15,startID+65);
	spreadsheetID = spreadsheetID.substring(0,spreadsheetID.indexOf("/"));
	
	startID = wholehyperlink.search("gid=");
	sheetID = wholehyperlink.substring(startID+4,wholehyperlink.length);

	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/gviz/tq?sheet=Grade6'+'&tq=SELECT*');
//	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1CGxETFmlqy4lYYhtWcIMd7COtW9MR11EN0YI47XcvCk/gviz/tq?sheet=Grade6&tq=SELECT*');


    query.send(handleQueryResponse);
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


	var rowdata = new Array(maxCols);
	alldata = new Array(maxRows);
	ribbonRows = 0;
	shotputRows = 0;
	discusRows = 0;
	longjumpRows = 0;


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
				shotputRows++;
			}
			if (alldata[r][3] == "Discus")
			{
				discusRows++;
			}
			if (alldata[r][3] == "Long Jump")
			{
				longjumpRows++;
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
	
	shotputdata = new Array(shotputRows);
	discusdata = new Array(discusRows);
	longjumpdata = new Array(longjumpRows);
	
	shotputRows = 0;
	discusRows = 0;
	longjumpRows = 0;
	
	// copy shotputt data
	// copy discus data
	// copy longjump data
	
	for (var r = 0; r < maxRows; r++)
	{
		if (alldata[r][3] == "Shot Putt")
		{
			shotputdata[shotputRows] = new Array(maxCols);
		
			for (var c = 0; c < maxCols; c++)
			{
				if (c == 10 && alldata[r][c] == "")
				{
					shotputdata[shotputRows][c] = "0.00";			
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
						shotputdata[shotputRows][c] = w+"."+d;	
					}
					else
						shotputdata[shotputRows][c] = alldata[r][c];	
				}
			}
			shotputRows++;
		} // shotput if
		
		if (alldata[r][3] == "Long Jump")
		{
			longjumpdata[longjumpRows] = new Array(maxCols);
		
			for (var c = 0; c < maxCols; c++)
			{
				if (c == 10 && alldata[r][c] == "")
				{
					longjumpdata[longjumpRows][c] = "0.00";			
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
						longjumpdata[longjumpRows][c] = w+"."+d;	
					}
					else
						longjumpdata[longjumpRows][c] = alldata[r][c];	
				}
			}
			longjumpRows++;
		} // long jump if

		if (alldata[r][3] == "Discus")
		{
			discusdata[discusRows] = new Array(maxCols);
		
			for (var c = 0; c < maxCols; c++)
			{
				if (c == 10 && alldata[r][c] == "")
				{
					discusdata[discusRows][c] = "0.00";			
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
						discusdata[discusRows][c] = w+"."+d;	
					}
					else
						discusdata[discusRows][c] = alldata[r][c];	
				}
			}
			discusRows++;
		}


	} // for

	// allow data to be shown after it has been submitted
	dataSubmitted = true;

	// hide textbox and button
	urlinp.hide();
	submitbutton.hide();

}