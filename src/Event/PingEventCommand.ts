import { RequestHandler, requestHandler } from "mediatr-ts";
import { injectable } from "inversify";
import { RequestData } from "mediatr-ts";
import { Message, OmitPartialGroupDMChannel } from "discord.js";

class PingEventCommandRequest extends RequestData<void> {
    message: OmitPartialGroupDMChannel<Message<boolean>>;

    constructor(message: OmitPartialGroupDMChannel<Message<boolean>>) {
        super()
        this.message = message;
    }
}

@requestHandler(PingEventCommandRequest)
@injectable()
class PingEventCommand implements RequestHandler<PingEventCommandRequest, void> {
    async handle(request: PingEventCommandRequest): Promise<void> {
        if (request.message.author.bot) {
            return;
        }

        if (request.message.content === "!ping") {
            request.message.reply("pong");
        }
    }
}

export { PingEventCommand, PingEventCommandRequest };
