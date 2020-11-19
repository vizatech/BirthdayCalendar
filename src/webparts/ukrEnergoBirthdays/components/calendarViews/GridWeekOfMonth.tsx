import * as React from 'react';

import GridDayOfWeek from './GridDayOfWeek';

import styles from '../../scss/UkrEnergoBirthdaysStyles.module.scss';
import { IGridWeekOfMonthProps } from '../interfaces/IGridWeekOfMonthProps';

export default class GridWeekOfMonth extends React.Component<IGridWeekOfMonthProps, {}> {

    public render(): React.ReactElement<IGridWeekOfMonthProps> {

        let DayComponentCollection: React.ReactElement[] = [];

        if(this.props.DayCollection.length > 0) {
            DayComponentCollection.push(
                ...this.props.DayCollection.map( d => {
                    const styleName: string = 'day' + d.DayOfWeek.title;
                    const weekComponent: React.ReactElement = (
                        <div className={styles[styleName]}>
                            <div className={
                                (d.IsSelectedDay)? styles.selectedDay:
                                    (d.IsCurrentDay)? styles.currentDay:
                                        (d.BelongsToSelectedMonth)? styles.dayOfMonth:
                                            styles.notDayOfMonth
                            }>
                                <GridDayOfWeek
                                    WebContext={this.props.WebContext}
                                    EventListId={this.props.EventListId}
                                    EventCategory={this.props.EventCategory}
                                    FullDate={d.FullDate}
                                    DayOfWeek={d.DayOfWeek}
                                    DayNumber={d.DayNumber}
                                    IsCurrentDay={d.IsCurrentDay}
                                    BelongsToSelectedMonth={d.BelongsToSelectedMonth}
                                    IsSelectedDay={d.IsSelectedDay}
                                    SetSelectedDay={d.SetSelectedDay}
                                />
                            </div>
                        </div>
                    );

                    return weekComponent;
                })
            );
        }

        return (<div className={styles.weekContainer}>
            {...DayComponentCollection}
        </div>);
    }
}