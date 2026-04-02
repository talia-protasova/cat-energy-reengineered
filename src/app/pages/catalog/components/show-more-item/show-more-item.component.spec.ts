import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoreItemComponent } from './show-more-item.component';

describe('AddMoreItemComponent', () => {
  let component: AddMoreItemComponent;
  let fixture: ComponentFixture<AddMoreItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMoreItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddMoreItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
