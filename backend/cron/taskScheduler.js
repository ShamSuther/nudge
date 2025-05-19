const cron = require('node-cron');
const Task = require('../models/Task');
const sendReminderEmail = require('../utils/mailer');

cron.schedule('0 9 * * *', async () => {
    console.log('⏰ Running daily task reminder at 9:00 AM');

    try {
        const tasks = await Task.find({
            status: 'pending',
            dueDate: { $gte: new Date() }
        });

        tasks.forEach(task => {
            sendReminderEmail(task);
        });
    } catch (err) {
        console.error('Error running task reminder cron job:', err);
    }
});
