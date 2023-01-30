export interface IEmbedding {
  input: string;
  vector: number[];
}

export const dotProduct = (vector1: number[], vector2: number[]) => {
  if (vector1.length !== vector2.length) {
    throw new Error(
      "Cannot build dot product of two vectors with different lengths!"
    );
  }
  return vector1
    .map((value, index) => value * vector2[index])
    .reduce((a, b) => a + b);
};
