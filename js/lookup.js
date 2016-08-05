var apiKey = require('./../.env').apiKey;
var repos = 0;

function Lookup() {

}

Lookup.prototype.getRepos = function(username, page){
  $('#results').empty();
  $('#user-image').empty();
  $('#user-full-name').empty();
  $('#user-repo-number').empty();
  var usernameAccessString = "";
  var repoAccessString = "";
  //Logic check to see if the user has provided an API key; if so, it will be placed in two separate strings for use in the API calls below
  if (apiKey !== undefined) {
    usernameAccessString = '?access_token=' + apiKey;
    repoAccessString = '&access_token=' + apiKey;
  }

  //Gets user info that is not included in the API call for the list of repositories.
  if (page === 1) {
    $.get('https://api.github.com/users/' + username + usernameAccessString).then(function(usernameResponse){
      $("#user-full-name").html("<a href=http://www.github.com/" + username+ "><h3>" + usernameResponse.name + "</h3></a>");
      $("#user-repo-number").html("<h4>Total Number of Repositories: " + usernameResponse.public_repos + "</h4>");
      repos = usernameResponse.public_repos;
    });
  }

  //Gets an array of repositories and displays them in index.html's <ul>; takes the page parameter and returns that page's results
  $.get('https://api.github.com/users/' + username + '/repos?page=' + String(page) + '&per_page=30' + repoAccessString).then(function(response){
    $("#user-no-repo-desc").empty();
    var noDescCount = 0;
    $('#user-image').html("<img src='" + response[0].owner.avatar_url + "'>");
    for (i = 0; i < response.length ; i ++)
    {
      var description = "";
      if (response[i].description === "" || response[i].description === null) {
        description = "<b>There is no description entered for this project!</b>";
        noDescCount ++;
      } else {
        description = response[i].description;
      }
      var createDate = response[i];
      $('#results').append("<li><p>Project Name: <a href='" + response[i].svn_url + "'>" + response[i].name + "</a>" +
      "</p><p>Project Description: " + description +
      "</p><p>Project Created on " + dateConverter(response[i].created_at) +
      "<hr>");
    }

  //Rendering the next page button
  if (page * 30 < repos)
  {
    $('#next-page-button').html("<button type='button' name='next-page' id='next-page'>Next Page</button>");
  } else {
    $('#next-page-button').empty();
  }

  //Rendering the previous page button
  if (page <= 1 )
  {
    $('#prev-page-button').empty();
  } else {
    $('#prev-page-button').html("<button type='button' name='prev-page' id='prev-page'>Previous Page</button>");
  }
  $("#user-no-repo-desc").html("<h4>Repositories on this page without descriptions: " + noDescCount + " (30 repositories per page)</h4>");

  //Error handling
  }).fail(function(error){
    if (error.responseJSON.message === "Not Found") {
      emptyDivs()
      $('#results').html("<h3>Error: The username you entered was not found.</h3>");
    } else if (error.responseJSON.message === "Bad credentials") {
      emptyDivs()
      $('#results').html("<h3>Error: The API key provided was not valid.  Please verify that the API key entered in your .env file is the same as the token provided to you by Github.</h3>");
    } else if (error.responseJSON.message.includes("API rate limit exceeded")) {
      emptyDivs()
      $('#results').html("<h3>Error: You have exceeded the API rate limit.  If you are not using an API key in your .env file, consider getting one from Github to increase your rate limit.</h3>");
    }
  });


};

//Formats the creation date
function dateConverter(convertDate) {
  var converted = new moment(convertDate).format('MMMM Do YYYY, h:mm:ss a');
  return converted;
}

function emptyDivs() {
  $('#results').empty();
  $('#user-image').empty();
  $('#user-full-name').empty();
  $('#user-repo-number').empty();
  $('#next-page-button').empty();
  $('#prev-page-button').empty();
  $('#user-no-repo-desc').empty();
}

exports.lookupModule = Lookup;
