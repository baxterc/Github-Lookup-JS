var apiKey = require('./../.env').apiKey;

function Lookup() {

}
var repos = 0;
Lookup.prototype.getRepos = function(username, page){
  $('#results').empty();
  $('#user-image').empty();
  $('#user-full-name').empty();
  $('#user-repo-number').empty();
  if (page === 1) {
    $.get('https://api.github.com/users/' + username + '?access_token=' + apiKey).then(function(usernameResponse){
      console.log(usernameResponse);
      $("#user-full-name").html("<a href=http://www.github.com/" + username+ "><h3>" + usernameResponse.name + "</h3></a>");
      $("#user-repo-number").html("<h4>Total Number of Repositories: " + usernameResponse.public_repos + "</h4>");
      repos = usernameResponse.public_repos;
    });
  }
  $.get('https://api.github.com/users/' + username + '/repos?page=' + String(page) + '&per_page=30&access_token=' + apiKey).then(function(response){
    console.log(response);
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
  console.log(page * 30);
  console.log(repos)
  if (page * 30 < repos)
  {
    $('#next-page-button').html("<button type='button' name='next-page' id='next-page'>Next Page</button>");
  } else {
    $('#next-page-button').empty();
  }

  if (page <= 1 )
  {
    $('#prev-page-button').empty();
  } else {
    $('#prev-page-button').html("<button type='button' name='prev-page' id='prev-page'>Previous Page</button>");
  }

  $("#user-no-repo-desc").html("<h4>Repositories on this page without descriptions: " + noDescCount + " (30 repositories per page)</h4>");
  }).fail(function(error){
    console.log(error.responseJSON.message);
    if (error.responseJSON.message === "Not Found") {
      $('#results').empty();
      $('#results').html("<h3>No Repositories Found</h3>");
    }
  });


};

function dateConverter(convertDate) {
  var converted = new moment(convertDate).format('MMMM Do YYYY, h:mm:ss a');
  return converted;
}

exports.lookupModule = Lookup;
