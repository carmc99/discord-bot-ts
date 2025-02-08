import { interfaces } from "inversify";

const LoggerMiddleware: interfaces.Middleware = (planAndResolve: interfaces.Next): interfaces.Next => {
    return (args: interfaces.NextArgs) => {
        let start = new Date().getTime();
        let result = planAndResolve(args);
        let end = new Date().getTime();
        console.log(`[Middleware] Resolving ${args.serviceIdentifier.toString()} took ${end - start}ms`);
        return result;
    };
};

export { LoggerMiddleware };