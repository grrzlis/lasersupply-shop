interface SendEmailParams {
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
}

export async function sendEmail({ to, subject, htmlContent }: SendEmailParams) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn('⚠️ [BREVO] BREVO_API_KEY not configured. Skipping email send.');
    return { success: false, reason: 'missing_key' };
  }

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'LaserSupply.org',
          email: 'info@lasersupply.org',
        },
        to,
        subject,
        htmlContent,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('❌ [BREVO] Email send failed:', res.status, errText);
      return { success: false, error: errText };
    }

    const data = await res.json();
    console.log('✅ [BREVO] Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ [BREVO] Network or runtime error sending email:', error);
    return { success: false, error };
  }
}
