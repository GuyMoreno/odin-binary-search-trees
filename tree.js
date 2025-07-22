// import { Node } from "./node.js";

export class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
    this.root = this.buildTree(processedArr); // Pass the processed array to buildTree
  }

  cleanedArray(array) {
    // 1. Remove duplicates using a Set
    const cleanedArray = [...new Set(array)];
    // 2. Sort the array
    cleanedArray.sort((a, b) => a - b);
    return cleanedArray;
  }

  buildTree(array) {
    return null; // Placeholder for tree building logic
  }
}
