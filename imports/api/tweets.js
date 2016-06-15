// Store tweets based on search term (KeywordDB) in database

import { Mongo } from 'meteor/mongo';

import KeywordDB from './search.js';

export const TweetDB = new Mongo.Collection('tweetdb');

Meteor.methods({
  'TweetDB.insert'() {

    var keyword = KeywordDB.findOne();
    var T = new Twit(Meteor.settings.private.twitter);

    // console.log(keyword.text);
    if (keyword === '') {

      // If no search term specified, then get random tweets
      T.get('search/tweets', { q: 'android', count: 100 },
      function (err, data, response) {
        if (err) {
          console.log(chalk.white.bgRed('  ERROR  ') +
            chalk.red(' Unable to get tweets.'));
          console.log(err);
        } else
          console.log(chalk.white.bgGreen(' SUCCESS ') + chalk.green(' Fetched random tweets.'));
      });
    } else {

      // Get tweets as per search term
      T.get('search/tweets', { q: 'android', count: 100 },
      function (err, data, response) {
        if (err) {
          console.log(chalk.white.bgRed('  ERROR  ') +
            chalk.red(' Unable to get tweets.'));
          console.log(err);
        } else
          console.log(chalk.white.bgGreen(' SUCCESS ') + chalk.green(' Fetched tweets.'));
      });
    }

    TweetDB.insert({
      text,
      createdAt: new Date(),
    });
  },
});
