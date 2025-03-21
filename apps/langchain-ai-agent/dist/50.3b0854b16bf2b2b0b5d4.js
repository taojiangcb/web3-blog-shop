"use strict";
exports.id = 50;
exports.ids = [50];
exports.modules = {

/***/ 5050:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  VectorDBQAChain: () => (/* binding */ VectorDBQAChain)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.3.19_@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2___@langchain+deeps_pxpnwc4yhnzklj5cil5nybwo6i/node_modules/langchain/dist/chains/base.js + 2 modules
var base = __webpack_require__(1161);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.3.19_@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2___@langchain+deeps_pxpnwc4yhnzklj5cil5nybwo6i/node_modules/langchain/dist/chains/llm_chain.js + 20 modules
var llm_chain = __webpack_require__(2282);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.3.19_@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2___@langchain+deeps_pxpnwc4yhnzklj5cil5nybwo6i/node_modules/langchain/dist/chains/combine_docs_chain.js
var combine_docs_chain = __webpack_require__(4056);
// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/prompts.js + 3 modules
var prompts = __webpack_require__(2673);
// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/load/serializable.js + 1 modules
var serializable = __webpack_require__(5374);
;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/example_selectors/base.js

/**
 * Base class for example selectors.
 */
class BaseExampleSelector extends serializable/* Serializable */.y {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "example_selectors", "base"]
        });
    }
}

;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/example_selectors/conditional.js
/**
 * Abstract class that defines the interface for selecting a prompt for a
 * given language model.
 */
class BasePromptSelector {
    /**
     * Asynchronous version of `getPrompt` that also accepts an options object
     * for partial variables.
     * @param llm The language model for which to get a prompt.
     * @param options Optional object for partial variables.
     * @returns A Promise that resolves to a prompt template.
     */
    async getPromptAsync(llm, options) {
        const prompt = this.getPrompt(llm);
        return prompt.partial(options?.partialVariables ?? {});
    }
}
/**
 * Concrete implementation of `BasePromptSelector` that selects a prompt
 * based on a set of conditions. It has a default prompt that it returns
 * if none of the conditions are met.
 */
