import { Container, BindingScopeEnum } from "inversify";
import { Mediator } from "mediatr-ts";
import { InversifyResolver } from "./InversifyResolver";

const container = new Container({
    autoBindInjectable: true,
    defaultScope: BindingScopeEnum.Request,
});

container.bind(InversifyResolver).toDynamicValue(() => new InversifyResolver(container));

// Registro Mediator
container.bind(Mediator).toDynamicValue((context) => {
    const resolver = context.container.get(InversifyResolver);
    return new Mediator({ resolver });
});

export { container };