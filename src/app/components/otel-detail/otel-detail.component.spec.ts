import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtelDetailComponent } from './otel-detail.component';

describe('OtelDetailComponent', () => {
  let component: OtelDetailComponent;
  let fixture: ComponentFixture<OtelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtelDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
