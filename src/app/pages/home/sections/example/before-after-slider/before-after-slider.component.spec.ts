import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforeAfterSliderComponent } from './before-after-slider.component';

describe('BeforeAfterSliderComponent', () => {
  let component: BeforeAfterSliderComponent;
  let fixture: ComponentFixture<BeforeAfterSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeforeAfterSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeforeAfterSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
