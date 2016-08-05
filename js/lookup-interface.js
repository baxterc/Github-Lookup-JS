var Lookup = require('./../js/lookup.js').lookupModule;
var page = 0;

$(document).ready(function(event){

  $("#test").click(function() {
    page = 1;
    var user = $("#user-lookup").val();
    var currentLookup = new Lookup();
    currentLookup.getRepos(user, page);
  });
  $("#next-page-button").click(function() {
    page ++;
    console.log(page);
    var user = $("#user-lookup").val();
    var nextLookup = new Lookup();
    nextLookup.getRepos(user, page);
  });
  $("#prev-page-button").click(function() {
    page --;
    console.log(page);
    var user = $("#user-lookup").val();
    var nextLookup = new Lookup();
    nextLookup.getRepos(user, page);
  });
});
