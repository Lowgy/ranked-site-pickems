/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export function PlayerDraggable(props: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.children,
    data: props.children,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform) }}
      {...listeners}
      {...attributes}
      className="flex flex-col items-center text-center z-50"
    >
      <img
        src={`https://crafatar.com/avatars/${props.children.uuid}?overlay`}
        alt={props.children.uuid}
        height={32}
        width={32}
        className="mr-2 h-10 w-10"
      />
      <h1>{props.children.nickname}</h1>
    </div>
  );
}
