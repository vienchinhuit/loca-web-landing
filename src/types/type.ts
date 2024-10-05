export interface TBanner<Data> {
  key: string;
  content: Data;
  status: string;
  updated_at: Date;
}
export interface DataContent {
  google_map_branch?: string;
  google_map_footer?: string;
  google_map_contact?: string;
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
  footerMenu?: Data;
  statusCode: number;
  message: string;
  data: Data;
  pagination?: {
    page: number;
    limit: number;
    totalPage: number;
  };
}
