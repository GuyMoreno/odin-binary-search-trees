import { Node } from "./node.js";

export class Tree {
  constructor(array) {
    const processedArray = this.cleanedArray(array);
    this.root = this.buildTree(processedArray);
  }

  cleanedArray(array) {
    const cleanedArray = [...new Set(array)];
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

    const mid = Math.floor((start + end) / 2);

    const node = new Node(array[mid]);

    node.left = this.buildTree(array, start, mid - 1);

    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }

  // --- NEW INSERT METHOD ---
  insert(value, node = this.root) {
    if (node === null) {
      return new Node(value); // Found the spot, create and return new node
    }

    if (value === node.data) {
      return node; // Duplicate, do nothing and return current node
    }

    if (value < node.data) {
      node.left = this.insert(value, node.left); // Go left
    } else {
      // value > node.data
      node.right = this.insert(value, node.right); // Go right
    }

    return node; // Return the node (or its updated children)
  }
  // --- END NEW INSERT METHOD ---

  prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
    // 1. Base case: If the node is null, stop.
    if (node === null) {
      return;
    }

    // 2. Recursively print the right child (with updated prefix and direction)
    //    Notice 'this.prettyPrint' here!
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }

    // 3. Print the current node's data
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

    // 4. Recursively print the left child (with updated prefix and direction)
    //    Notice 'this.prettyPrint' here!
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
}
