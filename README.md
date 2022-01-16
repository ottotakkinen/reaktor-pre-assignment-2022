# Reaktor Pre-Assignment 2022 - Rock Paper Scissors

Reaktor's pre-assignment 2022 was to create a Rock Paper Scissors website. The requirements were to show live games using the WebSocket API and enable to user to search for players. After searching, the user should see the number of games played, winrate and most played hand.


## Live Site

This project is live on Vercel here:

[https://reaktor-pre-assignment-2022.vercel.app/](https://reaktor-pre-assignment-2022.vercel.app/ "Live Site")


## Technologies

Next.js  
axios  
CSS Modules

## About

The website consist of two sections: Player search and Live games. The player search allows users to search for a player to show more stats. As there are a lot of games already in the database, the user can load more games via a button. The live games section handles websocket games to display ongoing games and after they are resolved, the results.

The live games section's player names are clickable to instantly search for that player.

## Things I learned

- The API layer in Next.js
- Cursor based pagination and the difficulties when there are a lot of pages
- Recursively calling 
- Animating container height when child elements are added in React

## Todo

- Closing the player search 
- Making the focusable Live game players also work with the enter key (now only clickable)

