var altcmd = false;
var TitleCase = new function() {

  // set global vars
  var selection = '';
  var selectionValue = '';
  var selectionTarget = '';
  var selectionInfo = '';
  var $this = this;

  this.altCmdHandler = function(e) {
    $this.checkSettingChanges();
    if (e.altKey && altcmd == true) {
      $this.programSwitch(e.which, selectionInfo, selectionTarget);
      // return false;
    }
  };

  // run this to start application
  this.onLoad = function() {
    $this.checkSettingChanges();
    browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      $this.checkSettingChanges();

      if (request.method != 'check-uncheck') {
        $this.programSwitch(request.method, selectionInfo, selectionTarget);
      }
      return Promise.resolve({response: "Hi from content script"});
    });
    $this.checkSettingChanges();
    // make hooks
    document.addEventListener("mouseup", function(e) { $this.getSelectedText(e); });
    document.addEventListener("keyup", function(e) { $this.getSelectedText(e); });
    document.addEventListener("keydown", function(e) { $this.altCmdHandler(e); });
    $this.checkSettingChanges();
  };

  this.checkSettingChanges = function () {
    let gettingItem = browser.storage.local.get("altcmd");
    gettingItem.then(onGot, onError);
  };

  // get select text
  this.getSelectedText = function(e) {
    selection = window.getSelection();
    selectionValue = e;
    selectionTarget = selection;
    selectionInfo = selectionTarget.toString();
    if (selectionInfo == '' && selectionValue.target.value !== undefined) {
      selectionTarget = selectionValue.target;
      selectionInfo = selectionTarget.value.substring(selectionTarget.selectionStart, selectionTarget.selectionEnd);
    }
  };

  this.programSwitch = function(whereTo, info, selectionTarget) {
    if (info == '' && selectionTarget.value !== undefined) {
      info = selectionTarget.value;
      selectionTarget.selectionStart = 0;
      selectionTarget.selectionEnd = info.length;
    }

    switch (whereTo) {
      case 49: //ALT+1
      case 'propercase':
        TitleCaseChange.properCaseChange(info, selectionTarget);
        break;
      case 50: //ALT+2
      case 'titlecase':
        TitleCaseChange.titleCaseChange(info, selectionTarget);
        break;
      case 51: //ALT+3
      case 'titlecasecc':
        TitleCaseChange.titleCaseCamelChange(info, selectionTarget);
        break;
      case 52: //ALT+4
      case 'startcase':
        TitleCaseChange.startCaseChange(info, selectionTarget);
        break;
      case 53: //ALT+5
      case 'startcasecc':
        TitleCaseChange.startCaseCamelChange(info, selectionTarget);
        break;
      case 54: //ALT+6
      case 'camelcase':
        TitleCaseChange.camelCaseChange(info, selectionTarget);
        break;
      case 55: //ALT+7
      case 'uppercase':
        TitleCaseChange.upperCaseChange(info, selectionTarget);
        break;
      case 56: //ALT+8
      case 'lowercase':
        TitleCaseChange.lowerCaseChange(info, selectionTarget);
        break;
      default:
        // do nothing
    }
  };
};
document.addEventListener("load", TitleCase.onLoad());

function onGot(item) {
  altcmd = item.altcmd;
}

function onError(error) {
  console.log("Error: ${error}");
}
