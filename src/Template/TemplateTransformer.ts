import { injectable } from "inversify";

@injectable()
class TemplateTransformer {
    public transform<T extends object>(template: string, values: T): string {
        const regex = /\{\{(.*?)\}\}/g;
        const result = template.replace(regex, (_, key) => {
            const trimmedKey = key.trim();
            return (values[trimmedKey as keyof T] as string) || '';
        });
        return result;
    }
}

export { TemplateTransformer }