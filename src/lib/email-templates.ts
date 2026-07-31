export const betaWelcomeEmail = (name: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #06080C 0%, #0E1218 100%);
      color: #E6EDF3;
      padding: 30px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .content {
      background: #f9f9f9;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .button {
      display: inline-block;
      background: #5DDBFF;
      color: #06080C;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 4px;
      margin: 15px 5px 15px 0;
      font-weight: 600;
      text-align: center;
    }
    .button:hover {
      opacity: 0.9;
    }
    .footer {
      text-align: center;
      color: #888;
      font-size: 12px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
    }
    .links-section {
      margin: 30px 0;
      text-align: center;
    }
    .partner-box {
      background: #eef9ff;
      border-left: 4px solid #5DDBFF;
      padding: 15px;
      margin: 20px 0;
      border-radius: 0 4px 4px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 28px;">Welcome to CogniCAD Beta 🚀</h1>
    </div>
    <div class="content">
      <p>Hi ${name},</p>

      <p>Thank you for joining the CogniCAD Beta Program! We're excited to have you as part of this journey to revolutionize AI-native engineering.</p>

      <p>We are currently in active development and gearing up for our first release. We will reach out to you the moment we are ready to onboard you.</p>

      <div class="partner-box">
        <p style="margin: 0;"><strong>Shape the product:</strong> If you want to be design partners and collaborate closely with us, contact us at <a href="mailto:design-partners@cognicad.xyz" style="color: #00769d; text-decoration: none; font-weight: 600;">design-partners@cognicad.xyz</a>.</p>
      </div>

      <div class="links-section">
        <p><strong>Join our community:</strong></p>
        <a href="https://discord.gg/Mt3JxYDpf" class="button">Join Discord</a>
        <a href="https://instagram.com/cognicad/" class="button">Follow on Instagram</a>
      </div>

      <p>If you have any questions or feedback, please don't hesitate to reach out to us at <strong>hello@cognicad.xyz</strong>.</p>

      <p>Looking forward to building the future of engineering with you!</p>

      <p>Best regards,<br>The CogniCAD Team</p>

      <div class="footer">
        <p>CogniCAD — Cognitive Engineering Systems<br>
        This is an automated message. Please do not reply directly to this email.</p>
      </div>
    </div>
  </div>
</body>
</html>
`;
export const contactConfirmationEmail = (name: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #06080C 0%, #0E1218 100%);
      color: #E6EDF3;
      padding: 30px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .content {
      background: #f9f9f9;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .button {
      display: inline-block;
      background: #5DDBFF;
      color: #06080C !important;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 4px;
      margin: 15px 0;
      font-weight: 600;
      text-align: center;
    }
    .button:hover {
      opacity: 0.9;
    }
    .footer {
      text-align: center;
      color: #888;
      font-size: 12px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
    }
    .info-box {
      background: #eef9ff;
      border-left: 4px solid #5DDBFF;
      padding: 15px;
      margin: 20px 0;
      border-radius: 0 4px 4px 0;
    }
    a {
      color: #00769d;
      text-decoration: none;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 28px;">We Got Your Message 📬</h1>
    </div>
    <div class="content">
      <p>Hi ${name},</p>

      <p>Thank you for reaching out to CogniCAD. We've received your message and our team is reviewing it.</p>

      <div class="info-box">
        <p style="margin: 0;"><strong>Response time:</strong> We typically respond within 24 hours on business days.</p>
      </div>

      <p style="text-align: center; margin: 25px 0;">
        <a href="https://cognicad.xyz" class="button">Visit Our Website</a>
      </p>

      <p>Best regards,<br>The CogniCAD Team</p>

      <div class="footer">
        <p>CogniCAD — Cognitive Engineering Systems<br>
        This is an automated message. Please do not reply directly to this email.</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

export const jobApplicationConfirmationEmail = (name: string, role: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #06080C 0%, #0E1218 100%);
      color: #E6EDF3;
      padding: 30px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .content {
      background: #f9f9f9;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .button {
      display: inline-block;
      background: #5DDBFF;
      color: #06080C !important;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 4px;
      margin: 5px 5px 5px 0;
      font-weight: 600;
      font-size: 14px;
    }
    .button:hover {
      opacity: 0.9;
    }
    .footer {
      text-align: center;
      color: #888;
      font-size: 12px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
    }
    .info-box {
      background: #eef9ff;
      border-left: 4px solid #5DDBFF;
      padding: 15px;
      margin: 20px 0;
      border-radius: 0 4px 4px 0;
    }
    a {
      color: #00769d;
      text-decoration: none;
      font-weight: 600;
    }
    ul {
      padding-left: 20px;
      margin: 15px 0;
    }
    li {
      margin-bottom: 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 28px;">Application Received ✨</h1>
    </div>
    <div class="content">
      <p>Hi ${name},</p>

      <p>Thank you for applying for the <strong>${role}</strong> position at CogniCAD. We've received your application and will review it carefully.</p>

      <div class="info-box">
        <p style="margin: 0;"><strong>What's next:</strong> Our hiring team typically reviews applications within 5 business days. If there is a strong fit, we will reach out directly to schedule an introductory call.</p>
      </div>

      <p>In the meantime, feel free to learn more about what we're building:</p>
      <div style="margin: 20px 0;">
        <a href="https://cognicad.xyz/blog" class="button">Read Our Blog</a>
        <a href="https://cognicad.xyz/about" class="button">About the Team</a>
      </div>

      <p>Thanks again for your interest in joining CogniCAD!</p>

      <p>Best regards,<br>The CogniCAD Team</p>

      <div class="footer">
        <p>CogniCAD — Cognitive Engineering Systems<br>
        This is an automated message. Please do not reply directly to this email.</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

export const teamNotificationTemplate = (
  formType: string,
  data: Record<string, string | number | null | undefined>
) => {
  const timestamp = new Date().toISOString();
  
  const dataRows = Object.entries(data)
    .map(
      ([key, value]) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: 600; color: #06080C; width: 30%; text-transform: capitalize;">
          ${key.replace(/([A-Z])/g, ' $1').trim()}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">
          ${value !== null && value !== undefined && value !== '' ? String(value) : '<span style="color: #999;">N/A</span>'}
        </td>
      </tr>
    `
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #06080C 0%, #0E1218 100%);
      color: #E6EDF3;
      padding: 25px 30px;
      border-radius: 8px 8px 0 0;
    }
    .content {
      background: #ffffff;
      padding: 30px;
      border: 1px solid #e0e0e0;
      border-top: none;
      border-radius: 0 0 8px 8px;
    }
    .table-container {
      margin-top: 20px;
      border-radius: 6px;
      overflow: hidden;
      border: 1px solid #eee;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: #fafafa;
    }
    .footer {
      text-align: center;
      color: #888;
      font-size: 12px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0; font-size: 20px; color: #5DDBFF;">System Alert: New ${formType} Submission</h2>
      <p style="margin: 5px 0 0 0; font-size: 12px; color: #8B949E;">Received at ${timestamp}</p>
    </div>
    <div class="content">
      <p style="margin-top: 0;">A new entry has been recorded from the website contact pipeline:</p>
      
      <div class="table-container">
        <table>
          <tbody>
            ${dataRows}
          </tbody>
        </table>
      </div>

      <div class="footer">
        <p>Internal Notification — CogniCAD Backend Service</p>
      </div>
    </div>
  </div>
</body>
</html>
`;
};