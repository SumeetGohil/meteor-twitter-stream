import { Meteor } from 'meteor/meteor';
import chalk from 'chalk';
import Twit from 'twit';

Meteor.startup(() => {
  // code to run on server at startup
  chalk.enabled = true;

  // Check if Twitter keys are present
  if ((!Meteor.settings.private.twitter.consumer_key ||
      !Meteor.settings.private.twitter.consumer_secret) ||
     (!Meteor.settings.private.twitter.consumer_key &&
      !Meteor.settings.private.twitter.consumer_secret)) {
    console.log(chalk.white.bgRed('  ERROR  ') +
      chalk.red(' Twitter keys not found. Please check settings.json'));
  } else
    console.log(chalk.white.bgGreen(' SUCCESS ') +
      chalk.green(' Twitter keys found.'));

  var T = new Twit(Meteor.settings.private.twitter);
  T.get('search/tweets', { q: 'android', count: 1 },
  function (err, data, response) {
    if (err) {
      console.log(chalk.white.bgRed('  ERROR  ') +
        chalk.red(' Twitter keys not working. Please check settings.json'));
      console.log(err);
    } else
      console.log(chalk.white.bgGreen(' SUCCESS ') + chalk.green(' Twitter keys are working.'));
  });
});
