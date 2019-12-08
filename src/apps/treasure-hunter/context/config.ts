
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
        width: 800,
        height: 600,
    }
};

export { IConfig }
export default config;
