import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { emailTemplate } from '@/components/verificationemail'; 

// Function to handle the POST request
export async function POST(req: Request) {
  try {
    const { to, verificationCode } = await req.json(); // Extract email and verification code from the request

    // Compile the email template with the verification code
    const html = emailTemplate({ verificationCode }); 

    // Nodemailer transport configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp-relay.sendinblue.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: `"Kadosh Support" <${process.env.FROM_EMAIL || 'nsedidier@gmail.com'}>`, // Sender address
      to: to, // Receiver email address
      subject: 'Your Password Reset Verification Code',
      html: html, // HTML body content with the verification code
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Verification email sent', info }, { status: 200 });
  } catch (error) {
    console.error('Error in sending verification email:', error);
    return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 });
  }
}
