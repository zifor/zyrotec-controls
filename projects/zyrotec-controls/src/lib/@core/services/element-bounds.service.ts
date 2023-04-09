import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ElementBoundsService
{

    constructor() { }

    public isElementInBounds(element: HTMLElement, parentElement: HTMLElement): boolean
    {
        if(!element || !parentElement) { return false };

        let elementTop = element.getBoundingClientRect().top;
        let elementBottom = element.getBoundingClientRect().bottom;
        let elementRight = element.getBoundingClientRect().right;
        let elementLeft = element.getBoundingClientRect().left;

        let parentElementTop = parentElement.getBoundingClientRect().top;
        let parentElementBottom = parentElement.getBoundingClientRect().bottom;
        let parentElementRight = parentElement.getBoundingClientRect().right;
        let parentElementLeft = parentElement.getBoundingClientRect().left;

        return elementTop < parentElementTop || elementBottom > parentElementBottom || elementRight > parentElementRight || elementLeft < parentElementLeft;
    }

    public isElementInBoundsLeft(element: HTMLElement, parentElement: HTMLElement): boolean
    {
        let elementLeft = element.getBoundingClientRect().left;
        let parentElementLeft = parentElement.getBoundingClientRect().left;

        return elementLeft < parentElementLeft;
    }

    public isElementInBoundsRight(element: HTMLElement, parentElement: HTMLElement): boolean
    {
        let elementRight = element.getBoundingClientRect().right;
        let parentElementRight = parentElement.getBoundingClientRect().right;

        return elementRight > parentElementRight;
    }

    public isElementRight(element: HTMLElement, elementToCheck: HTMLElement): boolean
    {
        if(!element || !elementToCheck) { return false }

        let elementRight = element.getBoundingClientRect().right;
        let elementToCheckRight = elementToCheck.getBoundingClientRect().right;

        return elementToCheckRight > elementRight;
    }

    public isElementLeft(element: HTMLElement, elementToCheck: HTMLElement): boolean
    {
        if(!element || !elementToCheck) { return false }

        let elementLeft = element.getBoundingClientRect().left;
        let elementToCheckLeft = elementToCheck.getBoundingClientRect().left;

        return elementToCheckLeft < elementLeft;
    }

    public getElementHeight(element: HTMLElement): number
    {
        return element.getBoundingClientRect().height;
    }

    public getElementWidth(element: HTMLElement): number
    {
        return element.getBoundingClientRect().width;
    }
}
