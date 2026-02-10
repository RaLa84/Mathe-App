"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Aufgabe } from "@/lib/types/exercise";

interface InputDragDropProps {
  aufgabe: Aufgabe;
  onSubmit: (answer: string) => void;
  disabled?: boolean;
}

interface SortableItemProps {
  id: string;
  disabled?: boolean;
}

function SortableItem({ id, disabled }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "px-4 py-3 rounded-lg text-xl font-semibold select-none",
        "border-2 border-input bg-background",
        "min-h-[48px] min-w-[48px]",
        "flex items-center justify-center",
        "touch-manipulation",
        isDragging
          ? "opacity-50 border-primary shadow-lg scale-105 z-10"
          : "hover:border-primary hover:bg-secondary transition-colors cursor-grab active:cursor-grabbing"
      )}
      aria-label={`${id} - Ziehe um zu sortieren`}
    >
      {id}
    </div>
  );
}

export function InputDragDrop({
  aufgabe,
  onSubmit,
  disabled = false,
}: InputDragDropProps) {
  const items = aufgabe.dragItems ?? [];
  const [orderedItems, setOrderedItems] = useState<string[]>(items);

  useEffect(() => {
    setOrderedItems(aufgabe.dragItems ?? []);
  }, [aufgabe.id, aufgabe.dragItems]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setOrderedItems((prev) => {
        const oldIndex = prev.indexOf(active.id as string);
        const newIndex = prev.indexOf(over.id as string);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }

  function handleSubmit() {
    if (disabled || orderedItems.length === 0) return;
    onSubmit(orderedItems.join(","));
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      <p className="text-sm text-muted-foreground text-center">
        Ziehe die Elemente in die richtige Reihenfolge
      </p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={orderedItems}
          strategy={horizontalListSortingStrategy}
          disabled={disabled}
        >
          <div
            className="w-full min-h-[80px] border-2 border-dashed border-input rounded-lg p-3 flex flex-wrap gap-2 items-center justify-center"
            aria-label="Sortierbare Elemente"
          >
            {orderedItems.map((item) => (
              <SortableItem key={item} id={item} disabled={disabled} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Button
        size="lg"
        onClick={handleSubmit}
        disabled={disabled || orderedItems.length === 0}
        className="text-lg px-8 py-5 h-auto min-h-[48px]"
      >
        Antwort abschicken
      </Button>
    </div>
  );
}
