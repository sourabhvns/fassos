import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDashboardComponent } from './food-dashboard.component';

describe('FoodDashboardComponent', () => {
  let component: FoodDashboardComponent;
  let fixture: ComponentFixture<FoodDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
