# Tweet Streamer

Simple app to stream Twitter tweets using [Meteor](www.meteor.com)


To run your app open terminal and type:

    $ meteor --settings settings.json


To run your app in Cloud9 IDE, open terminal and type:

    $ meteor --settings settings.json --port $IP:$PORT

## `settings.json`

Create settings.json as shown below.

	{
	  "public": {},
	  "private": {
	    "twitter": {
	      "consumer_key": "",
	      "consumer_secret": "",
	      "access_token": "",
	      "access_token_secret": ""
      }
    }
  }
