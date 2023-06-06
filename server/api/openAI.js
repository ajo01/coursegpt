const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  organization: 'org-Ctm9a6WpVYabY1qbocCED6NW',
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// example call. follow the listModels() function to see the remaining list of available functions.
// They are pretty much a one to one mapping with the OpenAI API listed here  https://platform.openai.com/docs/api-reference/
async function listModels() {
  const response = await openai.listModels();
  console.log(response);
}

// example call to use a fine-tuned model
async function getTrainedModelResponse(model, prompt) {
    const response = await openai.createCompletion({
        model: model,
        prompt: prompt
      });
    console.log(response);
}

// example call to delete a fine-tuned model (must be the designated owner in the organization)
async function deleteTrainedModel(model) {
    const response = await openai.deleteModel({
        model: model
      });
    console.log(response);
}

// openAI training data file upload (JSONL)

