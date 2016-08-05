var apiKey = require('./../.env').apiKey;

function Lookup() {

}

Lookup.prototype.getRepos = function(){
  $.get('https://api.github.com/users/baxterc?access_token=' + apiKey).then(function(response){
    console.log(response);
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

exports.lookupModule = Lookup;
