import { Container } from "inversify";
import { Class, Resolver } from "mediatr-ts";

class InversifyResolver implements Resolver {
    private readonly container: Container;
    constructor(container: Container) {
        this.container = container;
    }

    resolve<T>(type: Class<T>): T {
        return this.container.get(type);
    }

    add<T>(type: Class<T>): void {
        this.container.bind(type).toSelf();
    }
}

export { InversifyResolver }