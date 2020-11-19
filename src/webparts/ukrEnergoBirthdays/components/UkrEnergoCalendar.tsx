import * as React from 'react';
import {
    Stack,
    Dropdown,
    SpinButton,
    IDropdownOption,
    IconButton,
    IIconProps
} from 'office-ui-fabric-react';

import UkrEnergoList from './calendarViews/UkrEnergoList';
import UkrEnergoMonth from './calendarViews/UkrEnergoMonth';
import { Monthes } from '../entity/DataModel/Monthes';

import styles from '../scss/UkrEnergoBirthdaysStyles.module.scss';

import { IUkrEnergoCalendarProps } from './interfaces/IUkrEnergoCalendarProps';
import { IUkrEnergoCalendarState } from './interfaces/IUkrEnergoCalendarState';

export default class UkrEnergoCalendar extends React.Component<IUkrEnergoCalendarProps, IUkrEnergoCalendarState> {

    private monthesCollection: IDropdownOption[] = [];
    private addEventActionHref: string = '';
    private currentYear: number = (new Date()).getFullYear();
    private currentMonth: number = (new Date()).getMonth() + 1;

    private addBirthdayIcon: IIconProps = { iconName: 'AddEvent' };
    private selectDateIcon: IIconProps = { iconName: 'GotoToday' };
    private leftIcon: IIconProps = { iconName: 'FlickRight' };
    private rightIcon: IIconProps = { iconName: 'FlickLeft' };

    constructor(props: IUkrEnergoCalendarProps) {super(props);

        this.monthesCollection.push(
            ...(new Monthes()).Year.map(
                m => { return { key: m.key, text: m.title}; }
        ));
            
        this.addEventActionHref = `${props.WebContext.pageContext.web.absoluteUrl}/_layouts/15/Event.aspx?ListGuid=${props.EventListId}&Mode=Edit`;

        const defaultStartFromDate: Date =
            new Date(this.currentYear, this.currentMonth - 1, 1, 0, 0, 0);

        this.state = {
            StartFromDate: defaultStartFromDate
        };
    }

