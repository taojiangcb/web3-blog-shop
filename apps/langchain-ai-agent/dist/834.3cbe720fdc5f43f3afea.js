"use strict";
exports.id = 834;
exports.ids = [834];
exports.modules = {

/***/ 9834:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  APIChain: () => (/* binding */ APIChain)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.3.19_@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2___@langchain+deeps_pxpnwc4yhnzklj5cil5nybwo6i/node_modules/langchain/dist/chains/base.js + 2 modules
var base = __webpack_require__(1161);
// EXTERNAL MODULE: ./node_modules/.pnpm/langchain@0.3.19_@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2___@langchain+deeps_pxpnwc4yhnzklj5cil5nybwo6i/node_modules/langchain/dist/chains/llm_chain.js + 20 modules
var llm_chain = __webpack_require__(2282);
// EXTERNAL MODULE: ./node_modules/.pnpm/@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2_/node_modules/@langchain/core/prompts.js + 3 modules
var prompts = __webpack_require__(2673);
;// ./node_modules/.pnpm/langchain@0.3.19_@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2___@langchain+deeps_pxpnwc4yhnzklj5cil5nybwo6i/node_modules/langchain/dist/chains/api/prompts.js
/* eslint-disable spaced-comment */

const API_URL_RAW_PROMPT_TEMPLATE = `You are given the below API Documentation:
{api_docs}
Using this documentation, generate the full API url to call for answering the user question.
You should build the API url in order to get a response that is as short as possible, while still getting the necessary information to answer the question. Pay attention to deliberately exclude any unnecessary pieces of data in the API call.

Question:{question}
API url:`;
const API_URL_PROMPT_TEMPLATE = /* #__PURE__ */ new prompts/* PromptTemplate */.Hh({
    inputVariables: ["api_docs", "question"],
    template: API_URL_RAW_PROMPT_TEMPLATE,
});
const API_RESPONSE_RAW_PROMPT_TEMPLATE = `${API_URL_RAW_PROMPT_TEMPLATE} {api_url}

Here is the response from the API:

{api_response}

Summarize this response to answer the original question.

Summary:`;
const API_RESPONSE_PROMPT_TEMPLATE = /* #__PURE__ */ new prompts/* PromptTemplate */.Hh({
    inputVariables: ["api_docs", "question", "api_url", "api_response"],
    template: API_RESPONSE_RAW_PROMPT_TEMPLATE,
});

;// ./node_modules/.pnpm/langchain@0.3.19_@langchain+core@0.3.42_openai@4.87.4_ws@8.18.1_zod@3.24.2___@langchain+deeps_pxpnwc4yhnzklj5cil5nybwo6i/node_modules/langchain/dist/chains/api/api_chain.js



/**
 * Class that extends BaseChain and represents a chain specifically
 * designed for making API requests and processing API responses.
 */
class APIChain extends base/* BaseChain */.r {
    get inputKeys() {
        return [this.inputKey];
    }
    get outputKeys() {
        return [this.outputKey];
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "apiAnswerChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "apiRequestChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "apiDocs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "question"
        });
        Object.defineProperty(this, "outputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "output"
        });
        this.apiRequestChain = fields.apiRequestChain;
        this.apiAnswerChain = fields.apiAnswerChain;
        this.apiDocs = fields.apiDocs;
        this.inputKey = fields.inputKey ?? this.inputKey;
        this.outputKey = fields.outputKey ?? this.outputKey;
        this.headers = fields.headers ?? this.headers;
    }
    /** @ignore */
    async _call(values, runManager) {
        const question = values[this.inputKey];
        const api_url = await this.apiRequestChain.predict({ question, api_docs: this.apiDocs }, runManager?.getChild("request"));
        const res = await fetch(api_url, { headers: this.headers });
        const api_response = await res.text();
        const answer = await this.apiAnswerChain.predict({ question, api_docs: this.apiDocs, api_url, api_response }, runManager?.getChild("response"));
        return { [this.outputKey]: answer };
    }
    _chainType() {
        return "api_chain";
    }
    static async deserialize(data) {
        const { api_request_chain, api_answer_chain, api_docs } = data;
        if (!api_request_chain) {
            throw new Error("LLMChain must have api_request_chain");
        }
        if (!api_answer_chain) {
            throw new Error("LLMChain must have api_answer_chain");
        }
        if (!api_docs) {
            throw new Error("LLMChain must have api_docs");
        }
        return new APIChain({
            apiAnswerChain: await llm_chain.LLMChain.deserialize(api_answer_chain),
            apiRequestChain: await llm_chain.LLMChain.deserialize(api_request_chain),
            apiDocs: api_docs,
        });
    }
    serialize() {
        return {
            _type: this._chainType(),
            api_answer_chain: this.apiAnswerChain.serialize(),
            api_request_chain: this.apiRequestChain.serialize(),
            api_docs: this.apiDocs,
        };
    }
    /**
     * Static method to create a new APIChain from a BaseLanguageModel and API
     * documentation.
     * @param llm BaseLanguageModel instance.
     * @param apiDocs API documentation.
     * @param options Optional configuration options for the APIChain.
     * @returns New APIChain instance.
     */
    static fromLLMAndAPIDocs(llm, apiDocs, options = {}) {
        const { apiUrlPrompt = API_URL_PROMPT_TEMPLATE, apiResponsePrompt = API_RESPONSE_PROMPT_TEMPLATE, } = options;
        const apiRequestChain = new llm_chain.LLMChain({ prompt: apiUrlPrompt, llm });
        const apiAnswerChain = new llm_chain.LLMChain({ prompt: apiResponsePrompt, llm });
        return new this({
            apiAnswerChain,
            apiRequestChain,
            apiDocs,
            ...options,
        });
    }
}


/***/ })

};
;
//# sourceMappingURL=834.3cbe720fdc5f43f3afea.js.map