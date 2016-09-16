// server.js
var express = require('express');
var path = require('path');
var compression = require('compression');
var fs = require('fs');
var morgan = require('morgan');

/** 
 * these imports are required for server side rendering
 */
// import some new stuff
import React from 'react';
// we'll use this to render our app to an html string
import { renderToString } from 'react-dom/server';
// and these to match the url to routes and then render
import { match, RouterContext } from 'react-router';

// make the server use the same routes as the client
import routes from './modules/routes';

var app = express();
app.use(compression());

var logfile = fs.createWriteStream('./logfile.log', {flags: 'a'});
app.use(morgan('combined',  {stream: logfile}));

const enableLogging = true;

// this tells express to use the public directory
app.use(express.static(path.join(__dirname, 'public')));

// the line below will serve files from root including stuff like package.json
// app.use(express.static(__dirname));

/**
 * app.get: respond to get requests
 * 
 */
app.get('*', (req, res) => {
  //logToFile("hello");

  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    // in here we can make some decisions all at once
    if (err) {
      // there was an error somewhere during route matching
      res.status(500).send(err.message)
    } else if (redirect) {
      // we haven't talked about `onEnter` hooks on routes, but before a
      // route is entered, it can redirect. Here we handle on the server.
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      // if we got props then we matched a route and can render
      const appHtml = renderToString(<RouterContext {...props}/>)
      res.send(renderPage(appHtml))
    } else {
      // no errors, no redirect, we just didn't match anything
      res.status(404).send('Not Found')
    }
  })
})

/**
 * renderPage: render the webpage the server will serve
 * @param {string} appHtml The string rendered from the react component
 */
function renderPage(appHtml) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>Universal React App Template</title>
    <link rel=stylesheet href=/index.css>
    <h1>hello</h1>
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
   `
}

function logToFile(string){
  if(enableLogging){
    fs.createReadStream(logfile).pipe(string);
  }
}

var PORT = process.env.PORT || 8081
app.listen(PORT, function () {
  console.log('Production Express server running at localhost:' + PORT)
})