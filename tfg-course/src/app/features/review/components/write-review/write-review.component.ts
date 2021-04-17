import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Review } from 'src/app/shared/models/review.model';
import { ReviewService } from 'src/app/shared/services/review.service';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.scss']
})
export class WriteReviewComponent implements OnInit {
  pageTitle = 'Write a Review';
  reviewForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Initialize form group.
   */
  initForm() {
    this.reviewForm = this.fb.group({
      title: ['', Validators.required],
      rating: [null, [Validators.required]],
      comments: ['', Validators.required]
    });
  }

  /**
   * Handle updates to the rating from child component.
   * @param newRating - numerical rating coming as OutPut
   */
  handleRatingChange(newRating: number) {
    this.reviewForm.controls.rating.setValue(newRating);
  }

  /**
   * Submit the form and save the review to the database.
   */
  createReview() {
    if (this.reviewForm.valid) {
      // 1: how to get form value?
      // could listen for valueChanges event
      // we don't need realtime updates in this case, bc button
      const formVals = this.reviewForm.value;
      const review: Review = {
        title: formVals.title,
        comments: formVals.comments,
        rating: formVals.rating
      };
      // using object destructuring
      // const review: Review = { ...this.reviewForm.value };
      // 2: should we always hit the API? what if invalid form?
      // validate the form / handle errors before hitting API, but also pls validate on API as well

      // 3: what should happen after the call has succeeded?
      // some success alert or failure alert
      // confirmation page or successfully posted preview

      this.reviewService.createReview(review).subscribe(
        (res) => {
          // redirect the user back to the home page after a successful save
          this.router.navigate(['/']);
        },
        (err) => {
          console.error(err);
        }
      )
    } else {
      this.reviewForm.markAllAsTouched();
    }
  }

}
