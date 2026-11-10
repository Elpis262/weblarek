export abstract class Component<T> {
    protected constructor(protected readonly container: HTMLElement) {}

    protected toggleClass(element: HTMLElement, className: string, active: boolean) {
        if (active) {
            element.classList.add(className);
        } else {
            element.classList.remove(className);
        }
    }

    protected setDisabled(element: HTMLElement, disabled: boolean) {
        if (disabled) {
            element.setAttribute('disabled', 'true');
        } else {
            element.removeAttribute('disabled');
        }
    }

    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}