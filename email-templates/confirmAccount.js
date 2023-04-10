const confirmEmail = function (name, lastname, userId) {
  return `
  <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <div>
        <h1>Confirma tu cuenta</h1>
        <p>
        Estimado/a ${name} ${lastname},<br/><br/>
        

        Gracias por registrarte en CatalogoApp.com.<br/><br/>
        
        Este correo electrónico es para confirmar la creación exitosa de tu cuenta. ¡Bienvenido/a a la comunidad!<br/><br/>
        
        Ahora puedes acceder a todas las funciones y características de nuestro sitio web o aplicación. Te recomendamos que revises cuidadosamente nuestra sección de preguntas frecuentes y términos y condiciones.<br/><br/>
        
        Si necesitas alguna ayuda o tienes alguna pregunta, nuestro equipo de soporte está a tu disposición para ayudarte en cualquier momento.<br/><br/>
        
        Gracias nuevamente por unirte a nosotros.<br/><br/>
        
        Saludos cordiales,
        CatalogoApp.com </p>

        <a href="http://localhost:8040/auth/confirm-account/${userId}"> Haz click aqui para confirmar tu cuenta.</a>
      </div>
    </body>
    </html>
    `;
};
module.exports = confirmEmail;
