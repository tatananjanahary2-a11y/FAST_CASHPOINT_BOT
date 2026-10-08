const express = require("express");
const { generateResponse } = require("./intelligent-engine");
const session = require("express-session");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

const DATA = path.join(__dirname, "data");
const TRAINING_FILE = path.join(DATA, "training.json");
const CHAT_FILE = path.join(DATA, "conversations.json");

if (!fs.existsSync(DATA)) fs.mkdirSync(DATA);

if (!fs.existsSync(TRAINING_FILE))
    fs.writeFileSync(TRAINING_FILE, "[]");

if (!fs.existsSync(CHAT_FILE))
    fs.writeFileSync(CHAT_FILE, "[]");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        httpOnly:true,
        maxAge: 1000 * 60 * 60 * 8
    }
}));

app.use(express.static(path.join(__dirname,"public")));

function readJSON(file){
    try{
        return JSON.parse(fs.readFileSync(file,"utf8"));
    }catch(e){
        return [];
    }
}

function writeJSON(file,data){
    fs.writeFileSync(file,JSON.stringify(data,null,2));
}

function normalize(text){
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g,"");
}

function findTraining(message){

    const training = readJSON(TRAINING_FILE);
    const text = normalize(message);

    let best = null;
    let bestScore = 0;

    for(const item of training){

        const words = normalize(item.question)
            .split(/\s+/)
            .filter(x => x.length > 2);

        let score = 0;

        for(const word of words){
            if(text.includes(word)) score++;
        }

        if(score > bestScore){
            bestScore = score;
            best = item;
        }
    }

    return bestScore >= 1 ? best : null;
}

function generateBotResponse(message) {
  return generateResponse(message).response;
}

/* CLIENT API */

app.post("/api/chat",(req,res)=>{

    const message = String(req.body.message || "").trim();

    if(!message){
        return res.status(400).json({
            error:"Message vide"
        });
    }

    const answer = generateBotResponse(message);

    const conversations = readJSON(CHAT_FILE);

    conversations.push({
        id:Date.now(),
        message,
        answer,
        date:new Date().toISOString()
    });

    writeJSON(CHAT_FILE,conversations);

    res.json({
        answer
    });
});


/* ADMIN AUTH */

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

function requireAdmin(req,res,next){

    if(!req.session.admin){
        return res.status(401).json({
            error:"Non autorisé"
        });
    }

    next();
}

app.post("/api/admin/login",(req,res)=>{

    const username = String(req.body.username || "");
    const password = String(req.body.password || "");

    if(
        username === ADMIN_USER &&
        password === ADMIN_PASSWORD
    ){
        req.session.admin = true;

        return res.json({
            success:true
        });
    }

    res.status(401).json({
        error:"Identifiants incorrects"
    });
});


app.post("/api/admin/logout",requireAdmin,(req,res)=>{

    req.session.destroy(()=>{
        res.json({success:true});
    });

});


app.get("/api/admin/training",requireAdmin,(req,res)=>{

    res.json(readJSON(TRAINING_FILE));

});


app.post("/api/admin/training",requireAdmin,(req,res)=>{

    const question = String(req.body.question || "").trim();
    const answer = String(req.body.answer || "").trim();

    if(!question || !answer){
        return res.status(400).json({
            error:"Question et réponse obligatoires"
        });
    }

    const training = readJSON(TRAINING_FILE);

    training.push({
        id:Date.now(),
        question,
        answer
    });

    writeJSON(TRAINING_FILE,training);

    res.json({
        success:true
    });

});


app.delete("/api/admin/training/:id",requireAdmin,(req,res)=>{

    const id = Number(req.params.id);

    let training = readJSON(TRAINING_FILE);

    training = training.filter(x => x.id !== id);

    writeJSON(TRAINING_FILE,training);

    res.json({
        success:true
    });

});


app.get("/api/admin/conversations",requireAdmin,(req,res)=>{

    res.json(readJSON(CHAT_FILE).reverse());

});



// ================================
// ADMIN V2 API
// ================================

app.get("/api/admin/stats", requireAdmin, (req, res) => {
  try {
    const training = JSON.parse(
      fs.readFileSync(trainingFile, "utf8")
    );

    const conversations = JSON.parse(
      fs.readFileSync(conversationsFile, "utf8")
    );

    const active = training.filter(x => x.active !== false);

    const intents = {};
    for (const item of active) {
      intents[item.intent] = (intents[item.intent] || 0) + 1;
    }

    res.json({
      totalTraining: training.length,
      activeTraining: active.length,
      inactiveTraining: training.length - active.length,
      conversations: conversations.length,
      intents
    });

  } catch (e) {
    res.status(500).json({
      error: "Erreur statistiques",
      details: e.message
    });
  }
});

app.get("/api/admin/training/search", requireAdmin, (req, res) => {
  try {
    const q = String(req.query.q || "").toLowerCase().trim();

    const training = JSON.parse(
      fs.readFileSync(trainingFile, "utf8")
    );

    if (!q) {
      return res.json(training);
    }

    const result = training.filter(item =>
      String(item.question || "").toLowerCase().includes(q) ||
      String(item.answer || "").toLowerCase().includes(q) ||
      String(item.intent || "").toLowerCase().includes(q)
    );

    res.json(result);

  } catch (e) {
    res.status(500).json({
      error: "Erreur recherche",
      details: e.message
    });
  }
});

app.patch("/api/admin/training/:id", requireAdmin, (req, res) => {
  try {
    const id = Number(req.params.id);

    const training = JSON.parse(
      fs.readFileSync(trainingFile, "utf8")
    );

    const item = training.find(x => Number(x.id) === id);

    if (!item) {
      return res.status(404).json({
        error: "Training introuvable"
      });
    }

    if (typeof req.body.active === "boolean") {
      item.active = req.body.active;
    }

    if (typeof req.body.question === "string" &&
        req.body.question.trim()) {
      item.question = req.body.question.trim();
    }

    if (typeof req.body.answer === "string" &&
        req.body.answer.trim()) {
      item.answer = req.body.answer.trim();
    }

    if (typeof req.body.intent === "string" &&
        req.body.intent.trim()) {
      item.intent = req.body.intent.trim();
    }

    fs.writeFileSync(
      trainingFile,
      JSON.stringify(training, null, 2)
    );

    res.json({
      success: true,
      item
    });

  } catch (e) {
    res.status(500).json({
      error: "Erreur modification",
      details: e.message
    });
  }
});


app.listen(PORT,"0.0.0.0",()=>{

    console.log("");
    console.log("======================================");
    console.log("⚡ FAST CASHPOINT BOT");
    console.log("======================================");
    console.log("🌐 Client : http://127.0.0.1:"+PORT);
    console.log("🔐 Admin  : http://127.0.0.1:"+PORT+"/admin.html");
    console.log("======================================");
    console.log("");

});
