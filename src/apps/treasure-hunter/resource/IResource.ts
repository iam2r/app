export interface IResource {
    [key: string]: string | string[] | object;
}

export interface IResourceSound extends IResource {
    button?: any;
}

export interface IResourceMap {
    html?: IResource;
    base?: IResource;
    font?: IResource;
    sound?: IResourceSound;
    [key: string]: any;
}