import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IUkrEnergoListProps {
    WebContext: WebPartContext;
    BirthdayDate: Date;
    BirthdayListId: string;
    EventListId: string;
    EventCategory: string;
    SetBirthdayCollectionFunction: (birthdayFunction: (year: number, month: number, day: number) => void) => void;
}