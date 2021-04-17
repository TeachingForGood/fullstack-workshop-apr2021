import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  /**
   * POST a new movie review to the API.
   */
  createReview(review: Review) {
    return this.http.post(`${environment.apiUrl}/api/v1/review`, review);
  }

  /**
   * GET all movie reviews from API.
   */
  getReviews() {
    return this.http.get(`${environment.apiUrl}/api/v1/review`);
  }
}
