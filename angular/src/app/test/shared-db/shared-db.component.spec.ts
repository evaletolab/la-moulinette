import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDbComponent } from './shared-db.component';

describe('SharedDbComponent', () => {
  let component: SharedDbComponent;
  let fixture: ComponentFixture<SharedDbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedDbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
