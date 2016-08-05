var apiKey = require('./../.env').apiKey;

function Lookup() {

}

Lookup.prototype.getRepos = function(username){
  $.get('https://api.github.com/users/' + username + '/repos?access_token=' + apiKey).then(function(response){
    console.log(response);
    $('#results').empty();
    for (i = 0; i < response.length ; i ++)
    {
      var createDate = response[i]
      $('#results').append("<li><p>Project Name: " + response[i].name +
      "</p><p>Project Description: " + response[i].description +
      "</p><p>Project Created on " + dateConverter(response[i].created_at) +
      "<hr>");
    }
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

function dateConverter(convertDate) {
  var converted = new moment(convertDate).format('MMMM Do YYYY, h:mm:ss a');
  return converted;
}

exports.lookupModule = Lookup;
