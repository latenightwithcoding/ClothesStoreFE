import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemAccordionComponent } from './menu-item-accordion.component';

describe('MenuItemAccordion', () => {
  let component: MenuItemAccordionComponent;
  let fixture: ComponentFixture<MenuItemAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuItemAccordionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MenuItemAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
