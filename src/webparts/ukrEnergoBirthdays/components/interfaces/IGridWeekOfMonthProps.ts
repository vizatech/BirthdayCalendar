import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IGridDayOfWeekProps } from './IGridDayOfWeekProps';

export interface IGridWeekOfMonthProps {
    WebContext: WebPartContext;
    EventListId: string;
    DayCollection: IGridDayOfWeekProps[];
    EventCategory: string;
}