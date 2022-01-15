import React, { FC } from 'react';
import { getBezierPath, StraightEdge, ConnectionLineComponentProps, Node, getSmoothStepPath } from 'react-flow-renderer';

import { getEdgeParams } from './utils';

const FloatingConnectionLine = ({
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  sourceNode,
}) => {
  if (!sourceNode) {
    return null;
  }

  const targetNode = {
    id: 'connection-target',
    __rf: { width: 1, height: 1, position: { x: targetX, y: targetY } },
  };

  const { sx, sy } = getEdgeParams(sourceNode, targetNode);
  const d = `M ${sx} ${sy} ${targetX} ${targetY}`;

  return (
    <g>
      <path fill="none" stroke="#222" strokeWidth={2} className="animated" d={d} />
      <circle cx={targetX} cy={targetY} fill="#fff" r={3} stroke="#222" strokeWidth={1.5} />
    </g>
  );
};

export default FloatingConnectionLine;