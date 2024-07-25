export type Channels = {
    ids: string[],
    entities: {
        [key: string]: Channel
    },
    currentChannelId: string,
}

export type Channel = {
    id: string,
    name: string,
    removable: boolean,
}

export type Messages = {
    ids: string[],
    entities: {
        [key: string]: Message
    },
}

export type Message = {
    id: string,
    channelId: string,
    name: string,
    text: string,
}