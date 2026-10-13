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

export interface ShippingNotificationParams {
  orderId: string;
  customerEmail: string;
  customerName: string;
  trackingNumber: string;
  carrierName?: string;
  trackingUrl?: string;
}

export async function sendShippingNotification({
  orderId,
  customerEmail,
  customerName,
  trackingNumber,
  carrierName = 'AliExpress Standard Shipping',
  trackingUrl = `https://t.17track.net/en#nums=${trackingNumber}`,
}: ShippingNotificationParams) {
  const subject = `🚚 Your Order #${orderId} Has Shipped! - LaserSupply.org`;
  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
      <h2 style="color: #111827; margin-top: 0;">Great news! Your package is on its way.</h2>
      <p>Hi ${customerName || 'Valued Customer'},</p>
      <p>Your order <strong>#${orderId}</strong> has been dispatched and is traveling to your delivery address.</p>
      
      <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 24px 0; border: 1px solid #e5e7eb;">
        <p style="margin: 0 0 10px 0; font-size: 14px;"><strong>Carrier:</strong> ${carrierName}</p>
        <p style="margin: 0 0 16px 0; font-size: 14px;"><strong>Tracking Number:</strong> <code style="background: #e5e7eb; padding: 3px 6px; border-radius: 4px; font-weight: bold;">${trackingNumber}</code></p>
        <div style="margin-top: 16px;">
          <a href="${trackingUrl}" target="_blank" rel="noopener noreferrer" style="background-color: #f5cb5c; color: #1c1c1b; text-decoration: none; font-weight: bold; padding: 12px 20px; border-radius: 6px; display: inline-block;">
            Track Your Package &rarr;
          </a>
        </div>
      </div>

      <p style="color: #4b5563; font-size: 14px;">It can take up to 24–48 hours for tracking details to update with the courier.</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
      <p style="color: #9ca3af; font-size: 12px; margin: 0;">LaserSupply.org — European Laser Maker Blanks & Materials</p>
    </div>
  `;

  return sendEmail({
    to: [{ email: customerEmail, name: customerName }],
    subject,
    htmlContent,
  });
}

