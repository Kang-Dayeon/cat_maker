# Cat Maker 🐈

<img src="https://github.com/Kang-Dayeon/cat_maker/assets/94333816/fae2f611-179d-4610-8146-9c0026445afe" />

## Description
Grow a cat by feeding it and exercising it!
* Test user info
<pre>
<code>
ID : cat
PW : 123123
</code>
</pre>
  

## Stacks
* Environment
  - Visual Studio Code
  - github
  
* config
  - NPM
  
* Development
  - React
  - Recoil
  - React Router
  - Styled component
  - css

## Requirements

* Node.js 16.17.0
* Npm 8.15.0
* React 18.2.0
* React-router-dom 6.8.1
* Recoil 0.7.6

## Installation
<pre>
<code>// ** start
$ npm install
$ npm start
  
// ** build
$ npm run build</code>
</pre>

## Main Function
1. You can feed your cat 3 types of food Weight increases differently depending on the type of food, and the cat may reject the food
2. Age and condition change according to weight
3. You lose weight after exercise and cannot eat while exercising.
4. Cats die when they are over 15 years old
5. You can add and delete new cats
6. If you start feeding them and leave them for a certain period of time, they lose weight and age
7. You can create an account and sign in and sign out
8. Data is not deleted on refresh

## Architecture

<pre>
<code>
├─node_modules
├─public
└─src
    ├─assets
    │  └─image
    ├─component
    ├─database
    ├─hooks
    ├─layouts
    ├─pages
    │  ├─detail
    │  ├─login
    │  ├─new
    │  └─profile
    ├─recoil
    ├─redux
    └─router
        └─routes
    </code>
    </pre>
