import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanItem } from './kanban-item';

describe('KanbanItem', () => {
  let component: KanbanItem;
  let fixture: ComponentFixture<KanbanItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
