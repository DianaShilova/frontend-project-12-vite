import React from 'react';
import { useSpring, animated } from 'react-spring';
import { TEmoji } from '../../../types/store';

const colors = ['#ff0000', '#ff69b4', '#ff1493', '#ff6347', '#ff4500'];
const sizes = ['0.5rem', '1rem', '1.5rem', '2rem', '2.5rem'];

const animation: Record<TEmoji, string> = {
  '/love': '❤️',
  '/fire': '🔥',
  '/firework': '🎆',
  '/laugh': '😂',
  '/snow': '❄️',
  '/confetti': '🎉',
};

const Emoji: React.FC<{
  style: any;
  emoji: TEmoji;
}> = ({ style, emoji }) => (
  <animated.div style={style}>{animation[emoji]}</animated.div>
);

const EmojiAnimation = (props: { command: TEmoji }) => {
  const { command } = props;
  const emojies = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: sizes[Math.floor(Math.random() * sizes.length)],
    x: Math.random() * 100,
    y: -(Math.random() * 900 + 100),
    rotation: Math.random() * 720 - 360,
  }));

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {emojies.map((emoji) => {
        const props = useSpring({
          from: {
            opacity: 1,
            transform: `translate(${emoji.x}%, 0px) rotate(0deg)`,
          },
          to: {
            opacity: 0,
            transform: `translate(${emoji.x}%, ${emoji.y}px) rotate(${emoji.rotation}deg)`,
          },
          config: { tension: 100, friction: 30 },
          delay: Math.random() * 1000,
          duration: 10000,
        });

        return (
          <Emoji
            key={emoji.id}
            style={{
              ...props,
              position: 'absolute',
              left: `${emoji.x}%`,
              bottom: '0%',
              color: emoji.color,
              fontSize: emoji.size,
            }}
            emoji={command}
          />
        );
      })}
    </div>
  );
};

export default EmojiAnimation;
