import { IBirthdayDate } from './IBirthdayDate';

export interface IBirthdayPeople {
        Id: number;
        DisplayName: string;
        ShortName: string;
        PersonalUrl: string;
        PictureUrl: string;
        Title: string;
        Birthday: IBirthdayDate;
}