import { Button, Html, Section, Text } from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
  verificationLink: string;
}

export const VerificationEmail: React.FC<Readonly<EmailTemplateProps>> = ({
  verificationLink,
}) => (
  <Html title="Verify your email">
  <Section style={{ padding: '20px', backgroundColor: '#f9f9f9', textAlign: 'center' }}>
    <Text style={{ fontSize: '18px', color: '#333' }}>
      Por favor, verifica tu correo electrónico.
    </Text>
    <Button
      href={verificationLink}
      style={{ marginTop: '20px', backgroundColor: '#4CAF50', padding: '10px 20px', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}
    >
      Verificar Correo Electrónico
    </Button>
  </Section>
</Html>
);
