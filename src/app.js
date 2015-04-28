
// Set jQuery to no conflict mode
jQuery.noConflict();


// Setup Tooltips



// Lets setup some variables

var savePassword = document.getElementById("savePassword");
var password = "";
var password2 = 0;
var password3 = "";
var author;
var title;
var dom = require("ace/lib/dom");
var filename = null;
var exten = "";
var toggle = 0;
var fileExists = false;

// Lets set filename if it is set
filename = window.location.search.replace( "?", "" );

// Define all functions
// Lets save a file
function saveFile() {
	var contents = editor.getSession().getValue();
    jQuery.ajax({
        type: "POST",
        url: "saves/save.php",
        data: {
            contents: contents,
            filename: filename,
            extension: exten,
            author: author,
            title: title,
            key: password,
            background: toggle
        },
        success: function(msg) {
            alert("Saved file:" + filename);
        }
    });
    
};

// Starts Modal for Saving A file
function getInformation() {
	jQuery('#myModal').modal('show');
};

// Saves information from modal and moves to saving the file
function confirmSave(){
	author = document.getElementById("setAuthor").value;
	title = document.getElementById("setTitle").value;
	jQuery('#myModal').modal('hide');
	saveFile();
};


// Retrieves basic information about the file, and opens the contents
function getFile(){
	jQuery.ajax({
        type: "POST",
        url: "saves/open.php",
        data: {
            filename: filename
        },
        success: function(msg) {
            var data = jQuery.parseJSON(msg);
            if(data.error == false) {
            	exten = data.extension;
            	setSyntax(exten);
            	var textToFind = exten.toUpperCase();
				var dd = document.getElementById('syntaxDropDown');
				for (var i = 0; i < dd.options.length; i++) {
				    if (dd.options[i].text.toUpperCase() === textToFind) {
				        dd.selectedIndex = i;
				        break;
				    }
				}
            	author = data.author;
            	title = data.title;
				password = data.key;
				toggle = data.background;
      			editor.getSession().setValue(data.content);
      			if(toggle == 1){
      				editor.setTheme("ace/theme/monokai");
      			}
      			document.getElementById("setAuthor").value = author;
      			document.getElementById("setTitle").value = title;
      			document.getElementById("setPassword").value = password;
            } else {
            	alert("Failed Opening File!");
            }
        }
    });   
};

// Retrieves the password for validation
function getPassword(){
	jQuery.ajax({
        type: "POST",
        url: "saves/password.php",
        data: {
            filename: filename
        },
        success: function(msg) {
            var data = jQuery.parseJSON(msg);
            if(data.error == false) {
            	password2 = data.key;
            	fileExists = true;
            	//alert("yo");
            } else {
            	password2 = 0;
            	alert("Failed Opening File!");
            }
        }
    });
    
};

function makeFullScreen() {
    dom.toggleCssClass(document.body, "fullScreen");
    dom.toggleCssClass(editor.container, "fullScreen");
    editor.resize();
    editor.focus();
};

function toggleTheme() {
    if (toggle == 0){
        editor.setTheme("ace/theme/monokai");
        toggle = 1;
        editor.focus();
    } else {
        editor.setTheme("ace/theme/textmate");
        toggle = 0;
        editor.focus();
    }
};


function setSyntax(extension) {
    exten = extension;
    editor.getSession().setMode("ace/mode/" + extension);
    document.getElementById("filename").innerHTML = filename + "." + exten;
    document.getElementById("filename2").innerHTML = filename + "." + exten;
};

savePassword.onclick = function() {
    password = SHA256(document.getElementById("setPassword").value);
    alert("Password Saved!");
    return false;
};

// Create the editor
var editor = ace.edit("editor");

// Set default values
editor.setTheme("ace/theme/textmate");
editor.getSession().setMode("ace/mode/sql");
editor.focus();


// Check filename, validate, open file
if(filename != "") {
	var getTheFile = false;
	getPassword();
	setTimeout(function () {
		if(password2 != 0 && password2 != null){
			var password3 = SHA256(window.prompt("Please Enter The Password:", "Password"));
			if(password2 == password3){
				getFile();
				getTheFile = true;
			} else {
				getTheFile = false;
				alert("That Password Is Incorrect");
				window.location = "index.html";
			}
		} else if(fileExists == true){
			//alert("made it!");
			getFile();		
		} else {
			alert("File Doesn't Exist, or Error Happend!");
			window.location = "index.html";
		}
    }, 500);
} else {
    editor.setValue("");
    exten = "sql";
    var textToFind = exten.toUpperCase();

	var dd = document.getElementById('syntaxDropDown');
	for (var i = 0; i < dd.options.length; i++) {
	    if (dd.options[i].text.toUpperCase() === textToFind) {
	        dd.selectedIndex = i;
	        break;
	    }
	}

    filename = Math.floor(Math.random()*999999);
}
document.getElementById("filename").innerHTML = filename + '.' + exten;
document.getElementById("filename2").innerHTML = filename + '.' + exten;
document.getElementById("link").innerHTML = '<a href="http://code-bucket-shadowcodex1.c9.io/code.html?' + filename + '"> http://code-bucket-shadowcodex1.c9.io/code.html?' + filename + '</a>';

// Lets add some custom commands

// -- FullScreen -- //
editor.commands.addCommand({
    name: "Toggle Fullscreen",
    bindKey: "F11",
    exec: function(editor) {
        makeFullScreen();
    }
});

// -- Save -- //
editor.commands.addCommand({
    name: "save",
    bindKey: "F12",
    exec: function(editor) {
        getInformation();
    }
});

// -- Change Theme -- //
editor.commands.addCommand({
    name: "theme",
    bindKey: "F10",
    exec: function(editor) {
        toggleTheme();
    }
});


