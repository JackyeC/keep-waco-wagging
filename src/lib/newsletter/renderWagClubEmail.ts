import {
  getNewsletterSendBlockers,
  wagClubSept20Issue,
  type WagClubSept20Issue,
} from "@/data/newsletters/wagClubSept20";

const COLORS = {
  cream: "#F4EDE4",
  softCream: "#FBF6EF",
  white: "#FFFFFF",
  sage: "#6E7E63",
  sageHover: "#5C6A51",
  rose: "#C68C86",
  blush: "#E5C9C4",
  bark: "#4C463E",
  serifInk: "#54513F",
  muted: "#6F675C",
  faint: "#7A7165",
  border: "#E6DBCB",
  recallBg: "#F7EDED",
  recallInk: "#7A3F3A",
} as const;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function statusColors(status: string): { bg: string; ink: string } {
  if (status === "confirmed_dog_friendly") {
    return { bg: "#E8EBE3", ink: COLORS.sageHover };
  }
  if (status === "verify_policy") {
    return { bg: COLORS.blush, ink: COLORS.bark };
  }
  return { bg: COLORS.cream, ink: COLORS.serifInk };
}

function sectionLabel(text: string, ink: string = COLORS.faint): string {
  return `<p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${ink};">${escapeHtml(text)}</p>`;
}

function heading(text: string): string {
  return `<h2 style="margin:0 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.2;font-weight:500;color:${COLORS.serifInk};">${escapeHtml(text)}</h2>`;
}

function paragraph(text: string): string {
  return `<p style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;font-weight:normal;color:${COLORS.muted};">${escapeHtml(text)}</p>`;
}

