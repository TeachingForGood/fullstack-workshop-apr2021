import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiGetReviewsResponse, Review } from '../models/review.model';

import { ReviewService } from './review.service';

fdescribe('ReviewService', () => {
  let service: ReviewService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(ReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get reviews', () => {
    // setup mock data
    const mockApiData: ApiGetReviewsResponse = {
      reviews: [
        {
          id: 'abcd',
          RVW_TTL: 'Space Jam',
          RVW_RTNG: 5,
          RVW_CMNTS: 'Michael Jordan is the GOAT.'
        }
      ]
    };
    const mockUiData = mockApiData.reviews.map(r => new Review(r));
    httpClientSpy.get.and.returnValue(of(mockApiData));
    // run code
    service.getReviews().subscribe((res) => {
      // assert some things
      expect(res).toEqual(mockUiData);
    });
  });
});
