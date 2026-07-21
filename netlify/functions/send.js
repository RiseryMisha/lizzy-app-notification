exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    const TOKEN = process.env.TELEGRAM_TOKEN;
    const PARTNER_CHAT_ID = process.env.PARTNER_CHAT_ID;

    try {
        const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: PARTNER_CHAT_ID,
                text: "🚨 **Внимание!** Твой любимый человек ждет тебя и очень хочет пообщаться! ❤️",
                parse_mode: "Markdown"
            })
        });

        const data = await response.json();
        if (data.ok) {
            return { statusCode: 200, body: JSON.stringify({ success: true }) };
        } else {
            return { statusCode: 200, body: JSON.stringify({ success: false, error: data.description }) };
        }
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ success: false, error: error.message }) };
    }
};
