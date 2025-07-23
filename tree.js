import { Node } from "./node.js";

export class Tree {
  constructor(array) {
    // 1. Clean and sort the input array using your already good method
    const processedArray = this.cleanedArray(array);
    // 2. Pass the processed array to buildTree to create the root
    this.root = this.buildTree(processedArray);
  }

  cleanedArray(array) {
    // 1. Remove duplicates using a Set
    const cleanedArray = [...new Set(array)];
    // 2. Sort the array
    cleanedArray.sort((a, b) => a - b);
    return cleanedArray;
  }

  //  0  1  2  3  4  5  6
  // [1, 2, 3, 4, 5, 6, 7]
  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) {
      return null;
    }
    //  0  1  2  3  4  5  6
    // [1, 2, 3, 4, 5, 6, 7]
    // Step 2: Find the Middle Element
    const mid = Math.floor((start + end) / 2);

    const node = new Node(array[mid]);

    node.left = this.buildTree(array, start, mid - 1);

    node.right = this.buildTree(array, mid + 1, end);

    // Step 6: Return the Current Node
    // This node (with its now connected left and right subtrees)
    // is the root of the (sub)tree built from this segment.
    return node;
  }
}
