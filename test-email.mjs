import { Resend } from 'resend';

const resend = new Resend('re_4PBJ6bid_5PR3SKFw4Af81hRbZsxDcbix');

const sendEmail = async () => {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'sharmaparikshit405@gmail.com',
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });
    console.log('Email sent:', data);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

sendEmail();
