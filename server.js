const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (your frontend)
app.use(express.static(path.join(__dirname)));

// Data file path
const DATA_FILE = path.join(__dirname, 'data', 'contacts.json');

// Ensure data directory exists
async function ensureDataDirectory() {
    const dataDir = path.join(__dirname, 'data');
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir, { recursive: true });
    }
}

// Read contacts from file
async function readContacts() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return empty array
        return [];
    }
}

// Write contacts to file
async function writeContacts(contacts) {
    await ensureDataDirectory();
    await fs.writeFile(DATA_FILE, JSON.stringify(contacts, null, 2));
}

// Configure email transporter (using Gmail as example)
// You'll need to set up environment variables for this
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD // Use App Password for Gmail
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate input
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required' 
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email address' 
            });
        }

        // Create contact object
        const contact = {
            id: Date.now().toString(),
            name,
            email,
            subject,
            message,
            timestamp: new Date().toISOString(),
            read: false
        };

        // Save to file
        const contacts = await readContacts();
        contacts.push(contact);
        await writeContacts(contacts);

        // Send email notification (if configured)
        if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
            try {
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: process.env.RECIPIENT_EMAIL || 'adityasrivastava13112003@gmail.com',
                    subject: `Portfolio Contact: ${subject}`,
                    html: `
                        <h2>New Contact Form Submission</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                        <p><strong>Message:</strong></p>
                        <p>${message.replace(/\n/g, '<br>')}</p>
                        <hr>
                        <p><small>Received at: ${new Date().toLocaleString()}</small></p>
                    `,
                    replyTo: email
                };

                await transporter.sendMail(mailOptions);

                // Send auto-reply to the sender
                const autoReplyOptions = {
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: 'Thank you for contacting me!',
                    html: `
                        <h2>Hello ${name},</h2>
                        <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
                        <p><strong>Your Message:</strong></p>
                        <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">${message.replace(/\n/g, '<br>')}</p>
                        <br>
                        <p>Best regards,</p>
                        <p>Aditya Raj Srivastava</p>
                        <hr>
                        <p><small>This is an automated response. Please do not reply to this email.</small></p>
                    `
                };

                await transporter.sendMail(autoReplyOptions);
            } catch (emailError) {
                console.error('Email sending failed:', emailError);
                // Don't fail the request if email fails
            }
        }

        res.status(200).json({ 
            success: true, 
            message: 'Message sent successfully!' 
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error. Please try again later.' 
        });
    }
});

// Get all contacts (for admin view - you might want to add authentication)
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await readContacts();
        res.status(200).json({ 
            success: true, 
            contacts: contacts.reverse() // Most recent first
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching contacts' 
        });
    }
});

// Mark contact as read
app.patch('/api/contacts/:id/read', async (req, res) => {
    try {
        const { id } = req.params;
        const contacts = await readContacts();
        const contact = contacts.find(c => c.id === id);
        
        if (!contact) {
            return res.status(404).json({ 
                success: false, 
                message: 'Contact not found' 
            });
        }

        contact.read = true;
        await writeContacts(contacts);
        
        res.status(200).json({ 
            success: true, 
            message: 'Contact marked as read' 
        });
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error updating contact' 
        });
    }
});

// Delete contact
app.delete('/api/contacts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const contacts = await readContacts();
        const filteredContacts = contacts.filter(c => c.id !== id);
        
        if (contacts.length === filteredContacts.length) {
            return res.status(404).json({ 
                success: false, 
                message: 'Contact not found' 
            });
        }

        await writeContacts(filteredContacts);
        
        res.status(200).json({ 
            success: true, 
            message: 'Contact deleted successfully' 
        });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error deleting contact' 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        success: true, 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`📧 Email notifications: ${process.env.EMAIL_USER ? 'Enabled' : 'Disabled (set EMAIL_USER and EMAIL_PASSWORD)'}`);
});
