var Lookup = require('./../js/lookup.js').lookupModule;

$(document).ready(function(){
  $("#test").click(function() {
    var user = $("#user-lookup").val();
    var currentLookup = new Lookup();
    currentLookup.getRepos(user);
  });
});
