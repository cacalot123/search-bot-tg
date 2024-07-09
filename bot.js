const TelegramBot = require('node-telegram-bot-api');

// 替换为您从 BotFather 获取的 API 令牌
const token = '7423194771:AAECUGcPjrAdJz-dg3TylTyptaTz_muNj-Y';

const bot = new TelegramBot(token, {polling: true});

// 处理 /start 命令
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Hello! I\'m your bot.');
});

// 处理 /set_timer 命令
bot.onText(/\/set_timer (\d+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const due = parseInt(match[1]);

    bot.sendMessage(chatId, `Timer set for ${due} seconds!`);

    setTimeout(() => {
        bot.sendMessage(chatId, 'This is a scheduled message!');
    }, due * 1000);
});

// 示例：使用Telegram Bot API的getChat方法搜索群组
bot.onText(/\/search_group (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const keyword = match[1];

    bot.sendMessage(chatId, `Searching for groups with keyword: ${keyword}`);

    // 调用Telegram Bot API的getChat方法进行搜索
    bot.getChat(keyword).then((chat) => {
        // chat对象包含搜索到的群组信息
        bot.sendMessage(chatId, `Group found: ${chat.title}`);
    }).catch((err) => {
        bot.sendMessage(chatId, `Error searching group: ${err.message}`);
    });
});

// 捕捉其他消息
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    // 可以添加其他功能
});
