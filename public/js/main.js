//Example grid reference: O0886621276

//development
//const gridrefUrl = "http://localhost/?reftype=NATGRID&refs="
//production
const gridrefUrl = "https://gridref.sarv.ie/?reftype=NATGRID&refs="

let gridref;
if(window.location.href.indexOf("") > -1) {
	const queryString = window.location.search;
	console.log("11 querystring is" + queryString);
	if(queryString){
		const urlParams = new URLSearchParams(queryString);
		gridref = urlParams.get('gridref');
		gridref = sanitise(gridref);
		convert(gridref);
	}
}

//Form validation for Derry
let gridrefEntry = document.getElementById('gridref');
//Add event listener to entry field - on focus clear any error validation
gridrefEntry.addEventListener("focus",function(e){
	let target = e.target;
	let err = document.getElementsByTagName("error");
	for(let i = 0; i < err.length; i++){
		err[i].remove();		
	}	
	if (target.className === 'fail') {                  
		target.className = '';
    }
},false);

//Add event listener to entry field - on blur perform error validation and show any errors
gridrefEntry.addEventListener("blur",function(e){
	let target = e.target;
	//Error validation - Check if first char is letter, otherwise return form error to user "Starting letter is missing"
	let tetrad = /^[a-zA-Z]/.test(target.value);
	if(!tetrad){
		target.className = 'fail';
		//present span error message;
		if(document.getElementsByTagName("error").length == 0){
			let err = document.createElement("error");
			err.innerHTML = 'Starting letter is missing';
			target.parentNode.insertBefore(err, target.nextSibling);
			return;
		}
	}else{
		//Error validation - Check that there is an even number of numbers 6, 8 or 10 in length otherwise return form error to user 
		let ref = /^[a-zA-Z](\d\d)+(?!\w)/.test(target.value);
		if(!ref){
			target.className = 'fail';
			//present span error message;
			if(document.getElementsByTagName("error").length == 0){
				let err = document.createElement("error");
				err.innerHTML = 'Grid reference needs to be a 6, 8 or 10 number reference';
				target.parentNode.insertBefore(err, target.nextSibling);
				return;
			}
		}
	}
},false);

document.getElementById('gridrefbutton').addEventListener("click", function(e){
	e.preventDefault;

	if(document.getElementById("gridref").className == "fail"){return}

	let form = document.getElementById('igrim');
	let elements = form.elements;
	gridref = elements.gridref.value;
	gridref = sanitise(gridref);
	console.log("74 Final grid reference is: " + gridref);
	convert(gridref);
},false);

function convert(gridref){
	//request from gridref api
  console.log("80 The grid reference for converting is: "+ gridref);
	let xmlHttp = new XMLHttpRequest();
  	xmlHttp.addEventListener("load", reqListener);
	xmlHttp.open( "GET", gridrefUrl + gridref );
	  
	xmlHttp.send();	
}

function reqListener() {
	// console.log(this.responseText);
	//parse latitude & longitude as string separated by "+"
	let parser = new DOMParser();
	let xml = parser.parseFromString(this.responseText,"text/xml");

	//generate string
	let latitude = xml.getElementsByTagName("latitude")[0].childNodes[0].nodeValue;
	console.log("98 The Latitude is: "+ latitude);
	let longitude = xml.getElementsByTagName("longitude")[0].childNodes[0].nodeValue;
	console.log("100 The Longitude is: "+ longitude);
	let string = latitude + ",+" + longitude;
	console.log("102 " + string);
	
	//redirect to google maps
	//https://www.google.com/maps?z=12&t=h&q=loc:53.230953+-6.3702554
	// uncomment me window.location.href = 'https://www.google.com/maps?z=12&t=h&q=loc:' +string;
}


//Helper functions
function sanitise(input) {
	const source = typeof input === 'string' || input instanceof String ? input : '';
	return source.replace(/[-[/\]{}()&*+?.,\\^$|#\s]/g, '');
}


