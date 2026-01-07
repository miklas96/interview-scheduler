import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanItemDetails } from './kanban-item-details';

describe('KanbanItemDetails', () => {
  let component: KanbanItemDetails;
  let fixture: ComponentFixture<KanbanItemDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanItemDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanItemDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
