var defaultCollection = "suggestion"
var defaultModel = MODELS[defaultCollection].model


const getSuggestion = async (req, res) => {

  try {
    
    var myHeaders1 = new Headers();
    myHeaders1.append("Content-Type", "application/json");

    var raw1 = JSON.stringify({
    "original": req.query.question
    });

    var requestOptions1 = {
          method: 'POST',
          headers: myHeaders1,
          body: raw1,
          redirect: 'follow'
    };
    
    if(req.query.question.length>1){
        var suggestionObj = await fetch("https://mai.melodymocktail.com/genai/", requestOptions1)
        const res1 = await suggestionObj.json()
        console.log(res1)
        res.send(res1)
    }
    else{
        res.send("error")
    }

  } catch (error) {
    res.send(error)
  }


}

export default getSuggestion