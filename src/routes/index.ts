import { Router } from 'express';
import { sendEmail } from '../models/mailer';

const router = Router();

router.get('', (req, res) => {
    res.render('index');
})

router.get('/test', (req, res) => {
    sendEmail(
        'your-user@gmail.com', 
        `Let's play Secret Agents`, 
        `This is a test email. Let's play!`
    ).then(() => {
        res.send('email sent');
    }).catch(() => {
        res.status(500).send('Failed to send email');
    })
})

router.get('/chat', (req, res) => {
    res.render('chat');
  });
  

export default router;