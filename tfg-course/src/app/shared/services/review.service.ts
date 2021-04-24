import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiCreateReviewResponse, ApiGetReviewsResponse, Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  /**
   * POST a new movie review to the API.
   */
  createReview(review: Review): Observable<ApiCreateReviewResponse> {
    return this.http.post<ApiCreateReviewResponse>(`${environment.apiUrl}/v1/review`, review);
  }

  /**
   * GET all movie reviews from API.
   */
  getReviews(): Observable<Review[]> {
    return this.http.get<ApiGetReviewsResponse>(`${environment.apiUrl}/v1/review`)
    .pipe(
      map(
        (res: ApiGetReviewsResponse) => res.reviews.map(r => new Review(r))
      )
    );
  }
}
