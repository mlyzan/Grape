import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSittersComponent } from './all-sitters.component';

describe('AllSittersComponent', () => {
  let component: AllSittersComponent;
  let fixture: ComponentFixture<AllSittersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSittersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSittersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
