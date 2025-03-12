var _virtual__entry = {
  fetch: async (request, env, context) => {
    Object.keys(env).forEach(key => {
      process.env[key] = env[key];
    });

    const { mastra } = await import('./index2.mjs');
    const { createHonoServer } = await import('./index3.mjs');
    const app = await createHonoServer(mastra);
    return app.fetch(request, env, context);
  }
};

export { _virtual__entry as default };
