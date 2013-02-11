rt3 - Real Time Tweet Tracking

WHAT DOES IT DO?
================

This is a simple application that grabs tweets from the Twitter Streaming API (https://dev.twitter.com/docs/streaming-apis) using a keyword that you specify and then stores the information in a database for later data mining.

As you connect to the root route, the 10 latest tweets will be loaded onto the page. Once your browser has connected to the backend web socket, it will then also update with the latest tweets of that keyword.

Basically, you can see what the tweets are saying real time, and you have them in a DB for later use.

WHAT TECHNOLOGY IS USED HERE?
=============================

Backend:
--------
MongoDB - Backend DB
Express - Backend Framework

Frontend
--------
Jade - Templating Engine
jQuery - JavaScript library

Other
-----
Socket.io - Real Time Data w/ Web Sockets
Twitter Streaming API

HOW DOES I RUN IT?
==================

1. Download the app
2. cd rt3 && npm install
3. Rename /configs/twitter_options.js to my_twitter_options.js and fill in your own twitter credentials and change the track=bieber to whatever keyword you would like to collect
4. Start mongodb locally
    mongod
5. Start the node server
    npm start
or
    node app.js

6. Load page at localhost:3000 (or whatever port you chose)

TO DO:
======

1. Style the whole app
2. General clean up
3. Need to use some templates for the front end (maybe Mustache??)
4. Create data mining part of the app

MIT License
===========

Copyright (c) 2012 Chase Coney

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.