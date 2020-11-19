import { IPropertyPaneDropdownOption } from '@microsoft/sp-property-pane';

export interface IUkrEnergoCalendarWebPartProps {
    WebPartName: string;
    EventListId: string;
    CategorySelected: number;
    BirthdayListId: string;
    CategorySelectorDisabled: boolean;
    EventCategories: IPropertyPaneDropdownOption[];
}