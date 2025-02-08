import { RequestData, RequestHandler, requestHandler } from "mediatr-ts";
import { injectable } from "inversify";


class GetUserQueryRequest extends RequestData<string> {
    name: string;

    constructor(name: string) {
        super()
        this.name = name;
    }
}

@requestHandler(GetUserQueryRequest)
@injectable()
class GetUserQuery implements RequestHandler<GetUserQueryRequest, string> {
    handle(value: GetUserQueryRequest): Promise<string> {
        return Promise.resolve(`Value passed ${value.name}`);
    }
}

export { GetUserQuery, GetUserQueryRequest }