import { Resend } from 'resend';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected');
  }
  return {apiKey: connectionSettings.settings.api_key, fromEmail: connectionSettings.settings.from_email};
}

// WARNING: Never cache this client.
// Access tokens expire, so a new client must be created each time.
// Always call this function again to get a fresh client.
export async function getUncachableResendClient() {
  const credentials = await getCredentials();
  return {
    client: new Resend(credentials.apiKey),
    fromEmail: connectionSettings.settings.from_email
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  const { client, fromEmail } = await getUncachableResendClient();

  const serviceText = data.service ? `\n\nGewählte Leistung: ${data.service}` : '';
  const phoneText = data.phone ? `\nTelefon: ${data.phone}` : '';

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #003DA5; border-bottom: 3px solid #FFD700; padding-bottom: 10px;">
        Neue Kontaktanfrage von der Website
      </h2>
      
      <div style="margin: 20px 0; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>E-Mail:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        ${data.phone ? `<p><strong>Telefon:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>` : ''}
        ${data.service ? `<p><strong>Gewählte Leistung:</strong> ${data.service}</p>` : ''}
      </div>
      
      <div style="margin: 20px 0;">
        <h3 style="color: #003DA5;">Nachricht:</h3>
        <p style="white-space: pre-wrap; background-color: #f5f5f5; padding: 15px; border-radius: 8px; border-left: 4px solid #FFD700;">
          ${data.message}
        </p>
      </div>
      
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
      
      <p style="color: #666; font-size: 12px; text-align: center;">
        Diese E-Mail wurde über das Kontaktformular auf transraum.com gesendet
      </p>
    </div>
  `;

  const textContent = `
Neue Kontaktanfrage von der Website
=====================================

Name: ${data.name}
E-Mail: ${data.email}${phoneText}${serviceText}

Nachricht:
${data.message}

---
Diese E-Mail wurde über das Kontaktformular auf transraum.com gesendet
  `;

  const result = await client.emails.send({
    from: fromEmail,
    to: 'info@transraum.com',
    subject: `Neue Kontaktanfrage von ${data.name}`,
    html: htmlContent,
    text: textContent,
  });

  return result;
}
