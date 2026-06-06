import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async () => {
  try {
    const data = await resend.emails.send({
      from: [EMAIL_ADDRESS]
      to: [EMAIL_ADDRESS]
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });
    console.log('Email sent:', data);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

sendEmail();
