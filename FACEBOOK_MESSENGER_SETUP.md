# Facebook Messenger Chat Integration Guide

## Overview
Your website now has a Facebook Messenger chat plugin that allows customers to communicate with you directly through Facebook Messenger. When customers click the chat button, they'll be connected to your Facebook Page's Messenger.

## Setup Instructions

### Step 1: Create or Use Your Facebook Page
1. Go to [Facebook Pages](https://www.facebook.com/pages/create)
2. Create a new page for your business or use an existing one
3. Make sure your page is published (not in draft mode)

### Step 2: Get Your Facebook Page ID

**Method 1: From Facebook Page Settings**
1. Go to your Facebook Page
2. Click on "About" tab
3. Scroll down to find your Page ID
4. Copy the numeric ID

**Method 2: Using Find My Facebook ID**
1. Visit [https://findmyfbid.com/](https://findmyfbid.com/)
2. Enter your Facebook Page URL
3. Copy the Page ID shown

**Method 3: From Page URL**
1. Go to your Facebook Page
2. Look at the URL: `https://www.facebook.com/YOUR_PAGE_NAME`
3. If you see a numeric ID in the URL, that's your Page ID

### Step 3: Configure Your Website

1. **Create or update the `.env` file** in the `frontend` folder:
   ```bash
   # Copy the example file
   cp .env.example .env
   ```

2. **Add your Facebook Page ID** to the `.env` file:
   ```env
   REACT_APP_FB_PAGE_ID=123456789012345
   ```
   Replace `123456789012345` with your actual Facebook Page ID

3. **Restart your development server** for changes to take effect:
   ```bash
   # Stop the current server (Ctrl+C)
   # Then start it again
   cd frontend
   npm start
   ```

### Step 4: Customize the Chat Widget (Optional)

You can customize the chat widget by editing `frontend/src/components/FacebookMessenger.js`:

```javascript
<div
  className="fb-customerchat"
  attribution="setup_tool"
  page_id={pageId}
  theme_color="#E91E63"  // Change this to match your brand color
  logged_in_greeting="Hi! How can we help you today? 😊"  // Customize greeting
  logged_out_greeting="Hi! How can we help you today? 😊"  // Customize greeting
></div>
```

**Customization Options:**
- `theme_color`: Color of the chat bubble (hex color code)
- `logged_in_greeting`: Message shown to logged-in Facebook users
- `logged_out_greeting`: Message shown to users not logged into Facebook
- `greeting_dialog_display`: Set to "show" to show greeting dialog by default
- `greeting_dialog_delay`: Delay in seconds before showing greeting (e.g., "5")

### Step 5: Test the Integration

1. Open your website in a browser
2. Look for the Messenger chat icon in the bottom-right corner
3. Click on it to open the chat window
4. Send a test message
5. Check your Facebook Page inbox to see the message

## Features

✅ **Persistent Conversations**: Conversations continue across sessions
✅ **Mobile Responsive**: Works on all devices
✅ **Facebook Integration**: Uses customers' existing Facebook accounts
✅ **Notifications**: Receive notifications when customers message you
✅ **Message History**: Full conversation history in your Facebook Page inbox
✅ **Reply Anywhere**: Respond from Facebook mobile app, desktop, or Messenger

## Troubleshooting

### Chat widget not appearing?
- Make sure `REACT_APP_FB_PAGE_ID` is set in your `.env` file
- Check browser console for any errors
- Verify your Facebook Page is published
- Clear browser cache and reload

### Can't receive messages?
- Make sure you're an admin of the Facebook Page
- Check your Facebook Page inbox (not personal Messenger)
- Ensure Messenger is enabled on your Facebook Page

### Chat widget not loading?
- Check your internet connection
- Verify Facebook is not blocked by your firewall/adblocker
- Try disabling browser extensions temporarily

## Managing Customer Conversations

### Accessing Messages
1. Go to your Facebook Page
2. Click on "Inbox" in the left menu
3. You'll see all customer messages here

### Responding to Messages
- **Desktop**: Use Facebook Page Inbox or messenger.com
- **Mobile**: Download Facebook Pages Manager app
- **Teams**: Add team members as page admins to help with responses

### Setting Up Auto-Responses
1. Go to your Facebook Page settings
2. Click "Messaging" in the left menu
3. Set up:
   - **Instant Reply**: Automatic initial response
   - **Away Message**: When you're unavailable
   - **Saved Replies**: Quick response templates

## Production Deployment

When deploying to production:

1. **Update environment variables** on your hosting platform:
   ```
   REACT_APP_FB_PAGE_ID=your_actual_page_id
   ```

2. **Add your production domain** to Facebook Page settings:
   - Go to Page Settings > Messenger Platform
   - Whitelist your production domain

3. **Test thoroughly** on production before announcing

## Privacy & Compliance

- The chat plugin respects user privacy per Facebook's policies
- No customer data is stored on your server
- All communication goes through Facebook's secure platform
- Comply with applicable data protection regulations (GDPR, etc.)

## Support

For Facebook Messenger Platform support:
- [Facebook Messenger Platform Documentation](https://developers.facebook.com/docs/messenger-platform/)
- [Customer Chat Plugin Guide](https://developers.facebook.com/docs/messenger-platform/discovery/customer-chat-plugin)

For technical issues with the integration:
- Check the browser console for errors
- Review this guide's troubleshooting section
- Verify all configuration steps were followed

---

**Need Help?** If you encounter any issues, check your browser's developer console (F12) for error messages and verify all setup steps were completed correctly.
