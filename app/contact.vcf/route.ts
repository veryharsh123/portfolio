import { EMAIL, GITHUB, LINKEDIN, NAME, PHONE_TEL, PORTFOLIO } from "@/lib/contact";

// The "Save contact" card. Phones open a .vcf straight into their contacts app.

export const dynamic = "force-static";

export function GET() {
  const [first, ...rest] = NAME.split(" ");
  const card = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${rest.join(" ")};${first};;;`,
    `FN:${NAME}`,
    `TEL;TYPE=CELL:${PHONE_TEL}`,
    `EMAIL;TYPE=INTERNET:${EMAIL}`,
    // The one website on the card, which phones label "homepage": the links page.
    `URL:${PORTFOLIO}/links`,
    `X-SOCIALPROFILE;TYPE=linkedin:${LINKEDIN}`,
    `X-SOCIALPROFILE;TYPE=github:${GITHUB}`,
    "END:VCARD",
  ].join("\r\n");

  return new Response(`${card}\r\n`, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `inline; filename="${NAME}.vcf"`,
    },
  });
}
