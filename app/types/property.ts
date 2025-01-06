export interface Property {
    id: string;
    title: string;
    location: string;
    price: string;
    image: any;
    rating?: number;
}

export interface AppWriteProperty {
    $collectionId: string;
    $createdAt:    Date;
    $databaseId:   string;
    $id:           string;
    $permissions:  Permission[];
    $updatedAt:    Date;
    address:       string;
    agent:         Agent;
    area:          number;
    bathrooms:     number;
    bedrooms:      number;
    description:   string;
    facilities:    string[];
    gallery:       any[];
    geolocation:   string;
    image:         string;
    name:          string;
    price:         number;
    rating:        number;
    reviews:       Array<string[]>;
    type:          string;
}

export enum Permission {
    DeleteUser677Ad99Df215F380Af5D = "delete(\"user:677ad99df215f380af5d\")",
    ReadUser677Ad99Df215F380Af5D = "read(\"user:677ad99df215f380af5d\")",
    UpdateUser677Ad99Df215F380Af5D = "update(\"user:677ad99df215f380af5d\")",
}

export interface Agent {
    $collectionId: string;
    $createdAt:    Date;
    $databaseId:   string;
    $id:           string;
    $permissions:  string[];
    $updatedAt:    Date;
    avatar:        string;
    email:         string;
    name:          string;
}
