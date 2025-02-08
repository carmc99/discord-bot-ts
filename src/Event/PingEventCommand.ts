import { RequestHandler, requestHandler } from "mediatr-ts";
import { inject, injectable } from "inversify";
import { RequestData } from "mediatr-ts";
import { Message, OmitPartialGroupDMChannel } from "discord.js";
import { TemplateTransformer } from "../Template/TemplateTransformer";

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
        @inject(TemplateTransformer)
        private readonly templateTransformer: TemplateTransformer,
    ) {

        console.log(templateTransformer);
    }

    async handle(request: PingEventCommandRequest): Promise<void> {
        if (request.message.author.bot) {
            return;
        }

        if (request.message.content === "!ping") {
            const usuario = request.message.author.username;
            const fecha = new Date().toLocaleDateString();

            const template = `
            ¡Hola, **{{ usuario }}**! 👋 
             Hoy es *{{ fecha }}*.`;

            const mensajeFormateado = this.templateTransformer.transform<{ usuario: string; fecha: string }>(
                template,
                { usuario, fecha }
            );

            request.message.reply(mensajeFormateado);
        }
    }
}

export { PingEventCommand, PingEventCommandRequest };
