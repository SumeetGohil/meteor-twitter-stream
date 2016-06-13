// This stores the keyword to be searched on Twitter.

export const KeywordDB = new Mongo.Collection('keyword');

Meteor.methods({

  'KeywordDB.update'(keywoordID, text) {
    Tasks.update(taskId, { $set: { text: text } });
  },
});
