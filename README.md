![](https://i.imgur.com/oBGr0mf.png)

> [Play Flying Solo](https://karannavani.github.io/wdi-project-one/)

# Goal
To build a fun and interesting game, using Javascript or jQuery for DOM manipulation.

# Game
![](https://i.imgur.com/XXlUwEV.png)

Flying Solo is a spin on the classic addictive game – Flappy Bird, with a Star Wars theme.

The aim of the game is to fly Han Solo (or any other character) between the column of pipes without hitting them. 

There is a single player mode and a multiplayer mode.
# Technologies Used
* HTML 5
* CSS 3
* Javascript (ECMAScript 6)
* jQuery
* Github
* Git
* Google Fonts
* CSS Animations

# Approach Taken

Throughout the project, I used Trello to manage the 

1. My challenge was to figure out what would be the best way to implement this in a browser using Javascript. I decided that having the character fixed on the x axis and having the pipes move toward it would be an efficient way to get started. 
 	
 **	insert screenshot of drawing on paper**	

2. I added a simple box div, which would lay as foundation for Han Solo and future characters. I also added some divs to act as columns.

3. With the basic HTML structure in place, I decided to make the elements more dynamic. Instead of cluterring the DOM with ever present columns of pipes, I wrote a function to generate them dynamically at a set interval, as long as the game is still running.

 **	insert video**
 
4. After that the essential game elements were in place, I had to figure out how to detect collision. This is detailed below in the 'Wins' section.

5. In order to make the character motion smoother, I implemented gravity to have the parabolic effect that the original Flappy Bird introduced. This made for more realistic jumps and descents.
