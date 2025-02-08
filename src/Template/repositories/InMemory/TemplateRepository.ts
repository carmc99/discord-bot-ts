import { injectable } from "inversify";
import { Template } from "../../Template ";
import { ITemplateRepository } from "../ITemplateRepository ";

@injectable()
class TemplateRepository implements ITemplateRepository {
    private templates: Template[] = [];
    private nextId: number = 1;

    constructor() {
        this.addTemplate(
            `¡Hola, **{{ userName }}**! 👋\nHoy es *{{ currentDate }}*.`
        );

        this.addTemplate(
            `🎉 **¡Bienvenido, {{ userName }}!** 🎉\n` +
            `¡Gracias por unirte a nuestro servidor de Discord! 🚀\n\n` +
            `📅 **Fecha de ingreso:** {{ joinDate }}\n` +
            `⏰ **Hora actual:** {{ currentTime }}\n\n` +
            `🔗 **Invitación al servidor:** [Haz clic aquí]({{ inviteLink }})\n\n` +
            `¡No olvides revisar las reglas del servidor y presentarte en el canal de #bienvenida! 😊`
        );
    }

    addTemplate(content: string): number {
        const newTemplate: Template = {
            id: this.nextId,
            content,
        };
        this.templates.push(newTemplate);
        this.nextId++;
        return newTemplate.id;
    }

    getTemplateById(id: number): Template | undefined {
        return this.templates.find((template) => template.id === id);
    }

    getAllTemplates(): Template[] {
        return this.templates;
    }

    updateTemplate(id: number, newContent: string): boolean {
        const template = this.templates.find((template) => template.id === id);
        if (template) {
            template.content = newContent;
            return true;
        }
        return false;
    }

    deleteTemplate(id: number): boolean {
        const initialLength = this.templates.length;
        this.templates = this.templates.filter((template) => template.id !== id);
        return this.templates.length !== initialLength;
    }
}


export { TemplateRepository }