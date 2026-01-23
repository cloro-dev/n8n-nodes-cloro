import type {
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IHttpRequestOptions,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

export class CloroApi implements ICredentialType {
	name = 'cloroApi';

	displayName = 'cloro API';

	icon: Icon = { light: 'file:../nodes/Cloro/cloro.light.svg', dark: 'file:../nodes/Cloro/cloro.dark.svg' };

	documentationUrl = 'https://docs.cloro.dev';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.cloro.dev',
			url: '/v1/countries',
		},
	};

	async authenticate(
		credentials: ICredentialDataDecryptedObject,
		requestOptions: IHttpRequestOptions,
	): Promise<IHttpRequestOptions> {
		requestOptions.headers = {
			...requestOptions.headers,
			Authorization: `Bearer ${credentials.apiKey}`,
		};
		return requestOptions;
	}
}
