import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IUkrEnergoMonthProps {
    WebContext: WebPartContext;
    EventListId: string;
    StartFromDate: Date;
    EventCategory: string;
    PassDateToBirthdayCollection: (year: number, month: number, day: number) => void;
}