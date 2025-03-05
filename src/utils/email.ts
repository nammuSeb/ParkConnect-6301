import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;

  await transporter.sendMail({
    from: '"ParkConnect" <noreply@parkconnect.ch>',
    to: email,
    subject: "Vérifiez votre email - ParkConnect",
    html: `
      <h1>Bienvenue sur ParkConnect!</h1>
      <p>Pour finaliser votre inscription, veuillez cliquer sur le lien ci-dessous:</p>
      <a href="${verificationUrl}">Vérifier mon email</a>
    `
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  await transporter.sendMail({
    from: '"ParkConnect" <noreply@parkconnect.ch>',
    to: email,
    subject: "Réinitialisation de mot de passe - ParkConnect",
    html: `
      <h1>Réinitialisation de mot de passe</h1>
      <p>Pour réinitialiser votre mot de passe, cliquez sur le lien ci-dessous:</p>
      <a href="${resetUrl}">Réinitialiser mon mot de passe</a>
    `
  });
};