import * as dictionary from 'UkrEnergoBirthdaysDictionary';

export interface IMonth {
    key: number;
    title: string;
    short: string;
    quarter: number;
}

export class Monthes {
    public January: IMonth = { key: 1, 
        title: dictionary.Monthes.January.title, 
        short: dictionary.Monthes.January.short, 
        quarter: 1 };
    public Fabruary: IMonth = { key: 2, 
        title: dictionary.Monthes.Fabruary.title, 
        short: dictionary.Monthes.Fabruary.short,  
        quarter: 1 };
    public March: IMonth = { key: 3, 
        title: dictionary.Monthes.March.title,
        short: dictionary.Monthes.March.short, 
        quarter: 1 };
    public April: IMonth = { key: 4, 
        title: dictionary.Monthes.April.title, 
        short: dictionary.Monthes.April.short, 
        quarter: 2 };
    public May: IMonth = { key: 5, 
        title: dictionary.Monthes.May.title, 
        short: dictionary.Monthes.May.short, 
        quarter: 2 };
    public June: IMonth = { key: 6, 
        title: dictionary.Monthes.June.title, 
        short: dictionary.Monthes.June.short,
        quarter: 2 };
    public July: IMonth = { key: 7, 
        title: dictionary.Monthes.July.title, 
        short: dictionary.Monthes.July.short, 
        quarter: 3 };
    public Augest: IMonth = { key: 8, 
        title: dictionary.Monthes.Augest.title, 
        short: dictionary.Monthes.Augest.short, 
        quarter: 3 };
    public September: IMonth = { key: 9, 
        title: dictionary.Monthes.September.title, 
        short: dictionary.Monthes.September.short, 
        quarter: 3 };
    public October: IMonth = { key: 10, 
        title: dictionary.Monthes.October.title, 
        short: dictionary.Monthes.October.short, 
        quarter: 4 };
    public November: IMonth = { key: 11, 
        title: dictionary.Monthes.November.title,  
        short: dictionary.Monthes.November.short,  
        quarter: 4 };
    public December: IMonth = { key: 12, 
        title: dictionary.Monthes.December.title,  
        short: dictionary.Monthes.December.short,  
        quarter: 4 };

    public Year: IMonth[] = [
        this.January, this.Fabruary, this.March,
        this.April, this.May, this.June,
        this.July, this.Augest, this.September,
        this.October, this.November, this.December
    ];
}