# Kiber Savadlılıq (Cyber Literacy)

Cybersecurity awareness website for everyday people, written in Azerbaijani. It helps non-technical users (seniors, parents, students) recognize scams and protect their money, accounts and personal data.

**Live site:** https://cyber-literacy.vercel.app

## Why this project

Most online attacks target people, not computers. This site explains common scams in plain language, with real local scenarios (fake courier SMS, fake bank calls, WhatsApp scams) and practical steps instead of fear.

## Features

- **Share-awareness check:** an interactive checklist showing how much personal information people give away on social media
- **Core guides:** expandable topics (phishing, passwords, 2FA, social engineering, WhatsApp scams, public Wi-Fi, online shopping, updates and backups, children and seniors), each with "what happens / how to spot it / what to do"
- **Scam quiz:** 10 real-life situations with explanations
- **"My account is hacked" checklist:** step-by-step urgent actions
- **Glossary** of plain-language security terms
- **Official institutions:** CERT.GOV.AZ, Ministry of Internal Affairs (102), Central Bank, plus free check tools (Have I Been Pwned, ScamAdviser, TinEye)
- **October campaign:** Cybersecurity Awareness Month banner and a 4-week challenge (removable)
- Light and dark theme, keyboard accessible, WCAG AA contrast, `prefers-reduced-motion` support
- Responsive, mobile-first layout

## Tech stack

- Plain HTML, CSS and JavaScript (no framework, no build step, no backend)
- Hash-based client-side routing between pages
- Hosted on Vercel
- First draft generated with Google AI Studio, then refined iteratively

## Project structure

```
.
├── index.html
├── style.css
├── script.js
└── images/
    └── boarding-pass-photo.webp
```

## Run locally

No installation is needed. Serve the folder with any static server:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Deploy on Vercel

1. Import the repository in Vercel.
2. Framework Preset: **Other**
3. Build Command: empty
4. Install Command: empty
5. Output Directory: `.`
6. Deploy.

## Maintenance notes

- Campaign blocks are wrapped in `OCTOBER CAMPAIGN START / END` comments in HTML, CSS and JS. Delete them after October.
- Tool cards are wrapped in `TOOLS START / END`, and the share-awareness block in `SHARE AWARENESS START / END`.
- Terminology: the site uses "dələduz" / "dələduzluq" consistently instead of "fırıldaqçı" / "fırıldaq".

## Roadmap

- Custom `.az` domain, Open Graph preview image, sitemap and Search Console
- AI-assisted scam checker for suspicious SMS and call scripts, based on a verified local scam database
- "My account is hacked" navigator per platform
- Separate SEO pages per scam type
- Shareable quiz results and WhatsApp share buttons
- Contact and "I received this SMS" report form

## Disclaimer

The content is for informational and educational purposes only and is not legal or financial advice. If you have lost money or data, contact your bank and the police (102) immediately.

## Author

**Yunis** (cybersecurity, blue team / SOC)
GitHub: [asgerovyunis](https://github.com/asgerovyunis) · LinkedIn: [yunisasgarov](https://www.linkedin.com/in/yunisasgarov)

## License

MIT
