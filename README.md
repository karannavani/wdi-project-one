![](https://i.imgur.com/oBGr0mf.png)

> **[Play Flying Solo](https://karannavani.github.io/wdi-project-one/)**

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
Throughout the project, I used Trello to manage my tasks and list down priorities. This helped me tackle the most important issues first and allowed me to lay down a strong foundation.

![](https://i.imgur.com/C5RiNtg.jpg)

### Core functionality

1. My challenge was to figure out what would be the best way to implement this in a browser using Javascript. I decided that having the character fixed on the x axis and having the pipes move toward it would be an efficient way to get started. 
 	
 **insert screenshot of drawing on paper**	

2. I added a simple box div, which would lay as foundation for Han Solo and future characters. I also added some divs to act as columns.

3. With the basic HTML structure in place, I decided to make the elements more dynamic. Instead of cluterring the DOM with ever present columns of pipes, I wrote a function to generate them dynamically at a set interval, as long as the game is still running.

 **insert video**
 
4. After the essential game elements were in place, I had to figure out how to detect collision. This is detailed below in the 'Wins' section.

5. In order to make the character motion smoother, I implemented gravity to have the parabolic effect that the original Flappy Bird introduced. This made for more realistic jumps and descents.

### Bonus Features

After achieving my core objectives, I decided to introduce a few more features that would improve user experience and interactivity.

1. **Scoreboard** – During user testing, a question that always came up was, "what's the highscore?". Based on this, I decided to make use of local storage for storing highscores and I displayed the leaderboard on the main game screen.

	Introducing competitiveness made the game immediately more exciting as everyone around me tried to beat each other's score.
	
2. **Multiplayer Mode** – After noticing how much people enjoyed competing after I introduced the leaderboard, the next logical enhancement seemed to be a multiplayer feature. In this mode I added the ability for two players to play simultaneously on the same machine and have individual score counts.

3. **Character Selection** – A friend suggested to me that having a Light Side vs Dark Side battle would be a fun feature to introduce. So I decided to implement a character selection feature for fun. Surprisingly, it ended up impacting the user experience more than I had anticipated and it also helped to craft a more polished game.
