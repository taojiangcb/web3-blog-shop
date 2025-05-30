import path from 'path';
import dotenv from "dotenv";
import { createKnowledgeBase } from './knowledgeBase';
import { updateKnowledgeBase } from './knowledgeBase/updateKnowlegeBase';
dotenv.config();

function init() {
  // createKnowledgeBase();
  updateKnowledgeBase();
}

init();
