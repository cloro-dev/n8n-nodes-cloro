import type { INodeProperties } from 'n8n-workflow';

// ----------------------------------------------------------------------
// typeVersion 1 — single "Data Extraction" resource with a provider
// dropdown. Kept intact so saved workflows keep running unchanged.
// ----------------------------------------------------------------------
const v1Descriptions: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				'@version': [1],
			},
		},
		options: [
			{
				name: 'Data Extraction',
				value: 'dataExtraction',
			},
		],
		default: 'dataExtraction',
	},
	{
		displayName: 'Provider',
		name: 'provider',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				'@version': [1],
				resource: ['dataExtraction'],
				operation: ['monitor'],
			},
		},
		options: [
			{
				name: 'ChatGPT',
				value: 'chatgpt',
			},
			{
				name: 'Google AI Mode',
				value: 'aimode',
			},
			{
				name: 'Google Gemini',
				value: 'gemini',
			},
			{
				name: 'Google Search',
				value: 'google',
			},
			{
				name: 'Grok',
				value: 'grok',
			},
			{
				name: 'Microsoft Copilot',
				value: 'copilot',
			},
			{
				name: 'Perplexity',
				value: 'perplexity',
			},
		],
		default: 'chatgpt',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				'@version': [1],
				resource: ['dataExtraction'],
			},
		},
		options: [
			{
				name: 'Get Countries',
				value: 'getCountries',
				description: 'Get list of supported countries',
				action: 'Get list of supported countries',
			},
			{
				name: 'Get Task Status',
				value: 'getTaskStatus',
				description: 'Get status of a monitoring task',
				action: 'Get status of a monitoring task',
			},
			{
				name: 'Monitor',
				value: 'monitor',
				description: 'Extract structured data from provider',
				action: 'Extract structured data from provider',
			},
		],
		default: 'monitor',
	},
	// ----------------------------------------------------------------------
	//                                monitor
	// ----------------------------------------------------------------------
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				'@version': [1],
				resource: ['dataExtraction'],
				operation: ['monitor'],
				provider: ['google'],
			},
		},
	},
	{
		displayName: 'Prompt',
		name: 'prompt',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				'@version': [1],
				resource: ['dataExtraction'],
				operation: ['monitor'],
				provider: ['chatgpt', 'perplexity', 'copilot', 'gemini', 'grok', 'aimode'],
			},
		},
	},
	{
		displayName: 'Country Code Name or ID',
		name: 'country',
		type: 'options',
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		typeOptions: {
			loadOptionsMethod: 'getCountries',
		},
		default: '',
		displayOptions: {
			show: {
				'@version': [1],
				resource: ['dataExtraction'],
				operation: ['monitor'],
			},
		},
	},
	{
		displayName: 'City',
		name: 'city',
		type: 'string',
		default: '',
		description: 'Canonical city name for localized search (e.g., "New York, NY, US")',
		displayOptions: {
			show: {
				'@version': [1],
				resource: ['dataExtraction'],
				operation: ['monitor'],
				provider: ['google'],
			},
		},
	},
	{
		displayName: 'Device',
		name: 'device',
		type: 'options',
		default: 'desktop',
		description: 'Device type for search results',
		options: [
			{
				name: 'Desktop',
				value: 'desktop',
			},
			{
				name: 'Mobile',
				value: 'mobile',
			},
		],
		displayOptions: {
			show: {
				'@version': [1],
				resource: ['dataExtraction'],
				operation: ['monitor'],
				provider: ['google'],
			},
		},
	},
	{
		displayName: 'Number Of Pages',
		name: 'pages',
		type: 'number',
		default: 1,
		description: 'Number of result pages to fetch (1-20)',
		typeOptions: {
			minValue: 1,
			maxValue: 20,
		},
		displayOptions: {
			show: {
				'@version': [1],
				resource: ['dataExtraction'],
				operation: ['monitor'],
				provider: ['google'],
			},
		},
	},
	{
		displayName: 'Include Raw HTML',
		name: 'includeHtml',
		type: 'boolean',
		default: false,
		description: 'Whether to include raw HTML content from the response',
		displayOptions: {
			show: {
				'@version': [1],
				resource: ['dataExtraction'],
				operation: ['monitor'],
			},
		},
	},
	{
		displayName: 'Include AI Overview',
		name: 'includeAiOverview',
		type: 'boolean',
		default: false,
		description: 'Whether to include AI Overview data in the response',
		displayOptions: {
			show: {
				'@version': [1],
				resource: ['dataExtraction'],
				operation: ['monitor'],
				provider: ['google'],
			},
		},
	},
	{
		displayName: 'Include Markdown',
		name: 'includeMarkdown',
		type: 'boolean',
		default: false,
		description: 'Whether to include markdown-formatted response in the result',
		displayOptions: {
			show: {
				'@version': [1],
				resource: ['dataExtraction'],
				operation: ['monitor'],
				provider: ['chatgpt', 'perplexity', 'copilot', 'gemini', 'grok', 'aimode', 'google'],
			},
		},
	},
	{
		displayName: 'Include Raw Response',
		name: 'includeRawResponse',
		type: 'boolean',
		default: false,
		description: 'Whether to include raw streaming response payload',
		displayOptions: {
			show: {
				'@version': [1],
				resource: ['dataExtraction'],
				operation: ['monitor'],
				provider: ['chatgpt'],
			},
		},
	},
	{
		displayName: 'Include Query Fan-Out',
		name: 'includeSearchQueries',
		type: 'boolean',
		default: false,
		description: 'Whether to include the query fan-out used to generate the response',
		displayOptions: {
			show: {
				'@version': [1],
				resource: ['dataExtraction'],
				operation: ['monitor'],
				provider: ['chatgpt'],
			},
		},
	},
	// ----------------------------------------------------------------------
	//                            getCountries
	// ----------------------------------------------------------------------
	{
		displayName: 'Filter by Model Name or ID',
		name: 'filterByModel',
		type: 'options',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		typeOptions: {
			loadOptionsDependsOn: ['provider'],
			loadOptionsMethod: 'getModels',
		},
		default: '',
		displayOptions: {
			show: {
				'@version': [1],
				resource: ['dataExtraction'],
				operation: ['getCountries'],
			},
		},
	},
	// ----------------------------------------------------------------------
	//                            getTaskStatus
	// ----------------------------------------------------------------------
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				'@version': [1],
				resource: ['dataExtraction'],
				operation: ['getTaskStatus'],
			},
		},
	},
];

