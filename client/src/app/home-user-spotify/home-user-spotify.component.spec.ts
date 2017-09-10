import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUserSpotifyComponent } from './home-user-spotify.component';

describe('HomeUserSpotifyComponent', () => {
  let component: HomeUserSpotifyComponent;
  let fixture: ComponentFixture<HomeUserSpotifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeUserSpotifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeUserSpotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
