export function interpolate(
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
): number {
  if (inputMin > inputMax) {
    [inputMin, inputMax] = [inputMax, inputMin];
  }

  const inputValue = Math.min(Math.max(value, inputMin), inputMax);
  const inputRangeSpan = inputMax - inputMin;
  const outputRangeSpan = outputMax - outputMin;
  const normalizedInputValue = (inputValue - inputMin) / inputRangeSpan;

  // Calculate the mapped value and clamp it to the output range
  const mappedValue = outputMin + normalizedInputValue * outputRangeSpan;
  return Math.min(Math.max(mappedValue, outputMin), outputMax);
}

// binary interpolate
export function bInterpolate(value: number, nputMin: number, inputMax: number) {
  return interpolate(value, nputMin, inputMax, 0, 1);
}
