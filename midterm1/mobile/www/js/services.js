angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Goldfinch',
    lastText: '2016-11-28 17:34:58',
    face: 'img/american_goldfinch.jpg'
  }, {
    id: 1,
    name: 'Cassins Finch',
    lastText: '2016-11-27 07:28:21',
    face: 'img/cassins_finch.jpg'
  }, {
    id: 2,
    name: 'Titmouse',
    lastText: '2016-11-25 07:42:30',
    face: 'img/black-crested_titmouse.jpg'
  }, {
    id: 3,
    name: 'Woodpecker',
    lastText: '2016-11-22 08:13:42',
    face: 'img/downy_woodpecker.jpg'
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
          return chats[i];
        }
      }
      return null;
    }
  };
});
