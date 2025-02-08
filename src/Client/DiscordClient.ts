import { Client, GatewayIntentBits } from "discord.js";
import { injectable } from "inversify";

@injectable()
class DiscordClient extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ],
        });
    }
}

export { DiscordClient }