import style from "./toast.module.css"
type ToastOptions = {
    duration: number
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    pauseOnHover?: boolean
    appendOnTopBody?: boolean
}
const icons = {
    success: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>',
    error: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>',
    alert: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>'
}
export default class Toast {
    public config: ToastOptions
    public readonly container: HTMLDivElement
    private static template =
        `<div class=${style["toast"]}>
            <div class=${style["toast-icon"]}>:icon</div>
            <div class=${style["toast-content"]}>:message</div>
            <div class=${style["toast-close-icon"]}>&times</div>
        </div>`
    constructor(options = {
        duration: 3000,
        position: 'top-right',
        pauseOnHover: false,
        appendOnTopBody: true
    } as ToastOptions) {
        if (!options.pauseOnHover) options.pauseOnHover = false
        if (!options.appendOnTopBody) options.appendOnTopBody = true
        if (!options.position) options.position = 'top-right'
        this.config = {} as ToastOptions
        this.config.duration = options.duration
        this.config.position = options.position
        this.config.pauseOnHover = options.pauseOnHover
        this.container = document.createElement('div')
        this.container.classList.add(style["toast-container"])
        this.container.classList.add(style[`${this.config.position}`])
        document.querySelectorAll(`.${style['toast-container']}`).forEach(node => {
            node.remove()
        })
        if (options.appendOnTopBody) document.body.prepend(this.container)
    }
    private createElement(message: string, type: 'success' | 'error' | 'alert') {
        const template = Toast.template.replace(':message', message).replace(':icon', icons[type])
        const DOM_ELEMENT = new DOMParser().parseFromString(template, 'text/html').body.firstElementChild
        return DOM_ELEMENT as HTMLDivElement
    }
    private handleEvent(DOM_ELEMENT: HTMLDivElement) {
        DOM_ELEMENT.querySelector(`.${style['toast-close-icon']}`)?.addEventListener('click', () => {
            this.close(DOM_ELEMENT)
        })
        switch (this.config.position) {
            case 'top-left':
                this.container.prepend(DOM_ELEMENT)
                break
            case 'top-right':
                this.container.prepend(DOM_ELEMENT)
                break
            case 'bottom-left':
                this.container.append(DOM_ELEMENT)
                break
            case 'bottom-right':
                this.container.append(DOM_ELEMENT)
                break
            default:
                this.container.prepend(DOM_ELEMENT)
                break;
        }
        requestAnimationFrame(() => {
            DOM_ELEMENT.classList.add(style["show"])
        })
        let closeTimeOutId = setTimeout(() => {
            this.close(DOM_ELEMENT)
        }, this.config.duration)
        if (this.config.pauseOnHover) {
            DOM_ELEMENT.addEventListener('mouseenter', () => {
                clearTimeout(closeTimeOutId)
                DOM_ELEMENT.addEventListener('mouseleave', () => {
                    closeTimeOutId = setTimeout(() => {
                        this.close(DOM_ELEMENT)
                    }, this.config.duration)
                }, { once: true })
            })
        }
    }
    public success(message: string) {
        const DOM_ELEMENT = this.createElement(message, 'success')
        DOM_ELEMENT.classList.add(style["success"])
        this.handleEvent(DOM_ELEMENT)
    }
    public error(message: string) {
        const DOM_ELEMENT = this.createElement(message, 'error')
        DOM_ELEMENT.classList.add(style["error"])
        this.handleEvent(DOM_ELEMENT)
    }
    public alert(message: string) {
        const DOM_ELEMENT = this.createElement(message, 'alert')
        DOM_ELEMENT.classList.add(style["alert"])
        this.handleEvent(DOM_ELEMENT)
    }
    private close(DOM_ELEMENT: HTMLDivElement) {
        DOM_ELEMENT.classList.add(style["hide"])
        setTimeout(() => {
            DOM_ELEMENT.classList.remove('show')
            DOM_ELEMENT.remove()
        }, 400)
    }
}