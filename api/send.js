export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
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
            return res.status(200).json({ success: true });
        } else {
            return res.status(200).json({ success: false, error: data.description });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