    public render(): React.ReactElement<IUkrEnergoCalendarProps> {
        return (
            <div className={ styles.ukrEnergoCalendarStyle }>
                { this.state && (
                    <div className={ styles.webPartContainer }>
                        <div className={ styles.webPartRow }>
                            <UkrEnergoList
                                BirthdayDate={this.state.StartFromDate}
                                WebContext={this.props.WebContext}
                                EventListId={this.props.EventListId}
                                BirthdayListId={this.props.BirthdayListId}
                                EventCategory={this.props.EventCategory}
                                SetBirthdayCollectionFunction={this.setBirthdayCollectionFunction.bind(this)}
                            />
                            <div className={ styles.calendarContainer }>
                                <div className={ styles.calendarRow }>
                                    <div className={ styles.calendarTopContainer }>
                                        <div className={styles.itemLeftButtons}>
                                            <IconButton
                                                iconProps={this.leftIcon}
                                                title='Step Backward'
                                                disabled={false}
                                                checked={true}
                                                className={styles.iconButton}
                                                onClick={this.onIconShiftButtonClicked}
                                            />
                                            <IconButton
                                                iconProps={this.addBirthdayIcon}
                                                title='Add Birthday'
                                                disabled={false}
                                                checked={true}
                                                className={styles.iconButton}                                    
                                                href={this.addEventActionHref}
                                            />
                                        </div>
                                        <div className={styles.itemMonthDropdown}>
                                            <Dropdown
                                                className={styles.calendarMonthSelector}
                                                onChange={this.onBirthdayMonthSelected}
                                                options={this.monthesCollection}
                                                selectedKey={this.state.StartFromDate.getMonth() + 1}
                                            />
                                        </div>
                                        <div className={styles.itemYearDropdown}>
                                            <SpinButton
                                                min={2000}
                                                max={2030}
                                                value={this.getCurrentYear()}
                                                onValidate={this.onSpinButtonValidate}
                                                onIncrement={this.onSpinButtonIncrement}
                                                onDecrement={this.onSpinButtonDecrement}
                                            />
                                        </div>
                                        <div className={ styles.itemRightButtons }>
                                            <IconButton
                                                iconProps={this.selectDateIcon}
                                                title='Current Date'
                                                disabled={false}
                                                checked={true}
                                                className={styles.iconButton}
                                                onClick={this.onIconShiftButtonClicked}
                                            />
                                            <IconButton
                                                iconProps={this.rightIcon}
                                                title='Step Forward'
                                                disabled={false}
                                                checked={true}
                                                className={styles.iconButton}
                                                onClick={this.onIconShiftButtonClicked}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <UkrEnergoMonth
                                    StartFromDate={this.state.StartFromDate}
                                    WebContext={this.props.WebContext}
                                    EventListId={this.props.EventListId}
                                    EventCategory={this.props.EventCategory}
                                    PassDateToBirthdayCollection={this.passDateToBirthdayFunction.bind(this)}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    private onBirthdayMonthSelected = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void  => {
        const newStartFromDate: Date =
            new Date(
                this.state.StartFromDate.getFullYear(), 
                (item.key as number) - 1,
                1, 0, 0, 0
            );

        this.setState({
            StartFromDate: newStartFromDate
        });
    }

    private getCurrentYear = (): string => {
        const year: string = this.state.StartFromDate.getFullYear().toString();

        return year;
    }

    private onSpinButtonIncrement = (value: string): string => {

        let year: number = this.state.StartFromDate.getFullYear();
        const newStartFromDate: Date =
            new Date(
                year + 1, 
                this.state.StartFromDate.getMonth(),
                1, 0, 0, 0
            );

        this.setState({
            StartFromDate: newStartFromDate
        });

        return (year + 1).toString();
    }

    private onSpinButtonDecrement = (value: string): string => {

        let year: number = this.state.StartFromDate.getFullYear();

        const newStartFromDate: Date =
            new Date(
                year - 1, 
                this.state.StartFromDate.getMonth(),
                1, 0, 0, 0
            );

        this.setState({
            StartFromDate: newStartFromDate
        });

        return (year - 1).toString();
    }

    private onSpinButtonValidate = (value: string): string => {

        let year: number = this.state.StartFromDate.getFullYear();
        if( !isNaN(Number(value)) ) {
            if((year >= 2010) || (year <= 2030)) year = Number(value);
        }

        const newStartFromDate: Date =
            new Date(
                year, 
                this.state.StartFromDate.getMonth(),
                1, 0, 0, 0
            );

        this.setState({
            StartFromDate: newStartFromDate
        });
        
        return year.toString();
    }

    private onIconShiftButtonClicked = (event: React.MouseEvent<HTMLButtonElement>): void => {
    
        const areaLabel: string = event.currentTarget.title;
        let newStartFromDate: Date;

        switch(areaLabel) {
            case 'Current Date': {
                newStartFromDate =
                    new Date(
                        this.currentYear, 
                        this.currentMonth - 1,
                        1, 0, 0, 0
                    );
                break;
            }
            case 'Step Backward': {
                newStartFromDate =
                    new Date(
                        this.state.StartFromDate.getFullYear(),
                        this.state.StartFromDate.getMonth(),
                        1, 0, 0, 0
                    );
                newStartFromDate.setMonth(newStartFromDate.getMonth() - 1);
                break; 
            }
            case 'Step Forward': {
                newStartFromDate =
                    new Date(
                        this.state.StartFromDate.getFullYear(),
                        this.state.StartFromDate.getMonth(),
                        1, 0, 0, 0
                    );
                newStartFromDate.setMonth(newStartFromDate.getMonth() + 1);
                break;
            }
        }

        this.setState({
            StartFromDate: newStartFromDate
        });
    }

    // call back from Month Grid to Birthday List
    public getBirthdayCollection: (year: number, month: number, day: number) => void;
    public setBirthdayCollectionFunction(birthdayFunction: (year: number, month: number, day: number) => void): void {
        this.getBirthdayCollection = birthdayFunction;
    }
    public passDateToBirthdayFunction(year: number, month: number, day: number): void {
        this.getBirthdayCollection(year, month, day);
    }
}
