import { Template } from "../Template ";

interface ITemplateRepository {

    addTemplate(content: string): number;

    getTemplateById(id: number): Template | undefined;

    getAllTemplates(): Template[];

    updateTemplate(id: number, newContent: string): boolean;

    deleteTemplate(id: number): boolean;
}

export { ITemplateRepository }