class ConditionalPromptSelector extends BasePromptSelector {
    constructor(default_prompt, conditionals = []) {
        super();
        Object.defineProperty(this, "defaultPrompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "conditionals", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.defaultPrompt = default_prompt;
        this.conditionals = conditionals;
    }
    /**
     * Method that selects a prompt based on a set of conditions. If none of
     * the conditions are met, it returns the default prompt.
     * @param llm The language model for which to get a prompt.
     * @returns A prompt template.
     */
    getPrompt(llm) {
        for (const [condition, prompt] of this.conditionals) {
            if (condition(llm)) {
                return prompt;
            }
        }
        return this.defaultPrompt;
    }
}
/**
 * Type guard function that checks if a given language model is of type
 * `BaseLLM`.
 */
function isLLM(llm) {
    return llm._modelType() === "base_llm";
}
/**
 * Type guard function that checks if a given language model is of type
 * `BaseChatModel`.
 */
function isChatModel(llm) {
    return llm._modelType() === "base_chat_model";
}

;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/example_selectors/length_based.js

/**
 * Calculates the length of a text based on the number of words and lines.
 */
function getLengthBased(text) {
    return text.split(/\n| /).length;
}
/**
 * A specialized example selector that selects examples based on their
 * length, ensuring that the total length of the selected examples does
 * not exceed a specified maximum length.
 * @example
 * ```typescript
 * const exampleSelector = new LengthBasedExampleSelector(
 *   [
 *     { input: "happy", output: "sad" },
 *     { input: "tall", output: "short" },
 *     { input: "energetic", output: "lethargic" },
 *     { input: "sunny", output: "gloomy" },
 *     { input: "windy", output: "calm" },
 *   ],
 *   {
 *     examplePrompt: new PromptTemplate({
 *       inputVariables: ["input", "output"],
 *       template: "Input: {input}\nOutput: {output}",
 *     }),
 *     maxLength: 25,
 *   },
 * );
 * const dynamicPrompt = new FewShotPromptTemplate({
 *   exampleSelector,
 *   examplePrompt: new PromptTemplate({
 *     inputVariables: ["input", "output"],
 *     template: "Input: {input}\nOutput: {output}",
 *   }),
 *   prefix: "Give the antonym of every input",
 *   suffix: "Input: {adjective}\nOutput:",
 *   inputVariables: ["adjective"],
 * });
 * console.log(dynamicPrompt.format({ adjective: "big" }));
 * console.log(
 *   dynamicPrompt.format({
 *     adjective:
 *       "big and huge and massive and large and gigantic and tall and much much much much much bigger than everything else",
 *   }),
 * );
 * ```
 */
class LengthBasedExampleSelector extends BaseExampleSelector {
    constructor(data) {
        super(data);
        Object.defineProperty(this, "examples", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "examplePrompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "getTextLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: getLengthBased
        });
        Object.defineProperty(this, "maxLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 2048
        });
        Object.defineProperty(this, "exampleTextLengths", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        this.examplePrompt = data.examplePrompt;
        this.maxLength = data.maxLength ?? 2048;
        this.getTextLength = data.getTextLength ?? getLengthBased;
    }
    /**
     * Adds an example to the list of examples and calculates its length.
     * @param example The example to be added.
     * @returns Promise that resolves when the example has been added and its length calculated.
     */
    async addExample(example) {
        this.examples.push(example);
        const stringExample = await this.examplePrompt.format(example);
        this.exampleTextLengths.push(this.getTextLength(stringExample));
    }
    /**
     * Calculates the lengths of the examples.
     * @param v Array of lengths of the examples.
     * @param values Instance of LengthBasedExampleSelector.
     * @returns Promise that resolves with an array of lengths of the examples.
     */
    async calculateExampleTextLengths(v, values) {
        if (v.length > 0) {
            return v;
        }
        const { examples, examplePrompt } = values;
        const stringExamples = await Promise.all(examples.map((eg) => examplePrompt.format(eg)));
        return stringExamples.map((eg) => this.getTextLength(eg));
    }
    /**
     * Selects examples until the total length of the selected examples
     * reaches the maxLength.
     * @param inputVariables The input variables for the examples.
     * @returns Promise that resolves with an array of selected examples.
     */
    async selectExamples(inputVariables) {
        const inputs = Object.values(inputVariables).join(" ");
        let remainingLength = this.maxLength - this.getTextLength(inputs);
        let i = 0;
        const examples = [];
        while (remainingLength > 0 && i < this.examples.length) {
            const newLength = remainingLength - this.exampleTextLengths[i];
            if (newLength < 0) {
                break;
            }
            else {
                examples.push(this.examples[i]);
                remainingLength = newLength;
            }
            i += 1;
        }
        return examples;
    }
    /**
     * Creates a new instance of LengthBasedExampleSelector and adds a list of
     * examples to it.
     * @param examples Array of examples to be added.
     * @param args Input parameters for the LengthBasedExampleSelector.
     * @returns Promise that resolves with a new instance of LengthBasedExampleSelector with the examples added.
     */
    static async fromExamples(examples, args) {
        const selector = new LengthBasedExampleSelector(args);
        await Promise.all(examples.map((eg) => selector.addExample(eg)));
        return selector;
    }
}

;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/documents/document.js
/**
 * Interface for interacting with a document.
 */
