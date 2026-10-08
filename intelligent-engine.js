const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "data");
const knowledgePath = path.join(dataDir, "knowledge.json");
const trainingPath = path.join(dataDir, "training.json");

function loadJSON(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    console.error("Erreur lecture:", file, e.message);
    return {};
  }
}

function loadKnowledge() {
  return loadJSON(knowledgePath);
}

function loadTraining() {
  const data = loadJSON(trainingPath);
  return Array.isArray(data) ? data.filter(x => x && x.active !== false) : [];
}

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s+#]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text) {
  return normalize(text)
    .split(/\s+/)
    .filter(word => word.length >= 2);
}

function unique(array) {
  return [...new Set(array)];
}

function similarity(message, question) {
  const msg = normalize(message);
  const q = normalize(question);

  if (!msg || !q) return 0;

  // Exact match
  if (msg === q) return 100;

  const msgWords = unique(tokenize(msg));
  const qWords = unique(tokenize(q));

  if (!msgWords.length || !qWords.length) return 0;

  const msgSet = new Set(msgWords);
  const qSet = new Set(qWords);

  let common = 0;

  for (const word of qSet) {
    if (msgSet.has(word)) {
      common++;
    }
  }

  const precision = common / msgSet.size;
  const recall = common / qSet.size;

  // F1 score
  const f1 =
    precision + recall > 0
      ? (2 * precision * recall) / (precision + recall)
      : 0;

  let score = f1 * 70;

  // Phrase bonus
  const qParts = q.split(/\s+/).filter(x => x.length >= 3);

  if (qParts.length >= 2) {
    for (let i = 0; i < qParts.length - 1; i++) {
      const phrase = `${qParts[i]} ${qParts[i + 1]}`;

      if (msg.includes(phrase)) {
        score += 12;
      }
    }
  }

  // Important word bonus
  for (const word of qSet) {
    if (word.length >= 5 && msgSet.has(word)) {
      score += 2;
    }
  }

  return Math.min(100, score);
}

function findExactTraining(message) {
  const msg = normalize(message);
  const training = loadTraining();

  return training.find(item =>
    normalize(item.question) === msg
  );
}

function findBestTraining(message) {
  const training = loadTraining();

  let best = null;

  for (const item of training) {
    if (!item.question || !item.answer) continue;

    // Tsy avela hifehy ny moteur ny "unknown"
    if (item.intent === "unknown") continue;

    const score = similarity(message, item.question);

    if (!best || score > best.score) {
      best = {
        item,
        score
      };
    }
  }

  return best;
}

function keywordSimilarity(message, keywords) {
  const msg = normalize(message);
  const words = new Set(tokenize(msg));

  let score = 0;

  for (const keyword of keywords || []) {
    const k = normalize(keyword);

    if (!k) continue;

    if (msg.includes(k)) {
      score += k.includes(" ") ? 8 : 4;
    }

    for (const word of tokenize(k)) {
      if (word.length >= 3 && words.has(word)) {
        score += 1;
      }
    }
  }

  return score;
}

function findBestKnowledgeIntent(message) {
  const knowledge = loadKnowledge();

  let best = {
    intent: "unknown",
    score: 0
  };

  for (const [intent, data] of Object.entries(knowledge)) {
    if (!data || !Array.isArray(data.keywords)) continue;

    // unknown ampiasaina ho fallback ihany
    if (intent === "unknown") continue;

    const score = keywordSimilarity(message, data.keywords);

    if (score > best.score) {
      best = {
        intent,
        score
      };
    }
  }

  return best;
}

function getKnowledgeAnswer(intent) {
  const knowledge = loadKnowledge();

  if (
    knowledge[intent] &&
    typeof knowledge[intent].answer === "string"
  ) {
    return knowledge[intent].answer;
  }

  return null;
}

function getUnknownAnswer() {
  const knowledge = loadKnowledge();

  if (
    knowledge.unknown &&
    typeof knowledge.unknown.answer === "string"
  ) {
    return knowledge.unknown.answer;
  }

  return "Miala tsiny tompoko, tsy azoko tsara ilay fanontaniana. Mba hazavao kely azafady.";
}

function generateResponse(message) {
  const input = String(message || "").trim();

  if (!input) {
    return {
      intent: "unknown",
      confidence: 0,
      response: getUnknownAnswer()
    };
  }

  /*
   * 1. EXACT TRAINING MATCH
   */
  const exact = findExactTraining(input);

  if (exact) {
    return {
      intent: exact.intent || "unknown",
      confidence: 100,
      response: exact.answer,
      matchedQuestion: exact.question,
      source: "training-exact"
    };
  }

  /*
   * 2. SMART TRAINING MATCH
   */
  const bestTraining = findBestTraining(input);

  if (bestTraining && bestTraining.score >= 42) {
    return {
      intent: bestTraining.item.intent || "unknown",
      confidence: Math.round(bestTraining.score),
      response: bestTraining.item.answer,
      matchedQuestion: bestTraining.item.question,
      source: "training-smart"
    };
  }

  /*
   * 3. KNOWLEDGE / INTENT MATCH
   */
  const bestIntent = findBestKnowledgeIntent(input);

  if (bestIntent.intent !== "unknown" && bestIntent.score >= 2) {
    const answer = getKnowledgeAnswer(bestIntent.intent);

    if (answer) {
      return {
        intent: bestIntent.intent,
        confidence: Math.min(90, bestIntent.score * 10),
        response: answer,
        source: "knowledge-intent"
      };
    }
  }

  /*
   * 4. FALLBACK
   */
  return {
    intent: "unknown",
    confidence: 0,
    response: getUnknownAnswer(),
    source: "fallback"
  };
}

function findBestIntent(message) {
  const result = findBestTraining(message);

  if (result) {
    return {
      intent: result.item.intent || "unknown",
      score: result.score
    };
  }

  const intent = findBestKnowledgeIntent(message);

  return {
    intent: intent.intent,
    score: intent.score
  };
}

module.exports = {
  generateResponse,
  findBestIntent,
  normalize,
  loadTraining,
  loadKnowledge
};
