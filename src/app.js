
// Lets setup some variables
var $ = document.getElementById.bind(document);
var savePassword = document.getElementById("savePassword");
var dom = require("ace/lib/dom");
var filename = null;
var toggle = 0;
var syntax = "";

// Create the editor
var editor = ace.edit("editor");

// Set default values
editor.setTheme("ace/theme/textmate");
editor.getSession().setMode("ace/mode/sql");
editor.focus();

// Lets open a file if there is a parameter
editor.setValue("");
document.getElementById('sql').checked = true;

// Lest save a file
saveFile = function() {
    var contents = editor.getSession().getValue();
    filename = Math.floor(Math.random()*99999999999);
    var urlStr = '<%: Url.Content( "save.php" ) %>';
    jQuery.ajax({
        type: "POST",
        url: "./saves/save.php",
        data: {
            contents: contents,
            filename: filename
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
    syntax = extension;
    editor.getSession().setMode("ace/mode/" + extension);
};

savePassword.onclick = function() {
    password = document.getElementById("setPassword").value;
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
