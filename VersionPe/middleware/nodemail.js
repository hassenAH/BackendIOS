import nodemailer from"nodemailer";



const sendEmail = async (email, subject, text,code) => {
  try {
    const transporter = nodemailer.createTransport({
      pool: true,
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "hassen.ahmadi@esprit.tn", // generated ethereal user
        pass: "191JMT0682", // generated ethereal password
      },
    });

    await transporter.sendMail({
      from:  process.env.USER,
      to: email,
      subject: subject,
      text: "this is your code for reset password    "  +code,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};
export default sendEmail;
