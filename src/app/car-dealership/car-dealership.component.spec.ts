import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDealershipComponent } from './car-dealership.component';

describe('CarDealershipComponent', () => {
  let component: CarDealershipComponent;
  let fixture: ComponentFixture<CarDealershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDealershipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDealershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
