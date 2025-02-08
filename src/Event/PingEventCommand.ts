import { RequestHandler, requestHandler } from "mediatr-ts";
import { inject, injectable } from "inversify";
import { RequestData } from "mediatr-ts";
import { Message, OmitPartialGroupDMChannel } from "discord.js";
import { TemplateResolver } from "../Template/TemplateResolver";

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

    constructor(
        @inject(TemplateResolver)
        private readonly templateResolver: TemplateResolver,
    ) { }

    async handle(request: PingEventCommandRequest): Promise<void> {
        if (request.message.author.bot) {
            return;
        }

        if (request.message.content === "!ping") {
            const userName = request.message.author.username;
            const currentDate = new Date().toLocaleDateString();

            const values = {
                userName: userName,
                joinDate: "2023-10-01",
                currentTime: currentDate,
                inviteLink: "https://discord.gg/invite-link",
            };

            const message = this.templateResolver.getContent(
                2,
                values
            );

            // const message = this.templateResolver.getContent(
            //     1,
            //     { userName, currentDate }
            // );

            request.message.reply(message);
        }
    }
}

export { PingEventCommand, PingEventCommandRequest };
