
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
        width: 1472,
        height: 828,
    }
};

export { IConfig }
export default config;
