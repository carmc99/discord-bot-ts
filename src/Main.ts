import "reflect-metadata";
import dotenv from "dotenv";
import { BindingScopeEnum, Container } from "inversify";
import { GetUserQuery, GetUserQueryRequest } from "./User/GetUserQuery";
import { LoggerMiddleware } from "./LoggerMiddleware";
import { DiscordClient } from "./Client/DiscordClient";
import { Mediator } from "mediatr-ts";
import { ReadyEventCommandRequest } from "./Event/ReadyEventCommand";
import { PingEventCommandRequest } from "./Event/PingEventCommand";
import { container } from "./Container";

dotenv.config();

container.applyMiddleware(LoggerMiddleware);
const discordClient = container.resolve(DiscordClient);
const mediator = container.resolve(Mediator);


discordClient.once("ready", async () => {
    await mediator.send(new ReadyEventCommandRequest());
});

discordClient.on("messageCreate", async (message) => {
    await mediator.send(new PingEventCommandRequest(message));
});

discordClient.login(process.env.DISCORD_TOKEN);