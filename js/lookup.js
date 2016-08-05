var apiKey = require('./../.env').apiKey;

function Lookup() {

}

Lookup.prototype.getRepos = function(){
  $.get('https://api.github.com/users/baxterc/repos?access_token=' + apiKey).then(function(response){
    console.log(response);
    $('#results').empty();
    for (i = 0; i < response.length ; i ++)
    {
      console.log(response[i]);
      $('#results').append("<li><p>Project Name: " + response[i].name + "</p><p>Project Description: " + response[i].description);
    }
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

exports.lookupModule = Lookup;