// ----------------------------------------------------------------------
// typeVersion 2 — one resource per AI engine, each mapping to its own
// /v1/monitor/<engine> endpoint, plus Country and Task utility resources.
// ----------------------------------------------------------------------

// Engine resource values double as the /v1/monitor/<engine> path segment,
// except googleNews, which maps to /v1/monitor/google/news.
const promptEngines = ['aimode', 'chatgpt', 'copilot', 'gemini', 'grok', 'perplexity'];
const allEngines = [...promptEngines, 'google'];

const v2Descriptions: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				'@version': [2],
			},
		},
		options: [
			{
				name: 'ChatGPT',
				value: 'chatgpt',
			},
			{
				name: 'Country',
				value: 'country',
			},
			{
				name: 'Google AI Mode',
				value: 'aimode',
			},
			{
				name: 'Google Gemini',
				value: 'gemini',
			},
			{
				// eslint-disable-next-line n8n-nodes-base/node-param-resource-with-plural-option
				name: 'Google News',
				value: 'googleNews',
			},
			{
				name: 'Google Search',
				value: 'google',
			},
			{
				name: 'Grok',
				value: 'grok',
			},
			{
				name: 'Microsoft Copilot',
				value: 'copilot',
			},
			{
				name: 'Perplexity',
				value: 'perplexity',
			},
			{
				name: 'Task',
				value: 'task',
			},
		],
		default: 'chatgpt',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['chatgpt'],
			},
		},
		options: [
			{
				name: 'Monitor',
				value: 'monitor',
				description: 'Extract structured data from a ChatGPT response',
				// eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
				action: 'Monitor ChatGPT',
			},
		],
		default: 'monitor',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['aimode'],
			},
		},
		options: [
			{
				name: 'Monitor',
				value: 'monitor',
				description: 'Extract structured data from a Google AI Mode response',
				// eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
				action: 'Monitor Google AI Mode',
			},
		],
		default: 'monitor',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['gemini'],
			},
		},
		options: [
			{
				name: 'Monitor',
				value: 'monitor',
				description: 'Extract structured data from a Google Gemini response',
				// eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
				action: 'Monitor Google Gemini',
			},
		],
		default: 'monitor',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['googleNews'],
			},
		},
		options: [
			{
				name: 'Monitor',
				value: 'monitor',
				description: 'Extract structured data from Google News results',
				// eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
				action: 'Monitor Google News',
			},
		],
		default: 'monitor',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['google'],
			},
		},
		options: [
			{
				name: 'Monitor',
				value: 'monitor',
				description: 'Extract structured data from Google Search results',
				// eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
				action: 'Monitor Google Search',
			},
		],
		default: 'monitor',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['grok'],
			},
		},
		options: [
			{
				name: 'Monitor',
				value: 'monitor',
				description: 'Extract structured data from a Grok response',
				// eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
				action: 'Monitor Grok',
			},
		],
		default: 'monitor',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['copilot'],
			},
		},
		options: [
			{
				name: 'Monitor',
				value: 'monitor',
				description: 'Extract structured data from a Microsoft Copilot response',
				// eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
				action: 'Monitor Microsoft Copilot',
			},
		],
		default: 'monitor',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['perplexity'],
			},
		},
		options: [
			{
				name: 'Monitor',
				value: 'monitor',
				description: 'Extract structured data from a Perplexity response',
				// eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
				action: 'Monitor Perplexity',
			},
		],
		default: 'monitor',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['country'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get list of supported countries',
				action: 'Get many countries',
			},
		],
		default: 'getMany',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['task'],
			},
		},
		options: [
			{
				name: 'Get Status',
				value: 'getStatus',
				description: 'Get status of a monitoring task',
				action: 'Get task status',
			},
		],
		default: 'getStatus',
	},
	// ----------------------------------------------------------------------
	//                                monitor
	// ----------------------------------------------------------------------
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['google', 'googleNews'],
				operation: ['monitor'],
			},
		},
	},
	{
		displayName: 'Prompt',
		name: 'prompt',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				'@version': [2],
				resource: promptEngines,
				operation: ['monitor'],
			},
		},
	},
	{
		displayName: 'Country Code Name or ID',
		name: 'country',
		type: 'options',
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		typeOptions: {
			loadOptionsMethod: 'getCountries',
		},
		default: '',
		displayOptions: {
			show: {
				'@version': [2],
				resource: allEngines,
				operation: ['monitor'],
			},
		},
	},
	{
		displayName: 'Country Code Name or ID',
		name: 'country',
		type: 'options',
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		typeOptions: {
			loadOptionsMethod: 'getCountries',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['googleNews'],
				operation: ['monitor'],
			},
		},
	},
	{
		displayName: 'City',
		name: 'city',
		type: 'string',
		default: '',
		description: 'Canonical city name for localized search (e.g., "New York, NY, US")',
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['google'],
				operation: ['monitor'],
			},
		},
	},
	{
		displayName: 'Device',
		name: 'device',
		type: 'options',
		default: 'desktop',
		description: 'Device type for search results',
		options: [
			{
				name: 'Desktop',
				value: 'desktop',
			},
			{
				name: 'Mobile',
				value: 'mobile',
			},
		],
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['google', 'googleNews'],
				operation: ['monitor'],
			},
		},
	},
	{
		displayName: 'Number Of Pages',
		name: 'pages',
		type: 'number',
		default: 1,
		description: 'Number of result pages to fetch (1-20)',
		typeOptions: {
			minValue: 1,
			maxValue: 20,
		},
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['google'],
				operation: ['monitor'],
			},
		},
	},
	{
		displayName: 'Number Of Pages',
		name: 'pages',
		type: 'number',
		default: 1,
		description: 'Number of news result pages to fetch (1-10)',
		typeOptions: {
			minValue: 1,
			maxValue: 10,
		},
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['googleNews'],
				operation: ['monitor'],
			},
		},
	},
	{
		displayName: 'Include Raw HTML',
		name: 'includeHtml',
		type: 'boolean',
		default: false,
		description: 'Whether to include raw HTML content from the response',
		displayOptions: {
			show: {
				'@version': [2],
				resource: [...allEngines, 'googleNews'],
				operation: ['monitor'],
			},
		},
	},
	{
		displayName: 'Include AI Overview',
		name: 'includeAiOverview',
		type: 'boolean',
		default: false,
		description: 'Whether to include AI Overview data in the response',
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['google'],
				operation: ['monitor'],
			},
		},
	},
	{
		displayName: 'Include Markdown',
		name: 'includeMarkdown',
		type: 'boolean',
		default: false,
		description: 'Whether to include markdown-formatted response in the result',
		displayOptions: {
			show: {
				'@version': [2],
				resource: allEngines,
				operation: ['monitor'],
			},
		},
	},
	{
		displayName: 'Include Raw Response',
		name: 'includeRawResponse',
		type: 'boolean',
		default: false,
		description: 'Whether to include raw streaming response payload',
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['chatgpt'],
				operation: ['monitor'],
			},
		},
	},
	{
		displayName: 'Include Query Fan-Out',
		name: 'includeSearchQueries',
		type: 'boolean',
		default: false,
		description: 'Whether to include the query fan-out used to generate the response',
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['chatgpt'],
				operation: ['monitor'],
			},
		},
	},
	// ----------------------------------------------------------------------
	//                             country: getMany
	// ----------------------------------------------------------------------
	{
		displayName: 'Filter by Model Name or ID',
		name: 'filterByModel',
		type: 'options',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		typeOptions: {
			loadOptionsMethod: 'getModels',
		},
		default: '',
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['country'],
				operation: ['getMany'],
			},
		},
	},
	// ----------------------------------------------------------------------
	//                              task: getStatus
	// ----------------------------------------------------------------------
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				'@version': [2],
				resource: ['task'],
				operation: ['getStatus'],
			},
		},
	},
];

export const descriptions: INodeProperties[] = [...v1Descriptions, ...v2Descriptions];
