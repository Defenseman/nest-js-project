export const timeToTimeStamp = (duration: string): number => {
  const timeUnits: Record<string, number> = {
    d: 864000000,   // 1 день = это 864000000 миллисекунд 
    h: 3600000,     // 1 час = 3600000 миллисекунд
    m: 60000,       // 1 минута = 60000 миллисекунд
    s: 1000,        // 1 секунда = 1000 миллисекунд
  };

  const match = duration.match(/^(\d+)([a-z])$/i);

  if (!match) {
    throw new Error(
      `Неверный формат. Используйте формат как "2d", "2h", "30m", "45s"`,
    );
  }

  const [, valueStr, unit] = match;
  const value = parseInt(valueStr, 10);
  const multiplier = timeUnits[unit.toLowerCase()];

  if (!multiplier) {
    throw new Error(`Неизвестная единица времени: ${unit}. Используйте d, h, m или s`);
  }

  return value * multiplier;
};