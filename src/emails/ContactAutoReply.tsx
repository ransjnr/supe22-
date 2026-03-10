import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ContactAutoReplyProps {
  name: string;
}

export function ContactAutoReply({ name }: ContactAutoReplyProps) {
  const firstName = name.split(" ")[0];

  return (
    <Html>
      <Head />
      <Preview>
        Thanks for reaching out, {firstName}! I&apos;ll get back to you shortly.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={logo}>Ransford Oppong</Heading>
            <Text style={tagline}>AI Engineer · Quantum ML · Biomedical Engineering</Text>
          </Section>

          {/* Body */}
          <Section style={section}>
            <Text style={greeting}>Hey {firstName}, 👋</Text>
            <Text style={body}>
              Thanks for reaching out — your message has landed safely in my inbox.
            </Text>
            <Text style={body}>
              I try to respond to all inquiries within{" "}
              <strong>1–2 business days</strong>. If your matter is urgent, feel
              free to ping me on{" "}
              <Link href="https://x.com/farad_jr" style={link}>
                X (@farad_jr)
              </Link>{" "}
              or{" "}
              <Link
                href="https://linkedin.com/in/ransford-oppong-a249a9219"
                style={link}
              >
                LinkedIn
              </Link>
              .
            </Text>
            <Text style={body}>
              In the meantime, you might enjoy exploring my{" "}
              <Link href="https://ransford.tech/research" style={link}>
                research posts
              </Link>{" "}
              or{" "}
              <Link href="https://ransford.tech/projects" style={link}>
                recent projects
              </Link>
              .
            </Text>

            <Section style={ctaSection}>
              <Button href="https://ransford.tech" style={ctaButton}>
                View Portfolio
              </Button>
            </Section>
          </Section>

          <Hr style={divider} />

          <Section style={footerSection}>
            <Text style={footer}>
              Ransford Oppong · Kumasi, Ghana
              <br />
              <Link href="https://ransford.tech" style={footerLink}>
                ransford.tech
              </Link>{" "}
              ·{" "}
              <Link href="https://github.com/ransjnr" style={footerLink}>
                GitHub
              </Link>{" "}
              ·{" "}
              <Link href="https://x.com/farad_jr" style={footerLink}>
                X
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#FAFAF8",
  fontFamily: "Inter, -apple-system, sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "520px",
};

const header = {
  backgroundColor: "#1e3a5f",
  borderRadius: "8px 8px 0 0",
  padding: "28px 32px",
  textAlign: "center" as const,
};

const logo = {
  color: "#ffffff",
  fontSize: "22px",
  fontWeight: "700",
  margin: "0 0 4px 0",
  fontFamily: "'Georgia', serif",
};

const tagline = {
  color: "#C9A227",
  fontSize: "12px",
  margin: "0",
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
};

const section = {
  backgroundColor: "#ffffff",
  padding: "32px",
  border: "1px solid #e5e7eb",
  borderTop: "none",
};

const greeting = {
  color: "#1a1a2e",
  fontSize: "18px",
  fontWeight: "600",
  margin: "0 0 16px 0",
};

const body = {
  color: "#374151",
  fontSize: "15px",
  lineHeight: "1.7",
  margin: "0 0 14px 0",
};

const link = {
  color: "#1e3a5f",
  textDecoration: "underline",
};

const ctaSection = {
  textAlign: "center" as const,
  margin: "24px 0 8px 0",
};

const ctaButton = {
  backgroundColor: "#1e3a5f",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  padding: "12px 24px",
  textDecoration: "none",
  display: "inline-block",
};

const divider = {
  borderColor: "#e5e7eb",
  margin: "0",
};

const footerSection = {
  padding: "20px 32px",
};

const footer = {
  color: "#9ca3af",
  fontSize: "12px",
  textAlign: "center" as const,
  lineHeight: "1.7",
  margin: "0",
};

const footerLink = {
  color: "#9ca3af",
  textDecoration: "underline",
};

export default ContactAutoReply;
