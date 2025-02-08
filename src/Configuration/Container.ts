import { Container, BindingScopeEnum } from "inversify";
import { Mediator } from "mediatr-ts";
import { InversifyResolver } from "./InversifyResolver";
import { ITemplateRepository } from "../Template/repositories/ITemplateRepository ";
import { TYPES } from "../types";
import { TemplateRepository } from "../Template/repositories/InMemory/TemplateRepository";

const container = new Container({
    autoBindInjectable: true,
    defaultScope: BindingScopeEnum.Request,
});

// Registro repositorios
container.bind<ITemplateRepository>(TYPES.ITemplateRepository).to(TemplateRepository);



container.bind(InversifyResolver).toDynamicValue(() => new InversifyResolver(container));

// Registro Mediator
container.bind(Mediator).toDynamicValue((context) => {
    const resolver = context.container.get(InversifyResolver);
    return new Mediator({ resolver });
});

export { container };