import { Meteor } from 'meteor/meteor';
import chalk from 'chalk';
import Twit from 'twit';

Fiber = require('fibers');

Messages = new Meteor.Collection('messages');
Messages.remove({});
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
     
    
    Fiber(Meteor.bindEnvironment(function(){

      setInterval(Meteor.bindEnvironment(function(){

      T.get('search/tweets', { q: 'android', count: 5},
      function (err, data, response) {
        if (err) {
          console.log(chalk.white.bgRed('  ERROR  ') +
            chalk.red(' Twitter keys not working. Please check settings.json'));
          console.log(err);
        } else
        // console.log(data.statuses[0].text);

        Fiber(function(){
          for(var i=0; i< data.statuses.length; i++){
              Messages.insert({message: data.statuses[i].text});
          }
        }).run();

        // Fiber(
        //    Meteor.bindEnvironment(function(){
        //       Messages.insert(data.statuses);    
        //  })).run();

        // console.log(data);
        // console.log(response);
          console.log(chalk.white.bgGreen(' SUCCESS ') + chalk.green(' Twitter keys are working.'));
      });
    }), 5000);

    })).run();
   

});