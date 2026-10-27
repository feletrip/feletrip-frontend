export interface ICreateVideoPayload {
  title: string;
  url: string;
  isActive: boolean;
}

export type IUpdateVideoPayload = Partial<ICreateVideoPayload>;

export interface IVideoItem {
  id: string;
  title: string;
  url: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IGetVideosQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  isActive?: boolean;
}

export interface IVideoMeta {
  page: number;
  limit: number;
  total: number;
}

// Data shape for paginated videos list
export interface IVideoPaginatedData {
  data: IVideoItem[];
  meta: IVideoMeta;
}

// Single item endpoint response wrapper
export interface IVideoItemResponse {
  statusCode: number;
  message: string;
  data: IVideoItem;
}
