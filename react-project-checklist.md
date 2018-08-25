## Planning
Copy this list into your project
Outline functionality of your app
Draw main views of app
Break out components from your views
Name your components
Draw component hierarchy
Plan routing
Label where you will require functions that change state
Label where you will require data
Determine from this where you will require state & hold functions

## Setup
Create your app directory (e.g. with create-react-app)
Run your app
Git init (unless cloned!), gitignore config, make an initial commit
Ensure you have React DevTools running

## Static
Make blank components (functional or class?) as per your plan
Create reuasable components e.g. buttons, inputs
Export and import components as per your hierarchy
Check everything is hooked up
    - you may want to add positional styling here to match your planned layout. DO NOT do any cosmetic styling yet!
Write static render methods with mock data
Add expected propTypes (adapt this as necessary)

## Dynamic (order may be a bit looser here!)
Create .api file
Construct componentDidMount functions
Create functions that setState
Add expected props to component instantiation
Add mapping / looping for creating multiple components
Deal with component lifecycle issues, e.g. making new api calls on componentDidUpdate
Add event handlers

## Style
Add classNames
Create and .css files
Write application CSS - sitewide styling choices like fonts, colour pallettes
Write component specific CSS

POST /api/topics/:topic_slug/articles
Add a new article to a topic. This route requires a JSON body with a title and body key/value pairs 
e.g: {"title": "This is a new rticle", "body": "I am a very lond article."

PUT /api/articles/:article_id
Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down' 
e.g: https://ncnewsbend.herokuapp.com/api/articles/:article_id?vote=up

PUT /api/comments/:comment_id
Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down' 
e.g: https://ncnewsbend.herokuapp.com/api/comments/:comment_id?vote=down

GET /api/users/:username
Returns a JSON object with the profile data for the specified user.