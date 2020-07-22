import * as React from 'react';
import { types, Instance, onSnapshot } from 'mobx-state-tree';


interface Session {
    user: {
        name: string;
        email: string;
        image: string;
    };
    accessToken: string;
    expires: string;
}

const UserModel = types.model({
    name: types.string,
    email: types.string,
    image: types.string
})

const SessionModel = types.model({
    user: UserModel,
    accessToken: types.string,
    expires: types.string
})

const BorrowerModel = types.model({
    name: types.string,
    email: types.string,
    amount: types.number
})

const FinancialParameters = types.model({
    max_exposure: types.number,
    min_interest_rate: types.number,
    borrowers: types.array(BorrowerModel)
})

const RootModel = types.model({
    session: types.maybeNull(SessionModel),
    fin_params: types.maybeNull(FinancialParameters),
    loading: types.boolean
}).actions((self) => ({
    setSession(session: Session) {
        self.session = session
    }
}))


export const rootStore = RootModel.create({
    loading: false,
    fin_params: {
        max_exposure: 100,
        min_interest_rate: 10,
        borrowers: [
            {name:"Gaurav", email:"gparuthi@gmail.com", amount: 200},
            { name: "atest", email: "atest@gmail.com", amount: 100}
        ]
    }
});

onSnapshot(rootStore, () => null);

export type BorrowerInstance = Instance<typeof BorrowerModel>;
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