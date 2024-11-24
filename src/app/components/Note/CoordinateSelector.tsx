// components/CoordinateSelector.tsx
import { useState } from 'react';

interface CoordinateSelectorProps {
  onChange: (x: number, y: number) => void;
  initialX: number;
  initialY: number;
}

const CoordinateSelector: React.FC<CoordinateSelectorProps> = ({ onChange, initialX, initialY }) => {
  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    const rect = event.currentTarget.getBoundingClientRect();
    const newX = (event.clientX - rect.left) / rect.width * 10 - 5; // -5 to 5 range
    const newY = (event.clientY - rect.top) / rect.height * 10 - 5; // -5 to 5 range
    setX(newX);
    setY(newY);
    onChange(newX, newY);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDragging) {
      const rect = event.currentTarget.getBoundingClientRect();
      const newX = (event.clientX - rect.left) / rect.width * 10 - 5;
      const newY = (event.clientY - rect.top) / rect.height * 10 - 5;
      setX(newX);
      setY(newY);
      onChange(newX, newY);
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="relative w-full h-64 border border-gray-400 bg-gray-100">
      {/* 軸の描画 */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 px-2 text-gray-600">
        酸味
      </div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 px-2 text-gray-600">
        苦味
      </div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 px-2 text-gray-600">
        濃度（高）
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 px-2 text-gray-600">
        濃度（低）
      </div>

      {/* 座標点 */}
      <div
        className="absolute bg-gray-800 rounded-full"
        style={{
          left: `${(x + 5) * 10}%`,  // Convert to percentage
          top: `${(y + 5) * 10}%`,    // Convert to percentage
          width: '20px',
          height: '20px',
        }}
      />

      {/* 座標の表示 */}
      <div
        className="absolute text-xs text-gray-700 font-bold"
        style={{
          left: `${(x + 5) * 10}%`,  // Convert to percentage
          top: `${(y + 5) * 10}%`,    // Convert to percentage
          transform: 'translate(-50%, -100%)',
        }}
      >
        {x.toFixed(1)}, {y.toFixed(1)}
      </div>

      {/* ドラッグ可能領域 */}
      <div
        className="absolute inset-0"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default CoordinateSelector;
