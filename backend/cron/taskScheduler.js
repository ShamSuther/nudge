const cron = require('node-cron');
const Task = require('../models/Task');
const sendReminderEmail = require('../utils/mailer');

const DAILY_REMINDER_TIME = '0 9 * * *';
cron.schedule(DAILY_REMINDER_TIME, async () => {
    timezone
    const now = new Date();
    console.log(`[CRON] Running task reminder at ${now.toLocaleTimeString()}`);

    try {
        const pendingTasks = await Task.find({
            status: 'pending',
            dueDate: { $gte: now }
        });

        if (pendingTasks.length === 0) {
            console.log('[CRON] No pending tasks found for reminder.');
            return;
        }

        await Promise.all(
            pendingTasks.map(task => sendReminderEmail(task))
        );

        console.log(`[CRON] Sent ${pendingTasks.length} reminder email(s).`);
    } catch (error) {
        console.error('[CRON] Failed to send task reminders:', error.message);
    }
});
