import { ApiResponse } from "@/types/api.types";
import {
  ChechIsBookmarkedProps,
  DeleteBookmarkProps,
  IBookmark,
  ToggleBookmarkProps,
} from "@/types/bookmark";
import api from "@/lib/axios";

class BookmarkService {
  async checkIsBookmarked(
    props: ChechIsBookmarkedProps,
  ): Promise<ApiResponse<null | IBookmark>> {
    const res = await api.get(`/bookmarks/${props.mangaId}/check`);
    return res.data;
  }

  async toggleBookmark(
    props: ToggleBookmarkProps,
  ): Promise<ApiResponse<IBookmark>> {
    const res = await api.post(`/bookmarks/${props.mangaId}/toggle`, {
      status: props.status,
    });
    return res.data;
  }

  async deleteBookmark(
    props: DeleteBookmarkProps,
  ): Promise<ApiResponse<IBookmark>> {
    const res = await api.delete(`/bookmarks/${props.mangaId}`);
    return res.data;
  }
}

export default new BookmarkService();
