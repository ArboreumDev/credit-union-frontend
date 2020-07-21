import * as React from 'react';
import { types, Instance, onSnapshot } from 'mobx-state-tree';

enum GroupType {
    "b" = "borrower",
    "g" = "guarantor",
    "l" = "lender"
}

type INode = {
    id: string,
    group: string,
    fx?: number
    fy?: number
}
export type ILink = {
    source: string,
    target: string,
    value?: number
}

const ParseGraphText = (graphText: string) => {
    const lines = graphText.split(/\r?\n/)
    var nodes: any = []
    var links: any = []

    enum parseState {
        "nodes",
        "links"
    }

    var state = parseState.nodes

    lines.forEach(line => {
        if (state === parseState.nodes) {
            let [id, group] = line.split(" ")
            if (id !== undefined && group !== undefined) {
                if (group === "g" || group === "b" || group === "l") {
                    let node: INode = {
                        id: id,
                        group: GroupType[group],
                    }
                    if (nodes.length === 0) {
                        node['fx'] = -60
                        node['fy'] = -60
                    }
                    nodes.push(node)
                }
            } else if (line === "===Links") {
                state = parseState.links
            }
        } else if (state === parseState.links) {
            let [source, target, value] = line.split(" ")
            // console.log(source, target, value)
            if (source !== undefined && target !== undefined) {
                if (nodes.map(n => n.id).includes(source) && nodes.map(n => n.id).includes(target)) {
                    links.push({
                        source: source,
                        target: target,
                        value: parseInt(value)
                    })
                }
            }
        }
    })
    return {
        nodes: nodes,
        links: links
    }

}
const RootModel = types.model({
    graph: types.string,
    text: types.string
})
    .actions((self) => ({
        updateGraph(graphText: string) {
            self.text = graphText
            self.graph = JSON.stringify(ParseGraphText(graphText))
        }
    }))


const initText =
    `
===Nodes
a b
b g
c g
d g
e l
f l
===Links
a b 4
a c 4
c d 
b d
d e
e f
`

export const rootStore = RootModel.create({
    graph: JSON.stringify(ParseGraphText(initText)),
    text: initText
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