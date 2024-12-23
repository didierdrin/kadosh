import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import * as admin from 'firebase-admin'; // Fix the missing admin import
import { emailTemplate } from '@/components/resetemail';

// Initialize Firebase Admin SDK if not initialized already
if (!admin.apps.length) {
  //const serviceAccount = require('../../../../firebase-adminsdk.json'); // Correct path to your service account file
  const serviceAccount = JSON.parse(process.env.firebase_admin_credentials as string);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(req: Request) {
  try {
    const { to } = await req.json();

    // Generate a password reset link using Firebase Admin SDK
    const resetLink = await admin.auth().generatePasswordResetLink(to, {
      url: 'http://localhost:3000/auth', // Customize this URL
      handleCodeInApp: true,
    });

    // Compile the email template with the reset link
    const html = emailTemplate({ resetLink });

    // Nodemailer transport configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp-relay.sendinblue.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: `"Shamayim Support" <${process.env.FROM_EMAIL || 'support@shamayim.com'}>`,
      to,
      subject: 'Reset Your Password',
      html,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Password reset email sent', info }, { status: 200 });
  } catch (error) {
    console.error('Error in sending password reset email:', error);
    return NextResponse.json({ error: 'Failed to send password reset email' }, { status: 500 });
  }
}

