import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanTable } from './kanban-table';

describe('KanbanTable', () => {
  let component: KanbanTable;
  let fixture: ComponentFixture<KanbanTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
