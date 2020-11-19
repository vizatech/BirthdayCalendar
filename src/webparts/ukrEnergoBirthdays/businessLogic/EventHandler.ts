import { WebPartContext } from '@microsoft/sp-webpart-base';

import { Repository } from '../persistence/repository';
import { MapperDTO } from '../entity/Mappers/MapperDTO';

import { ICelebrationItem }  from '../entity/DataModel/ICelebrationItem';
import { IBirthdayPeople }  from '../entity/DataModel/IBirthdayPeople';
import { IPropertyPaneDropdownOption } from '@microsoft/sp-property-pane';

export class EventHandler extends Repository {
    private mapperDTO: MapperDTO;

    public constructor(webpartContext: WebPartContext) { super(webpartContext);
        this.mapperDTO = new MapperDTO();
    }
    
    public async getEventListCategories(listId: string):Promise<IPropertyPaneDropdownOption[]> {
        const fieldName: string = 'Category';
        const selectedFieldProperties: string[] = [
          'Choices'
        ];

        return await this.getFieldProperties(listId, fieldName)
            .then( categoryField => {
                const categories: string[] = categoryField ? categoryField.Choices: undefined;                    
                return this.mapperDTO.mapToCategoryDTO(categories);                
            });
    }

    public async getBirthdayCollection(
            birthdayListId: string,
            searchYear: number,
            searchMonth: number,
            searchDay: number
        ):Promise<IBirthdayPeople[]> {

        const listId: string = birthdayListId;

        const keyFieldYear: string = 'Year';
        const keyFieldMonth: string = 'Month';
        const keyFieldDay: string = 'Day';
        const filterYear: string = (searchYear && (searchYear.toString().length == 4))? 
            searchYear.toString(): (new Date()).getFullYear().toString();
        const filterMonth: string = (searchMonth)? 
            ((searchMonth < 9)? '0' + (searchMonth + 1).toString(): (searchMonth + 1).toString()): '00';
        const filterDay: string = (searchDay)? 
            ((searchDay < 10)? '0' + (searchDay ).toString(): (searchDay).toString()): '00';

        const filter: string = '';

        const fieldsToSelect: string[] = [
            'Id',
            'BirthdayPeople/Id',
            'Date',
            'Year',
            'Month',
            'Day'
        ];
        const fieldsToExpand: string[] = ['BirthdayPeople'];
        const fieldOrderBy:string = 'Id';

        return await this.getListItemsByFilter(
                    listId,
                    filter,
                    fieldsToSelect,
                    fieldsToExpand,
                    fieldOrderBy
                )
                .then( birthdays => {

                    if(birthdays) {
                        let filteredBirthdays: any[] = birthdays;                        
                        filteredBirthdays =
                            filteredBirthdays.filter(b => (b.Day == filterDay) && (b.Month == filterMonth));

                        const expandedBirthdays: any[] = [];
                        return Promise
                            .all(filteredBirthdays.map( async (b) => {
                                const userId = b.BirthdayPeople? Number(b.BirthdayPeople.Id): null;
                                return await this.resolveUserPropertiesById(b, userId).then( expb => {
                                    expandedBirthdays.push(expb);
                                    return Promise.resolve(true);
                                });
                            }))
                            .then( () => this.mapperDTO.mapToBirthdayPeople(expandedBirthdays) );
                    } else {
                        return null;
                    }                            
                });
    }

    // public async getEventCollection(
    //         eventListId: string,
    //         startFromDate: Date,
    //         finishAtDate: Date,
    //         selectedCategoryTitle: string
    //     ):Promise<ICelebrationItem[]> {

    //     const listId: string = eventListId;
    //     const keyFieldNameFrom: string = 'EventDate';
    //     const keyFieldNameTo: string = 'EndDate';
    //     const keyFieldNameCategory: string = 'Category';
    //     const keyFieldCategories: string[] = [selectedCategoryTitle];

    //     const itemKeyFrom: string = this.getQuerableData(startFromDate, true);
    //     const itemKeyTo: string = this.getQuerableData(finishAtDate, false);

    //     const fieldsToSelect: string[] = [
    //       'Id',
    //       'Title',
    //       'Description',
    //       'Location',
    //       'EventDate',
    //       'EndDate',
    //       'Category',
    //       'ParticipantsPickerId'
    //     ];
    //     const fieldsToExpand: string[] = [];
    //     const fieldOrderBy:string = 'Id';

    //     return await this.getEventListItems(
    //                 listId,
    //                 keyFieldNameFrom, keyFieldNameTo,
    //                 itemKeyFrom, itemKeyTo,
    //                 keyFieldNameCategory, keyFieldCategories,
    //                 fieldsToSelect, fieldsToExpand,
    //                 fieldOrderBy
    //             )
    //             .then( events => {
    //                 return events ? this.mapperDTO.mapToEventDTO(events) : null;                
    //             });
    // }

    // private getQuerableData(selectedDate: Date, isStartedDate: boolean): string {
    //     const date: Date = new Date(selectedDate.toUTCString());
    //     if(!isStartedDate) date.setDate( date.getDate() + 1);
    //     const year: string = date.getFullYear().toString();
    //     const month: string = ((date.getMonth() + 1) < 10)? '0' + (date.getMonth() + 1).toString(): (date.getMonth() + 1).toString();
    //     const day: string = (date.getDate() < 10)? '0' + date.getDate().toString(): date.getDate().toString();
    //     const time: string = '00:00:01.000Z';

    //     return year + '-' + month + '-' + day + 'T' + time;
    // }
}
