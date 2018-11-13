import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloricneedsComponent } from './caloricneeds.component';

describe('CaloricneedsComponent', () => {
  let component: CaloricneedsComponent;
  let fixture: ComponentFixture<CaloricneedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaloricneedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaloricneedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
