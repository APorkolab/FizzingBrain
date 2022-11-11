import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { FizzingbrainComponent } from './fizzingbrain.component';

describe('FizzingbrainComponent', () => {
  let component: FizzingbrainComponent;
  let fixture: ComponentFixture<FizzingbrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormsModule, FizzingbrainComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FizzingbrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
