# n8n-nodes-cloro

This is an n8n community node for [Cloro API](https://docs.cloro.dev). It lets you extract structured data from AI responses and search results in your n8n workflows.

Cloro is an API service that provides structured data extraction from multiple AI providers including ChatGPT, Google Search, Google Gemini, Perplexity, Microsoft Copilot, Grok, and Google AI Mode.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

To install this node, run the following command in your n8n installation directory:

```bash
npm install n8n-nodes-cloro
```

Or use the community nodes installation feature in the n8n UI by searching for `n8n-nodes-cloro`.

## Operations

### Monitor
Extract structured data from various AI and search providers.

**Supported Providers:**
- **ChatGPT** - OpenAI's ChatGPT with optional raw response and search queries
- **Google AI Mode** - Google's AI-powered search mode
- **Google Gemini** - Google's Gemini AI model
- **Google Search** - Traditional Google Search with AI Overview support
- **Grok** - xAI's Grok AI assistant
- **Microsoft Copilot** - Microsoft's Copilot AI
- **Perplexity** - Perplexity AI search

**Provider-Specific Options:**
- **Google Search**: Query, country, city, device type (desktop/mobile), number of pages, include HTML, include AI Overview, include markdown
- **Other AI Providers**: Prompt, country, include HTML, include markdown
- **ChatGPT (additional)**: Include raw response, include search queries (query fan-out)

### Get Countries
Retrieve a list of supported countries, optionally filtered by model/provider.

### Get Task Status
Check the status of a monitoring task using its task ID.

## Credentials

To use this node, you need a Cloro API key.

### Prerequisites
1. Sign up at [cloro.dev](https://cloro.dev) to get your API key
2. Visit the [Cloro documentation](https://docs.cloro.dev) for API details

### Authentication
The node uses API Key authentication via Bearer token:
- In n8n, create a new credential for "Cloro API"
- Enter your API key in the "API Key" field
- The node automatically includes the key in the Authorization header as `Bearer YOUR_API_KEY`

## Compatibility

- **Minimum n8n version**: Compatible with n8n version 1.0.0 and later
- **Node version**: 1.0.0
- **License**: MIT

## Usage

### Basic Example Workflow

1. Add the **Cloro** node to your workflow
2. Select your **Provider** (e.g., ChatGPT, Google Search)
3. Choose the **Operation** (typically "Monitor")
4. Configure your parameters:
   - For **Google Search**: Enter a query, select country, device, and other options
   - For **AI providers**: Enter a prompt and select country
5. Configure optional fields like include HTML, markdown, or other provider-specific options

### Example: Monitoring Google Search Results

```
Node: Cloro
Provider: Google Search
Operation: Monitor
Query: "best coffee shops in New York"
Country: United States
Device: Desktop
Pages: 2
Include AI Overview: true
Include Markdown: true
```

### Example: Extracting Data from ChatGPT

```
Node: Cloro
Provider: ChatGPT
Operation: Monitor
Prompt: "What are the top 5 programming languages in 2025?"
Country: United States
Include Raw Response: true
Include Query Fan-Out: true
```

### Using Get Countries

```
Node: Cloro
Operation: Get Countries
Filter by Model: chatgpt (optional)
```

This returns a list of countries supported by the specified provider.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Cloro API Documentation](https://docs.cloro.dev)
* [Cloro Website](https://cloro.dev)

## Version History

### 0.1.0
- Initial release
- Support for 7 AI/search providers (ChatGPT, Google Search, Google Gemini, Google AI Mode, Perplexity, Microsoft Copilot, Grok)
- Operations: Monitor, Get Countries, Get Task Status
- Provider-specific options for each service
- Support for HTML, Markdown, AI Overview, raw response, and search queries
- Country/location filtering capabilities
