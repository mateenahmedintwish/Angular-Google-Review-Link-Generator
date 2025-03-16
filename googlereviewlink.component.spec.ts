import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GooglereviewlinkComponent } from './googlereviewlink.component';

describe('GooglereviewlinkComponent', () => {
  let component: GooglereviewlinkComponent;
  let fixture: ComponentFixture<GooglereviewlinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GooglereviewlinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GooglereviewlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
