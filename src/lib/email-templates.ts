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

      <p><strong>You now have early access to:</strong></p>
      <ul>
        <li>Cutting-edge AI-powered CAD orchestration</li>
        <li>Real-time collaboration features</li>
        <li>Direct feedback channel with our team</li>
      </ul>

      <div class="links-section">
        <p><strong>Join our community:</strong></p>
        <a href="https://discord.gg/cognicad" class="button">Join Discord</a>
        <a href="https://instagram.com/cognicad" class="button">Follow on Instagram</a>
      </div>

      <p>If you have any questions or feedback, please don't hesitate to reach out to us at <strong>hello@cognicad.xyz</strong>.</p>

      <p>Looking forward to building the future of engineering with you!</p>

      <p>Best regards,<br>The CogniCAD Team</p>

      <div class="footer">
        <p>CogniCAD — Cognitive Engineering Systems<br>
        This is an automated message. Please do not reply to this email.</p>
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
    .footer {
      text-align: center;
      color: #888;
      font-size: 12px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
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

      <p>Thank you for reaching out to CogniCAD. We've received your message and will review it shortly.</p>

      <p>Our team typically responds within 24 hours. We look forward to discussing how we can help you.</p>

      <p>In the meantime, feel free to explore our platform or visit our <a href="https://cognicad.xyz">website</a> for more information.</p>

      <p>Best regards,<br>The CogniCAD Team</p>

      <div class="footer">
        <p>CogniCAD — Cognitive Engineering Systems<br>
        This is an automated message. Please do not reply to this email.</p>
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
    .footer {
      text-align: center;
      color: #888;
      font-size: 12px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
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

      <p>Our team typically reviews applications within 5 working days. If we see a strong fit, we'll reach out to discuss next steps.</p>

      <p>In the meantime, we encourage you to:</p>
      <ul>
        <li>Explore our <a href="https://cognicad.xyz/blog">blog</a> to learn more about our vision</li>
        <li>Check out our <a href="https://cognicad.xyz/about">about page</a> to meet the team</li>
      </ul>

      <p>Thanks for your interest in joining us!</p>

      <p>Best regards,<br>The CogniCAD Team</p>

      <div class="footer">
        <p>CogniCAD — Cognitive Engineering Systems<br>
        This is an automated message. Please do not reply to this email.</p>
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
  let content = `<h2>New ${formType} Submission</h2>
<p><strong>Timestamp:</strong> ${timestamp}</p>`;

  Object.entries(data).forEach(([key, value]) => {
    content += `<p><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value || "N/A"}</p>`;
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    h2 { color: #06080C; border-bottom: 2px solid #5DDBFF; padding-bottom: 10px; }
    p { margin: 10px 0; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="container">
    ${content}
  </div>
</body>
</html>
`;
};
