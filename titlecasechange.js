var TitleCaseChange = new function() {
  // set global vars
  var $this = this;
  var exceptionWords = new Array('and', 'the', 'to', 'for', 'is', 'in', 'a', 'at', 'an', 'from', 'by', 'if', 'of');

  this.properCaseChange = function(info, selectionTarget) {
    var newinfo = info.toLowerCase().replace(/(^\s*\w|[\(\)\.\!\?]\s*\w)/g,function(c){return c.toUpperCase()});
    $this.changeSelection(info, newinfo, selectionTarget);
  };

  this.titleCaseChange = function(info, selectionTarget) {
    var newinfo = info.toLowerCase().split(" ");
    newinfo = $this.makeUpperCase(newinfo, false);
    newinfo = newinfo.join(" ").split("\n");
    newinfo = $this.makeUpperCase(newinfo, false);
    newinfo = newinfo.join("\n").split("(");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join("(").split(": ");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join(": ").split(":");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join(":").split("-");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join("-").split("“");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join("“").split("\"");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join("\"");
    $this.changeSelection(info, newinfo, selectionTarget);
  };

  this.titleCaseCamelChange = function(info, selectionTarget) {
    var newinfo = info.split(" ");
    newinfo = $this.makeUpperCase(newinfo, false);
    newinfo = newinfo.join(" ").split("\n");
    newinfo = $this.makeUpperCase(newinfo, false);
    newinfo = newinfo.join("\n").split("(");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join("(").split(": ");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join(": ").split(":");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join(":").split("-");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join("-").split("“");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join("“").split("\"");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join("\"");
    $this.changeSelection(info, newinfo, selectionTarget);
  };

  this.startCaseChange = function(info, selectionTarget) {
    var newinfo = info.toLowerCase().split(" ");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join(" ").split("\n");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join("\n").split("(");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join("(").split(": ");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join(": ").split(":");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join(":").split("-");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join("-").split("“");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join("“").split("\"");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join("\"");
    $this.changeSelection(info, newinfo, selectionTarget);
  };

  this.startCaseCamelChange = function(info, selectionTarget) {
    var newinfo = info.split(" ");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join(" ").split("\n");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join("\n").split("(");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join("(").split(": ");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join(": ").split(":");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join(":").split("-");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join("-").split("“");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join("“").split("\"");
    newinfo = $this.makeUpperCase(newinfo, true);
    newinfo = newinfo.join("\"");
    $this.changeSelection(info, newinfo, selectionTarget);
  };

  this.camelCaseChange = function(info, selectionTarget) {
    var newinfo = info.toLowerCase().replace(/[^a-z ]+/g, ' ').replace(/^(.)|\s(.)/g, function($1) { return $1.toUpperCase(); }).replace(/[^a-zA-Z]+/g, '');
    $this.changeSelection(info, newinfo, selectionTarget);
  };

  this.upperCaseChange = function(info, selectionTarget) {
    var newinfo = info.toUpperCase();
    $this.changeSelection(info, newinfo, selectionTarget);
  };

  this.lowerCaseChange = function(info, selectionTarget) {
    var newinfo = info.toLowerCase();
    $this.changeSelection(info, newinfo, selectionTarget);
  };

  this.changeSelection = function(info, newinfo, selectionTarget) {
    if (selectionTarget.value === undefined) {
      // need to detect rich text field or input/text field
      if (selectionTarget.rangeCount) {
        var range = selectionTarget.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(newinfo));
      }
    } else {
      var start = selectionTarget.selectionStart;
      var finish = selectionTarget.selectionEnd;
      var allText = selectionTarget.value
      var newText = allText.substring(0, start)+newinfo+allText.substring(finish, allText.length);
      selectionTarget.value = newText;
    }
    selectionTarget.selectionStart = start;
    selectionTarget.selectionEnd = start+newinfo.length;
  };

  this.makeUpperCase = function(stringArray, ignoreExceptions) {
    for (i=0;i<stringArray.length;i++) {
      if (i == 0) {
        stringArray[i] = (stringArray[i].substring(0,1)).toUpperCase() + stringArray[i].substring(1);
      } else if(exceptionWords.indexOf(stringArray[i]) < 0 || ignoreExceptions) {
        stringArray[i] = (stringArray[i].substring(0,1)).toUpperCase() + stringArray[i].substring(1);
      }
    }
    return stringArray;
  };
};
