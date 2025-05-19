const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendReminderEmail = async (task) => {
    const mailOptions = {
        from: `"Nudge Reminder" <${process.env.EMAIL_USER}>`,
        to: task.assignedTo,
        subject: `⏰ Task Reminder: ${task.title}`,
        html: `
      <p>Hey there!</p>
      <p>This is a gentle reminder that your task "<strong>${task.title}</strong>" is due on <strong>${new Date(task.dueDate).toLocaleDateString()}</strong>.</p>
      <p>Please make sure to complete it on time.</p>
      <p>— Nudge</p>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Reminder sent to ${task.assignedTo}`);
    } catch (err) {
        console.error(`Error sending email to ${task.assignedTo}:`, err);
    }
};

module.exports = sendReminderEmail;