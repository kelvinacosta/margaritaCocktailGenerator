//Import express , axios and bodyParser
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

//Create an express app and set a port number

const app = express();
const port = 3000;
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';


//Use the public folder for static files.(mildleware)

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

//When user goes to the home page it should render the index.ejs
app.get("/", async (req,res)=>{
    
    
    

    try{
    res.render("index.ejs")
}catch(error){
    console.log(error.response.data);
    res.status(500);
}
})

app.post("/submit", async (req,res)=>{
    
    const result = await axios.get(url);
    const randomObject = Math.floor(Math.random()*result.data.drinks.length);
    const drinks = result.data.drinks;

    try{
    res.render("index.ejs",{
        name: result.data.drinks[randomObject].strDrink,
        category: drinks[randomObject].strCategory,
        instructions: drinks[randomObject].strInstructions,
        image: drinks[randomObject].strDrinkThumb,
        ingredient1 : drinks[randomObject].strIngredient1,
        ingredient2 : drinks[randomObject].strIngredient2,
        ingredient3 : drinks[randomObject].strIngredient3,
        ingredient4 : drinks[randomObject].strIngredient4,


    })
}catch(error){
    console.log(error.response.data);
    res.status(500);
}
})

//Listen on your predefined port and start the server.
app.listen(port,()=>{
    console.log(`Server is running on port ${port}.`)
})