# FlowPilot — Business Process Automation Agent

Portfolio project 3: a polished, safe operations inbox for business workflow automation. FlowPilot accepts a natural-language work item, classifies it into a bounded playbook, collects structured inputs, previews an approval route, runs deterministic actions against sample data, and records a local handoff/audit result. This is deliberately not a financial reporting dashboard.

## Free local mode

The default **Rule-based / local** provider is the complete product. It needs no API key, does not call a paid service, and works offline after Node.js is installed. Supported playbooks are purchase approval routing, customer follow-up drafting, low-stock notification preparation, and invoice intake triage. The app never sends email, places orders, creates accounting records, or changes external systems.

## Optional providers

The Provider settings screen includes a user-configured OpenAI-compatible endpoint and optional local Ollama settings. They are intentionally inactive by default. No credential is embedded in this repository. If a user chooses to connect a provider, they must supply the endpoint, model, and key themselves. The current demo UI still executes the safe local path; provider integration can be added later behind the same interface.

## Windows setup

1. Install Node.js 18 or newer.
2. Open PowerShell in this folder.
3. Run `npm test`.
4. Run `npm start` and open `http://localhost:4173`.

There are no runtime dependencies, so there is nothing to download or configure beyond Node.js.

## Screenshots and publication plan

Before publishing, run the app locally and capture the Operations inbox with a classified work item/result, the Approval history after two handoffs, and AI provider showing local mode active. Crop at a consistent 1440px desktop viewport, blur or replace any personal data, and include the three PNGs in a `screenshots/` folder. Review the README and `.gitignore`, then create a repository manually; this project has not been published to GitHub.
