var apiKey = require('./../.env').apiKey;

function Lookup() {

}

Lookup.prototype.getRepos = function(username){
  $.get('https://api.github.com/users/' + username + '?access_token=' + apiKey).then(function(usernameResponse){
    console.log(usernameResponse);
    $('#user-full-name').empty();
    $('#user-repo-number').empty();
    $("#user-full-name").html("<a href=http://www.github.com/" + username+ "><h3>" + usernameResponse.name + "</h3></a>");
    $("#user-repo-number").html("<h4>Total Number of Repositories: " + usernameResponse.public_repos + "</h4>");
  });
  $.get('https://api.github.com/users/' + username + '/repos?access_token=' + apiKey).then(function(response){
    console.log(response);
    $('#results').empty();
    $('#user-image').empty();
    $('#user-image').html("<img src='" + response[0].owner.avatar_url + "'>");

    for (i = 0; i < response.length ; i ++)
    {
      var createDate = response[i];
      $('#results').append("<li><p>Project Name: <a href='" + response[i].svn_url + "'>" + response[i].name + "</a>" +
      "</p><p>Project Description: " + response[i].description +
      "</p><p>Project Created on " + dateConverter(response[i].created_at) +
      "<hr>");
    }
  }).fail(function(error){
    console.log(error.responseJSON.message);
    if (error.responseJSON.message === "Not Found") {
      $('#results').empty();
      $('#results').html("<h3>Username Not Found</h3>");
    }

  });
};

function dateConverter(convertDate) {
  var converted = new moment(convertDate).format('MMMM Do YYYY, h:mm:ss a');
  return converted;
}

exports.lookupModule = Lookup;
