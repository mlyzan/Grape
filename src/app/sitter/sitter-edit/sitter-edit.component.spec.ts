import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SitterEditComponent} from './sitter-edit.component';

describe('SitterEditComponent', () => {
  let component: SitterEditComponent;
  let fixture: ComponentFixture<SitterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SitterEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
