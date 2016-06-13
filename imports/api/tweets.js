// Store tweets based on search term (KeywordDB) in database

import { Mongo } from 'meteor/mongo';

import KeywordDB from './search.js';

export const TweetDB = new Mongo.Collection('tweetdb');

Meteor.methods({
  'TweetDB.insert'() {

    var keyword = KeywordDB.findOne();
    console.log(keyword.text);
    var T = new Twit(Meteor.settings.private.twitter);
    T.get('search/tweets', { q: 'android', count: 100 },
    function (err, data, response) {
      if (err) {
        console.log(chalk.white.bgRed('  ERROR  ') +
          chalk.red(' Twitter keys not working. Please check settings.json'));
        console.log(err);
      } else
        console.log(chalk.white.bgGreen(' SUCCESS ') + chalk.green(' Twitter keys are working.'));
    });

    TweetDB.insert({
      text,
      createdAt: new Date(),
    });
  },
});
