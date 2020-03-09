# TableManager

## Project Description 

Table Manager is a simple, streamlined, and user-friendly application that allows restaurant owners and staff to build their custom restaurant layout from scratch, assign customers to tables, and track those customers' meals - individual items and meal stages - from start to finish. By using this app, we hope that users will be able to process customers through the restaurant as efficiently as possible - and that the difficult nature of running a restaurant is made easier.

## Table of Contents 

1. [Installations & Dependencies](##Installations-And-Dependencies)

2. [Usage](##Usage) 

3. [Additional Contributors](##Additional-Contributors)

4. [Licensing](##License) 

5. [Testing](##Testing)

## Installations and Dependencies 

1. Express
2. Express Handlebars
3. mySQL2
4. sequelize
5. sequelize-CLI
6. dotenv

## Usage 

> IMPORTANT: Please ensure that all node modules have been installed in the local directory, and that the SQL database has been created on your local machine, before beginning.
> After proper installations and setup, begin the server through node.js (">node server.js") and navigate to the server where listed in the CLI. You may then interact with the program. 

To begin, the user may use the topside navbar of Table Manager to construct their restaurant within the app. To add tables to the restaurant, navigate to the Create Table portion of the navbar and select the number of seats you would like for the table (the app currently allows 2, 4, or 6-seat tables). Clicking the "Build" button will then add that table to the visual display, complete with the correct number of seats. Within the same navbar, clicking "View Menu" will display the current restaurant menu, which consists of names, prices, and approximate cook times (in minutes). Within this modal, users can also choose to add or delete menu items.

Within the visual display, consisting of the entire site underneath the navbar, all created tables within the restaurant will appear. By interacting with (clicking on) these tables, additional information will be displayed. Initially, clicking on a table will display a menu, which can be filled in the customers' order. Clicking the submit button here will change the status of the table to occupied, and subsequent clicks on the table will then display the listed order for reference. Users may then also use this display for tracking the progress of the meal - as the meal progresses, users can click on the current meal section (appetizer, entree, dessert), which will color-code the tables according to that section. A quick scan of the total display should then reveal where each and every table is at within a meal, allowing users to efficiently serve and clear tables. 

Future developments will rework the display with React.js, and include additional functionality such as the ability to delete tables within the display area.

## Contributors 

1. [Justin Lin](https://github.com/Chih-Chien-Lin)
2. [Kevin Salamon](https://github.com/kevin-salamon)
3. [Kenny Lam](https://github.com/Thewa55)
4. [Kimia Darden](https://github.com/kimiadarden)

> Additional use of: 
> 1. CSSWAND

## License 

N/A

## Testing 

N/A
