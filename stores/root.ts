import * as React from 'react';
import { types, Instance, onSnapshot } from 'mobx-state-tree';

const RootModel = types.model({
    email: types.string,
    name: types.string
})
    .actions((self) => ({
       setUser(user, email){
           self.email = email
           self.name = user
       }
    }))


export const rootStore = RootModel.create({
    name: "gptest",
    email: ""
});

onSnapshot(rootStore, () => null);

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = React.createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;

export function useStore() {
    const store = React.useContext(RootStoreContext);

    if (store === null) {
        throw new Error('Store cannot be null, please add a context provider');
    }

    return store;
}