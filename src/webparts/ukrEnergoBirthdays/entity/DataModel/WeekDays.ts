import * as dictionary from 'UkrEnergoBirthdaysDictionary';

export interface IWeekDay {
    key: number;
    title: string;
    short: string;
}

export class WeekDays {
    public Sunday: IWeekDay = { key: 1, 
        title: dictionary.WeekDays.Sunday.title, 
        short: dictionary.WeekDays.Sunday.short 
    };
    public Monday: IWeekDay = { key: 2, 
        title: dictionary.WeekDays.Monday.title,
        short: dictionary.WeekDays.Monday.short 
    };
    public Tuesday: IWeekDay = { key: 3, 
        title: dictionary.WeekDays.Tuesday.title, 
        short: dictionary.WeekDays.Tuesday.short 
    };
    public Wednesday: IWeekDay = { key: 4, 
        title: dictionary.WeekDays.Wednesday.title, 
        short: dictionary.WeekDays.Wednesday.short 
    };
    public Thursday: IWeekDay = { key: 5, 
        title: dictionary.WeekDays.Thursday.title, 
        short: dictionary.WeekDays.Thursday.short 
    };
    public Friday: IWeekDay = { key: 6, 
        title: dictionary.WeekDays.Friday.title, 
        short: dictionary.WeekDays.Friday.short 
    };
    public Saturday: IWeekDay = { key: 7, 
        title: dictionary.WeekDays.Saturday.title, 
        short: dictionary.WeekDays.Saturday.short 
    };

    public Week: IWeekDay[] = [
        this.Sunday, this.Monday, this.Tuesday,
        this.Wednesday, this.Thursday, this.Friday,
        this.Saturday
    ];
}