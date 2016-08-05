# Github Lookup

#### A utility for looking up Github info, project for Epicodus, 8/5/2016

#### By Charlie Baxter

## Description
This site uses the Github API to show info about a queried Github user. If the user is found, it returns their basic info (with a link to that user's Github page) and a list of their repositories (with a link to each repository).  The list of repositories is paginated with the Github API's default of 30 results per page.  It also counts the repositories that do not have a description, which is a feature that I intend to use for myself so I can get those filled in!

## Setup
* ** This site will run without a Github API key, but doing so will limit the number of calls you can make to Github's API to 60 per hour, which this app can exceed fairly easily.** For best results, use a Github Personal Access Token, which can be obtained from the Settings area of your Github account, selecting "Personal Access Tokens," and clicking "Generate New Token."  No special options are required for this key, so you should simply click "Generate Token".  Copy the token down for use later in the setup process.
* Clone this repository.
* Install Node.js by visiting https://nodejs.org/en/download/ and selecting the appropriate installer for your operating system.
* Use your terminal or shell to navigate to the location where you cloned the repository and run the command "npm install".
* Next, run the command "bower install".  All of this project's dependencies should now be loaded.
* If you are using this site with an API key, create a file in the project's root directory called ".env" and type in the following text:

      exports.apiKey = "Your Personal Access Token goes here";
* Be sure that you enclose your Personal Access Token in quotation marks.
* To build the site and set up a development server for you to view it on, run the command "gulp lookup".
* If your browser doesn't automatically load the site, go to http://localhost:3000
* When finished, type Ctrl-c in your console window.

## Technologies Used

* Javascript
* HTML
* CSS
* Node.js
* Bower
* Github API

## Known Bugs
* None

## Features to add:
* See if there's a way to track whether a project has a readme or not using the current API calls

## Contact & Support
If you run into any issues with this page, have any questions, ideas, or concerns, feel free to email me at charlie.r.baxter@gmail.com.

## Legal
Copyright (c) 2016 Charlie Baxter.  This software is licensed under the MIT License.
