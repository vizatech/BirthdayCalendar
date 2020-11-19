import * as React from 'react';

import styles from '../../scss/UkrEnergoBirthdaysStyles.module.scss';

import { IGridDayOfWeekProps } from '../interfaces/IGridDayOfWeekProps';
import { IMonth, Monthes } from '../../entity/DataModel/Monthes';
import GridWeekOfMonth from './GridWeekOfMonth';
import { IWeekDay, WeekDays } from '../../entity/DataModel/WeekDays';

import { IUkrEnergoMonthState } from '../interfaces/IUkrEnergoMonthState';
import { IUkrEnergoMonthProps } from '../interfaces/IUkrEnergoMonthProps';

export default class UkrEnergoMonth extends React.Component<IUkrEnergoMonthProps, IUkrEnergoMonthState> {

    private monthes: Monthes = new Monthes();
    private weekDays: WeekDays = new WeekDays();
    private weekCollection: IGridDayOfWeekProps[][] = [[], [], [], [], [], []];

    constructor(props: IUkrEnergoMonthProps) { super(props);

        this.state = {
            SelectedDay: new Date()
        };     
    }

    public render(): React.ReactElement<IUkrEnergoMonthProps> {
        
        this.setWeekCollections();

        let WeekComponentCollection: React.ReactElement[] = [];

        if(this.weekCollection.length > 0) {
            WeekComponentCollection.push(
                ...this.weekCollection.map( w => {
                    const weekComponent: React.ReactElement = (w.length > 6) && (
                        <GridWeekOfMonth
                            EventListId={this.props.EventListId}
                            WebContext={this.props.WebContext}
                            DayCollection={w}
                            EventCategory={this.props.EventCategory}
                        />
                    );

                    return weekComponent;
                })
            );
        }

        return (
            <div className={ styles.calendarRow }>
                <div className={ styles.monthColumn }>
                    {/* <div className={styles.monthHeaderContainer}>
                        <div className={styles.monthHeader}>{this.selectedMonth.title}&nbsp;{this.selectedYear}</div>
                    </div> */}
                    <div className={styles.weekNamesContainer}>
                        <div className={styles.weekDay00}>{this.weekDays.Sunday.short}</div>
                        <div className={styles.weekDay01}>{this.weekDays.Monday.short}</div>
                        <div className={styles.weekDay02}>{this.weekDays.Thursday.short}</div>
                        <div className={styles.weekDay03}>{this.weekDays.Wednesday.short}</div>
                        <div className={styles.weekDay04}>{this.weekDays.Thursday.short}</div>
                        <div className={styles.weekDay05}>{this.weekDays.Friday.short}</div>
                        <div className={styles.weekDay06}>{this.weekDays.Saturday.short}</div>
                    </div>
                    {...WeekComponentCollection}
                </div>
            </div>
        );
    }

    private setWeekCollections():void {

        this.weekCollection = [[], [], [], [], [], []];

        const currentDate = new Date();
        const selectedMonth = this.props.StartFromDate.getMonth();
        let startDate: Date = new Date (this.props.StartFromDate.toDateString());
        startDate.setDate(startDate.getDate() - startDate.getDay());
        let processedDay: IGridDayOfWeekProps;

        for(let index=0; index<6; index++) {
            let FullDate: Date;
            let DayOfWeek: IWeekDay;
            let DayNumber: number;
            let IsCurrentDay: boolean;
            let BelongsToSelectedMonth: boolean;
            let IsSelectedDay: boolean;

            for(let day=0; day<7; day++) {

                FullDate = new Date(startDate.toDateString());
                FullDate.setDate(startDate.getDate() + (index*7 + day));
                DayOfWeek = this.weekDays.Week[day];
                DayNumber = FullDate.getDate();
                IsCurrentDay = (
                    (FullDate.getDate() === currentDate.getDate()) &&
                    (FullDate.getMonth() === currentDate.getMonth()) &&
                    (FullDate.getFullYear() === currentDate.getFullYear())
                );
                BelongsToSelectedMonth = (FullDate.getMonth() === selectedMonth);
                IsSelectedDay = (
                    (FullDate.getDate() === this.state.SelectedDay.getDate()) &&
                    (FullDate.getMonth() === this.state.SelectedDay.getMonth()) &&
                    (FullDate.getFullYear() === this.state.SelectedDay.getFullYear())
                );

                processedDay = {
                    WebContext: this.props.WebContext,
                    EventListId: this.props.EventListId,                    
                    EventCategory: this.props.EventCategory,
                    FullDate,
                    DayOfWeek,
                    DayNumber,
                    IsCurrentDay,
                    BelongsToSelectedMonth,
                    IsSelectedDay,
                    SetSelectedDay: this.setSelectedDay.bind(this)
                };

                if((index > 3) && (day === 0) && (!processedDay.BelongsToSelectedMonth)) break;

                this.weekCollection[index].push(processedDay);
            }
        }
    }

    public setSelectedDay = (year: number, month: number, day: number): void => {

        this.setState({
            SelectedDay: new Date(
                year, month, day, 0, 0, 0
            )
        });

        this.props.PassDateToBirthdayCollection(year, month, day);
    }
}
