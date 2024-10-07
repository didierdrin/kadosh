import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { emailTemplate } from '@/components/welcomeemail'; 

// Function to handle the POST request
export async function POST(req: Request) {
  try {
    const { to, params } = await req.json(); // Extract email address and params from request

    // Call emailTemplate with the params to generate the HTML string
    const html = emailTemplate(params);  

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
      from: `"Kadosh" <${process.env.FROM_EMAIL || 'nsedidier@gmail.com'}>`,
      to: to,
      subject: 'Welcome to Kadosh',
      html: html, // Send the compiled HTML template as a string
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent', info }, { status: 200 });
  } catch (error) {
    console.error('Error in sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
