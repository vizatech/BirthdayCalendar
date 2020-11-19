import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IUkrEnergoCalendarProps {
  WebContext: WebPartContext;
  EventListId: string;
  BirthdayListId: string;
  EventCategory: string;
}