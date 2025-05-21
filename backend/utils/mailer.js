const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * Sends a reminder email for a given task.
 * @param {Object} task - Task object from the database.
 */

const sendReminderEmail = async (task) => {
    if (!task?.assignedTo) {
        console.warn('[Mailer] Skipping task: No assigned email.');
        return;
    }

    const { title, dueDate, assignedTo } = task;
    const formattedDate = new Date(dueDate).toLocaleDateString();

    const mailOptions = {
        from: `"Nudge Reminder" <${process.env.EMAIL_USER}>`,
        to: assignedTo,
        subject: `⏰ Reminder: "${title}" due on ${formattedDate}`,
        text: `Hey there!\n\nThis is a gentle reminder that your task "${title}" is due on ${formattedDate}.\nPlease make sure to complete it on time.\n\n— Nudge`,
        html: `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <p>Hey there! 👋</p>
        <p>This is a gentle reminder ⏰ that your task <strong>"${title}"</strong> is due on <strong>${formattedDate}</strong>.</p>
        <p>Please make sure to complete it on time.</p>
        <p>— Nudge</p>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.info(`[Mailer] Reminder sent to ${assignedTo}`);
    } catch (err) {
        console.error(`[Mailer] Failed to send to ${assignedTo}:`, err.message);
    }
};

module.exports = sendReminderEmail;