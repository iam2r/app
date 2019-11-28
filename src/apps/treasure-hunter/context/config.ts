
interface IConfig {
    size?: ISize;
    [key: string]: any;
}

interface ISize {
    width: number;
    height: number;
}

const config: IConfig = {
    size: {
        width: 920,
        height: 512,
    }
};

export { IConfig }
export default config;
