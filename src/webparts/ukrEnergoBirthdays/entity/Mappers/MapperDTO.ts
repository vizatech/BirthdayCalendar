import { ICelebrationItem }  from '../DataModel/ICelebrationItem';
import { IPropertyPaneDropdownOption } from '@microsoft/sp-property-pane';
import { IBirthdayPeople }  from '../DataModel/IBirthdayPeople';

export class MapperDTO {

    public mapToCategoryDTO(categories: string[]): IPropertyPaneDropdownOption[] {
        const categoryDTO: IPropertyPaneDropdownOption[] = categories? categories.map( (categoryName, index) => {
            return {
                key: index,
                text: categoryName || ''
            };
        }): [];

        return categoryDTO;
    }

    public mapToBirthdayPeople(items: any[]): IBirthdayPeople[] {
        const birthdayPeopleCollection: IBirthdayPeople[] = [];

        if(items) {
            items.forEach(birthday => {
                const item = birthday.item;
                const profile = birthday.profile;
                const displayName: string = profile.DisplayName || 'Not Defined';
                const shortName: string =
                    (displayName.split(' ').length > 1)?
                        displayName.split(' ')[0].toUpperCase().split('')[0] +
                        displayName.split(' ')[1].toUpperCase().split('')[0] :
                        'ND';
                const birthdayPeople: IBirthdayPeople = {
                    Id: item.BirthdayPeople? item.BirthdayPeople.Id: 0,
                    DisplayName: displayName || '',
                    ShortName: shortName || '',
                    PersonalUrl: profile.PersonalUrl || '',
                    PictureUrl: profile.PictureUrl || '',
                    Title: profile.title || '',
                    Birthday: {
                        Year: item.Year,
                        Month: item.Month,
                        Day: item.Day,
                        BirthdayDate: item.Date? new Date(item.Date): null,
                        BirthdayString: item.Month + '-' + item.Day + '-' + item.Year
                    } 
                };
                birthdayPeopleCollection.push(birthdayPeople);
            });
        }

        return birthdayPeopleCollection;
    }

    public mapToEventDTO(items: any[]): ICelebrationItem[] {

        const eventsDTO: ICelebrationItem[] = [];

        if(items) {
            let eventDTO: ICelebrationItem;
            items.forEach(item => {
                eventDTO = {
                    Id: item.Id as number,
                    Title: item.Title || '',
                    Description: item.Description || '',
                    Location: item.Location || '',
                    EventDate: (item.EventDate)? new Date(item.EventDate): undefined,
                    EndDate: (item.EndDate)? new Date(item.EndDate): undefined,
                    Category: item.Category || '',
                    // Activity: (item.Activity === 'Active')
                };
                eventsDTO.push(eventDTO);
            });
        }

        return eventsDTO;
    }
}
