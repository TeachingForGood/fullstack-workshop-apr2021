import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.scss']
})
export class WriteReviewComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Write a Review';
  reviewForm!: FormGroup;
  subcription$: Subscription = new Subscription();
  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  buildForm(): void {
    this.reviewForm = this.fb.group({
      title: ['', Validators.required],
      rating: ['', Validators.required],
      comments: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.subscribeToReviewFormChanges();
  }

  ngOnDestroy(): void {
    this.subcription$.unsubscribe();
  }

  /**
   * Handle logging button click.
   */
  onLogButtonClick(): void {
    console.log(this.reviewForm.value);
  }

  /**
   * Subscribe to valueChanges on the reviewForm.
   */
  subscribeToReviewFormChanges(): void {
    this.subcription$.add(this.reviewForm.valueChanges.subscribe(
      (formValues) => {
        console.log(formValues);
      }
    ));
  }

}
