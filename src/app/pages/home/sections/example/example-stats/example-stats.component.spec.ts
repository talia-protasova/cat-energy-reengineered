import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleStatsComponent } from './example-stats.component';

describe('ExampleStatsComponent', () => {
  let component: ExampleStatsComponent;
  let fixture: ComponentFixture<ExampleStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
