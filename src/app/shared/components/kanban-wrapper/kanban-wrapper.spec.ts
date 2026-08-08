import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanWrapper } from './kanban-wrapper';

describe('KanbanWrapper', () => {
  let component: KanbanWrapper;
  let fixture: ComponentFixture<KanbanWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanWrapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
