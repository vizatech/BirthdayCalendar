import * as React from 'react';
import {
    Text,
    Link,
    Stack
} from 'office-ui-fabric-react';

import styles from '../../scss/UkrEnergoBirthdaysStyles.module.scss';
import { IGridDayOfWeekProps } from '../interfaces/IGridDayOfWeekProps';

export default class GridDayOfWeek extends React.Component<IGridDayOfWeekProps, {}> {

    public render(): React.ReactElement<IGridDayOfWeekProps> {

        const FirstStack: React.ReactElement[] = [];

        return (
            <div
                onClick={this.SetSelectedDay}
                className={styles.dayOfWeekContainer}>
                <Stack className={styles.dayHeader}>
                    <Text variant={'small'} nowrap block></Text>
                </Stack>
                <Stack className={styles.events}>
                    <Text variant={'large'} nowrap block>{this.props.DayNumber.toString()}</Text>
                </Stack>
                <Stack className={styles.dayFooter}>
                    <Text variant={'small'} nowrap block></Text>
                </Stack>
            </div>
        );
    }

    private SetSelectedDay = (event: React.MouseEvent<HTMLAnchorElement | HTMLElement | HTMLButtonElement>) => {
        const year: number = this.props.FullDate.getFullYear();
        const month: number = this.props.FullDate.getMonth();
        const day: number = this.props.DayNumber;

        this.props.SetSelectedDay(year, month, day);
    }
}