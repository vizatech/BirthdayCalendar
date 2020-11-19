declare interface IUkrEnergoBirthdaysDictionary {
  WebPartName: string;
  WebPartDescription: string;
  BirthdayListSelectionGroup: {
    GroupName: string;
    DropdownControlLabel: string;
  };
  EventListSelectionGroup: {
    GroupName: string;
    DropdownControlLabel: string;
  };
  EventColorSettingsGroup: {
    GroupName: string;
    PanelOfColorsLabel: string;
  };
  Monthes: {
    January: { title: string; short: string; };
    Fabruary: { title: string; short: string; };
    March: { title: string; short: string; };
    April: { title: string; short: string; };
    May: { title: string; short: string; };
    June: { title: string; short: string; };
    July: { title: string; short: string; };
    Augest: { title: string; short: string; };
    September: { title: string; short: string; };
    October: { title: string; short: string; };
    November: { title: string; short: string; };
    December: { title: string; short: string; };
  };
  WeekDays: {
    Sunday: { title: string; short: string; };
    Monday: { title: string; short: string; };
    Tuesday: { title: string; short: string; };
    Wednesday: { title: string; short: string; };
    Thursday: { title: string; short: string; };
    Friday: { title: string; short: string; };
    Saturday: { title: string; short: string; };
  };
}

declare module 'UkrEnergoBirthdaysDictionary' {
  const dictionary: IUkrEnergoBirthdaysDictionary;
  export = dictionary;
}
