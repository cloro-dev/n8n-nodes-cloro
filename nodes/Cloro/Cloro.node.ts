import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeApiError, NodeConnectionTypes } from 'n8n-workflow';

import { descriptions } from './descriptions';
import { cloroApiRequest, getCountries, getModels } from './GenericFunctions';

export class Cloro implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Cloro',
		name: 'cloro',
		icon: 'file:cloro.light.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Extract structured data from AI responses and search results via cloro API',
		defaults: {
			name: 'Cloro',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'cloroApi',
				required: true,
			},
		],
		properties: descriptions,
	};

	methods = {
		loadOptions: {
			getCountries,
			getModels,
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const provider = this.getNodeParameter('provider', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		let response;

		for (let i = 0; i < items.length; i++) {
			try {
				if (operation === 'monitor') {
					const body: IDataObject = {};
					const include: IDataObject = {};

					if (provider === 'google') {
						// Google Search uses 'query' instead of 'prompt'
						const query = this.getNodeParameter('query', i) as string;
						body.query = query;

						const country = this.getNodeParameter('country', i) as string;
						if (country) {
							body.country = country;
						}

						// Google Search-specific parameters
						const city = this.getNodeParameter('city', i) as string;
						if (city) {
							body.city = city;
						}

						const device = this.getNodeParameter('device', i) as string;
						if (device) {
							body.device = device;
						}

						const pages = this.getNodeParameter('pages', i) as number;
						if (pages) {
							body.pages = pages;
						}

						// Google Search supports include.html
						const includeHtml = this.getNodeParameter('includeHtml', i) as boolean;
						if (includeHtml) {
							include.html = true;
						}

						// Google Search supports include.aioverview
						const includeAiOverview = this.getNodeParameter(
							'includeAiOverview',
							i,
						) as boolean;
						if (includeAiOverview) {
							include.aioverview = true;
						}

						// Google Search supports include.markdown for AI Overview
						const includeMarkdown = this.getNodeParameter(
							'includeMarkdown',
							i,
						) as boolean;
						if (includeMarkdown) {
							include.markdown = true;
						}
					} else {
						// All other providers use 'prompt'
						const prompt = this.getNodeParameter('prompt', i) as string;
						body.prompt = prompt;

						const country = this.getNodeParameter('country', i) as string;
						if (country) {
							body.country = country;
						}

						// All providers support include.html
						const includeHtml = this.getNodeParameter('includeHtml', i) as boolean;
						if (includeHtml) {
							include.html = true;
						}

						// Only AI-based providers support markdown
						const markdownProviders = [
							'chatgpt',
							'perplexity',
							'copilot',
							'gemini',
							'grok',
							'aimode',
							'google',
						];
						if (markdownProviders.includes(provider)) {
							const includeMarkdown = this.getNodeParameter(
								'includeMarkdown',
								i,
							) as boolean;
							if (includeMarkdown) {
								include.markdown = true;
							}
						}

						// Only ChatGPT supports raw response and search queries
						if (provider === 'chatgpt') {
							const includeRawResponse = this.getNodeParameter(
								'includeRawResponse',
								i,
							) as boolean;
							const includeSearchQueries = this.getNodeParameter(
								'includeSearchQueries',
								i,
							) as boolean;

							if (includeRawResponse) {
								include.rawResponse = true;
							}
							if (includeSearchQueries) {
								include.searchQueries = true;
							}
						}
					}

					if (Object.keys(include).length > 0) {
						body.include = include;
					}

					response = await cloroApiRequest.call(
						this,
						'POST',
						`/v1/monitor/${provider}`,
						body,
					);
				} else if (operation === 'getCountries') {
					const qs: IDataObject = {};
					const filterByModel = this.getNodeParameter('filterByModel', i) as string;

					if (filterByModel) {
						qs.model = filterByModel;
					}

					response = await cloroApiRequest.call(this, 'GET', '/v1/countries', {}, qs);
				} else if (operation === 'getTaskStatus') {
					const taskId = this.getNodeParameter('taskId', i) as string;

					response = await cloroApiRequest.call(this, 'GET', `/v1/tasks/${taskId}`);
				}

				returnData.push({
					json: response as IDataObject,
					pairedItem: { item: i },
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error instanceof Error ? error.message : String(error),
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw new NodeApiError(this.getNode(), error);
			}
		}

		return [returnData];
	}
}
