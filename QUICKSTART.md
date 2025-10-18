# Quick Start Guide

## ✅ Your Backend is Now Running!

The server is currently running at: **http://localhost:3000**

## 🎯 What's Been Set Up

1. ✅ **Backend Server** - Express.js server handling API requests
2. ✅ **Contact Form API** - Endpoint for form submissions at `/api/contact`
3. ✅ **Admin Dashboard** - View messages at `/admin.html`
4. ✅ **Data Storage** - Messages saved to `data/contacts.json`
5. ✅ **Email Notifications** - Ready to configure (currently disabled)

## 🚀 Next Steps

### 1. Configure Email (Optional but Recommended)

To receive email notifications when someone contacts you:

1. Open the `.env` file in your project folder
2. Add your email credentials:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

**For Gmail:**
- Go to: https://myaccount.google.com/apppasswords
- Enable 2-Factor Authentication first
- Generate an App Password
- Use that 16-character password in `.env`

3. Restart the server:
```powershell
# Press Ctrl+C in the terminal to stop
# Then run:
npm start
```

### 2. Test Your Contact Form

1. Open your browser and go to: **http://localhost:3000**
2. Scroll down to the "Get In Touch" section
3. Fill out the form and click "Send Message"
4. You should see a success notification!

### 3. View Messages in Admin Dashboard

1. Go to: **http://localhost:3000/admin.html**
2. You'll see all contact form submissions
3. Features:
   - Search messages
   - Mark as read
   - Delete messages
   - View statistics

## 🎨 Frontend Integration

Your frontend has been automatically updated to:
- ✅ Send form data to the backend API
- ✅ Show success/error notifications
- ✅ Handle loading states
- ✅ Provide user feedback

**No changes to your HTML/CSS were made!** The frontend looks exactly the same.

## 📝 What Happens When Someone Contacts You?

1. **User fills out the form** → Data is sent to `/api/contact`
2. **Backend validates** → Checks all fields are filled
3. **Saves to database** → Stores in `data/contacts.json`
4. **Sends email** → Notifies you (if configured)
5. **Auto-reply** → Sends thank you email to user (if configured)
6. **Shows success** → User sees confirmation message

## 🔍 API Testing

You can test the API directly using PowerShell:

```powershell
$body = @{
    name = "Test User"
    email = "test@example.com"
    subject = "Testing"
    message = "This is a test message"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/api/contact -Method POST -Body $body -ContentType "application/json"
```

## 📊 View Stored Messages

Messages are stored in: `e:\llm\test\portfolio\data\contacts.json`

You can open this file to see all submissions in JSON format.

## ⚙️ Available Commands

```powershell
# Start server (production)
npm start

# Start with auto-reload (development)
npm run dev

# Install dependencies
npm install
```

## 🌐 Accessing from Other Devices

To test from your phone or other devices on the same network:

1. Find your computer's IP address:
```powershell
ipconfig
```

2. Look for "IPv4 Address" under your active network adapter

3. Access from other devices:
```
http://YOUR-IP-ADDRESS:3000
```

For example: `http://192.168.1.100:3000`

## 🚨 Important Notes

- **Keep the terminal open** - Closing it will stop the server
- **Don't commit `.env`** - It contains sensitive credentials
- **Email is optional** - Form still works without email configuration
- **Data persists** - Messages are saved even if server restarts

## 🛠️ Troubleshooting

### Server won't start
- Check if port 3000 is already in use
- Run: `Get-NetTCPConnection -LocalPort 3000`
- Kill conflicting process if found

### Form not submitting
- Check browser console for errors (F12)
- Verify server is running
- Check network tab to see API request

### Email not working
- Verify 2FA is enabled on Gmail
- Use App Password, not regular password
- Check `.env` file has correct credentials
- Look at server console for email errors

## 📚 Additional Resources

- **Full Documentation**: See `README.md` for complete details
- **API Endpoints**: Listed in `README.md`
- **Deployment Guide**: Instructions for Heroku, Vercel, Railway

## 💡 Tips

1. **Development**: Use `npm run dev` for auto-reload during development
2. **Security**: Add authentication to admin dashboard for production
3. **Database**: Consider upgrading to MongoDB or PostgreSQL for larger scale
4. **Rate Limiting**: Add rate limiting to prevent spam
5. **Validation**: Backend includes email validation and input sanitization

---

## 🎉 You're All Set!

Your portfolio now has a fully functional backend. Test it out and let me know if you need any adjustments!

**Current Status:**
- ✅ Server Running: http://localhost:3000
- ✅ Portfolio: http://localhost:3000/index.html
- ✅ Admin Panel: http://localhost:3000/admin.html
- ⚠️ Email: Not configured (optional)

**Need Help?**
Check `README.md` for detailed documentation or reach out!
