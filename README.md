# n8n-nodes-cloro

This is an n8n community node for [cloro API](https://cloro.dev/docs). It lets you extract structured data from AI responses and search results in your n8n workflows.

cloro is an API service that provides structured data extraction from multiple AI providers including ChatGPT, Google Search, Google Gemini, Perplexity, Microsoft Copilot, Grok, and Google AI Mode.

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

Since version 0.2.0 each AI engine is its own resource, mapping 1:1 to the matching [cloro monitor endpoint](https://cloro.dev/docs/guides/making-requests/sync) (`POST /v1/monitor/<engine>`). Workflows built with earlier versions keep the original provider dropdown and continue to work unchanged.

### Engine resources (Monitor)

Each engine resource supports a **Monitor** operation that extracts structured data from that engine:

- **ChatGPT** - OpenAI's ChatGPT with optional raw response and search queries
- **Google AI Mode** - Google's AI-powered search mode
- **Google Gemini** - Google's Gemini AI model
- **Google Search** - Traditional Google Search with AI Overview support
- **Grok** - xAI's Grok AI assistant
- **Microsoft Copilot** - Microsoft's Copilot AI
- **Perplexity** - Perplexity AI search

**Engine-Specific Options:**
- **Google Search**: Query, country, city, device type (desktop/mobile), number of pages, include HTML, include AI Overview, include markdown
- **Other AI Engines**: Prompt, country, include HTML, include markdown
- **ChatGPT (additional)**: Include raw response, include search queries (query fan-out)

### Country: Get Many
Retrieve a list of supported countries, optionally filtered by model/engine.

### Task: Get Status
Check the status of a monitoring task using its task ID.

## Credentials

To use this node, you need a cloro API key.

### Prerequisites
1. Sign up at [cloro.dev](https://cloro.dev) to get your API key
2. Visit the [cloro documentation](https://cloro.dev/docs) for API details

### Authentication
The node uses API Key authentication via Bearer token:
- In n8n, create a new credential for "cloro API"
- Enter your API key in the "API Key" field
- The node automatically includes the key in the Authorization header as `Bearer YOUR_API_KEY`

## Compatibility

- **Minimum n8n version**: Compatible with n8n version 1.0.0 and later
- **Node version**: 1.0.0
- **License**: MIT

## Usage

### Basic Example Workflow

1. Add the **cloro** node to your workflow
2. Select your **Resource** (e.g., ChatGPT, Google Search)
3. Choose the **Operation** (typically "Monitor")
4. Configure your parameters:
   - For **Google Search**: Enter a query, select country, device, and other options
   - For **AI engines**: Enter a prompt and select country
5. Configure optional fields like include HTML, markdown, or other engine-specific options

### Example: Monitoring Google Search Results

```
Node: cloro
Resource: Google Search
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
Node: cloro
Resource: ChatGPT
Operation: Monitor
Prompt: "What are the top 5 programming languages in 2025?"
Country: United States
Include Raw Response: true
Include Query Fan-Out: true
```

### Using Get Many Countries

```
Node: cloro
Resource: Country
Operation: Get Many
Filter by Model: chatgpt (optional)
```

This returns a list of countries supported by the specified engine.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [cloro API Documentation](https://cloro.dev/docs)
* [cloro Website](https://cloro.dev)

## Version History

### 0.2.0
- Node typeVersion 2: one resource per AI engine (ChatGPT, Google AI Mode, Google Gemini, Google Search, Grok, Microsoft Copilot, Perplexity), matching the per-engine cloro monitor endpoints
- Country (Get Many) and Task (Get Status) as dedicated resources
- Existing workflows keep running on typeVersion 1 with the provider dropdown

### 0.1.0
- Initial release
- Support for 7 AI/search providers (ChatGPT, Google Search, Google Gemini, Google AI Mode, Perplexity, Microsoft Copilot, Grok)
- Operations: Monitor, Get Countries, Get Task Status
- Provider-specific options for each service
- Support for HTML, Markdown, AI Overview, raw response, and search queries
- Country/location filtering capabilities
