# AllStar Website Chatbot: Setup (for Jamal)

The chat bubble is built but **OFF**. Nothing shows on the site until you do the two steps below.

## Turn it on (2 steps, Netlify)

Netlify -> your site -> Site configuration -> Environment variables -> Add a variable:

1. `ANTHROPIC_API_KEY` = your Claude API key (from console.anthropic.com -> API keys). Mark it "Secret".
2. `PUBLIC_CHAT_ENABLED` = `true`

Then Deploys -> Trigger deploy -> Deploy site. The bubble ("Chat with AllStar") appears bottom-right in about 2 minutes.

(No key yet? If you only set `PUBLIC_CHAT_ENABLED`, the bubble shows and says "Chat is offline. Call (908) 341-1131 or book your free trial.")

## What it costs

Roughly **$10 to $60 a month** for 300 to 1,000 chats, using the small, cheap Claude model (Haiku). Netlify and Supabase add nothing. Set a monthly spend limit in the Anthropic console (Settings -> Limits) so a spam attack can't run up a bill. The site also limits each visitor to 20 messages an hour.

## How to test (before telling anyone)

1. Open allstarbjj.com, click "Chat with AllStar".
2. Ask: "Do you have classes for my 5 year old?", "How much is it?" (should say $179 to $249 a month depending on the program, nothing more exact), "What time are kids classes?" (should NOT give exact times), "Are you a real person?" (should say it's an AI).
3. Say you want to try a class. A form appears with the text-message checkbox. Try submitting without the checkbox (it must refuse). Then submit with your own info and confirm the lead shows up in Command Center and you get the text.
4. Check the bubble does not appear on /schedule/.

## How to turn it off

Netlify -> Environment variables -> set `PUBLIC_CHAT_ENABLED` to `false` (or delete it) -> Trigger deploy. The bubble disappears. To kill just the AI (bubble stays but says offline), delete `ANTHROPIC_API_KEY`.

## Changing what the bot knows

The bot only knows what is in `allstar-knowledge-base.md`. After you edit that file, ask Claude to run `npm run sync-kb` and redeploy.

## Notes

- Leads go through the same Command Center pipeline as the website form, tagged `source: chatbot`. The visitor must tick the text-message consent box; the server refuses the lead otherwise.
- Optional: `CHAT_MODEL` (default `claude-haiku-4-5`), `CHAT_RATE_LIMIT` (messages per visitor per hour, default 20).
