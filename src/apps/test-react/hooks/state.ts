export interface State {
  record: number;
  current: number;
  isLogined: boolean;
  message: string;
}

const state: State = {
  record: 100,
  current: 0,
  isLogined: false,
  message: "",
};

export default state;
