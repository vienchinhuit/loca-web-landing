export interface TBanner<Data> {
  key: string;
  content: Data;
  status: string;
  updated_at: Date;
}
export interface DataContent {
  name: string;
  title?: string;
  description?: string;
  copyright?: string;
  des: string;
  image: string;
  link: string;
  thumb: string;
}
export interface TMainMenu {
  id: number;
  name: string;
  link: string;
  publish: number;
}
export interface SuccessResponse<Data> {
  mainMenu?: TMainMenu[];
  statusCode: number;
  message: string;
  data: Data;
  pagination?: {
    page: number;
    limit: number;
    totalPage: number;
  };
}
