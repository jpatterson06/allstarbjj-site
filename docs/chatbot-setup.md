# AllStar Website Chatbot: Setup (for Jamal)

The chat bubble is built but **OFF**. Nothing shows on the site until you do the two steps below.

## Turn it on (2 steps, Netlify)

Netlify -> your site -> Site configuration -> Environment variables -> Add a variable:

1. `ANTHROPIC_API_KEY` = your Claude API key (from console.anthropic.com -> API keys). Mark it "Secret".
2. `PUBLIC_CHAT_ENABLED` = `true`

Then Deploys -> Trigger deploy -> Deploy site. The bubble ("Chat with AllStar") appears bottom-right in about 2 minutes.

(No key yet? If you only set `PUBLIC_CHAT_ENABLED`, the bubble shows and says "Chat is offline. Call (908) 341-1131 or book your free trial.")

## What it costs

Roughly **$10 to $60 a month** for 300 to 1,000 chats, using the small, cheap Claude model (Haiku). Netlify and Supabase add nothing. The bot also stops itself at a spending limit (see below), and limits each visitor to 20 messages an hour.

## Spending limit

The bot stops itself at **$15 a month**. It keeps a running total of what it has spent (rounded up, so it never under-counts). Once the month hits $15, the chat says "Chat is taking a break. Call (908) 341-1131 or book your free trial at /trial/." and stops calling Claude until the 1st of the next month (UTC). As a second safety net, it also stops for the rest of the day if a single day passes $2 (one tenth of the monthly limit, rounded up), so one bad day can't burn the whole month.

- To change the limit: Netlify -> Environment variables -> add `CHAT_MONTHLY_CAP_USD` (for example `25`) -> Trigger deploy. The daily limit follows automatically (one tenth of it, rounded up).
- **Also set a $15 limit inside Anthropic as a backstop** (the bot's counter is an estimate; Anthropic's limit is the real one): go to console.anthropic.com -> click **Settings** (left side) -> click **Limits** -> under "Spend limits" set the **Monthly spend limit** to `15` -> Save. If you can't find it, open Settings -> Billing, then Limits.
- Typical cost: a normal conversation (about 5 back-and-forth messages) costs roughly **1 to 3 cents**, so about **$10 to $30 per 1,000 conversations**. $15 covers very roughly 500 to 1,500 conversations a month.
- If the total ever can't be saved (rare Netlify hiccup), the bot counts in memory and keeps working; the Anthropic limit above is what protects you in that case.

## Sending visitors to the right class

When someone submits the chat form, the chat shows a "Pick your class time" button that goes to the same booking calendar as the website form (Adult BJJ and Adult MMA share a calendar; Muay Thai, Lions and Cubs each have their own). If the visitor already named a program in chat, the form pre-selects it. The bot can also share a booking link for the program they asked about, or /trial/ if it isn't sure. Chat leads count in Google Analytics as `generate_lead` with form name `chat_widget`; you still need Admin -> Events -> mark `generate_lead` as a key event (already done if the website form is counted).

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
- Optional: `CHAT_MODEL` (default `claude-haiku-4-5`), `CHAT_RATE_LIMIT` (messages per visitor per hour, default 20), `CHAT_MONTHLY_CAP_USD` (default 15).

## Bot protection

**What runs automatically (nothing to set up):**
- A hidden trap field in the lead form. Real people never see it; bots fill it in. If it is filled, the site pretends the form worked and throws the lead away.
- A stopwatch. If the form is submitted in under 3 seconds after it appears, it is treated as a bot and quietly dropped.
- Only allstarbjj.com (and your Netlify preview links) can talk to the chat. Other websites get a "Forbidden" error.
- Limits per visitor: 20 chat messages an hour and 5 lead forms an hour.
- A monthly and daily spending cap on the AI (default $15/month), so a flood of bot messages can never run up a big bill.
- The lead form will not work at all unless `COMMAND_CENTER_URL` and `INTERNAL_API_SECRET` are set in Netlify. If one is missing, visitors see "Lead capture is not configured" and the Netlify function log names the missing setting.

**Optional extra: Cloudflare Turnstile (free, about 4 clicks).** It is Cloudflare's invisible "are you human" check. Skip it unless bots start getting through.
1. Cloudflare dashboard -> Turnstile -> Add site.
2. Enter `allstarbjj.com` as the domain and choose **Managed**.
3. Copy the **Site key** into Netlify as `PUBLIC_TURNSTILE_SITE_KEY`, and the **Secret key** as `TURNSTILE_SECRET_KEY` (mark the secret as "Secret").
4. Trigger a redeploy in Netlify.

If `TURNSTILE_SECRET_KEY` is not set, the check is simply skipped and the automatic protections above still apply. To turn Turnstile off later, delete both variables and redeploy.
