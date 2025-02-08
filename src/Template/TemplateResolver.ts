import { inject, injectable } from "inversify";
import { TemplateTransformer } from "./TemplateTransformer";
import { ITemplateRepository } from "./repositories/ITemplateRepository ";
import { TYPES } from "../types";

@injectable()
class TemplateResolver {
    constructor(
        @inject(TemplateTransformer)
        private readonly templateTransformer: TemplateTransformer,
        @inject(TYPES.ITemplateRepository)
        private readonly templateRepository: ITemplateRepository,
    ) { }

    public getContent(identifier: number, values: object): string {
        const template = this.templateRepository.getTemplateById(identifier);

        if (!template) {
            throw new Error(`Template with id ${identifier} not found`);
        }

        return this.templateTransformer.transform(template.content, values);
    }
}

export { TemplateResolver };