function ctaButton(href: string, label: string): string {
  const safeHref = escapeHtml(href);
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:16px 0 0;">
    <tr>
      <td style="background-color:${COLORS.sage};border-radius:999px;">
        <a href="${safeHref}" style="display:inline-block;padding:12px 22px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;letter-spacing:0.04em;color:${COLORS.cream};text-decoration:none;">${escapeHtml(label)}</a>
      </td>
    </tr>
  </table>`;
}

function textLink(href: string, label: string): string {
  return `<a href="${escapeHtml(href)}" style="color:${COLORS.sageHover};text-decoration:underline;">${escapeHtml(label)}</a>`;
}

export function renderWagClubEmailHtml(
  issue: WagClubSept20Issue = wagClubSept20Issue,
): string {
  const preheader = issue.previewText;
  const weatherRows = issue.weather.days
    .map(
      (day) => `<tr>
        <td style="padding:4px 12px 4px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${COLORS.bark};width:38%;">${escapeHtml(day.day)}</td>
        <td style="padding:4px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${COLORS.muted};">${escapeHtml(day.detail)}</td>
      </tr>`,
    )
    .join("");

  const eventBlocks = issue.events.items
    .map((item) => {
      const colors = statusColors(item.status);
      const link = item.href
        ? `<p style="margin:12px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;">${textLink(item.href, "Official details")}</p>`
        : "";
      return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 14px;background-color:${COLORS.softCream};border:1px solid ${COLORS.border};border-radius:16px;">
        <tr>
          <td style="padding:18px 18px 16px;">
            <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${COLORS.sage};">${escapeHtml(item.when)}</p>
            <h3 style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-size:20px;line-height:1.25;font-weight:500;color:${COLORS.serifInk};">${escapeHtml(item.title)}</h3>
            <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${COLORS.faint};">${escapeHtml(item.place)}</p>
            <p style="margin:0 0 10px;display:inline-block;padding:4px 10px;border-radius:999px;background-color:${colors.bg};font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${colors.ink};">${escapeHtml(item.statusLabel)}</p>
            ${paragraph(item.body)}
            ${link}
          </td>
        </tr>
      </table>`;
    })
    .join("");

  const productRows = issue.wagWatchChanged.recall.products
    .map(
      (product) => `<p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:${COLORS.bark};">
        <strong>${escapeHtml(product.name)}</strong><br>
        Lot ${escapeHtml(product.lot)} · UPC ${escapeHtml(product.upc)}
      </p>`,
    )
    .join("");

  const featuredLink = issue.featuredArticle.hrefIsPlaceholder
    ? `<p style="margin:12px 0 0;padding:10px 12px;background-color:${COLORS.cream};border:1px dashed ${COLORS.rose};font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:${COLORS.recallInk};"><strong>Placeholder — do not send yet:</strong> ${escapeHtml(issue.featuredArticle.href)}</p>`
    : ctaButton(issue.featuredArticle.href, "Read the Wag Watch article");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title>${escapeHtml(issue.subject)}</title>
  <!--[if mso]>
  <style>table, td { font-family: Arial, Helvetica, sans-serif !important; }</style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${COLORS.cream};color:${COLORS.bark};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.cream};">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background-color:${COLORS.white};border:1px solid ${COLORS.border};">
          <tr>
            <td style="padding:28px 28px 18px;background-color:${COLORS.sage};">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:${COLORS.blush};">KEEP WACO</p>
              <p style="margin:4px 0 10px;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1;color:${COLORS.cream};font-style:italic;">wagging</p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${COLORS.blush};">Wag Club · ${escapeHtml(issue.weekLabel)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px;">
              ${sectionLabel(issue.welcome.eyebrow, COLORS.sage)}
              ${heading(issue.welcome.headline)}
              <p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${COLORS.faint};">${escapeHtml(issue.welcome.dek)}</p>
              ${paragraph(issue.welcome.body)}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 20px;">
              ${sectionLabel("This week")}
              ${heading(issue.weather.title)}
              <p style="margin:0 0 14px;font-family:Georgia,'Times New Roman',serif;font-size:18px;line-height:1.4;color:${COLORS.serifInk};">${escapeHtml(issue.weather.line)}</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 14px;">${weatherRows}</table>
              ${paragraph(issue.weather.advice)}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 12px;">
              ${sectionLabel("Events")}
              ${heading(issue.events.title)}
              ${eventBlocks}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 20px;">
              ${sectionLabel("Saturday")}
              ${heading(issue.leaveThemHome.title)}
              <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${COLORS.rose};">${escapeHtml(issue.leaveThemHome.when)}</p>
              ${paragraph(issue.leaveThemHome.body)}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 20px;">
              ${heading(issue.wagWatchChanged.title)}
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.recallBg};border-left:4px solid ${COLORS.recallInk};">
                <tr>
                  <td style="padding:16px 16px 8px;">
                    ${sectionLabel(issue.wagWatchChanged.recall.label, COLORS.recallInk)}
                    <h3 style="margin:0 0 10px;font-family:Georgia,'Times New Roman',serif;font-size:18px;line-height:1.3;color:${COLORS.serifInk};">${escapeHtml(issue.wagWatchChanged.recall.headline)}</h3>
                    ${paragraph(issue.wagWatchChanged.recall.body)}
                    ${productRows}
                    <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:14px;">${textLink(issue.wagWatchChanged.recall.href, issue.wagWatchChanged.recall.hrefLabel)}</p>
                  </td>
                </tr>
              </table>
              <p style="margin:14px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:${COLORS.muted};">${escapeHtml(issue.wagWatchChanged.stillWorthChecking.body)} ${textLink(issue.wagWatchChanged.stillWorthChecking.href, issue.wagWatchChanged.stillWorthChecking.hrefLabel)}.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 20px;">
              ${heading(issue.governmentWatch.title)}
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.softCream};border:1px solid ${COLORS.border};">
                <tr>
                  <td style="padding:16px;">
                    ${sectionLabel(issue.governmentWatch.label, COLORS.serifInk)}
                    <h3 style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-size:18px;line-height:1.3;color:${COLORS.serifInk};">${escapeHtml(issue.governmentWatch.headline)}</h3>
                    <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${COLORS.sage};">${escapeHtml(issue.governmentWatch.when)}</p>
                    ${paragraph(issue.governmentWatch.body)}
                    <p style="margin:0 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.45;color:${COLORS.serifInk};">${escapeHtml(issue.governmentWatch.question)}</p>
                    <p style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;">${textLink(issue.governmentWatch.href, issue.governmentWatch.hrefLabel)}</p>
                    ${paragraph(issue.governmentWatch.recordsNote)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 20px;">
              ${sectionLabel("Featured")}
              ${heading(issue.featuredArticle.title)}
              <h3 style="margin:0 0 10px;font-family:Georgia,'Times New Roman',serif;font-size:18px;line-height:1.3;color:${COLORS.serifInk};">${escapeHtml(issue.featuredArticle.headline)}</h3>
              ${paragraph(issue.featuredArticle.body)}
              ${featuredLink}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 20px;">
              ${sectionLabel("Camp Clayton")}
              ${heading(issue.campClayton.title)}
              <h3 style="margin:0 0 10px;font-family:Georgia,'Times New Roman',serif;font-size:18px;line-height:1.3;color:${COLORS.serifInk};">${escapeHtml(issue.campClayton.headline)}</h3>
              ${paragraph(issue.campClayton.body)}
              ${ctaButton(issue.campClayton.href, issue.campClayton.cta)}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 24px;">
              ${heading(issue.readerQuestion.title)}
              ${paragraph(issue.readerQuestion.body)}
              ${paragraph(issue.readerQuestion.cta)}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 28px;border-top:1px solid ${COLORS.border};background-color:${COLORS.softCream};">
              <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${COLORS.bark};">${escapeHtml(issue.brandLine)}</p>
              <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:${COLORS.muted};">${escapeHtml(issue.mailingAddress)}</p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${COLORS.muted};"><a href="${escapeHtml(issue.unsubscribeUrl)}" style="color:${COLORS.sageHover};text-decoration:underline;">Unsubscribe</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function renderWagClubEmailText(
  issue: WagClubSept20Issue = wagClubSept20Issue,
): string {
  const weather = issue.weather.days
    .map((day) => `- ${day.day}: ${day.detail}`)
    .join("\n");
  const events = issue.events.items
    .map((item) => {
      const link = item.href ? `\n${item.href}` : "";
      return `${item.when}\n${item.title}\n${item.place}\n[${item.statusLabel}]\n${item.body}${link}`;
    })
    .join("\n\n");
  const products = issue.wagWatchChanged.recall.products
    .map((product) => `- ${product.name}\n  Lot ${product.lot}\n  UPC ${product.upc}`)
    .join("\n");
  const articleLink = issue.featuredArticle.hrefIsPlaceholder
    ? issue.featuredArticle.href
    : issue.featuredArticle.href;

  return [
    issue.subject,
    issue.previewText,
    "",
    "KEEP WACO WAGGING — WAG CLUB",
    issue.weekLabel,
    "",
    issue.welcome.body,
    "",
    issue.weather.title.toUpperCase(),
    issue.weather.line,
    weather,
    issue.weather.advice,
    "",
    issue.events.title.toUpperCase(),
    events,
    "",
    issue.leaveThemHome.title.toUpperCase(),
    issue.leaveThemHome.when,
    issue.leaveThemHome.body,
    "",
    issue.wagWatchChanged.title.toUpperCase(),
    `[${issue.wagWatchChanged.recall.label}] ${issue.wagWatchChanged.recall.headline}`,
    issue.wagWatchChanged.recall.body,
    products,
    issue.wagWatchChanged.recall.href,
    "",
    issue.wagWatchChanged.stillWorthChecking.body,
    issue.wagWatchChanged.stillWorthChecking.href,
    "",
    issue.governmentWatch.title.toUpperCase(),
    `[${issue.governmentWatch.label}] ${issue.governmentWatch.headline}`,
    issue.governmentWatch.when,
    issue.governmentWatch.body,
    issue.governmentWatch.question,
    issue.governmentWatch.href,
    issue.governmentWatch.recordsNote,
    "",
    issue.featuredArticle.title.toUpperCase(),
    issue.featuredArticle.headline,
    issue.featuredArticle.body,
    articleLink,
    "",
    issue.campClayton.title.toUpperCase(),
    issue.campClayton.headline,
    issue.campClayton.body,
    `${issue.campClayton.cta}: ${issue.campClayton.href}`,
    "",
    issue.readerQuestion.title.toUpperCase(),
    issue.readerQuestion.body,
    issue.readerQuestion.cta,
    "",
    issue.brandLine,
    issue.mailingAddress,
    `Unsubscribe: ${issue.unsubscribeUrl}`,
  ].join("\n");
}

export function renderWagClubChecklist(
  issue: WagClubSept20Issue = wagClubSept20Issue,
): string {
  const blockers = getNewsletterSendBlockers(issue);
  const blockerLines =
    blockers.length === 0
      ? "- [x] No send blockers remain."
      : blockers.map((item) => `- [ ] BLOCKER: ${item}`).join("\n");

  return `# Wag Club test-send checklist — ${issue.weekLabel}

Status: ${issue.status}
Production send allowed: ${blockers.length === 0 ? "YES" : "NO"}

## Hard stops
Do not send this issue until every blocker below is gone.

${blockerLines}

- [ ] Physical mailing address replaced with a real US mailing address and proofread
- [ ] Unsubscribe link replaced, clicked, and confirmed to suppress that recipient
- [ ] Featured Wag Watch article is live; placeholder copy removed from HTML and text
- [ ] Reply-To is a mailbox that actually receives mail (currently ${issue.replyTo}; do not use hello@ or info@keepwacowagging.com until inbound MX is confirmed)
- [ ] From address is the verified Resend sender (${issue.fromEmail})

## Content accuracy
- [ ] Fi recall lots, UPCs, and product names still match the FDA notice
- [ ] Wednesday Night Farmers Market is still labeled "verify before you go" unless a dog policy is independently confirmed
- [ ] Brotherwell is still described as confirmed leashed-dog-friendly with an outdoor area
- [ ] Barron's Branch is labeled as a public project / discussion — not dog-friendly, not an approved dog park
- [ ] Records note is still accurate: no newly proposed dog ordinance or confirmed dog-park project found this week
- [ ] Baylor vs Colorado Saturday 1 PM warning is still correct
- [ ] Camp Clayton CTA goes to ${issue.campClayton.href}

## Test send
- [ ] Send one test to the owner inbox only (not the subscriber list)
- [ ] Check Gmail, Apple Mail, and a phone
- [ ] Preview text shows: ${issue.previewText}
- [ ] Subject shows: ${issue.subject}
- [ ] Reply to the test and confirm the reply lands
- [ ] Click unsubscribe on the test and confirm it works
- [ ] No placeholder strings remain in the version you would actually send

## List (when a real send is approved later)
- [ ] Use the current subscriber-audit send list (owner Gmail / plus-aliases and test records excluded)
- [ ] Dedupe by lowercase email
- [ ] Do not mix Shopify storefront subscribers into this send
- [ ] Do not send from the website app — there is no production newsletter send path on purpose
`;
}
