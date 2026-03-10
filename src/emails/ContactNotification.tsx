import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from "@react-email/components";
import * as React from "react";

interface ContactNotificationProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: string;
}

export function ContactNotification({
  name,
  email,
  subject,
  message,
  type,
}: ContactNotificationProps) {
  const typeLabels: Record<string, string> = {
    general: "General Inquiry",
    consulting: "Consulting Request",
    research: "Research Collaboration",
    media: "Media / Speaking",
  };

  return (
    <Html>
      <Head />
      <Preview>
        New {typeLabels[type] ?? type} from {name}: {subject}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>New Portfolio Contact</Heading>
            <Text style={headerSubtitle}>
              {typeLabels[type] ?? type}
            </Text>
          </Section>

          {/* Sender info */}
          <Section style={section}>
            <Row>
              <Column>
                <Text style={label}>From</Text>
                <Text style={value}>{name}</Text>
              </Column>
              <Column>
                <Text style={label}>Email</Text>
                <Text style={valueLink}>{email}</Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text style={label}>Subject</Text>
                <Text style={value}>{subject}</Text>
              </Column>
              <Column>
                <Text style={label}>Type</Text>
                <Text style={typeBadge}>{typeLabels[type] ?? type}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* Message */}
          <Section style={section}>
            <Text style={label}>Message</Text>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Hr style={divider} />

          <Text style={footer}>
            Reply directly to this email to respond to {name.split(" ")[0]}.
            <br />
            Portfolio contact form · ransford.tech
          </Text>
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
  maxWidth: "560px",
};

const header = {
  backgroundColor: "#1e3a5f",
  borderRadius: "8px 8px 0 0",
  padding: "24px 32px",
};

const headerTitle = {
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: "700",
  margin: "0 0 4px 0",
};

const headerSubtitle = {
  color: "#C9A227",
  fontSize: "13px",
  margin: "0",
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
};

const section = {
  backgroundColor: "#ffffff",
  padding: "24px 32px",
  border: "1px solid #e5e7eb",
};

const label = {
  color: "#6b7280",
  fontSize: "11px",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
  margin: "0 0 4px 0",
};

const value = {
  color: "#1a1a2e",
  fontSize: "15px",
  margin: "0 0 16px 0",
};

const valueLink = {
  color: "#1e3a5f",
  fontSize: "15px",
  margin: "0 0 16px 0",
};

const typeBadge = {
  color: "#C9A227",
  fontSize: "13px",
  fontWeight: "600",
  margin: "0 0 16px 0",
};

const messageText = {
  color: "#374151",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const divider = {
  borderColor: "#e5e7eb",
  margin: "0",
};

const footer = {
  color: "#9ca3af",
  fontSize: "12px",
  textAlign: "center" as const,
  margin: "24px 0 0 0",
  lineHeight: "1.6",
};

export default ContactNotification;
