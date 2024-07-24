const nodemailer = require("nodemailer");

// Configurar o transporte de e-mail
const transporter = nodemailer.createTransport({
  service: "gmail", // Ou utilize suas próprias configurações de SMTP
  auth: {
    user: "estefaniteste24@gmail.com", // Seu e-mail
    pass: "teste12345678", // Sua senha
  },
});

const enviarEmail = async (destinatario, assunto, mensagem) => {
  try {
    // Configurar detalhes do e-mail
    const mailOptions = {
      from: "estefaniteste24@gmail.com",
      to: destinatario,
      subject: assunto,
      text: mensagem,
    };

    // Enviar e-mail
    const info = await transporter.sendMail(mailOptions);
    console.log(`E-mail enviado: ${info.messageId}`);
  } catch (error) {
    console.error(`Erro ao enviar e-mail: ${error}`);
  }
};

module.exports = enviarEmail;
