import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSittersComponent } from './filter-sitters.component';

describe('FilterSittersComponent', () => {
  let component: FilterSittersComponent;
  let fixture: ComponentFixture<FilterSittersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSittersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSittersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
