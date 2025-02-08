import { RequestHandler, requestHandler } from "mediatr-ts";
import { injectable } from "inversify";
import { RequestData } from "mediatr-ts";

class ReadyEventCommandRequest extends RequestData<void> {}

@requestHandler(ReadyEventCommandRequest)
@injectable()
class ReadyEventCommand implements RequestHandler<ReadyEventCommandRequest, void> {
    async handle(): Promise<void> {
        console.log("Bot está listo 🚀");
    }
}

export { ReadyEventCommand, ReadyEventCommandRequest };
