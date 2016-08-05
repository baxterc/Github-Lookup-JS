var Lookup = require('./../js/lookup.js').lookupModule;

$(document).ready(function(){
  $("#test").click(function() {
    var currentLookup = new Lookup();
    currentLookup.getRepos();
  });
});
