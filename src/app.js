
// Set jQuery to no conflict mode
jQuery.noConflict();


// Setup Tooltips



// Lets setup some variables
var $ = document.getElementById.bind(document);
var savePassword = document.getElementById("savePassword");
var password = "";
var author = "";
var title = "";
var dom = require("ace/lib/dom");
var filename = null;
var exten = "";
var toggle = 0;

// Create the editor
var editor = ace.edit("editor");

// Set default values
editor.setTheme("ace/theme/textmate");
editor.getSession().setMode("ace/mode/sql");
editor.focus();

// Lets open a file if there is a parameter
filename = window.location.search.replace( "?", "" );


if(filename != "") {
    //pull information from database...
    //check for password
    //load it!
} else {
    editor.setValue("");
    document.getElementById('sql').checked = true;
    filename = Math.floor(Math.random()*999999);
    exten = ".sql";
}
document.getElementById("filename").innerHTML = filename + exten;
document.getElementById("link").innerHTML = '<a href="http://localhost/?' + filename + '"> http://localhost/?' + filename + '</a>';



// Lest save a file
saveFile = function() {
    var contents = editor.getSession().getValue();
    jQuery.ajax({
        type: "POST",
        url: "./saves/save.php",
        data: {
            contents: contents,
            filename: filename,
            extension: exten,
            author: author,
            title: title,
            key: password
        },
        success: function(msg) {
            alert("Saved file:" + filename);
        }
    });
    
};

makeFullScreen = function() {
    dom.toggleCssClass(document.body, "fullScreen");
    dom.toggleCssClass(editor.container, "fullScreen");
    editor.resize();
    editor.focus();
};

toggleTheme = function() {
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


setSyntax = function(extension) {
    exten = extension;
    editor.getSession().setMode("ace/mode/" + extension);
    document.getElementById("filename").innerHTML = filename + "." + exten;
};

savePassword.onclick = function() {
    password = SHA256(document.getElementById("setPassword").value);
    alert("Password Saved!");
    return false;
}

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
        saveFile();
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


