import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSitterComponent } from './book-sitter.component';

describe('BookSitterComponent', () => {
  let component: BookSitterComponent;
  let fixture: ComponentFixture<BookSitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookSitterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
