var ajax;
var haveshutter=0;
window.onload = shutterInit;


// on start of the page

function shutterInit () {
var  all_tds;
var  all_tds1;
//sets div css text
var browser=navigator.appName
var b_version=navigator.appVersion
var version=parseFloat(b_version)

// this will give you the browser name

//alert("Browser name: "+ browser)



if(browser == "Microsoft Internet Explorer"){
			document.getElementById('scrdiv1').style.cssText = "width:100%;height:100%;overflow: auto;"
}


	// added by paradox-Nayana
	 all_tds = document.getElementsByTagName("td");
    for (var n=0; n<all_tds.length; n++) { // searching for boxes containing id normal box which is the box we click on
        if (all_tds[n].id == "normalbox") {
        
            
            all_tds[n].onclick = function () {
            	  // get the id by finding the text within <a>
                id = this.innerHTML; // takes the inside text
             
                mkShutter("result.php?id="+id); // this is the shutter creating function. the id is the text INSIDE the table box.
                haveshutter=1;
            }

				all_tds[n].onmouseover = function () { // i hope this will help to get rid of problem of holding the mouse over css for ever 
				all_tds1 = document.getElementsByTagName("td"); // all this is doing refreshing whole page
				 for (var n=0; n<all_tds1.length; n++) {
   					     if (all_tds1[n].id == "normalbox") {
   							all_tds1[n].className = "normalbox";
   					}
				}
								
				this.id = "normalboxover";  // and sets the mouse over effect
				
				}
				all_tds[n].onmouseout  = function () { this.id = "normalbox";
				// and same as the mouse in effect when the mouse remove from the box it sets back to the original state 				
				 }

        }
        
        ///// // ----------------  end of the function for normal button 
         if (all_tds[n].id == "normalbox1") { // the function is same as the normalbutton but this is for the white buttons on the side of title bar
        
            
            all_tds[n].onclick = function () {
            	  // get the id by finding the text within <a>
                id = this.innerHTML;
                mkShutter("result.php?id="+id);
                
            }

				all_tds[n].onmouseover = function () { this.id = "normalbox1over"; }
				all_tds[n].onmouseout  = function () { this.id = "normalbox1"; }

        }
         ///// // ----------------  end of the function for normalbox button
        if (all_tds[n].id == "titlebox") {// the function is same as the normalbutton but this is for title bar
        

        
            all_tds[n].onclick = function () {
            	  // get the id by finding the text within <a>
                
                
                
                id = this.innerHTML;
             
                mkShutter("result.php?id="+id);

                
            }


				all_tds[n].onmouseover = function () { this.id = "titleboxover"; }
				all_tds[n].onmouseout  = function () { this.id = "titlebox"; }

        }

   
    // this entry was added later because the page wont render unicode chars
	
	if (all_tds[n].className == "normalboxexp") {
        
            
            all_tds[n].onclick = function () {
            	  // get the id by finding the text within <a>
                id = this.id; // takes the inside text
             
                mkShutter("result.php?id="+id); // this is the shutter creating function. the id is the text INSIDE the table box.
                
            }

				all_tds[n].onmouseover = function () { // i hope this will help to get rid of problem of holding the mouse over css for ever 
				all_tds1 = document.getElementsByTagName("td"); // all this is doing refreshing whole page
				 for (var n=0; n<all_tds1.length; n++) {
   					     if (all_tds1[n].id == "normalbox") {
   							all_tds1[n].id = "normalbox";
   					}
				}
								
				this.className = "normalboxoverexp";  // and sets the mouse over effect
				
				}
				all_tds[n].onmouseout  = function () { this.className = "normalboxexp";
				// and same as the mouse in effect when the mouse remove from the box it sets back to the original state 				
				 }

        }
	
	
	
	//
	
		if (all_tds[n].className == "titleboxexp") {
        
            all_tds[n].onclick = function () {
            	  // get the id by finding the text within <a>
                id = this.id; // takes the inside text
             
                mkShutter("result.php?id="+id); // this is the shutter creating function. the id is the text INSIDE the table box.
                
            }

				all_tds[n].onmouseover = function () { // i hope this will help to get rid of problem of holding the mouse over css for ever 
				all_tds1 = document.getElementsByTagName("td"); // all this is doing refreshing whole page
				 for (var n=0; n<all_tds1.length; n++) {
   					     if (all_tds1[n].id == "normalbox") {
   							all_tds1[n].id = "normalbox";
   					}
				}
								
				this.className = "titleboxoverexp";  // and sets the mouse over effect
				
				}
				all_tds[n].onmouseout  = function () { this.className = "titleboxexp";
				// and same as the mouse in effect when the mouse remove from the box it sets back to the original state 				
				 }

        }

	
	
	 }
    
	//// End of addition
	
	
    ajax = getHTTPObject();
    //don't change links if ajax is off
    if (!ajax) return false;
    //crawl all links for the 'shutter' class
    //indexOf for possibility of multiple classes
    
    /*
    links = document.getElementsByTagName('a');  // finds and replaces the all the anchor tags with create new shutter command
    for (i = 0; i < links.length; i++) {
        if (links[i].className.indexOf('shutter') != -1) {
            oldLink = links[i].href;
           links[i].href = "javascript: mkShutter('"+oldLink+"')";
        }
    }*/
    
}

function mkShutter(href) {
	haveshutter=1;
    // some strange instances where shutter could be duplicated
    // after clicking a link and pressing enter.
    if (document.getElementById('newShutter')) return false;
    // check the url for '?'
    op = (href.indexOf('?') != -1) ? '&' : '?';
    // get the data from link via AJAX
    // ajax=on so its possible to tell difference between loading methods
  	ajax.open("GET", href +op+ 'ajax=on', true);
	ajax.onreadystatechange = function () {
	   // if its finished loading
	   if (ajax.readyState == 4) {
            // make a new shutter
            shutter = document.createElement('div');
            shutter.setAttribute('id','newShutter');
            // add it to the page
            document.getElementsByTagName('body')[0].appendChild(shutter);
            // make the info box
            newInfo = document.createElement('div');
            newInfo.setAttribute('id','newInfo');
            // append the ajax-returned html to newInfo
	        newInfo.innerHTML = ajax.responseText;
	        document.getElementsByTagName('body')[0].appendChild(newInfo);
  	        // delete the shutter when clicked on
            shutter.onclick = hideShutter;
	   }
    }
  	ajax.send(null);
}

// remove the shutter and the info box
function hideShutter() {
	haveshutter=0;
    shutter = document.getElementById('newShutter');
    shutter.parentNode.removeChild(shutter);
    newInfo = document.getElementById('newInfo');
    newInfo.parentNode.removeChild(newInfo);   
}

// THE ajax function, from webpasties
function getHTTPObject() {
  var xmlhttp;
  /*@cc_on
  @if (@_jscript_version >= 5)
    try {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (E) {
        xmlhttp = false;
      }
    }
  @else
  xmlhttp = false;
  @end @*/
  if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
    try {
      xmlhttp = new XMLHttpRequest();
    } catch (e) {
      xmlhttp = false;
    }
  }
  return xmlhttp;
}