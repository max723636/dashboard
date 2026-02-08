// js/auth.js

const { Client } = require('discord.js');
const client = new Client();

const DISCORD_TOKEN = 'YOUR_DISCORD_BOT_TOKEN';

client.login(DISCORD_TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// OAuth2
const express = require('express');
const fetch = require('node-fetch');
const querystring = require('querystring');

const app = express();
const redirectUri = 'http://localhost:3000/callback';
const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';

app.get('/auth/discord', (req, res) => {
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify%20email`;
    res.redirect(authUrl);
});

app.get('/callback', async (req, res) => {
    const code = req.query.code;
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: querystring.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
        }),
    });

    const tokenData = await tokenResponse.json();
    console.log(tokenData);

    res.send('Authentication complete! You can close this window.');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});