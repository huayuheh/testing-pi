angular.module('starter.services', [])

  .factory('Chats', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 0,
      name: 'Tree Sparrow',
      lastText: 'You on your way?',
      face: 'img/american_crow.jpg'
    }, {
      id: 1,
      name: 'Gold Finch',
      lastText: 'Hey, it\'s me',
      face: 'img/american_goldfinch.jpg'
    }, {
      id: 2,
      name: 'Tree Sparrow',
      lastText: 'I should buy a boat',
      face: 'img/american_tree_sparrow.jpg'
    }, {
      id: 3,
      name: 'Band Tailed Pigeon',
      lastText: 'Look at my mukluks!',
      face: 'img/band-tailed_pigeon.jpg'
    }, {
      id: 4,
      name: '',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
    }];

    return {
      all: function() {
        return chats;
      },
      remove: function(chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function(chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chaçts[i];
          }
        }
        return null;
      }
    };
  });
