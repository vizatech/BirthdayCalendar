import { sp } from '@pnp/sp';

import { WebPartContext } from '@microsoft/sp-webpart-base';

export class Repository {
    public constructor(webpartContext: WebPartContext) {
        sp.setup({
            spfxContext: webpartContext
        });
    }

    public async getListItemsByFilter(
        listId: string,
        filter: string,
        fieldsToSelect: string[],
        fieldsToExpand: string[],
        fieldOrderBy:string): Promise<any> {

        return await sp.web.lists.getById(listId).items
            .filter(filter)
            .select(...fieldsToSelect)
            .expand(...fieldsToExpand)
            .orderBy(fieldOrderBy, true)
            .get().then( items => (items.length > 0)? items: null);
    }

    public async getEventListItems(
        listId: string, 
        keyFieldNameFrom:string, keyFieldNameTo:string,
        itemKeyFrom: string, itemKeyTo: string,
        keyFieldNameCategory: string, keyFieldCategories: string[],
        fieldsToSelect: string[], fieldsToExpand: string[],
        fieldOrderBy:string): Promise<any> {

        let _categoryFilter: string = '';
            keyFieldCategories.forEach( category => {
                _categoryFilter += `${keyFieldNameCategory} eq '${category}' or `;
            });
        if (_categoryFilter) _categoryFilter = _categoryFilter.slice(0, -4);
        const _dateFilter: string =
            `(${keyFieldNameFrom} ge datetime'${itemKeyFrom}') and (${keyFieldNameFrom} le datetime'${itemKeyTo}')`;

        let _filter: string = _dateFilter;
        if (_categoryFilter) _filter = _dateFilter + " and (" + _categoryFilter + ")";

        return await sp.web.lists.getById(listId).items
            .filter(_filter)
            .select(...fieldsToSelect)
            .expand(...fieldsToExpand)
            .orderBy(fieldOrderBy, true)
            .get().then( items => (items.length > 0)? items: null );
    }

    public async resolveUserPropertiesById(
        item: any, userId: number):Promise<any> {

        const user = (userId)? await sp.web.getUserById(userId).get(): null;
        const profile = (user)? await sp.profiles.getPropertiesFor(user.LoginName): null;

        return Promise.resolve({item, profile});
    }

    public async getFieldProperties(listId: string, fieldName: string): Promise<any> {
        return await sp.web.lists.getById(listId).fields.getByTitle(fieldName).get();
    }
}