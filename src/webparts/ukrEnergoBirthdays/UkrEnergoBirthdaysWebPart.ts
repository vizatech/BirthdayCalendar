import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import {
  IPropertyPaneConfiguration,  
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';
import { 
  PropertyFieldListPicker,
  PropertyFieldListPickerOrderBy
} from '@pnp/spfx-property-controls';

import { sp } from '@pnp/sp';
import { initializeIcons } from '@uifabric/icons';
initializeIcons();

import * as dictionary from 'UkrEnergoBirthdaysDictionary';
import UkrEnergoCalendar from './components/UkrEnergoCalendar';
import { EventHandler } from './businessLogic/EventHandler';

import { IUkrEnergoCalendarProps } from './components/interfaces/IUkrEnergoCalendarProps';
import { IUkrEnergoCalendarWebPartProps } from './components/interfaces/IUkrEnergoCalendarWebPartProps';

export default class UkrEnergoBirthdaysWebPart extends BaseClientSideWebPart <IUkrEnergoCalendarWebPartProps> {

    private eventHandler: EventHandler;

    public render(): void {

        let selectedCategory: string = '';
        if(this.properties.EventCategories && (this.properties.EventCategories.length > 0) && this.properties.CategorySelected) {
            const selectedCategories: IPropertyPaneDropdownOption[] = [];
            selectedCategories.push(
                ...this.properties.EventCategories.filter(c => c.key === this.properties.CategorySelected)
            );
            if(selectedCategories.length > 0) selectedCategory = selectedCategories[0].text;
        }

        const element: React.ReactElement<IUkrEnergoCalendarProps> = React.createElement(
            UkrEnergoCalendar,
            {
                WebContext: this.context,
                EventListId: this.properties.EventListId || 'NotSelected',
                BirthdayListId: this.properties.BirthdayListId || 'NotSelected',
                EventCategory: selectedCategory
            }
        );

        ReactDom.render(element, this.domElement);
    }

    public onInit(): Promise<void> {
        return super.onInit().then(_ => {
            sp.setup({
                spfxContext: this.context
            });
            this.eventHandler = new EventHandler(this.context);
        });
    }

    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
    }

    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
        return {
            pages: [
                {
                    header: {
                        description: dictionary.WebPartName
                    },
                    displayGroupsAsAccordion: true,
                    groups: [
                        {
                            groupName: dictionary.BirthdayListSelectionGroup.GroupName,
                            isCollapsed: false,
                            groupFields: [
                                PropertyFieldListPicker('BirthdayListId', {
                                    label: 'Select an Birthday list',
                                    selectedList: this.properties.BirthdayListId,
                                    includeHidden: false,
                                    orderBy: PropertyFieldListPickerOrderBy.Title,
                                    disabled: false,
                                    baseTemplate: 100,
                                    onPropertyChange: this.onBirthdayListPickerChange.bind(this),
                                    properties: this.properties,
                                    context: this.context,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'BirthdayListId'
                                })
                            ]
                        },
                        {
                            groupName: dictionary.EventListSelectionGroup.GroupName,
                            isCollapsed: false,
                            groupFields: [
                                PropertyFieldListPicker('EventListId', {
                                    label: 'Select an Event list',
                                    selectedList: this.properties.EventListId,
                                    includeHidden: false,
                                    orderBy: PropertyFieldListPickerOrderBy.Title,
                                    disabled: false,
                                    baseTemplate: 106,
                                    onPropertyChange: this.onEventListPickerChange.bind(this),
                                    properties: this.properties,
                                    context: this.context,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'EventListId'
                                }),
                                PropertyPaneDropdown('CategorySelected', {
                                    label: 'Select category for "Birthdays"',
                                    options: this.properties.EventCategories,
                                    disabled: this.properties.CategorySelectorDisabled
                                })
                            ]
                        },
                    ]
                }
            ]
        };
    }

    private onEventListPickerChange(propertyPath: string, oldValue: any, newValue: any): void {

        this.properties.EventCategories = [];
        this.properties.CategorySelectorDisabled = true;

        if(newValue) {
            this.eventHandler.getEventListCategories(newValue)
                .then( allCategories => {
                    if(allCategories && (allCategories.length > 0)) { 
                        this.properties.EventCategories.push(...allCategories);
                        this.properties.CategorySelectorDisabled = false;
                    }
                })
                .then( () => {
                    this.context.propertyPane.refresh();
                });
        }
    }

    private onBirthdayListPickerChange(propertyPath: string, oldValue: any, newValue: any): void {

    }
}
