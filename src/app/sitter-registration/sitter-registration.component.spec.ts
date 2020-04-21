import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SitterRegistrationComponent} from './sitter-registration.component';

describe('SitterRegistrationComponent', () => {
  let component: SitterRegistrationComponent;
  let fixture: ComponentFixture<SitterRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SitterRegistrationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitterRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
