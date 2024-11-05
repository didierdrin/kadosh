import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { purchaseEmailTemplate } from '@/components/purchaseemail'; // Import the new purchase email template

// Function to handle the POST request
export async function POST(req: Request) {
  try {
    const { to, orderId, orderDate, products, totalAmount } = await req.json(); // Extract order data from the request

    // Compile the email template with the order details
    const html = purchaseEmailTemplate({ orderId, orderDate, products, totalAmount });

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
      from: `"Kadosh" <${process.env.FROM_EMAIL || 'nsedidier@gmail.com'}>`,
      to: to,
      subject: 'Your Purchase Confirmation',
      html: html,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Purchase confirmation email sent', info }, { status: 200 });
  } catch (error) {
    console.error('Error in sending purchase confirmation email:', error);
    return NextResponse.json({ error: 'Failed to send purchase confirmation email' }, { status: 500 });
  }
}
