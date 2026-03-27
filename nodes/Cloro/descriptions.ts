import type { INodeProperties } from 'n8n-workflow';

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
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
				resource: ['dataExtraction'],
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
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		typeOptions: {
			loadOptionsMethod: 'getCountries',
		},
		default: '',
		displayOptions: {
			show: {
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
				resource: ['dataExtraction'],
				operation: ['getTaskStatus'],
			},
		},
	},
];
