# Contents of this directory

orig.html is the sample code provided by Leap for coding a Hello World in Javascript.

While playing with that I found that the code was harder than necessary to understand, so simple changes were bug-prone. 

I refactored the original sample into two files. Javascript went into leap-skeleton.js. Markup went into leap-skeleton.html. The goal of my architecture was to make it easy to plug new code new. The strategy was to provide a pre-packaged iterator for the frame data, whose purpose was to walk the data structure, emitting events for handlers.

A developer would then only have to handle events as needed for their specific application.

In leap-skeleton.html I created a harness for developing features of my refactored HTML. For example, it has a simplified approach to logging frame data to the browser.

I built on that framework to create a game. Source for this is in game.html. 

A player gets three turns. The goal is to complete them as quickly as possible. At the beginning of a turn the game asks the player to hold up a certain number of fingers. Once the Leap sees that the player has done that, the turn is over. The player's score at the end of the game is their total time.

