import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IWeekDay } from '../../entity/DataModel/WeekDays';

export interface IGridDayOfWeekProps {
    WebContext: WebPartContext;
    EventListId: string;
    EventCategory: string;    
    FullDate: Date;
    DayOfWeek: IWeekDay;
    DayNumber: number;
    IsCurrentDay: boolean;
    BelongsToSelectedMonth: boolean;
    IsSelectedDay: boolean;
    SetSelectedDay: (year: number, month: number, day: number) => void;
}
