const { Configuration, OpenAIApi } = require("openai");
const {API_KEY} = require("./apiKey");//if you want to try it you should enter your own openAi api key in the "apiKey.js" file
const path = require('path');
const express = require("express");
const app = express();
const PORT = 3000;




const config = new Configuration({
    apiKey: API_KEY,
});
const openai = new OpenAIApi(config)

let recipe;
let jsonRecipe;
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))



app.get('/new', (req, res)=>{
    res.render('new')
})
app.post('/', (req, res)=>{
    const ingredients = req.body.ingredients
    console.log(ingredients)
    openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: 'user', content: `Recipe according to the following ingredients: ${ingredients} as an html according to the following pattern: 
        <h2>recipe title</h2>
        <ul>
            <h3>Ingredinets:</h3>
        
            <li>ingredient 1</li>
            <li>ingredient 2</li>
            <li>ingredient 3</li>
            ...
        </ul>
        <ul>
            <h3>Directions:</h3>
            
            <li>direction 1</li>
            <li>direction 2</li>
            <li>direction 3</li>
            ...
        </ul>`}]
    })
    .then(result=>{
        recipe = result.data.choices[0].message.content //should push recipe into database
        console.log(recipe)
        res.redirect('/show/1') // '/show/1' should be changed to '/show/id'
    })
    //######THIS IS TESTING PART########
    // recipe = `<h2>recipe title</h2>
    //     <ul>
    //         <h3>Ingredinets:</h3>
        
    //         <li>ingredient 1</li>
    //         <li>ingredient 2</li>
    //         <li>ingredient 3</li>
    //         ...
    //     </ul>
    //     <ul>
    //         <h3>Directions:</h3>
            
    //         <li>direction 1</li>
    //         <li>direction 2</li>
    //         <li>direction 3</li>
    //         ...
    //     </ul>`//temp assignment
    //jsonRecipe = htmlToJson(recipe)
    // res.redirect('/show/1') //temp line
    // console.log("in post route")
    //#########################################
    
})

app.get('/show/:id', (req, res)=>{
    //should run db search by id and assign to recipe
   
    const {id} = req.params
    res.render('show', {recipe}) 
    
})
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
});

