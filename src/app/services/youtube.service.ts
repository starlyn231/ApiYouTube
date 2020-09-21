import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { YoutubeResponse } from "../models/youtube.models";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class YoutubeService {
  private youTubeUrl = "https://www.googleapis.com/youtube/v3";
  private apiKey = "AIzaSyBDAOuYs0NZkY1969BBGqVAvnDG1hL2IgQ";
  private playList = "UUuaPTYj15JSkETGnEseaFFg";
  private nextPageToken = "";
  constructor(private http: HttpClient) {}

  getVideo() {
    const url = `${this.youTubeUrl}/playlistItems`;

    // HttpParams es cuando  por ejemplo la Url es muy largo y queremos pasar los datos al mismo
    const params = new HttpParams()
      .set("part", "snippet")
      .set("maxResults", "10")
      .set("playlistId", this.playList)
      .set("key", this.apiKey)
      .set("pageToken", this.nextPageToken);

    return this.http
      .get<YoutubeResponse>(url, { params })
      .pipe(
        map((resp) => {
          this.nextPageToken = resp.nextPageToken;
          return resp.items;
        }),
        map((items) => items.map((video) => video.snippet))
      );
  }
}
