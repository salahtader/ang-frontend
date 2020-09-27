import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionIComponent } from './section-i.component';

describe('SectionIComponent', () => {
  let component: SectionIComponent;
  let fixture: ComponentFixture<SectionIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
