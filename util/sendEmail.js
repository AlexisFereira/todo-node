const nodemailer = require('nodemailer');

async function email(correo, template) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    secure: false,
    auth: {
      user: 'AKIA4R5ZVVJJAQUDL66F',
      pass: 'BGref/vP3BuY+MIalOn7E+ipPR5bVcpFG7/SxYnE8wtf',
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'alexis.fereira@gmail.com', // sender address
    to: correo, // list of receivers
    subject: '¡Verificación de cuenta necesaria! Acción requerida para asegurar su cuenta.', // Subject line
    text: 'Hello world?', // plain text body
    html: template, // html body
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

module.exports = email;
