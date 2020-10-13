import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiscComponent } from './add-disc.component';

describe('AddDiscComponent', () => {
  let component: AddDiscComponent;
  let fixture: ComponentFixture<AddDiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
