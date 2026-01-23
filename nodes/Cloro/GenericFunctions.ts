import type {
	IExecuteFunctions,
	ILoadOptionsFunctions,
	IHookFunctions,
	IWebhookFunctions,
	IDataObject,
	IHttpRequestOptions,
	IHttpRequestMethods,
} from 'n8n-workflow';

export async function cloroApiRequest(
	this:
		| IHookFunctions
		| IExecuteFunctions
		| IWebhookFunctions
		| ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<IDataObject> {
	const options: IHttpRequestOptions = {
		method,
		body,
		qs,
		url: `https://api.cloro.dev${endpoint}`,
		json: true,
	};

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

	if (Object.keys(qs).length === 0) {
		delete options.qs;
	}

	return await this.helpers.httpRequestWithAuthentication.call(this, 'cloroApi', options);
}

export async function getCountries(
	this: ILoadOptionsFunctions,
): Promise<{ name: string; value: string }[]> {
	const returnData: { name: string; value: string }[] = [];

	const filterByModel = this.getNodeParameter('filterByModel', '') as string;

	const qs: IDataObject = {};
	if (filterByModel) {
		qs.model = filterByModel;
	}

	const response = await cloroApiRequest.call(this, 'GET', '/v1/countries', {}, qs);

	if (Array.isArray(response)) {
		for (const item of response) {
			const country = item as string;
			returnData.push({
				name: country,
				value: country,
			});
		}
	}

	return returnData;
}

export async function getModels(
	this: ILoadOptionsFunctions,
): Promise<{ name: string; value: string }[]> {
	const returnData: { name: string; value: string }[] = [];

	const providers = [
		{ name: 'ChatGPT', value: 'chatgpt' },
		{ name: 'Grok', value: 'grok' },
		{ name: 'Google AI Mode', value: 'aimode' },
		{ name: 'Google Gemini', value: 'gemini' },
		{ name: 'Google Search', value: 'google' },
		{ name: 'Microsoft Copilot', value: 'copilot' },
		{ name: 'Perplexity', value: 'perplexity' },
	];

	for (const provider of providers) {
		returnData.push({
			name: provider.name,
			value: provider.value,
		});
	}

	return returnData;
}
