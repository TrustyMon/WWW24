const trustedTypesCallbacks = trustedTypes.createPolicy('default', {
  createHTML: function(htmlString) {
    htmlString = htmlString.trim();
    let x = handleTrustedHTML(htmlString);
    let hash = x.hash
    if (x.asts.length == 0) return htmlString;
    let c = initURL();
    sampleDict[c][htmlString.substr(0, BROWSER_DEFAULT_SAMPLE_LENGTH)] = 
    {
      type: TRUSTED.HTML,
      hash: hash,
      content: htmlString
    };
    if (isValid(TRUSTED.HTML, hash)) {
      return htmlString;
    }
    else {
      return;
    }
  },
  createScript: function(script) {    
    let x = handleTrustedScript(script);
    let c = initURL();
    let hash = x.hash;
    if (c == '[]') return script;
    sampleDict[c][script.substr(0, BROWSER_DEFAULT_SAMPLE_LENGTH)] = 
    {
      type: TRUSTED.Script,
      hash: hash,
      content: script
    };

    if (isValid(TRUSTED.Script, hash)) {
      return script;
    }
    else {
      return;
    }
  },
  createScriptURL: function(scriptURL) {
    let hash = handleTrustedScriptURL(scriptURL);
    let c = initURL();
    sampleDict[c][scriptURL.substr(0, BROWSER_DEFAULT_SAMPLE_LENGTH)] = 
    {
      type: TRUSTED.ScriptURL,
      hash: hash,
      content: scriptURL
    };

    if (isValid(TRUSTED.ScriptURL, hash)) {
      return scriptURL;
    }
    else {
      return;
    }
  }
})