class Document {
    constructor(fields) {
        Object.defineProperty(this, "pageContent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "metadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // The ID field is optional at the moment.
        // It will likely become required in a future major release after
        // it has been adopted by enough vectorstore implementations.
        /**
         * An optional identifier for the document.
         *
         * Ideally this should be unique across the document collection and formatted
         * as a UUID, but this will not be enforced.
         */
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.pageContent =
            fields.pageContent !== undefined ? fields.pageContent.toString() : "";
        this.metadata = fields.metadata ?? {};
        this.id = fields.id;
    }
}

;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/example_selectors/semantic_similarity.js


function sortedValues(values) {
    return Object.keys(values)
        .sort()
        .map((key) => values[key]);
}
/**
 * Class that selects examples based on semantic similarity. It extends
 * the BaseExampleSelector class.
 * @example
 * ```typescript
 * const exampleSelector = await SemanticSimilarityExampleSelector.fromExamples(
 *   [
 *     { input: "happy", output: "sad" },
 *     { input: "tall", output: "short" },
 *     { input: "energetic", output: "lethargic" },
 *     { input: "sunny", output: "gloomy" },
 *     { input: "windy", output: "calm" },
 *   ],
 *   new OpenAIEmbeddings(),
 *   HNSWLib,
 *   { k: 1 },
 * );
 * const dynamicPrompt = new FewShotPromptTemplate({
 *   exampleSelector,
 *   examplePrompt: PromptTemplate.fromTemplate(
 *     "Input: {input}\nOutput: {output}",
 *   ),
 *   prefix: "Give the antonym of every input",
 *   suffix: "Input: {adjective}\nOutput:",
 *   inputVariables: ["adjective"],
 * });
 * console.log(await dynamicPrompt.format({ adjective: "rainy" }));
 * ```
 */
class SemanticSimilarityExampleSelector extends BaseExampleSelector {
    constructor(data) {
        super(data);
        Object.defineProperty(this, "vectorStoreRetriever", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "exampleKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inputKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.exampleKeys = data.exampleKeys;
        this.inputKeys = data.inputKeys;
        if (data.vectorStore !== undefined) {
            this.vectorStoreRetriever = data.vectorStore.asRetriever({
                k: data.k ?? 4,
                filter: data.filter,
            });
        }
        else if (data.vectorStoreRetriever) {
            this.vectorStoreRetriever = data.vectorStoreRetriever;
        }
        else {
            throw new Error(`You must specify one of "vectorStore" and "vectorStoreRetriever".`);
        }
    }
    /**
     * Method that adds a new example to the vectorStore. The example is
     * converted to a string and added to the vectorStore as a document.
     * @param example The example to be added to the vectorStore.
     * @returns Promise that resolves when the example has been added to the vectorStore.
     */
    async addExample(example) {
        const inputKeys = this.inputKeys ?? Object.keys(example);
        const stringExample = sortedValues(inputKeys.reduce((acc, key) => ({ ...acc, [key]: example[key] }), {})).join(" ");
        await this.vectorStoreRetriever.addDocuments([
            new Document({
                pageContent: stringExample,
                metadata: example,
            }),
        ]);
    }
    /**
     * Method that selects which examples to use based on semantic similarity.
     * It performs a similarity search in the vectorStore using the input
     * variables and returns the examples with the highest similarity.
     * @param inputVariables The input variables used for the similarity search.
     * @returns Promise that resolves with an array of the selected examples.
     */
    async selectExamples(inputVariables) {
        const inputKeys = this.inputKeys ?? Object.keys(inputVariables);
        const query = sortedValues(inputKeys.reduce((acc, key) => ({ ...acc, [key]: inputVariables[key] }), {})).join(" ");
        const exampleDocs = await this.vectorStoreRetriever.invoke(query);
        const examples = exampleDocs.map((doc) => doc.metadata);
        if (this.exampleKeys) {
            // If example keys are provided, filter examples to those keys.
            return examples.map((example) => this.exampleKeys.reduce((acc, key) => ({ ...acc, [key]: example[key] }), {}));
        }
        return examples;
    }
    /**
     * Static method that creates a new instance of
     * SemanticSimilarityExampleSelector. It takes a list of examples, an
     * instance of Embeddings, a VectorStore class, and an options object as
     * parameters. It converts the examples to strings, creates a VectorStore
     * from the strings and the embeddings, and returns a new
     * SemanticSimilarityExampleSelector with the created VectorStore and the
     * options provided.
     * @param examples The list of examples to be used.
     * @param embeddings The instance of Embeddings to be used.
     * @param vectorStoreCls The VectorStore class to be used.
     * @param options The options object for the SemanticSimilarityExampleSelector.
     * @returns Promise that resolves with a new instance of SemanticSimilarityExampleSelector.
     */
    static async fromExamples(examples, embeddings, vectorStoreCls, options = {}) {
        const inputKeys = options.inputKeys ?? null;
        const stringExamples = examples.map((example) => sortedValues(inputKeys
            ? inputKeys.reduce((acc, key) => ({ ...acc, [key]: example[key] }), {})
            : example).join(" "));
        const vectorStore = await vectorStoreCls.fromTexts(stringExamples, examples, // metadatas
        embeddings, options);
        return new SemanticSimilarityExampleSelector({
            vectorStore,
            k: options.k ?? 4,
            exampleKeys: options.exampleKeys,
            inputKeys: options.inputKeys,
        });
    }
}

;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/dist/example_selectors/index.js





;// ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/example_selectors.js

;// ./node_modules/.pnpm/langchain@0.3.19_@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2___@langchain+deeps_pxpnwc4yhnzklj5cil5nybwo6i/node_modules/langchain/dist/chains/question_answering/stuff_prompts.js
/* eslint-disable spaced-comment */


const DEFAULT_QA_PROMPT = /*#__PURE__*/ new prompts/* PromptTemplate */.Hh({
    template: "Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.\n\n{context}\n\nQuestion: {question}\nHelpful Answer:",
    inputVariables: ["context", "question"],
});
const system_template = `Use the following pieces of context to answer the users question. 
If you don't know the answer, just say that you don't know, don't try to make up an answer.
----------------
{context}`;
const messages = [
    /*#__PURE__*/ prompts/* SystemMessagePromptTemplate */.BJ.fromTemplate(system_template),
    /*#__PURE__*/ prompts/* HumanMessagePromptTemplate */.FS.fromTemplate("{question}"),
];
const CHAT_PROMPT = /*#__PURE__*/ prompts/* ChatPromptTemplate */.RZ.fromMessages(messages);
const QA_PROMPT_SELECTOR = /*#__PURE__*/ new ConditionalPromptSelector(DEFAULT_QA_PROMPT, [[isChatModel, CHAT_PROMPT]]);

;// ./node_modules/.pnpm/langchain@0.3.19_@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2___@langchain+deeps_pxpnwc4yhnzklj5cil5nybwo6i/node_modules/langchain/dist/chains/question_answering/map_reduce_prompts.js
/* eslint-disable spaced-comment */


const qa_template = `Use the following portion of a long document to see if any of the text is relevant to answer the question. 
Return any relevant text verbatim.
{context}
Question: {question}
Relevant text, if any:`;
const DEFAULT_COMBINE_QA_PROMPT = 
/*#__PURE__*/
prompts/* PromptTemplate */.Hh.fromTemplate(qa_template);
const map_reduce_prompts_system_template = `Use the following portion of a long document to see if any of the text is relevant to answer the question. 
Return any relevant text verbatim.
----------------
{context}`;
const map_reduce_prompts_messages = [
    /*#__PURE__*/ prompts/* SystemMessagePromptTemplate */.BJ.fromTemplate(map_reduce_prompts_system_template),
    /*#__PURE__*/ prompts/* HumanMessagePromptTemplate */.FS.fromTemplate("{question}"),
];
const CHAT_QA_PROMPT = /*#__PURE__*/ prompts/* ChatPromptTemplate */.RZ.fromMessages(map_reduce_prompts_messages);
const map_reduce_prompts_COMBINE_QA_PROMPT_SELECTOR = 
/*#__PURE__*/ new ConditionalPromptSelector(DEFAULT_COMBINE_QA_PROMPT, [
    [isChatModel, CHAT_QA_PROMPT],
]);
const combine_prompt = `Given the following extracted parts of a long document and a question, create a final answer. 
If you don't know the answer, just say that you don't know. Don't try to make up an answer.

QUESTION: Which state/country's law governs the interpretation of the contract?
=========
Content: This Agreement is governed by English law and the parties submit to the exclusive jurisdiction of the English courts in  relation to any dispute (contractual or non-contractual) concerning this Agreement save that either party may apply to any court for an  injunction or other relief to protect its Intellectual Property Rights.

Content: No Waiver. Failure or delay in exercising any right or remedy under this Agreement shall not constitute a waiver of such (or any other)  right or remedy.\n\n11.7 Severability. The invalidity, illegality or unenforceability of any term (or part of a term) of this Agreement shall not affect the continuation  in force of the remainder of the term (if any) and this Agreement.\n\n11.8 No Agency. Except as expressly stated otherwise, nothing in this Agreement shall create an agency, partnership or joint venture of any  kind between the parties.\n\n11.9 No Third-Party Beneficiaries.

Content: (b) if Google believes, in good faith, that the Distributor has violated or caused Google to violate any Anti-Bribery Laws (as  defined in Clause 8.5) or that such a violation is reasonably likely to occur,
=========
FINAL ANSWER: This Agreement is governed by English law.

QUESTION: What did the president say about Michael Jackson?
=========
Content: Madam Speaker, Madam Vice President, our First Lady and Second Gentleman. Members of Congress and the Cabinet. Justices of the Supreme Court. My fellow Americans.  \n\nLast year COVID-19 kept us apart. This year we are finally together again. \n\nTonight, we meet as Democrats Republicans and Independents. But most importantly as Americans. \n\nWith a duty to one another to the American people to the Constitution. \n\nAnd with an unwavering resolve that freedom will always triumph over tyranny. \n\nSix days ago, Russia’s Vladimir Putin sought to shake the foundations of the free world thinking he could make it bend to his menacing ways. But he badly miscalculated. \n\nHe thought he could roll into Ukraine and the world would roll over. Instead he met a wall of strength he never imagined. \n\nHe met the Ukrainian people. \n\nFrom President Zelenskyy to every Ukrainian, their fearlessness, their courage, their determination, inspires the world. \n\nGroups of citizens blocking tanks with their bodies. Everyone from students to retirees teachers turned soldiers defending their homeland.

Content: And we won’t stop. \n\nWe have lost so much to COVID-19. Time with one another. And worst of all, so much loss of life. \n\nLet’s use this moment to reset. Let’s stop looking at COVID-19 as a partisan dividing line and see it for what it is: A God-awful disease.  \n\nLet’s stop seeing each other as enemies, and start seeing each other for who we really are: Fellow Americans.  \n\nWe can’t change how divided we’ve been. But we can change how we move forward—on COVID-19 and other issues we must face together. \n\nI recently visited the New York City Police Department days after the funerals of Officer Wilbert Mora and his partner, Officer Jason Rivera. \n\nThey were responding to a 9-1-1 call when a man shot and killed them with a stolen gun. \n\nOfficer Mora was 27 years old. \n\nOfficer Rivera was 22. \n\nBoth Dominican Americans who’d grown up on the same streets they later chose to patrol as police officers. \n\nI spoke with their families and told them that we are forever in debt for their sacrifice, and we will carry on their mission to restore the trust and safety every community deserves.

Content: And a proud Ukrainian people, who have known 30 years  of independence, have repeatedly shown that they will not tolerate anyone who tries to take their country backwards.  \n\nTo all Americans, I will be honest with you, as I’ve always promised. A Russian dictator, invading a foreign country, has costs around the world. \n\nAnd I’m taking robust action to make sure the pain of our sanctions  is targeted at Russia’s economy. And I will use every tool at our disposal to protect American businesses and consumers. \n\nTonight, I can announce that the United States has worked with 30 other countries to release 60 Million barrels of oil from reserves around the world.  \n\nAmerica will lead that effort, releasing 30 Million barrels from our own Strategic Petroleum Reserve. And we stand ready to do more if necessary, unified with our allies.  \n\nThese steps will help blunt gas prices here at home. And I know the news about what’s happening can seem alarming. \n\nBut I want you to know that we are going to be okay.

Content: More support for patients and families. \n\nTo get there, I call on Congress to fund ARPA-H, the Advanced Research Projects Agency for Health. \n\nIt’s based on DARPA—the Defense Department project that led to the Internet, GPS, and so much more.  \n\nARPA-H will have a singular purpose—to drive breakthroughs in cancer, Alzheimer’s, diabetes, and more. \n\nA unity agenda for the nation. \n\nWe can do this. \n\nMy fellow Americans—tonight , we have gathered in a sacred space—the citadel of our democracy. \n\nIn this Capitol, generation after generation, Americans have debated great questions amid great strife, and have done great things. \n\nWe have fought for freedom, expanded liberty, defeated totalitarianism and terror. \n\nAnd built the strongest, freest, and most prosperous nation the world has ever known. \n\nNow is the hour. \n\nOur moment of responsibility. \n\nOur test of resolve and conscience, of history itself. \n\nIt is in this moment that our character is formed. Our purpose is found. Our future is forged. \n\nWell I know this nation.
=========
FINAL ANSWER: The president did not mention Michael Jackson.

QUESTION: {question}
=========
{summaries}
=========
FINAL ANSWER:`;
const COMBINE_PROMPT = 
/*#__PURE__*/ prompts/* PromptTemplate */.Hh.fromTemplate(combine_prompt);
const system_combine_template = `Given the following extracted parts of a long document and a question, create a final answer. 
If you don't know the answer, just say that you don't know. Don't try to make up an answer.
----------------
{summaries}`;
const combine_messages = [
    /*#__PURE__*/ prompts/* SystemMessagePromptTemplate */.BJ.fromTemplate(system_combine_template),
    /*#__PURE__*/ prompts/* HumanMessagePromptTemplate */.FS.fromTemplate("{question}"),
];
const CHAT_COMBINE_PROMPT = 
/*#__PURE__*/ prompts/* ChatPromptTemplate */.RZ.fromMessages(combine_messages);
const map_reduce_prompts_COMBINE_PROMPT_SELECTOR = 
/*#__PURE__*/ new ConditionalPromptSelector(COMBINE_PROMPT, [
    [isChatModel, CHAT_COMBINE_PROMPT],
]);

;// ./node_modules/.pnpm/langchain@0.3.19_@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2___@langchain+deeps_pxpnwc4yhnzklj5cil5nybwo6i/node_modules/langchain/dist/chains/question_answering/refine_prompts.js
/* eslint-disable spaced-comment */


const DEFAULT_REFINE_PROMPT_TMPL = `The original question is as follows: {question}
We have provided an existing answer: {existing_answer}
We have the opportunity to refine the existing answer
(only if needed) with some more context below.
------------
{context}
------------
Given the new context, refine the original answer to better answer the question. 
If the context isn't useful, return the original answer.`;
const DEFAULT_REFINE_PROMPT = /*#__PURE__*/ new prompts/* PromptTemplate */.Hh({
    inputVariables: ["question", "existing_answer", "context"],
    template: DEFAULT_REFINE_PROMPT_TMPL,
});
const refineTemplate = `The original question is as follows: {question}
We have provided an existing answer: {existing_answer}
We have the opportunity to refine the existing answer
(only if needed) with some more context below.
------------
{context}
------------
Given the new context, refine the original answer to better answer the question. 
If the context isn't useful, return the original answer.`;
const refine_prompts_messages = [
    /*#__PURE__*/ prompts/* HumanMessagePromptTemplate */.FS.fromTemplate("{question}"),
    /*#__PURE__*/ prompts/* AIMessagePromptTemplate */.sS.fromTemplate("{existing_answer}"),
    /*#__PURE__*/ prompts/* HumanMessagePromptTemplate */.FS.fromTemplate(refineTemplate),
];
const CHAT_REFINE_PROMPT = 
/*#__PURE__*/ prompts/* ChatPromptTemplate */.RZ.fromMessages(refine_prompts_messages);
const refine_prompts_REFINE_PROMPT_SELECTOR = 
/*#__PURE__*/ new ConditionalPromptSelector(DEFAULT_REFINE_PROMPT, [
    [isChatModel, CHAT_REFINE_PROMPT],
]);
const DEFAULT_TEXT_QA_PROMPT_TMPL = `Context information is below. 
---------------------
{context}
---------------------
Given the context information and no prior knowledge, answer the question: {question}`;
const DEFAULT_TEXT_QA_PROMPT = /*#__PURE__*/ new prompts/* PromptTemplate */.Hh({
    inputVariables: ["context", "question"],
    template: DEFAULT_TEXT_QA_PROMPT_TMPL,
});
const chat_qa_prompt_template = `Context information is below. 
---------------------
{context}
---------------------
Given the context information and no prior knowledge, answer any questions`;
const chat_messages = [
    /*#__PURE__*/ prompts/* SystemMessagePromptTemplate */.BJ.fromTemplate(chat_qa_prompt_template),
    /*#__PURE__*/ prompts/* HumanMessagePromptTemplate */.FS.fromTemplate("{question}"),
];
const CHAT_QUESTION_PROMPT = 
/*#__PURE__*/ prompts/* ChatPromptTemplate */.RZ.fromMessages(chat_messages);
const refine_prompts_QUESTION_PROMPT_SELECTOR = 
/*#__PURE__*/ new ConditionalPromptSelector(DEFAULT_TEXT_QA_PROMPT, [
    [isChatModel, CHAT_QUESTION_PROMPT],
]);

;// ./node_modules/.pnpm/langchain@0.3.19_@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2___@langchain+deeps_pxpnwc4yhnzklj5cil5nybwo6i/node_modules/langchain/dist/chains/question_answering/load.js





const loadQAChain = (llm, params = { type: "stuff" }) => {
    const { type } = params;
    if (type === "stuff") {
        return loadQAStuffChain(llm, params);
    }
    if (type === "map_reduce") {
        return loadQAMapReduceChain(llm, params);
    }
    if (type === "refine") {
        return loadQARefineChain(llm, params);
    }
    throw new Error(`Invalid _type: ${type}`);
};
/**
 * Loads a StuffQAChain based on the provided parameters. It takes an LLM
 * instance and StuffQAChainParams as parameters.
 * @param llm An instance of BaseLanguageModel.
 * @param params Parameters for creating a StuffQAChain.
 * @returns A StuffQAChain instance.
 */
function loadQAStuffChain(llm, params = {}) {
    const { prompt = QA_PROMPT_SELECTOR.getPrompt(llm), verbose } = params;
    const llmChain = new llm_chain.LLMChain({ prompt, llm, verbose });
    const chain = new combine_docs_chain.StuffDocumentsChain({ llmChain, verbose });
    return chain;
}
/**
 * Loads a MapReduceQAChain based on the provided parameters. It takes an
 * LLM instance and MapReduceQAChainParams as parameters.
 * @param llm An instance of BaseLanguageModel.
 * @param params Parameters for creating a MapReduceQAChain.
 * @returns A MapReduceQAChain instance.
 */
function loadQAMapReduceChain(llm, params = {}) {
    const { combineMapPrompt = COMBINE_QA_PROMPT_SELECTOR.getPrompt(llm), combinePrompt = COMBINE_PROMPT_SELECTOR.getPrompt(llm), verbose, combineLLM, returnIntermediateSteps, } = params;
    const llmChain = new LLMChain({ prompt: combineMapPrompt, llm, verbose });
    const combineLLMChain = new LLMChain({
        prompt: combinePrompt,
        llm: combineLLM ?? llm,
        verbose,
    });
    const combineDocumentChain = new StuffDocumentsChain({
        llmChain: combineLLMChain,
        documentVariableName: "summaries",
        verbose,
    });
    const chain = new MapReduceDocumentsChain({
        llmChain,
        combineDocumentChain,
        returnIntermediateSteps,
        verbose,
    });
    return chain;
}
/**
 * Loads a RefineQAChain based on the provided parameters. It takes an LLM
 * instance and RefineQAChainParams as parameters.
 * @param llm An instance of BaseLanguageModel.
 * @param params Parameters for creating a RefineQAChain.
 * @returns A RefineQAChain instance.
 */
function loadQARefineChain(llm, params = {}) {
    const { questionPrompt = QUESTION_PROMPT_SELECTOR.getPrompt(llm), refinePrompt = REFINE_PROMPT_SELECTOR.getPrompt(llm), refineLLM, verbose, } = params;
    const llmChain = new LLMChain({ prompt: questionPrompt, llm, verbose });
    const refineLLMChain = new LLMChain({
        prompt: refinePrompt,
        llm: refineLLM ?? llm,
        verbose,
    });
    const chain = new RefineDocumentsChain({
        llmChain,
        refineLLMChain,
        verbose,
    });
    return chain;
}

;// ./node_modules/.pnpm/langchain@0.3.19_@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2___@langchain+deeps_pxpnwc4yhnzklj5cil5nybwo6i/node_modules/langchain/dist/chains/vector_db_qa.js


/**
 * Class that represents a VectorDBQAChain. It extends the `BaseChain`
 * class and implements the `VectorDBQAChainInput` interface. It performs
 * a similarity search using a vector store and combines the search
 * results using a specified combine documents chain.
 *
 * @deprecated
 * Switch to {@link https://js.langchain.com/docs/modules/chains/ | createRetrievalChain}
 * Will be removed in 0.2.0
 */
class VectorDBQAChain extends base/* BaseChain */.r {
    static lc_name() {
        return "VectorDBQAChain";
    }
    get inputKeys() {
        return [this.inputKey];
    }
    get outputKeys() {
        return this.combineDocumentsChain.outputKeys.concat(this.returnSourceDocuments ? ["sourceDocuments"] : []);
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "k", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 4
        });
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "query"
        });
        Object.defineProperty(this, "vectorstore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "combineDocumentsChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "returnSourceDocuments", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        this.vectorstore = fields.vectorstore;
        this.combineDocumentsChain = fields.combineDocumentsChain;
        this.inputKey = fields.inputKey ?? this.inputKey;
        this.k = fields.k ?? this.k;
        this.returnSourceDocuments =
            fields.returnSourceDocuments ?? this.returnSourceDocuments;
    }
    /** @ignore */
    async _call(values, runManager) {
        if (!(this.inputKey in values)) {
            throw new Error(`Question key ${this.inputKey} not found.`);
        }
        const question = values[this.inputKey];
        const docs = await this.vectorstore.similaritySearch(question, this.k, values.filter, runManager?.getChild("vectorstore"));
        const inputs = { question, input_documents: docs };
        const result = await this.combineDocumentsChain.call(inputs, runManager?.getChild("combine_documents"));
        if (this.returnSourceDocuments) {
            return {
                ...result,
                sourceDocuments: docs,
            };
        }
        return result;
    }
    _chainType() {
        return "vector_db_qa";
    }
    static async deserialize(data, values) {
        if (!("vectorstore" in values)) {
            throw new Error(`Need to pass in a vectorstore to deserialize VectorDBQAChain`);
        }
        const { vectorstore } = values;
        if (!data.combine_documents_chain) {
            throw new Error(`VectorDBQAChain must have combine_documents_chain in serialized data`);
        }
        return new VectorDBQAChain({
            combineDocumentsChain: await base/* BaseChain */.r.deserialize(data.combine_documents_chain),
            k: data.k,
            vectorstore,
        });
    }
    serialize() {
        return {
            _type: this._chainType(),
            combine_documents_chain: this.combineDocumentsChain.serialize(),
            k: this.k,
        };
    }
    /**
     * Static method that creates a VectorDBQAChain instance from a
     * BaseLanguageModel and a vector store. It also accepts optional options
     * to customize the chain.
     * @param llm The BaseLanguageModel instance.
     * @param vectorstore The vector store used for similarity search.
     * @param options Optional options to customize the chain.
     * @returns A new instance of VectorDBQAChain.
     */
    static fromLLM(llm, vectorstore, options) {
        const qaChain = loadQAStuffChain(llm);
        return new this({
            vectorstore,
            combineDocumentsChain: qaChain,
            ...options,
        });
    }
}


/***/ })

};
;
//# sourceMappingURL=50.3b0854b16bf2b2b0b5d4.js.map