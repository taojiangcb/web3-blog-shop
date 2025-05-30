import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { CONFIG } from "../config/config";

export async function loadDocuments() {
  const loader = new DirectoryLoader(CONFIG.DOCS_DIR, {
    ".txt": (path) => new TextLoader(path),
    ".md": (path) => new TextLoader(path),
    ".pdf": (path) => new PDFLoader(path),
    ".docx": (path) => new DocxLoader(path),
  });
  return loader;
}