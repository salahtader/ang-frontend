import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionIiComponent } from './section-ii.component';

describe('SectionIiComponent', () => {
  let component: SectionIiComponent;
  let fixture: ComponentFixture<SectionIiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionIiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionIiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
