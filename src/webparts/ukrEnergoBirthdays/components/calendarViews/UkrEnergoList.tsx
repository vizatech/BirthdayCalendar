import * as React from 'react';
import {
    Stack,
    Text,
    IPersonaSharedProps,
    Persona,
    PersonaSize,
    PersonaPresence
} from 'office-ui-fabric-react';

import styles from '../../scss/UkrEnergoBirthdaysStyles.module.scss';

import { EventHandler } from '../../businessLogic/EventHandler';
import { IUkrEnergoListProps } from '../interfaces/IUkrEnergoListProps';
import { IUkrEnergoListState } from '../interfaces/IUkrEnergoListState';

export default class UkrEnergoList extends React.Component<IUkrEnergoListProps, IUkrEnergoListState> {

    private eventHandler: EventHandler; 

    constructor(props: IUkrEnergoListProps) { super(props);
        
        this.eventHandler = new EventHandler(props.WebContext);
        props.SetBirthdayCollectionFunction(this.getBirthdayCollection.bind(this));
        this.state = {
            BirthdayPeoples: []
        };
    }

    public render(): React.ReactElement<IUkrEnergoListProps> {

        const BirthdayCollection: React.ReactElement[] = [];

        if(this.state && this.state.BirthdayPeoples && this.state.BirthdayPeoples.length > 0) {
            BirthdayCollection.push( 
                ...this.state.BirthdayPeoples.map( b => {

                    const personaProperties: IPersonaSharedProps = {
                        imageUrl: b.PictureUrl,
                        imageInitials: b.ShortName,
                        text: b.DisplayName,
                        secondaryText: b.Birthday.BirthdayString,
                        tertiaryText: b.Title,
                        imageAlt: `${b.DisplayName} on ${b.Birthday.BirthdayString}`
                    };
                    const birthpayPeopleComponent: React.ReactElement = (
                        <div>
                            <Persona
                                {...personaProperties}
                                size={PersonaSize.size40}
                                presence={PersonaPresence.online}
                                hidePersonaDetails={false}
                            />
                            <hr />
                        </div>
                    );

                    return birthpayPeopleComponent;
                })
            );
        }

        return (
            <div className={ styles.listContainer }>
                <div className={ styles.listRow }>
                    <Stack tokens={{ childrenGap: 10 }}>
                        <Text variant={'xLarge'} nowrap block>
                            Birthday dates
                        </Text>
                        <br />
                        {...BirthdayCollection}
                    </Stack>
                </div>
            </div>
        );
    }

    public getBirthdayCollection(year: number, month: number, day: number): void {

        this.eventHandler
            .getBirthdayCollection(this.props.BirthdayListId, year, month, day)
            .then( birthdayPeoples => {

                this.setState({
                    BirthdayPeoples: birthdayPeoples
                });

                return Promise.resolve(true);
        });
    }
}